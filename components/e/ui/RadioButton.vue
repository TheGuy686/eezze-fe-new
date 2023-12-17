<style lang="less" scoped>

.e-rb-group-title {
    margin-bottom: 10px;
    color: rgba(0,0,0,.85);
    font-weight: 700;
    font-size: 16px;
    line-height: 1.5;
}

</style>

<template>
<div>

    <h3 class="e-rb-group-title">{{ name }}</h3>

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
        <a-radio :value="o[keyProp]" :key="i" v-for="(o, i) in options">
            
            {{ o[valueProp] }}
            
        </a-radio>

    </a-radio-group>

</div>
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
        disabled: {
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
	},
    computed: {
        keyP() {
            if (this.key) return this.key;

            return kebabCase(this.name);
        }
    },
    methods: {
        handleChange(event) {
            this.$emit('input', event.target.value);
        },
    }
};
</script>
