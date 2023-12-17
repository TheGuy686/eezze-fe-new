<style lang="less" scoped>

.e-select {
    min-width: 100px;
    width: 200px;
}

.red-border {
    border: 1px solid red;
}

</style>

<template>
<div>
    <a-tooltip placement="top" v-if="toolTipText != ''">

        <template slot="title">

            <span v-html="toolTipText"></span>

        </template>

        <a-select
            :class="clss + ' e-select'"
            :style="eStyle"
            :size="size"
            :placeholder="placeholder"
            :value="value"
            :default-value="defaultValue"
            :disabled="disabled"
            :allow-clear="allowClear"
            @change="handleChange"
        >

            <a-select-option :value="''">

                {{ placeholder }}

            </a-select-option>

            <a-select-option :value="t[keyProp]" :key="i" v-for="(t, i) in optionsP">

                {{ t[valueProp] }}

            </a-select-option>

            <a-select-option value="_eezze_create-and-set" v-if="showCreateAndSet">

                Create New?

            </a-select-option>

        </a-select>

    </a-tooltip>

    <a-select
        :class="clss + ' e-select'"
        :style="eStyle"
        :size="size"
        :placeholder="placeholder"
        :value="value"
        :default-value="defaultValue"
        :disabled="disabled"
        :allow-clear="allowClear"
        @change="handleChange"
        v-else
    >

        <a-select-option :value="''">

            {{ placeholder }}

        </a-select-option>

        <a-select-option :value="t[keyProp]" :key="i" v-for="(t, i) in optionsP">

            <template v-if="optionLabelFormat">

                {{ optionLabelFormat(t[valueProp], t) }}

            </template>

            <template v-else>

                {{ t[valueProp] }}

            </template>

        </a-select-option>

        <a-select-option value="_eezze_create-and-set" v-if="showCreateAndSet">

            Create New?

        </a-select-option>

    </a-select>
</div>
</template>

<script lang="ts">
let self: any;

export default {
    beforeCreate(){self = this},
	props: {
		name: {
			type: String,
            required: true,
		},
        value: {
            required: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Array,
            required: true,
        },
        keyProp: {
            type: String,
            required: true,
        },
        selectFirstByDefault: {
            type: Boolean,
            default: false,
        },
        valueProp: {
            type: String,
            required: true,
        },
        defaultValue: {
            type: String,
        },
        placeholder: {
            type: String,
        },
        size: {
            type: String,
            default: 'default'
        },
        eStyle: {
            type: String,
            default: '',
        },
        clss: {
            type: String,
            default: '',
        },
        ignoreKeys: {
            type: Array,
            default: () => [],
        },
        doDebug: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        allowClear: {
            type: Boolean,
            default: false,
        },
        toolTipText: {
            type: String,
            default: '',
        },
        optionLabelFormat: {
            type: Function,
        },
        showCreateAndSet: {
            type: Boolean,
            default: false,
        },
	},
    watch: {
        value(to: any) {
            if (self.allowClear && !to) {
                self.$emit('select-cleared');
            }
        }
    },
    computed: {
        optionsP() {
            let opts = [];

            if (self.ignoreKeys.length == 0) return [...self.options];

            for (let k in self.options) {
                if (self.ignoreKeys.indexOf(self.options[k][self.keyProp]) >= 0) continue;

                opts.push({...self.options[k]});
            }

            return opts;
        }
    },
    mounted() {
        if (self.doDebug) {
            console.log('DEFAULT: ', self.value, ' : ', self.defaultValue, ' : ', self.optionsP);
        }

        if (self.selectFirstByDefault && !self.value && self.options.length > 0) {
            let options: any[] = Object.values(self.options);
            self.$emit('input', options[0][self.keyProp]);
        }
        else if (self.defaultValue != '' && !self.value) {
            self.$emit('input', self.defaultValue);
        }
    },
    methods: {
        handleChange(value: string | number) {
            if (value == '_eezze_create-and-set') {
                return self.createAndSet();
            }
            self.$emit('input', value);
        },

        createAndSet() {
            self.$emit('create-and-set', (keyValue: string | number) => {
                let o: any;

                for (o of self.options) {
                    if (o[self.keyProp] == keyValue) {
                        self.$emit('input', o[self.keyProp]);
                        break;
                    }
                }
            });
        },
    },
};
</script>
