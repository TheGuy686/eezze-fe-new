<template>
<a-form-model-item :label="name + (required ? ' *' : '')" class="form-input" :style="eStyle">

    <a-select
        mode="multiple"
        :placeholder="placeholder"
        :value="value"
        style="width: 100%"
        :disabled="disabled"
        :allow-clear="allowClear"
        @change="handleChange"
    >
        <a-select-option :value="t[keyProp]" :key="i" v-for="(t, i) in filteredOptions" @click="handleClick(i, t)">

            {{ t[valueProp] }}

        </a-select-option>

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
            let self: any = this;

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
            let self: any = this;

            self.selectedItems = value;

            self.$emit('input', value);
        },
        handleClick(index: any, option: any) {
            let self: any = this;

            console.log(index, ' : ', option);

            self.$emit('option-selected', {
                index, 
                option,
                value: option[self.keyProp]
            });
        },
    }
};
</script>
