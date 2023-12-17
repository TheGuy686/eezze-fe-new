<template>
<a-form-model-item :label="name">

    <a-radio-group
        v-decorator="[
            keyP,
            {
                initialValue: defaultValue,
            }
        ]"
        :default-value="defaultValue"
        :value="value"
        :disabled="disabled"
        @change="handleChange"
    >
        <template v-for="(o, i) in options">

            <a-radio :value="o[keyProp]" :key="i" v-if="buttonType == 'dot'">
                
                {{ o[valueProp] }}
                
            </a-radio>

            <a-radio-button :value="o[keyProp]" :key="i" v-else>
                
                {{ o[valueProp] }}
                
            </a-radio-button>

        </template>

    </a-radio-group>

</a-form-model-item>
</template>

<script>
export default {
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
        message: {
            type: String,
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
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        buttonType: {
            type: String,
            default: 'dot'
        }
	},
    computed: {
        keyP() {
            if (this.key) return this.key;

            return kebabCase(this.name);
        }
    },
    methods: {
        handleChange(event) {
            console.log(event.target.value);
            this.$emit('input', event.target.value);
        },
    }
};
</script>
