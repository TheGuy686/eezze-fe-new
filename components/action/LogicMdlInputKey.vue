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

    <e-row
        :w-75="!fillParent"
        :w-100="fillParent"
        jc="fs"
        ai="c"
        bev-cont
        :class="'pt-1 pb-1 ' + clss"
    >
        <e-col w-75>

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

            <template non-sel v-else>

                {{ tr('please-map-returned-value') }}

            </template>

        </e-col>

        <e-row w-25 ai="c" jc="se">

            <div :style="partitionMargin ? `padding-left: ${partitionMargin}px; padding-right: ${partitionMargin}px;` : ''" v-if="!hideInput">|</div>

            <EFormContextMenu
                ref="context-menu"
                name=""
                :src="src + ' -> LogicMdlInputKey'"
                :disabled="disabled"
                :filter="value?.[mdlKey]?.filterId ?? value?.filterId"
                :value="mdlValue('context-menu')"
                @input="setMdlValue('context-menu', $event)"
            />

            <div :style="partitionMargin ? `padding-left: ${partitionMargin}px; padding-right: ${partitionMargin}px;` : ''">|</div>

            <div
                :class="disabled ? 'clickable-experiment-disable' : 'clickable-experiment'"
                :style="partitionMargin ? `padding-right: ${partitionMargin + 10}px;` : ''"
                :disabled="disabled"
                @click="setMdlValue('bl-logic-menu')"
            >
                <GeneralIcon
                    :type="mdlValue('bl-logic-menu') ? 'experiment-blue' : 'experiment'"
                />

            </div>

        </e-row>

        <e-row w-5 ai="c" jc="c">

            <GeneralIcon class="hoverable" :type="'delete-circle'" @click="deleteItem()" />

        </e-row>

    </e-row>

    <EFormBlActionChain
		ref="action-chain"
		:prop="property"
		type="string"
		:filteredItem="blMdl"
		@close="blMdl = {}"
		@save-current="saveCurrent"
		@model-changed="handleAllModelChanged($event)"
	/>


</div>
</template>

<script>
import Vue from 'vue';
import BlLogicModel from '~/models/BlLogicChain';
import { mapGetters, mapState } from 'vuex';
import { mapMutations } from 'vuex';

/** 
 * This is an example of how to add this to a component that is a new or editing key. So this 
 * will consume a new BlLogicModel and then it will just use that object and not a vuex var
 * 
 * <ActionLogicMdlInputKey
        clss="pl-2.5"
        src="connection-overrides"
        :nonStoreMdl="true"
        :setOnlyKeyValue="false"
        :hideInput="true"
        mdlKey="connection"
        :value="connectionMdl"
    />

    The use case for this is when we have an array and we then need to loop through the array
    and then we need to change the item of the item at index or key 

    <ActionLogicMdlInputKey
        clss="pl-2.5"
        src="ACInputContent"
        mdlType="array-to-item"
        :nonStoreMdl="true"
        :placeholder="tr('enter-a-value') + '...'"
        :mdlKey="index"
        :setOnlyKeyValue="false"
        :useInnerModal="true"
        :type="newReturnValue"
        :value="entity.actionInput"
    />
 * 
*/
export default {
    props: {
        partitionMargin: Number,
        clss: String,
        icon: String,
        addonBefore: String,
        placeholder: String,
        nonStoreMdl: Boolean,
        castTo: String,
        setOnlyKeyValue: Boolean,
        setBlTypeOnMdlChange: Boolean,
        disabled: Boolean,
        hideInput: Boolean,
        mdlType: String,
        src: {
            type: String,
            required: true,
        },
        useInnerModal: {
            type: Boolean,
            default: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        fillParent: {
            type: Boolean,
            default: true,
        },
        mdlKey: {
            type: String | Number,
            required: true,
        },
        value: {},
    },
    computed: {
        mdl() {
            try {
                if (this.setOnlyKeyValue) return JSON.parse(JSON.stringify(this.value));

                return JSON.parse(JSON.stringify(this.value[this.mdlKey]));
            }
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
            property: '',
			blMdl: {},
        }
    },
	mounted() {
		if (this?.debug) {
			console.log('from here: ', this.property);
		}
	},
    methods: {
        openBlChain(pl) {
			const p =  pl?.pl ?? pl;

			this.blMdl = p.logicChainItem;

			this.property = this.blMdl.property;

            // this.$emit('show-bl-mdl', pl?.pl ?? pl);

			this.$refs['action-chain'].show();
		},
        saveCurrent(blChain) {
            if (this.mdlType) {
                switch (this.mdlType) {
                    case 'array-to-item':
                        if (this.nonStoreMdl && this.useInnerModal) {
                            this.finishedCb(this.blMdl);
                        }
                }
            }
        },
        setMdlValue(src, value) {
            if (this.disabled) return;

            if (!this.mdl) {
                this.$emit('init-new-value');

                return this.os(() => {

                    this._finalizeSetMdl(src, value);

                }, 50);
            }

            this._finalizeSetMdl(src, value);
        },
        _finalizeSetMdl(src, value) {
            if (typeof this.value[this.mdlKey] != 'object') {
                Vue.set(this.value, this.mdlKey, BlLogicModel.create({
                    property: this.mdlKey,
                    name: tr('property-name-mapping-default', {args: [this.mdlKey]}),
                    desc: tr('property-desc-mapping-default', {args: [this.mdlKey]}),
                }));
            }

            const mdlOut = JSON.parse(JSON.stringify(this.mdl));

            if (typeof mdlOut?.filterId != 'string') {
                mdlOut.filterId = BlLogicModel.getRandId();
            }

            switch (src) {
                case 'input':
                    mdlOut.baseType = 'primitive';
                    mdlOut.actions = [];
                    mdlOut.raw = value;

                    this.handleAllModelChanged(mdlOut);
                    break;

                case 'context-menu':
                    mdlOut.baseType = 'context-mapping';
                    mdlOut.actions = [];
                    mdlOut.raw = value;

                    this.handleAllModelChanged(mdlOut);
                    break;

                case 'bl-logic-menu':
                    mdlOut.baseType = 'logic-chain';
                    mdlOut.raw = '';

                    const out = {
                        logicChainItem: this.mdl,
                        finishedCb: this.finishedCb,
                    };

                    if (!this.nonStoreMdl) {
                        this.setCurrentBlChain(out);
                    }
                    else {}

                    if (this.useInnerModal || this.setOnlyKeyValue) {
                        this.openBlChain(out);
                    }
                    else {
                        this.$emit('show-bl-mdl', { pl: out });
                    }
            }

            this.$emit('input', mdlOut);

            // this.mdl.example = this.example();

            this.$emit('changed', mdlOut);
        },
        handleAllModelChanged(mdl) {
            this.$emit('model-changed', mdl ?? this.mdl);
        },
        finishedCb(to) {
            try {
                if (this.setOnlyKeyValue) {
                    this.$emit('set-vuex-mdl', {
                        ...to,
                        baseType: 'logic-chain',
                    });
                }
                else {
                    Vue.set(this.value, this.mdlKey, {
                        ...to,
                        baseType: 'logic-chain',
                    });
                }
            }
            catch (err) {
                console.log('finishedCb.Error: ', err, ' : ', to);
            }
        },
        example() {
            const randStr = generateRandomString(5);

            try {
                if (this.mdl.baseType == 'primitive') {
                    return this.getRandomValueForType();
                }
                else if (this.mdl.baseType == 'context-mapping') {
                    return this.$refs['context-menu'].currentSelection.example ?? randStr;
                }
                else {
                    return randStr;
                }
            }
            catch (err) { return randStr }
        },
        getRandomValueForType() {
            const el = this.mdl;

            if (el.baseType == 'primitive') {
                if (el.raw && el.raw != '') return el.raw;
            }

            switch (el.type) {
                case 'number': {
                    return getRandomInt(10);
                }
                case 'boolean': {
                    return false;
                }
                case 'object': {
                    return {message: this.tr('en-example')};
                }
                case 'list': {
                    return [ {message: this.tr('en-example')} ];
                }
                default: {
                    return generateRandomString(5);
                }
            }
        },
        deleteItem() {
            if (!this.value[this.mdlKey]) return;
            
            const mdlOut = JSON.parse(JSON.stringify(this.value));

            Vue.delete(mdlOut, this.mdlKey);

            this.$emit('item-deleted', mdlOut);
        },
        ...mapMutations({
            setCurrentBlChain: 'app/setCurrentBlChain',
        }),
    },
}
</script>
