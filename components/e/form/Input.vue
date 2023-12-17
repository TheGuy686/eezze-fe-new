<style lang="less">
.main-form-cont {
    position: relative;

    .formS {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        background: #FFF;
        border: 1px solid #D9D9D9;
        border-radius: 2px;
        flex: none;
        order: 1;
        flex-grow: 0;
    }

    .has-error {
        border: 1px red solid !important;
    }
    
    .success{
        border: 1px green solid !important;
    }

    .error-message {
        color: red !important;
    }

    .add-message {
        color: rgba(0, 0, 0, 0.6) !important;
    }

    .form-disabled {
        background-color: rgba(0, 0, 0, 0.05);
    }

    .help-dot {
        position: absolute;
        right: 5px;
        top: calc(50% - 8px);
        z-index: 10;
    }

    .clickable-form-icn {
        cursor: pointer;
    }
}
</style>

<template>
<a-form-model-item
    :label="name"
    :class="'main-form-cont form-input ' + eClass"
    :style="eStyle + '; position: relative;'"
    :validate-status="hasErrorP ? 'error' : borderStatus ? borderStatus : ''"
>
    <h3 non-sel v-if="!inlineOver && placeholderP">

        {{ placeholderP }}

    </h3>

    <a-input
        ref="input"
        :class="'formS ' + (hasErrorP ? ' has-error ' : borderStatus ? borderStatus : '') + (disabled ? 'form-disabled' : '')"
        :size="size"
        :style="styleP"
        :addon-before="addonBefore"
        :addon-after="addonAfter ? addonAfter : undefined"
        :type="type == 'boolean' ? 'text' : type"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlengthP"
        v-decorator="[
            keyP,
            {
                rules: [
                    {
                        required: required,
                        message: message
                    }
                ]
            }
        ]"
        :suffix="rightText"
        :defaultValue="defaultValue"
        :allow-clear="allowClear"
        :value="value"
        @input="valueChanged(castValue($event.target.value))"
        @blur="inFocus = false"
        @focus="inFocus = true"
        v-on:keyup.enter="$emit('enter-pressed')"
    >
        <template v-if="leftIcon" #prefix>

            <a-tooltip :title="leftHelpText" v-if="leftHelpText">

                <GeneralIcon
                    :clss="leftIconClickable ? 'clickable-form-icn' : ''"
                    :type="leftIcon"
                    @click="leftIconClickable ? $emit('left-icon-clicked') : undefined"
                />

            </a-tooltip>

            <GeneralIcon
                :clss="leftIconClickable ? 'clickable-form-icn' : ''"
                :type="leftIcon"
                @click="leftIconClickable ? $emit('left-icon-clicked') : undefined"
                v-else
            />

        </template>

        <template v-if="rightIcon" #suffix>

            <a-tooltip :title="rightHelpText" v-if="rightHelpText">

                <GeneralIcon
                    :clss="rightIconClickable ? 'clickable-form-icn' : ''"
                    :type="rightIcon"
                    @click="rightIconClickable ? $emit('right-icon-clicked') : undefined"
                />

            </a-tooltip>

            <GeneralIcon
                :clss="rightIconClickable ? 'clickable-form-icn' : ''"
                :type="rightIcon"
                @click="rightIconClickable ? $emit('right-icon-clicked') : undefined"
                v-else
            />

        </template>

        <template #addonAfter v-if="changableTypes">

            <a-select :value="type" style="width: 80px" @change="$emit('type-changed', $event)">

                <a-select-option :value="t.key" :key="i" v-for="(t, i) in validTypes">

                    {{ t.title }}

                </a-select-option>

            </a-select>

        </template>

    </a-input>

    <div class="error-message" v-if="errorMessage || warnText != ''">

        {{ errorMessage }} {{  warnText }}

    </div>

    <div class="add-message" v-if="addMessage">

        {{ addMessage }}

    </div>

    <a-tooltip placement="right" v-if="helpText">

        <GeneralIcon clss="help-dot" :stle="helpIconStyleP" type="solid-input-help-prompt" />

        <template #title>

            <div v-html="helpText" />

        </template>

    </a-tooltip>

</a-form-model-item>
</template>

<script lang="ts">
import { tr } from '~/classes/globals';

const CASES = [
    'camelCase', 
    'pascalCase', 
    'pascalCaseWithSpaces', 
    'kebabCase', 
    'upperUnderscoreCase', 
    'upperCase', 
    'lowerCase',
    'titleCase',
    'upperUnderscoreCase',
    'underscoreCase',
    'lcUnderscoreCase',
];

const CAST_TYPES = [ 
    'website-path',
    'number',
    'title',
];

const VALID_BOOL_VALS = [ 'true', 'false' ];

let warnTmr: any = null;

export default {
	props: {
        size: {
            type: String,
            default: 'default',
        },
        hasError: {
            type: Boolean,
            default: false,
        },
        minRange: Number,
        maxRange: Number,
        addMessage: String,
        errorMessage: String,
        eClass: {
            type: String,
            default: '',
        },
        leftIcon: String,
        rightIcon: String,
        rightText: String,
        leftHelpText: String,
        rightHelpText: String,
        maxlength: Number,
        leftIconClickable: {
            type: Boolean,
            default: true,
        },
        rightIconClickable: {
            type: Boolean,
            default: true,
        },
        eStyle: {
            type: String,
            default: '',
        },
		name: {
			type: String,
		},
        value: {
            required: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
        message: {
            type: String,
        },
        addonBefore: {
            type: String,
        },
        addonAfter: {
            type: String,
        },
        type: {
            type: String,
        },
        defaultValue: String,
        allowClear: {
            type: Boolean,
            default: false,
        },
        placeholder: String,
        inlineOver: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        helpText: String,
        inputCase: {
            type: String,
            validator: (value: string) => CASES.includes(value)
        },
        castTo: {
            type: String,
            validator: (value: string) => CAST_TYPES.includes(value)
        },
        helpIconStyle: String,
        changableTypes: Boolean,
        extendedTypes: Boolean,
        borderStatus: String,
	},
    computed: {
        styleP() {
            let stl = '';

            return stl;
        },
        helpIconStyleP() {
            let self: any = this;

            let stl = self.helpIconStyle ? self.helpIconStyle : '';

            if (typeof self.helpText == 'string' && self.helpText != '' && self.type == 'number' && self.inFocus) {
                stl = 'right: 40px;';
            }

            return stl;
        },
        keyP() {
            let self: any = this;

            if (self.key) return self.key;

            return self.kebabCase(self.name);
        },
        placeholderP: function () {
            let self: any = this;

            if (!self.inlineOver && self.name != '' && self.placeholder != '') return self.name;

            if (typeof self.placeholder !== 'undefined') return self.placeholder;

            return self.name;
        },
        maxlengthP() {
            if (typeof this.maxlength == 'number') return this.maxlength;

            if (this.castTo == 'title') return 240;
        },
        hasErrorP() {
            const self: any = this;

            if (self.hasError) return self.hasError;

            if (self.changableTypes || self.type == 'boolean') {
                if (self.type == 'boolean' && !VALID_BOOL_VALS.includes(self.value)) return true;
            }

            if (self.forceHasError) return true;

            return false;
        },
        errorMessageP() {
            const self: any = this;

            if (self.errorMessage) return self.errorMessage;

            if (self.changableTypes || self.type == 'boolean') {
                if (self.type == 'boolean' && !VALID_BOOL_VALS.includes(self.value)) {
                    return self.tr('invalid-boolean-value');
                }
            }
        },
        validTypes() {
            const self: any = this;
            
            const out = [
                {
                    key: 'text',
                    title: self.tr('text')
                },
                {
                    key: 'number',
                    title: self.tr('number')
                },
                {
                    key: 'boolean',
                    title: self.tr('boolean')
                },
            ];

            if (this.extendedTypes) {
                out.push({
                    key: 'date',
                    title: self.tr('date')
                });

                out.push({
                    key: 'object',
                    title: self.tr('object')
                });

                out.push({
                    key: 'list',
                    title: self.tr('list')
                });
            }

            return out;
        },
        castToOr() {
            if (this.inputCase == 'titleCase') {
                return 'title';
            }

            return this.castTo;
        }
    },
    data() {
        return {
            helpPopoverVisible: false,
            inFocus: false,
            warnText: '',
            forceHasError: false,
        }
    },
    methods: {
        focus() {
            (this as any).$refs['input'].focus();
        },
        castValue(value: any) {
            let self: any = this;

            if (typeof self.castToOr != 'undefined') {
                if (typeof value == 'undefined' || ! value) value = '';

                switch (self.castToOr) {
                    case 'website-path': return self.convertToUrl(value);
                    case 'number': return Number((`${value}` ?? '').replace(/[^0-9.-]/g, ''));
                    case 'title': return (value ?? '').replace(/[^a-zA-Z0-9 ]/g, '');
                    default: return value;
                };
            }

            return value;
        },
        valueChanged(value: string) {
            let self: any = this;

            if (typeof value == 'number') {
                if (typeof this.minRange == 'number') {
                    if (value <= this.minRange) {
                        if (warnTmr) clearTimeout(warnTmr);
                        this.warnText = tr('min-range-warn', { args: [ this.minRange ] });
                        // warnTmr = setTimeout(() => this.warnText = '', 8500);
                        this.forceHasError = true;
                    }
                    else {
                        if (warnTmr) clearTimeout(warnTmr);
                        this.forceHasError = false;
                        this.warnText = '';
                    }
                }

                if (typeof this.maxRange == 'number') {
                    if (value >= this.maxRange) {
                        if (warnTmr) clearTimeout(warnTmr);
                        this.warnText = tr('max-range-warn', { args: [ this.maxRange ] });
                        // warnTmr = setTimeout(() => this.warnText = '', 8500);
                        this.forceHasError = true;
                    }
                    else {
                        if (warnTmr) clearTimeout(warnTmr);
                        this.forceHasError = false;
                        this.warnText = '';
                    }
                }
            }

            if (typeof self.inputCase != 'undefined') {
                const exeps = [ 'upperCase', 'lowerCase' ];
                if (exeps.includes(self.inputCase)) {
                    if (self.inputCase == 'upperCase') {
                        self.$emit('input', value.toUpperCase());
                    }
                    else {
                        self.$emit('input', value.toLowerCase());
                    }
                }
                else {
                    self.$emit('input', self[self.inputCase](value));
                }
                return;
            }

            if (this.castToOr) {
                value = this.castValue(value);
            }

            self.$emit('input', value);

            // if (typeof self.castTo != 'undefined') {
            //     switch (self.castTo) {
            //         case 'website-path': self.$emit('input', self.convertToUrl(value));
            //         case 'number': self.$emit('input', Number(value));
            //         default: self.$emit('input', value);
            //     }

            //     return;
            // }
            // else {

            // }
        }
    }
};
</script>