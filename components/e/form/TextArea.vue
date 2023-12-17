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

    .error-message {
        color: red !important;
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
    :validate-status="hasError ? 'error' : ''"
>
    <h3 v-if="!inlineOver && placeholderP"  class="pt-3">

        {{ placeholderP }}

    </h3>

    <a-textarea
        ref="input"
        :style="inputStyle"
        :class="'formS ' + (hasError ? ' has-error ' : '') + (disabled ? 'form-disabled' : '')"
        :size="size"
        :addon-before="addonBefore"
        :addon-after="addonAfter"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
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
        :value="val"
        :suffix="rightText"
        :defaultValue="defaultValue"
        :allow-clear="allowClear"
        @input="valueChanged(castValue($event.target.value))"
        v-on:keyup.enter="$emit('enter-pressed', val); handleEnter()"
        v-on:keypress.ctrl.enter="$emit('ctrl-enter-pressed', val); handleEnter()"
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

    </a-textarea>

    <div class="error-message" v-if="errorMessage">

        {{ errorMessage }}

    </div>

    <a-tooltip placement="right" v-if="helpText">

        <GeneralIcon clss="help-dot" :stle="helpIconStyle" type="solid-input-help-prompt" />

        <template #title>

            <div v-html="helpText" />

        </template>

    </a-tooltip>

</a-form-model-item>
</template>

<script lang="ts">

const CASES = ['camelCase', 'pascalCase', 'pascalCaseWithSpaces', 'kebabCase', 'upperUnderscoreCase'];
const CAST_TYPES = [ 'website-path', 'number' ];

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
		name: String,
        value: {
            required: false,
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
        clearOnEnter: Boolean,
        helpText: {
            type: String,
        },
        inputCase: {
            type: String,
            validator: (value: string) => CASES.includes(value)
        },
        castTo: {
            type: String,
            validator: (value: string) => CAST_TYPES.includes(value)
        },
        helpIconStyle: String,
        rows: {
            type: Number,
            default: 6
        },
        inputStyle: String,
	},
    watch: {
        value(to: any) {
            let self: any = this;

            if (self.value != self.valDummy) {
                self.valDummy = to;
            }
        }
    },
    computed: {
        keyP() {
            let self: any = this;

            if (self.key) return self.key;

            return self.kebabCase(self.name);
        },
        val() : any {
            let self: any = this;

            if (self.value) return self.value;

            return self.valDummy;
        },
        placeholderP: function () {
            let self: any = this;

            if (!self.inlineOver && self.name != '' && self.placeholder != '') return self.name;

            if (typeof self.placeholder !== 'undefined') return self.placeholder;

            return self.name;
        }
    },
    data() {
        return {
            helpPopoverVisible: false,
            valDummy: '',
        }
    },
    methods: {
        handleEnter() {
            let self: any = this;

            if (self.clearOnEnter) {
                self.valueChanged('');
            }
        },
        focus() {
            (this as any).$refs['input'].focus();
        },
        getText() {
            return (this as any).val;
        },
        castValue(value: any) {
            let self: any = this;

            if (typeof self.castTo != 'undefined') {
                switch (self.castTo) {
                    case 'website-path': return self.convertToUrl(value);
                    case 'number': return Number((value ?? '').replace(/[^0-9.-]/g, ''));
                    default: return value;
                }
            }

            return value;
        },
        valueChanged(value: string) {
            let self: any = this;

            if (typeof self.inputCase != 'undefined') {
                self.$emit('input', self[self.inputCase](value));
                return;
            }

            if (self.value) {
                self.$emit('input', value);
            }
            else {
                self.valDummy = value;

                // this could lead to a bug
                self.$emit('input', self.valDummy);
            }

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