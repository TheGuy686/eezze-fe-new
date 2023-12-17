<template>
<a-select
    :style="eStyle + ';width: 100%;'"
    :size="size"
    mode="multiple"
    :placeholder="placeholder"
    :value="value"
    style=""
    :disabled="disabled"
    :allow-clear="allowClear"
    :default-value="defaultValue"
    @change="handleChange"
>
    <a-select-option :value="t[keyProp]" :key="i" v-for="(t, i) in filteredOptions" @click="handleClick(i, t)">

        {{ t[valueProp] }}

    </a-select-option>

</a-select>
</template>

<script lang="ts">
let self: any;

export default {
    beforeCreate(){self = this},
	props: {
        size: {
            type: String,
            default: 'default'
        },
        eStyle: {
            type: String,
            default: '',
        },
		name: {
			type: String,
            required: true,
		},
        value: {},
        required: {
            type: Boolean,
            default: true,
        },
        options: {
            type: Array,
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
        selectFirstByDefault: {
            type: Boolean,
            default: false,
        },
        tokenSeparators: {
            type: Array,
        },
        mode: {type: String},
        disabled: {
            type: Boolean,
            default: false,
        },
        allowClear: {
            type: Boolean,
            default: false,
        },
	},
    computed: {
        filteredOptions() {
            return self.options.filter((o: any) => !self.selectedItems.includes(o[self.keyProp]));
        },
    },
    data() {
        return {
            selectedItems: [],
        };
    },
    methods: {
        handleChange(value: any) {
            self.selectedItems = value;
            self.$emit('input', value);
        },
        handleClick(index: number, option: any) {
            //console.log(index, ' : ', option);
            // this.$emit('option-selected', {
            //     index, 
            //     option,
            //     value: option[this.keyProp]
            // });
        },
    }
};
</script>
