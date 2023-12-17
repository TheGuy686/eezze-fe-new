<style lang="less" scoped>
.clickable-experiment {
    cursor: pointer;
}

.clickable-experiment-disable {
    cursor: not-allowed;
}
</style>

<template>
<div>

    <h3 class="pt-2" non-sel v-if="!inlineOver && label">

        {{ label }}

    </h3>

    <e-row
        :w-75="!fillParent"
        :w-100="fillParent"
        jc="fs"
        ai="c"
        bev-cont
        :class="'pt-1 pb-1 ' + clss"
    >
        <e-col :w-60="typeof additionalIcon == 'string'" :w-70="typeof additionalIcon == 'string'">

            <template v-if="!hideInput">

                <EFormInput
                    name=""
                    :leftIcon="icon"
                    :addonBefore="addonBefore"
                    :placeholder="placeholder ? placeholder + '...' : undefined"
                    :disabled="disabled"
                    keyProp="key"
                    valueProp="name"
                    :inlineOver="true"
                    :castTo="castTo"
                    class="pr-2"
                    :type="type"
                    helpIconStyle="right: 20px;"
                    :helpText="tr('file-name-input-help')"
                    :value="inMdl"
                    @input="setNewIfNotSet(); inMdl = $event"
                    v-if="type != 'date'"
                />

                <EFormCalendar
                    :stle="{'margin-left': '5px'}"
                    :value="inMdl"
                    @input="setNewIfNotSet(); inMdl = $event"
                    v-else
                />

            </template>

            <template non-sel v-else>

                <h3 class="pt-1" v-if="label">

                    {{ label }}:

                </h3>

                <span v-else>{{ tr('please-map-returned-value') }}</span>

            </template>

        </e-col>

        <e-row :w-25="!additionalIcon" :w-20="!!(additionalIcon)" ai="c" jc="se">

            <div :style="partitionMargin ? `padding-left: ${partitionMargin}px; padding-right: ${partitionMargin}px;` : ''" v-if="!hideInput">|</div>

            <EFormContextMenu
                ref="context-menu"
                name=""
                :src="src + ' -> LogicMdlInputKey'"
                :disabled="disabled"
                :filter="mdl?.[mdlKey]?.filterId ?? mdl?.filterId"
                :value="cmMdl"
                @input="setNewIfNotSet(); cmMdl = $event"
            />

            <div :style="partitionMargin ? `padding-left: ${partitionMargin}px; padding-right: ${partitionMargin}px;` : ''">|</div>

            <div
                :class="disabled ? 'clickable-experiment-disable' : 'clickable-experiment'"
                :style="partitionMargin ? `padding-right: ${partitionMargin + 10}px;` : ''"
                :disabled="disabled"
                @click="openBlChain()"
            >
                <GeneralIcon
                    :type="baseType == 'logic-chain' && !additionalIconHasContent ? 'experiment-blue' : 'experiment'"
                />

            </div>

        </e-row>

        <e-row w-5 :center="true" v-if="additionalIcon">

            <div :style="partitionMargin ? `padding-left: ${partitionMargin}px; padding-right: ${partitionMargin}px;` : ''">|</div>

            <a-tooltip placement="top" v-if="additionalIconHelp">

                <GeneralIcon
                    class="hoverable"
                    :type="additionalIconHasContent ? additionalIconSelected : additionalIcon"
                    @click="$emit('additional-icon-clicked')"
                />

                <template #title>

                    <span>{{ additionalIconHelp }}</span>

                </template>

            </a-tooltip>

            <GeneralIcon
                class="hoverable"
                :type="additionalIconHasContent ? additionalIconSelected : additionalIcon"
                @click="$emit('additional-icon-clicked')"
                v-else
            />

        </e-row>

        <e-row w-5 :center="true">

            <GeneralIcon class="hoverable" :type="'delete-circle'" @click="deleteItem()" />

        </e-row>

    </e-row>

	<EFormBlActionChain
		ref="action-chain"
		:prop="mdlKey"
		type="string"
		:src="blMdl"
		:filteredItem="filterItem"
		@save-current="saveCurrent"
		@model-changed="handleAllModelChanged"
		@close="blMdl = {}"
	/>

</div>
</template>

<script>
import Vue from 'vue';
import { generateRandomString } from '~/classes/globals';
import BlLogicModel from '~/models/BlLogicChain';

export default {
    props: {
        partitionMargin: Number,
        clss: String,
        icon: String,
        label: String,
        addonBefore: String,
        placeholder: String,
        castTo: String,
        disabled: Boolean,
        hideInput: Boolean,
        label: String,
        additionalIcon: String,
        additionalIconHelp: String,
        additionalIconSelected: String,
        additionalIconHasContent: Boolean,
        inlineOver: {
            type: Boolean,
            default: true,
        },
        src: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        example: {
            type: String,
            default: '',
        },
        fillParent: {
            type: Boolean,
            default: true,
        },
        store: {
            type: Object,
            validator: (v) => {
                return typeof v['setter'] == 'function' && typeof v['key'] == 'string';
            },
        },
        mdlKey: {
            type: String | Number,
            required: true,
        },
        obj: {
            type: Object,
            required: true,
            default: () => {}
        },
    },
    watch: {
        changeEmitter(to) {
            if (!this.mounted) return;

            const objSrc = this.cloneObj(this.obj);

            if (this.doDeleteItem) {
                delete objSrc[this.mdlKey];
            }
            else {
                objSrc[this.mdlKey] = to.mdl[this.mdlKey];
            }

            // here we use the setter call back and a key to set on that object to the 
            // mdl value. So for e.g. { metadata: { [this.mdlKey]: [output value] } }.
            // The "key" in this case "metadata" would be set using the setter params.
            // the setter args are expected to be key values like { key: 'metadata', value: $event }
            if (this.store) {
                this.store.setter({
                    key: this.store.key,
                    value: this.cloneObj(objSrc),
                });
            }
            // this is designed to handle the events that would usually  
            // do the setting in the store from outside the component. 
            else {
                let justDidDelete = false;

                if (this.doDeleteItem) {
                    this.doDeleteItem = false;
                    this.justDidDelete = true;

                    setTimeout(() => this.justDidDelete = false, 50);

                    this.$emit('item-will-delete', objSrc);

                    justDidDelete = true;
                }

                this.$emit('model-changed', objSrc);

                if (justDidDelete) this.$emit('item-deleted');
            }
        },
        inMdl() {
            if (this.justDidDelete) return;
            if (!this.mounted || (this.inMdl == '' && this.justChangedMdl)) {
                this.justChangedMdl = false;
                return;
            }

            if (this.cmMdl != '') {
                this.justChangedMdl = true;
                this.cmMdl = '';
            }

			if (Object.keys(this.blMdl).length > 0 || Object.keys(this.filterItem).length > 0) {
				this.justChangedMdl = true;
				this.blMdl = {};
				this.filterItem = {};
			}

            this.setNewIfNotSet();

            const objIn = this.cloneObj(this.mdl);

            if (typeof objIn[this.mdlKey]?.filterId != 'string') {
                Vue.set(
                    objIn[this.mdlKey],
                    'filterId',
                    generateRandomString(10),
                );
            }

            if (typeof objIn[this.mdlKey]?.name != 'string') {
                Vue.set(
                    objIn[this.mdlKey],
                    'name',
                    tr('property-name-mapping-default', { args: [this.mdlKey] })
                );
            }

            if (typeof objIn[this.mdlKey]?.desc != 'string') {
                Vue.set(
                    this.mdl[this.mdlKey],
                    'desc',
                    tr('property-desc-mapping-default', { args: [this.mdlKey] })
                );
            }

            Vue.set(objIn[this.mdlKey], 'baseType', 'primitive');
            Vue.set(objIn[this.mdlKey], 'setSrc', `inMdl->${this.cmMdl}`);
            Vue.set(objIn[this.mdlKey], 'raw', this.inMdl);
            Vue.set(objIn[this.mdlKey], 'type', this.type);
            Vue.set(objIn[this.mdlKey], 'property', this.mdlKey);
            Vue.set(objIn[this.mdlKey], 'example', this.example);
            Vue.set(objIn[this.mdlKey], 'actions', []);

            this.baseType = 'primitive';

            Vue.set(this, 'mdl', objIn);

            this.itteration++;
        },
        cmMdl() {
            if (this.justDidDelete) return;
            if (!this.mounted || (this.cmMdl == '' && this.justChangedMdl)) {
                this.justChangedMdl = false;
                return;
            }

            if (this.inMdl != '') {
                this.inMdl = '';
                this.justChangedMdl = true;
            }

			if (Object.keys(this.blMdl).length > 0 || Object.keys(this.filterItem).length > 0) {
				this.justChangedMdl = true;
				this.blMdl = {};
				this.filterItem = {};
			}

            this.setNewIfNotSet();

            const objIn = this.cloneObj(this.mdl);

            if (typeof objIn[this.mdlKey]?.filterId != 'string') {
                Vue.set(
                    objIn[this.mdlKey],
                    'filterId',
                    generateRandomString(10),
                );
            }

            if (typeof objIn[this.mdlKey]?.name != 'string') {
                Vue.set(
                    objIn[this.mdlKey],
                    'name',
                    tr('property-name-mapping-default', { args: [this.mdlKey] })
                );
            }

            if (typeof objIn[this.mdlKey]?.desc != 'string') {
                Vue.set(
                    objIn[this.mdlKey],
                    'desc',
                    tr('property-desc-mapping-default', { args: [this.mdlKey] })
                );
            }

            Vue.set(objIn[this.mdlKey], 'baseType', 'context-mapping');
            Vue.set(objIn[this.mdlKey], 'setSrc', `cmMdl->${this.cmMdl}`);
            Vue.set(objIn[this.mdlKey], 'raw', this.cmMdl);
            Vue.set(objIn[this.mdlKey], 'type', this.type);
            Vue.set(objIn[this.mdlKey], 'property', this.mdlKey);
            Vue.set(objIn[this.mdlKey], 'example', this.example);
            Vue.set(objIn[this.mdlKey], 'actions', []);

            Vue.set(this, 'mdl', objIn);

            this.baseType = 'context-mapping';

            this.itteration++;
        },
		blMdl() {
            if (this.justDidDelete) return;

			const hasValues = Object.keys(this.blMdl).length > 0 || Object.keys(this.filterItem).length > 0;
			
            if (!this.mounted || (!hasValues && this.justChangedMdl)) {
                this.justChangedMdl = false;
                return;
            }

            this.setBlMainMdl();
		},
    },
    computed: {
        changeEmitter() {
            try {
                return this.cloneObj({
                    sig: `${this.itteration}`,
                    mdl: this.mdl,
                });
            }
            catch (err) {
                console.log('ERRO: ', err);
                
                return {};
            }
        },
    },
    data() {
        return {
            itteration: 0,
            baseType: '',
            justChangedMdl: true,
            doDeleteItem: false,
            justDidDelete: false,

			blChainEditMode: false,

            mounted: false,
            cmMdl: '',
            inMdl: '',

            mdl: {},
            blMdl: {},
            filterItem: {},
        };
    },
	mounted() {
        this.mdl[this.mdlKey] = JSON.parse(JSON.stringify({...this.obj?.[this.mdlKey]} ?? {}));
        this.baseType = this?.obj?.[this.mdlKey]?.baseType ?? 'logic-menu';

        this.setDefaultMdlVal();

        this.os(() => this.mounted = true, 50);
	},
    methods: {
        setNewIfNotSet() {
            if (typeof this.mdl[this.mdlKey] != 'object' || Object.keys(this.mdl[this.mdlKey]).length == 0) {
                Vue.set(this.mdl, this.mdlKey, BlLogicModel.create({
                    filterId: generateRandomString(10),
                    property: this.mdlKey,
                    name: tr('property-name-mapping-default', { args: [this.mdlKey] }),
                    desc: tr('property-desc-mapping-default', { args: [this.mdlKey] }),
                    type: 'string',
                    example: '',
                    raw: '',
                }));

                this.setBlMainMdl();

				this.$emit('init-new-value');
            }
        },
        setBlMainMdl() {
            if (this.mdl?.[this.mdlKey]?.raw != '') {
                Vue.set(this.mdl[this.mdlKey], 'raw', '');
            }

            this.setNewIfNotSet();

            Vue.set(this.mdl, this.mdlKey, this.cloneObj(this.blMdl));

            this.baseType = 'logic-chain';

            this.itteration++;
        },
		handleAllModelChanged(mdl) {
			if (this.inMdl != '') this.inMdl = '';
			if (this.cmMdl != '') this.cmMdl = '';

			if (Object.keys(mdl).length > 0) {
				this.blMdl = this.cloneObj(mdl);
				mdl.raw = '';
			}
		},
		saveCurrent(mdl) {
			mdl.raw = '';
			this.cmMdl = '';
			this.inMdl = '';
			
			if (!this.blChainEditMode) {
				this.blMdl = this.cloneObj(mdl);
			}

			this.itteration++;
		},
        setDefaultMdlVal() {
            switch (this.baseType) {
                case 'primitive': {
                    this.inMdl = this.mdl[this.mdlKey].raw;
                    return;
                }
                case 'context-mapping': {
                    this.cmMdl = this.mdl[this.mdlKey].raw;
                    return;
                }	
                case 'logic-chain': {
					this.filterItem = this.cloneObj(this.mdl[this.mdlKey]);
                }
            }
        },
        openBlChain() {
			this.setNewIfNotSet();

			this.blChainEditMode = this.mdl[this.mdlKey].baseType == 'logic-chain';

			if (this.blChainEditMode) {
				this.filterItem = this.cloneObj(this.mdl[this.mdlKey]);
			}

			this.$refs['action-chain'].show();
		},
        deleteItem() {
            this.doDeleteItem = true;

            this.inMdl = '';
            this.cmMdl = '';
            
            this.itteration++;
        }
    },
}
</script>
