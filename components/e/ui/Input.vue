<template>
<a-input
    :style="eStyle + (hasError ? 'border: 1px solid red; border-radius: 5px;' : '')"
    :class="clss"
    :size="size"
    :addon-before="addonBefore"
    :addon-after="addonAfter"
    :disabled="disabled"
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
    :value="value"
    :allow-clear="allowClear"
    @input="$emit('input', $event.target.value)"
/>
</template>

<script>
export default {
	props: {
        size: {
            type: String,
            default: 'default',
        },
		name: {
			type: String,
            default: '',
		},
        hasError: {
            type: Boolean,
            default: false,
        },
        value: {
            required: true,
        },
        eStyle: {
            type: String,
            default: '',
        },
        clss: {
            type: String,
            default: '',
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
        disabled: {
            type: Boolean,
            default: false,
        },
        allowClear: {
            type: Boolean,
            default: false,
        },
	},
    
    mounted() {this.$emit('mounted')},

    computed: {
        keyP() {
            if (this.key) return this.key;

            return this.kebabCase(self?.name ?? '');
        },
    },
};
</script>
