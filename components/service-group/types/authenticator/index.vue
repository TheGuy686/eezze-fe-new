<style lang="less" scoped>
.sg-authenticator-root {
    .title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        margin-top: -10px;
    }

    .ex-icon { cursor: pointer; }

    .active-section {
        font-weight: bold;
        color: green;
    }
}
</style>

<template>
<div class="sg-authenticator-root">

    <h1 class="title">

        {{ tr('authenticator-settings') }}

        <a-popover placement="left">

            <a-button
                shape="circle"
                size="small"
                type="primary"
            >

                <GeneralIcon type="eye-white" />

            </a-button>

            <template #title>

                <h3>{{ tr('output-preview') }}</h3>

            </template>

            <template #content>

                <d :d="openItem" :expandDepth="3" />

            </template>

        </a-popover>

    </h1>

    <a-tabs v-model="activeKey">

        <a-tab-pane key="additional-headers" :tab="tr('additional-headers')">

            <ServiceGroupTypesAuthenticatorAdditionalHeaders
                @md-changed="additionalHeadersChanged($event)"
            />

        </a-tab-pane>

        <a-tab-pane key="sources" :tab="tr('sources')" force-render>

            <EInfoHelp trKey="auth-sources-help" />

            <e-row class="mt-3" jc="sb" ai="e">

                <p class="font-semibold text-black-1 text-lg">
                
                    {{ tr('sources') }}
                    
                </p>
        
                <div>
        
                    <a-button class="add-prop-btn" type="primary" shape="circle" size="small" @click="$refs['mdl-new-prop'].show()">
        
                        <GeneralIcon type="plus-white" />
        
                    </a-button>
        
                </div>
        
            </e-row>

            <TablePaginated
                :columns="columns"  
                :data="sources"
                :showRowCheckboxs="false"
                :showSearch="false"
                :showActions="true"
                :actions="[
                    {
                        action: 'delete',
                        icon: 'dustbin'
                    },
                    {
                        action: 'edit',
                        icon: 'edit'
                    },
                ]"
                @action-edit-clicked="editProp"
                @action-delete-confirmed="(params) => {
                    sources.splice(params.deleteIndex, 1);
                    params.successCb();
                }"
            />

        </a-tab-pane>

        <a-tab-pane key="assign-information" :tab="tr('assign-information')">

            <e-col>

                <h2 class="mt-2">{{ tr('secret') }}</h2>

                <e-col clss="p-3" bev-cont>

                    <EFormInput
                        w-100
                        :placeholder="tr('secret-ph')"
                        v-model="openItem.metadata.secret"
                    />

                </e-col>

                <EInfoHelp trKey="auth-secret-help" />

                <h2 class="mt-2">{{ tr('user') }}</h2>

                <e-row clss="p-3" bev-cont>

                    <e-col :class="hasSetUserVal ? 'active-section' : ''" w-50 :center="true">

                        {{ tr(hasSetUserVal ? 'has-definition' : 'nothing-yet-applied') }}

                    </e-col>

                    <e-row w-50 :center="true" jc="fe">

                        <GeneralIcon
                            class="ex-icon"
                            :type="hasSetUserVal || setUserHovered ? 'experiment-blue' : 'experiment'"
                            @mouseenter="setUserHovered = true"
                            @mouseleave="setUserHovered = false"
                            @click="blIconClicked('user')"
                        />

                        <GeneralIcon class="hoverable pl-2" :type="'delete-circle'" @click="deleteItem('user')" />

                    </e-row>

                </e-row>

                <EInfoHelp trKey="auth-user-help" />

                <h2 class="mt-2">{{ tr('roles') }}</h2>

                <e-row clss="p-3" bev-cont>

                    <e-col :class="hasSetRolesVal ? 'active-section' : ''" w-50 :center="true">

                        {{ tr(hasSetRolesVal ? 'has-definition' : 'nothing-yet-applied') }}

                    </e-col>

                    <e-row w-50 :center="true" jc="fe">

                        <GeneralIcon
                            class="ex-icon"
                            :type="hasSetRolesVal || setRolesHovered ? 'experiment-blue' : 'experiment'"
                            @mouseenter="setRolesHovered = true"
                            @mouseleave="setRolesHovered = false"
                            @click="blIconClicked('roles')"
                        />

                        <GeneralIcon class="hoverable pl-2" :type="'delete-circle'" @click="deleteItem('roles')" />

                    </e-row>

                </e-row>

                <EInfoHelp trKey="auth-roles-help" />

            </e-col>

        </a-tab-pane>

    </a-tabs>

    <EModal
        ref="mdl-new-prop"
        :width="800"
        :title="tr(isEdit || isEditingProp ? 'edit' : 'add' + '-property')"
        :rightBtnText="tr(isEditingProp ? 'save' : 'add')"
        :shouldDisableRightBtn="!newFormIsValid"
        @right-btn-clicked="addProp()"
        @modal-closed="newPropMdlClosed()"
    >
       <e-row class="mt-3" :fillParent="true">

            <ActionLogicMdlInput
                clss="pl-2.5"
                :hideInput="true"
                :label="tr('condition')"
                :extraHelp="tr('condition-extra-help')"
                src="ServiceGroup->types->folder"
                mdlKey="condition"
                v-model="editingSrc"
                @show-bl-mdl="openBlPopup('condition', editingSrc?.condition)"
            />

        </e-row>

        <e-row class="mt-1" :fillParent="true">

            <ActionLogicMdlInput
                clss="pl-2.5"
                :hideInput="true"
                :label="tr('value-source')"
                :extraHelp="tr('source-extra-help')"
                src="ServiceGroup->types->folder"
                mdlKey="src"
                :value="editingSrc"
                @show-bl-mdl="openBlPopup('src', editingSrc?.src)"
            />

        </e-row>

    </EModal>

    <EFormBlActionChain
        ref="action-chain"
        :prop="editingProp ?? clickedSection"
        type="string"
        :filteredItem="blMdl"
        @save-current="saveBlChainClicked"
    />

</div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
import BlLogicChain from '~/models/BlLogicChain';

export default {
    props: {
        value: Object,
    },
    watch: {
        changeEmitter(to) {
            this.setEntityProp({ key: 'metadata', value: to?.metadata });
        },
        sources(to) {
            const md = JSON.parse(JSON.stringify(this.openItem?.metadata));

            md.sources = JSON.parse(JSON.stringify(to));

            Vue.set(this.openItem, 'metadata', md);
        },
    },
    computed: {
        changeEmitter() {
            try {
                return JSON.parse(JSON.stringify(this.openItem));
            }
            catch (err) { return '' }
        },

        newFormIsValid() {
            return this.editingSrc?.property != '' && this.returnType != '' && !this.propertyExists;
        },
        hasSetUserVal() {
            return typeof this.openItem?.metadata?.user == 'object';
        },
        hasSetRolesVal() {
            return typeof this.openItem?.metadata?.roles == 'object';
        },
        propertyExists() {
            if (this.isEditingProp) return false;
            return this.allTableProps.includes(this.editingSrc?.property);
        },

        allTableProps() {
            try {
                const out = [];

                for (const p of this.sources ?? []) out.push(p.property);

                return out;
            }
            catch (err) { return [] }
        },
    },
    data() {
        return {
            columns: [...BlLogicChain.getColumns([ 'baseType' ])],

            activeKey: 'assign-information',
            // activeKey: 'sources',
            setUserHovered: false,
            setRolesHovered: false,

            clickedSection: '',
            blMdl: {},

            editingProp: '',
            editing: {},

            openItem: { metadata: {} },

            isEdit: false,
            returnType: 'text',
            innerMdl: [],
            editingIndex: -1,
            isEditingProp: false,
            editingSrc: {},

            sources: [],
        }
    },
    mounted() {
        this.openItem = JSON.parse(JSON.stringify(this.value));

        this.sources = this.openItem?.metadata?.sources ?? [];
    },
    methods: {
        additionalHeadersChanged(value) {
            Vue.set(this.openItem.metadata, 'additionalHeaders', value.additionalHeaders);
        },

        editProp(row, index) {
            this.isEditingProp = true;
            this.returnType = row.type;
            this.editingIndex = index;
            this.editingSrc = JSON.parse(JSON.stringify(row));

            this.$refs['mdl-new-prop'].show();
        },

        newPropMdlClosed() {
            this.editingSrc = {};
            this.isEditingProp = false;
            this.editingRow = {};
        },

        addProp() {
            if (!this.isEditingProp) {
                const name = `Src #${this.sources.length + 1}`;

                this.editingSrc.property = name;
                this.editingSrc.type = 'text';

                this.sources.push(this.editingSrc);
            }
            else {
                Vue.set(this.sources, this.editingIndex, {...this.editingSrc});
            }

            this.$refs['mdl-new-prop'].hide();

            this.returnType = 'text';
            this.isEditingProp = false;
        },

        openBlPopup(prop, row) {
            this.editingProp = prop;

            const md = JSON.parse(JSON.stringify(this.openItem.metadata));

            this.editing = row;
            this.blMdl = JSON.parse(JSON.stringify(row));

            this.$refs['action-chain'].show();
        },

        saveBlChainClicked(chain) {
            chain.baseType = 'logic-chain';
            chain.raw = '';

            this.editingSrc[this.editingProp] = chain;
        },

        blIconClicked(src) {
            this.clickedSection = src;
            this.$emit('show-bl-mdl', {
                chain: this?.openItem?.metadata?.[src],
                successCb: this.blAddClicked,
            });
        },

        blAddClicked(item) {
            let md = { type: 'custom', metadata: {} };

            try {
                md = {...(JSON.parse(JSON.stringify(this.openItem?.metadata ?? {})))};

                md[this.clickedSection] = BlLogicChain.create({
                    ...JSON.parse(JSON.stringify(item)),
                    property: this.clickedSection,
                });

                if (this.clickedSection == 'user') {
                    md[this.clickedSection].type = 'object';
                }
                else if (this.clickedSection == 'roles') {
                    md[this.clickedSection].type = 'list';
                }

                Vue.set(this.openItem, 'metadata', JSON.parse(JSON.stringify(md)));

                this.clickedSection = '';
            }
            catch (err) {
                console.log('error: ', err);
            }
        },

        deleteItem(key) {
            let md = { type: 'custom', metadata: {} };

            try {
                md = {...(JSON.parse(JSON.stringify(this.openItem?.metadata ?? {})))};

                delete md[key];

                Vue.set(this.openItem, 'metadata', JSON.parse(JSON.stringify(md)));

                this.clickedSection = '';
            }
            catch (err) {
                console.log('error: ', err);
            }
        },

        ...mapMutations({
			setEntityProp: 'project/service-groups/setEntityProp',
		}),
    }
}
</script>
