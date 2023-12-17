<style lang="less" scoped>
.clickable-experiment {
    display: flex;
    cursor: pointer;
}

.extra-help {
    color: rgba(0, 0, 0, 0.6);
    font-size: 13.5px;
}
</style>

<template>
<e-col>

    <e-row
        :w-75="!fillParent"
        :w-100="fillParent"
        jc="fs"
        ai="c"
        bev-cont
        :class="'pt-1 pb-1 ' + clss"
    >
        <e-col w-70>

            <template v-if="!hideInput">

                <EFormInput
                    name=""
                    :leftIcon="icon"
                    :addonBefore="addonBefore"
                    :placeholder="placeholder + '...'"
                    :disabled="disabled"
                    keyProp="key"
                    valueProp="name"
                    :inlineOver="true"
                    :castTo="castTo"
                    class="pr-2"
                    :type="type"
                    helpIconStyle="right: 20px;"
                    :helpText="tr('file-name-input-help')"
                    :value="mdlValue('input')"
                    @input="setMdlValue('input', $event)"
                    v-if="type != 'date'"
                />

                <EFormCalendar
                    :stle="{'margin-left': '5px'}"
                    :value="mdlValue('input')"
                    @input="setMdlValue('input', $event)"
                    v-else
                />

            </template>

            <template v-else>

                <e-row>

                    <h3 class="pt-1" v-if="label">

                        {{ label }}:
        
                    </h3>
        
                    <span v-else>{{ tr('please-map-returned-value') }}</span>

                </e-row>

            </template>

        </e-col>

        <e-row w-25 ai="c" :jc="hideContextMenu ? 'fe' : 'se'">

            <template v-if="!hideInput">|</template>

            <EFormContextMenu
                name=""
                :src="src + ' -> LogicMdlInput'"
                :filter="value?.[mdlKey]?.filterId"
                :value="mdlValue('context-menu')"
                @input="setMdlValue('context-menu', $event)"
                v-if="!hideContextMenu"
            />

            <template v-if="!hideContextMenu">|</template>

            <div
                class="clickable-experiment"
                @click="setMdlValue('bl-logic-menu')"
            >

                <GeneralIcon
                    :type="mdlValue('bl-logic-menu') ? 'experiment-blue' : 'experiment'"
                />

            </div>

        </e-row>

        <e-row w-5 ai="c" jc="se">

            <GeneralIcon class="hoverable" :type="'delete-circle'" @click="deleteItem()" />

            <!-- <a-popover placement="topLeft">

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

                    <d :d="mdl" :expandDepth="2" />

                </template>

            </a-popover> -->

        </e-row>

    </e-row>

    <span class="extra-help" v-if="extraHelp">{{ extraHelp }}</span>

    <EFormBlActionChain
		ref="bl-logic-chain"
		:prop="property"
		type="string"
		:filteredItem="blMdl"
		@close="blMdl = {}"
		@save-current="finishedCb"
		@model-changed="handleAllModelChanged($event)"
        v-if="innerLogicChain"
	/>

</e-col>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';
import BlLogicModel from '~/models/BlLogicChain';
import { mapMutations } from 'vuex';

export default {
    props: {
        src: {
            type: String,
            required: true,
        },
        property: String,
        innerLogicChain: Boolean,
        clss: String,
        icon: String,
        addonBefore: String,
        placeholder: String,
        disabled: Boolean,
        castTo: String,
        hideInput: Boolean,
        hideContextMenu: Boolean,
        label: String,
        debug: Boolean,
        extraHelp: String,
        emitChanges: Boolean,
        mdlTransformer: Function,
        fillParent: {
            type: Boolean,
            default: true,
        },
        mdlKey: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        value: {},
    },
    computed: {
        ...mapState('project/data-sources', [ 'entity' ]),
        mdl() {
            try { return this.value[this.mdlKey] }
            catch (err) { return {} }
        },
        mdlValue() {
            return (type) => {
                try {
                    const baseType = this?.mdl?.baseType;

                    switch (type) {
                        case 'input':
                            if (typeof this.mdl?.raw == 'object') return '';
                            if (baseType != 'primitive') return '';

                            return this.mdl?.raw ?? '';

                        case 'context-menu':
                            if (typeof this.mdl?.raw == 'object') return '';
                            if (baseType != 'context-mapping') return '';

                            return this.mdl?.raw ?? '';

                        case 'bl-logic-menu':
                            if (baseType != 'logic-chain') return;
                            return {...this.mdl};
                    }
                }
                catch (err) {
                    console.log(' ----------------------------------------- ');
                    console.log('mdlValue.Error: ', err);
                    console.log('this.mdl: ', this.value, ' : ', this.mdl);
                    console.log('            ');

                    return '';
                }
            }
        },
    },
    data() {
        return {
            blMdl: {},
        }
    },
    mounted() {
        if (this?.debug) {
            console.clear();
            console.log('from here 2: ', this?.value);
        }
    },
    methods: {
        setMdlValue(src, value) {
            if (!this.value[this.mdlKey] || typeof this.value[this.mdlKey] != 'object') {
                Vue.set(this.value, this.mdlKey, BlLogicModel.create({
                    property: this.mdlKey,
                    name: tr('property-name-mapping-default', {args: [this.mdlKey]}),
                    desc: tr('property-desc-mapping-default', {args: [this.mdlKey]}),
                }));
            }

            if (typeof this.value[this.mdlKey]?.filterId != 'string') {
                this.value[this.mdlKey].filterId = BlLogicModel.getRandId();
            }

            if (this.mdlTransformer) {
                this.mdlTransformer(value);
            }

            switch (src) {
                case 'input':
                    this.mdl.baseType = 'primitive';
                    this.mdl.actions = [];
                    this.mdl.raw = value;
                    break;

                case 'context-menu':
                    this.mdl.baseType = 'context-mapping';
                    this.mdl.actions = [];
                    this.mdl.raw = value;
                    break;

                case 'bl-logic-menu':
                    this.mdl.baseType = 'logic-chain';
                    this.mdl.raw = '';

                    if (this.innerLogicChain) {
                        this.blMdl = this.mdl;

                        this.$refs['bl-logic-chain'].show();
                    }
                    else {
                        this.setCurrentBlChain({
                            logicChainItem: this.mdl,
                            finishedCb: this.finishedCb,
                        });

                        this.$emit('show-bl-mdl');
                    }
            }

            if (this.emitChanges) {
                try {
                    const val = JSON.parse(JSON.stringify({...this.value}));
                    this.$emit('value-changed', val);
                    this.$emit('input', val);
                }
                catch (err) {
                    console.log('ERROR: ', err);
                }
            }
        },
        handleAllModelChanged(mdl) {
            this.$emit('model-changed', mdl ?? this.mdl);
        },
        finishedCb(to) {
            try {
                Vue.set(this.value, this.mdlKey, {
                    ...to,
                    baseType: 'logic-chain',
                });

                if (this.innerLogicChain) {
                    this.$emit('input', this.value);
                }
            }
            catch (err) {
                console.log('finishedCb.Error: ', err, ' : ', to);
            }
        },
        deleteItem() {
            if (!this.value[this.mdlKey]) return;
            
            const data = JSON.parse(JSON.stringify(this.value));

            delete data[this.mdlKey];

            if (this.innerLogicChain) {
                this.$emit('input', JSON.parse(JSON.stringify(data)));

                if (this.emitChanges) {
                    this.$emit('value-changed', JSON.parse(JSON.stringify(data)));
                }
            }
            else {
                this.$emit('input', JSON.parse(JSON.stringify(data)));

                if (this.emitChanges) {
                    this.$emit('value-changed', JSON.parse(JSON.stringify(data)));
                }
            }

            this.$emit('item-deleted', this.value);
        },
        ...mapMutations({
            setCurrentBlChain: 'app/setCurrentBlChain',
        }),
    },
}
</script>
