<template>

    <a-checkbox
        :style="eStyle"
        :name="name"
        :value="value"
        :checked="isChecked"
        :true-value="true"
        :false-value="false"
        :disabled="disabled"
        @input="inputChange"
    >
        {{ !hideLabel ? name : '' }}

    </a-checkbox>

</template>

<script>

export default {
	props: {
        eStyle: {
            type: String,
            default: '',
        },
		name: {
			type: String,
            required: true,
		},
        value: {
            required: true,
        },
        trueValue: {
            required: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
        defaultValue: {
            type: Boolean,
            default: false,
        },
        hideLabel: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        }
	},
    computed: {
        isChecked() {
            return this.value === this.trueValue;
        },
    },
    methods: {
        inputChange(state) {
            this.$emit('input', state);
        }
    }
};
</script>
