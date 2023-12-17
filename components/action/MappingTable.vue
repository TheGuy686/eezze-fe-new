<style lang="less" scoped>
.map-vars-tbl-root {
    .add-prop-btn {
        margin-right: 5px;
        margin-bottom: -8px;
    }
}
</style>

<template>
<div :class="'map-vars-tbl-root ' + (extendedTop ? 'mt-10 pt-10' : '')" :style="stle">

    <e-row jc="sb" ai="e">

        <p class="font-semibold text-black-1 text-lg" v-if="title">
        
            {{ title }}
            
        </p>

        <p v-else></p>

        <div>

            <a-button class="add-prop-btn" type="primary" shape="circle" size="small" @click="$refs['mdl-new-prop'].show()">

                <GeneralIcon type="plus-white" />

            </a-button>

        </div>

    </e-row>

    <TablePaginated
        :columns="columns"  
        :data="innerMdl"
        :showRowCheckboxs="false"
        :showSearch="false"
        :showActions="true"
        :actions="[
            {
                action: 'selectInput',
                type: 'context-menu',
            },
            {
                action: 'experiment',
                icon: 'experiment',
                iconHighlight: 'experiment-blue',
                highlight: (row) => {
                    return row?.baseType == 'logic-chain' || row?.actions?.length > 0;
                }
            },
            {
                action: 'delete',
                icon: 'dustbin'
            },
            {
                action: 'edit',
                icon: 'edit'
            },
        ]"
        @action-experiment-clicked="blActionClicked"
        @action-edit-clicked="editProp"
        @action-delete-confirmed="(params) => {
            innerMdl.splice(params.deleteIndex, 1);
            params.successCb();
        }"
    />

    <EModal
        ref="mdl-new-prop"
        :title="tr(isEdit || isEditingProp ? 'edit' : 'add' + '-property')"
        :rightBtnText="tr(isEditingProp ? 'save' : 'add')"
        :shouldDisableRightBtn="!newFormIsValid"
        @right-btn-clicked="addProp()"
        @modal-closed="isEditingProp = false; editingRow = {}; propName = ''"
    >
       <e-row>

            <e-col w-60>

                <EFormInput
                    :name="tr('property-name')"
                    :placeholder="tr('property-name')"
                    :inlineOver="true"
                    inputCase="camelCase"
                    @keyup.enter="addProp()"
                    :hasError="propertyExists"
                    :errorMessage="propertyExists ? tr('property-already-exists') : ''"
                    v-model="propName"
                />

            </e-col>

            <e-row w-40 jc="sa" ai="c">

                <e-tag-drop-down
                    colorCol="color"
                    keyCol="key"
                    valueCol="label"
                    :maxLength="15"
                    :options="logicReturnTypes"
                    :placeholder="tr('return-type')"
                    v-model="returnType"
                />

            </e-row>

       </e-row>

    </EModal>

</div> 
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import BlLogicChain from '~/models/BlLogicChain';

export default {
    props: {
        stle: String,
        extendedTop: {
            type: Boolean,
            default: true,
        },
        title: String,
        srcKey: {
            type: String,
            required: true,
        },
        propMdlSrcKey: String,
        value: {
            type: Object,
            required: true,
        }
    },
    computed: {
        ...mapGetters({
            logicReturnTypes: 'project/entity-presets/logicReturnTypes',
        }),
        propertyExists() {
            if (this.isEditingProp) return false;
            return this.allTableProps.includes(this.propName);
        },
        newFormIsValid() {
            return this.propName != '' && this.returnType != '' && !this.propertyExists;
        },
        allTableProps() {
            const out = [];

            for (const p of this.innerMdl) out.push(p.property);

            return out;
        },
    },
    watch: {
        innerMdl(to) {
            const out = {...this.value};

            out[this.srcKey] = to;

            if (typeof this.propMdlSrcKey == 'string') {
                out[this.propMdlSrcKey] = this.allTableProps;
            }

            this.$emit('input', out);
        },
        propName(to) {
            if (this.isEditingProp) {
                this.innerMdl[this.editingIndex].property = to;
            }
        },
        returnType(to) {
            if (this.isEditingProp) {
                this.innerMdl[this.editingIndex].type = to;
            }
        },
    },
    data() {
        return {
            createValuesData: [],
            columns: [...BlLogicChain.getColumns()],
            isEdit: false,
            propName: '',
            returnType: 'text',
            innerMdl: [],
            editingIndex: -1,
            isEditingProp: false,
        };
    },
    mounted() {
        setTimeout(() => this.setMdl(), 50);
    },
    methods: {
        setMdl(value) {
            try {
                const val = value ? value : this.value;

                if (typeof val[this.srcKey] == 'object') {
                    this.innerMdl = [...JSON.parse(JSON.stringify(val[this.srcKey]))];
                }
            }
            catch (err) {
                console.log('Mapping table mount error: ', err, ' : ', this.srcKey, ' : ', this.value);
                this.innerMdl = [];
            }
        },
        clearMdl() {
            this.innerMdl = [];
        },
        editProp(row, index) {
            this.isEditingProp = true;
            this.propName = row.property;
            this.returnType = row.type;
            this.editingIndex = index;

            this.$refs['mdl-new-prop'].show();
        },
        blActionClicked(row, index) {
            this.editingIndex = index;
            this.setCurrentBlChain({
                logicChainItem: row,
                finishedCb: this.blLogicConfirmPressed,
            });
            this.$emit('show-bl-mdl', { row, index });
        },
        addProp() {
            if (!this.isEditingProp) {
                this.innerMdl.push(BlLogicChain.create({
                    property: this.propName,
                    type: this.returnType,
                    name: tr('property-name-mapping-default', {args: [this.propName]}),
                    desc: tr('property-desc-mapping-default', {args: [this.propName]}),
                }));
            }

            this.$refs['mdl-new-prop'].hide();

            this.propName = '';
            this.returnType = 'text';
            this.isEditingProp = false;
        },
        blLogicConfirmPressed(to) {
            const mdl = [...this.innerMdl];

            mdl[Number(this.editingIndex)] = {
                ...to,
                baseType: 'logic-chain',
                raw: '',
            };

            this.innerMdl = mdl;
        },

        ...mapMutations({
            setCurrentBlChain: 'app/setCurrentBlChain',
        }),
    }
}
</script>
