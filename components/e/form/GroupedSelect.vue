<style lang="less">

.tooltip-title {
    color: white;
}
</style>

<template>
<a-form-model-item
    :label="name + (required && name != ''? ' *' : '')" 
    :class="'group-select-root ' + selectWrapperClass"
>
    <a-select
        :placeholder="placeholder"
        :value="value"
        :default-value="defaultValue"
        :style="eStyle"
        :show-search="showSearch"
        :not-found-content="null"
        :filter-option="filterOption"
        @search="handleSearch"
        @change="handleChange"
    >
        <a-select-option :value="''">

            {{ placeholder }}

        </a-select-option>

        <a-select-opt-group :key="i" v-for="(g, i) in groups">

            <span slot="label">
                
                <!-- <a-icon type="user" /> -->
                
                {{ g[groupValueProp] }}

            </span>

            <a-select-option 
                :value="t[keyProp]" 
                :key="ii" 
                v-for="(t, ii) in options(g)"
                @click="handleClick(ii, t, g)"
            >
                <a-tooltip placement="right" v-if="toolTipTextKey != ''">

                    <template slot="title">

                        <h3 class="tooltip-title" v-html="labelFormatter ? labelFormatter(t[valueProp], t) : t[valueProp]"></h3>

                        <span v-html="t[toolTipTextKey]"></span>

                    </template>

                    <span v-html="labelFormatter ? labelFormatter(t[valueProp], t) : t[valueProp]"></span>

                </a-tooltip>

                <span v-html="labelFormatter ? labelFormatter(t[valueProp], t) : t[valueProp]" v-else></span>

            </a-select-option>

        </a-select-opt-group>

    </a-select>

</a-form-model-item>
</template>

<script lang="ts">

let self: any;

export default {
    beforeCreate() {self = this},
	props: {
        eStyle: {
            type: String,
            default: '',
        },
		name: {
			type: String,
            default: '',
		},
        value: {
            required: true,
        },
        required: {
            type: Boolean,
            default: true,
        },
        groups: {
            type: Array,
            required: true,
        },
        groupKeyProp: {
            type: String,
            required: true,
        },
        groupValueProp: {
            type: String,
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
        ignoreGroupKeys: {
            type: Array,
            default: () => [],
        },
        ignoreKeys: {
            type: Array,
            default: () => [],
        },
        selectFirstByDefault: {
            type: Boolean,
            default: false,
        },
        toolTipTextKey: {
            type: String,
            default: '',
        },
        groupOptionsKey: {
            type: String,
            default: 'options'
        },
        selectWrapperClass: {
            type: String,
            default: 'form-input'
        },
        labelFormatter: {
            type: Function,
        },
        // :default-active-first-option="false" // check this out
        showSearch: {
            type: Boolean,
            default: false,
        },
        filterOption: {}
	},
    computed: {
        keyP() {
            let self: any = this;
            if (self.key) return self.key;

            return self.kebabCase(self.name);
        },
        options() {
            return (group: any) => {

                if (typeof self.ignoreGroupKeys != 'undefined' && self.ignoreGroupKeys.length > 0) {
                    if (self.ignoreGroupKeys.includes(group[self.groupKeyProp])) {
                        return [];
                    }
                }

                let opts = [];

                if (self.ignoreKeys.length == 0) {
                    let out = [...group[self.groupOptionsKey]];

                    return out;
                }

                for (let k in group[self.groupOptionsKey]) {
                    if (self.ignoreKeys.indexOf(group[self.groupOptionsKey][k][self.keyProp]) >= 0) continue;

                    opts.push({...group[self.groupOptionsKey][k]});
                }

                return opts;
            }
        },
    },
    data() {
        return {search: ''};
    },
    mounted() {
        if (self.selectFirstByDefault && !self.value && self.groups.length > 0) {
            try {
                let group: any = Object.values(self.groups)[0];
                let option = group['options'][0];

                self.$emit('input', option[self.keyProp]);

                self.handleClick(0, option, group);
                self.handleChange(option[self.keyProp]);
            }
            catch (e: any) {
                console.log('ERROR: ', e.mesesage);
            }
        }
        else if (self.defaultValue != '' && !self.value) {
            self.$emit('input', self.defaultValue);
        }
    },
    methods: {
        shouldIgnoreSearchItem(option: any) {
            console.log('getting to her');
        },
        handleChange(value: any) {self.$emit('input', value)},

        handleClick(index: number, option: any, group: any) {
            self.$emit('option-selected', {
                index, 
                option,
                group: group,
                value: option[self.keyProp]
            });
        },

        handleSearch(value: string) {self.search = value},
    }
};
</script>
