<style lang="less">
.eezze-select {
    min-width: 150px;
    margin-bottom: 5px;
    position: relative;

    .left-icon {
        display: flex;
        position: absolute;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 35px;
        left: 0;
        top: 0;
        bottom: 0;
    }

    .has-icon {
        .ant-select-selection {
            padding-left: 18px !important;
        }
    }
}

.form-input {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
}

.ant-select-selection--single {
    position: relative;
    height: 40px;
    cursor: pointer;
}
</style>

<template>
<a-form-model-item
    class="eezze-select form-input"
    :style="eStyle"
    :validate-status="validateStatus"
    :help="helpMessage"
>
    <h3 v-if="!inlineOver" non-sel>

        {{ name + (required ? ' *' : '') }}

    </h3>

    <a-tooltip placement="right" v-if="toolTipText != ''">

        <template slot="title">

            <span v-html="toolTipText"></span>

        </template>

        <a-select
            :class="(highlightOnHasValue && hasValue ? 'primary-border' : '') + ' ' + (leftIcon ? 'has-icon' : '')"
            :style="'width: 100%;' + (highlightOnHasValue && hasValue ? 'border-radius: 5px;' : '')"
            :placeholder="placeholder"
            :default-value="defaultValue"
            :token-separators="tokenSeparators"
            :mode="mode"
            :disabled="disabled"
            :allow-clear="allowClear"
            v-model="mdlVal"
        >
            <template v-if="rightIcon" #suffixIcon>

                <GeneralIcon :type="rightIcon" />

            </template>

            <a-select-option :value="''">

                {{ placeholder }}

            </a-select-option>

            <a-select-option :value="t[keyProp]" :key="i" v-for="(t, i) in optionsP">

                {{ labelFormatter ? labelFormatter(t[valueProp], t) : t[valueProp] }}

            </a-select-option>

            <a-select-option value="_eezze_create-and-set" v-if="showCreateAndSet">

                {{ tr('create-new') }}

            </a-select-option>

        </a-select>

    </a-tooltip>

    <a-select
        :id="name"
        :class="(highlightOnHasValue && hasValue ? 'primary-border' : '') + ' ' + (leftIcon ? 'has-icon' : '')"
        :style="'width: 100%;' + (highlightOnHasValue && hasValue ? 'border-radius: 5px;' : '')"
        :placeholder="placeholder"
        :default-value="defaultValue"
        :token-separators="tokenSeparators"
        :mode="mode"
        :disabled="disabled"
        :allow-clear="allowClear"
        :filter-option="filterOption"
        v-model="mdlVal"
        has-feedback
        show-search
        v-else
    >
        <template v-if="rightIcon" #suffixIcon>

            <GeneralIcon :type="rightIcon" />

        </template>

        <!-- <a-select-option :value="''">

            {{ placeholder }}

        </a-select-option> -->

        <a-select-option :value="t[keyProp]" :key="i" v-for="(t, i) in optionsP">

            {{ labelFormatter ? labelFormatter(t[valueProp], t) : t[valueProp] }}

        </a-select-option>

        <a-select-option value="_eezze_create-and-set" v-if="showCreateAndSet">

            {{ tr('create-new') }}

        </a-select-option>

    </a-select>

    <div class="left-icon" :style="leftIconContStyle + `${!inlineOver ? '; margin-top: 25px;' : ''}`" v-if="leftIcon">

        <GeneralIcon :type="leftIcon" />

    </div>

</a-form-model-item>
</template>

<script>
import { generateRandomString } from '~/classes/libs/string';

export default {
	props: {
        eStyle: {
            type: String,
            default: '',
        },
		name: {
			type: String,
            required: true,
            default: () => generateRandomString(12)
		},
        doDebug: Boolean,
        leftIcon: String,
        rightIcon: String,
        leftIconContStyle: String,
        value: {},
        required: {
            type: Boolean,
            default: false,
        },
        options: {
            // type: Array,
            required: true,
        },
        keyProp: {
            type: String,
            required: true,
        },
        valueProp: {
            type: String,
            required: true,
        },
        defaultValue: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
        },
        ignoreKeys: {
            type: Array,
            default: () => [],
        },
        selectFirstByDefault: {
            type: Boolean,
            default: false,
        },
        tokenSeparators: {
            type: Array,
        },
        mode: {
            type: String,
        },
        validateStatus: {
            type: String,
            default: '',
        },
        helpMessage: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        toolTipText: {
            type: String,
            default: '',
        },
        allowClear: {
            type: Boolean,
            default: true,
        },
        showCreateAndSet: {
            type: Boolean,
            default: false,
        },
        labelFormatter: {
            type: Function,
        },
        showSearch: {
            type: Boolean,
            default: false,
        },
        inlineOver: {
            type: Boolean,
            default: false
        },
        highlightOnHasValue: {
            type: Boolean,
            default: false,
        },
        includeOption: {
            type: Function,
        },
        src: String,
	},
    watch: {
        value(to) {
            if (to == this.mdlVal) return;

            this.mdlVal = typeof to != 'undefined' ? to : undefined;
        },
        mdlVal(to) {
            try {
                if (to == undefined) {
                    if (this.allowClear && this.mounted) {
                        this.$emit('input', undefined);
                        this.$emit('select-cleared');
                    }
                    return;
                }

                this.$emit('input', to == undefined ? undefined : to);

                if (this.allowClear && !to) {
                    this.$emit('input', undefined);
                    this.$emit('select-cleared');
                }

                this.handleClick();
            }
            catch (err) {
                console.log(`Select.watch.mdlVal: `, err);
            }
        },
        currentSelectedItem(to) {
            if (typeof this.currentSelectedItem.option[this.keyProp] === 'undefined') {
                return;
                console.warn(`EFormSelect: Option didn't have target key "${this.keyProp}"`);
                console.warn(`Available keys: "${Object.keys(this.currentSelectedItem.option).join(', ')}"`);
                console.log('this.currentSelectedItem.option: ', this.currentSelectedItem.option);
            
                if (this.doDebug) {
                    console.log('The src of your error is: ', this.src, this.name, this);
                }
            }

            if (this.mdlVal == '_eezze_create-and-set') return this.createAndSet();

            this.$emit('current-option-changed', to);
        }
    },
    beforeMount() {
        this.mdlVal = this.value ?? undefined;
    },
    computed: {
        hasValue() {
            if (typeof this.value == 'object') {
                return Object.keys(this.value).length > 0;
            }

            return this.value != null && this.value != undefined && this.value != '';
        },
        optionsP() {
            try {
                if (typeof this.options !== 'object') return [];

                const opts = Object.values(this.options);

                if (this.ignoreKeys.length == 0) return opts;

                return opts.filter((opt) => {
                    const incOpt = this?.includeOption;

                    if (typeof incOpt == 'function' && !incOpt(opt)) return false;
                    if (this.ignoreKeys.includes(opt[this.keyProp]) >= 0) return false;

                    return true;
                });
            }
            catch (err) {
                console.clear();
                console.log('Select.Options P error: ', err);
                return [];
            }
        },
        currentSelectedItem() {
            let defOut = { index: -1, option: {} };

            // if (this.doDebug) {
            //     console.log(' --------------------------------------------------------------- ');
            //     console.log('                                                  ');
            //     console.log('                                                  ');
            //     console.log('                                                  ');
            //     console.log('currentSelectedItem.this.value: ', this.value);
            //     console.log('                                                  ');
            //     console.log('                                                  ');
            //     console.log('                                                  ');
            // }

            try {
                for (let k in this.options) {
                    const opt = this.options[k];

                    if (this.doDebug) console.log('Select.currentSelectedItem.options loop: OPT: ', opt, this.mdlVal, ' : ', this.value);

                    if (opt[this.keyProp] != this.mdlVal) continue;

                    return { index: k, option: opt };
                }

                return defOut;
            }
            catch (e) { return defOut }
        },
    },
    data() {return { mdlVal: undefined, mounted: false }},
    mounted() {
        setTimeout(() => this.mounted = true, 100);

        // this will only run if selectFirstByDefault is true and there is options and
        // there is no value already pre selected
        if (this.selectFirstByDefault && !this.value && Object.keys(this.options).length > 0) {
            let option = Object.values(this.options)[0];

            if (this.doDebug) {
                console.log('                                       ');
                console.log('                                       ');
                console.log('                                       ');
                console.log('Select mounted if: Option: ', option);
                console.log('Select mounted if: Inputted / Vmodel changed to: ', this.keyProp, ' : ', option[this.keyProp]);
                console.log('                                       ');
                console.log('                                       ');
                console.log('                                       ');
            }

            this.mdlVal = typeof option[this.keyProp] != 'undefined' ? option[this.keyProp] : undefined;
        }
        // this will only run if there is a default value and no value
        else if (this.defaultValue != '' && !this.value) {
            if (this.doDebug) {
                console.log('Select mounted else if 1: Inputted / Vmodel changed to: ', this.defaultValue);
            }

            this.mdlVal = typeof this.defaultValue != 'undefined' ? this.defaultValue : undefined;
        }
        // this should only happen if there is a value
        else if (this.value) {
            const option = this.currentSelectedItem.option;

            if (this.doDebug) {
                console.log('Select mounted else if 2: option[this.keyProp]: ', option, ' : ',  option[this.keyProp]);
            }

            this.mdlVal = typeof option?.[this.keyProp] != 'undefined' ? option[this.keyProp] : undefined;
        }
        else {
            if (this.doDebug) {
                console.log('Select mounted else: ', typeof this.value), `"${this.value}"`;
            }
        }
    },
    methods: {
        handleClick() {
            let option = this.currentSelectedItem.option;

            if (option[this.keyProp] == this.value) return;

            this.$emit('option-selected', {
                index: this.currentSelectedItem.index,
                option,
                value: option[this.keyProp]
            });
        },
        createAndSet() {
            this.$emit('create-and-set', (keyValue) => {
                const options = Object.values(this.options);

                for (let o of options) {
                    if (o[this.keyProp] == keyValue) {
                        console.warn('Here we would have done a create and set input so we need to watch this');
                        // this.$emit('input', o[this.keyProp]);
                        break;
                    }
                }
            });
        },
        filterOption(input, option) {
            try {
                const data = this.options[option.key];

                if (typeof data[this.valueProp] === 'undefined') return false;

                const val = data[this.valueProp].toLowerCase(),
                      searchVal = input.toLowerCase();

                return val.indexOf(searchVal) >= 0;
            }
            catch (err) { console.log(err); return true }
        },
    }
};
</script>
