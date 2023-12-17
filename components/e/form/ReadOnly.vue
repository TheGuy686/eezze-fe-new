<style lang="less" scoped>

.read-only-root {
    .overhead-floating {

        .floating-label {
            margin-bottom: 5px;
        }

        .bottom-label {
            margin-top: 5px;
            margin-left: 5px;
        }
    }
}

</style>

<template>
<a-form-model-item :label="name" class="form-input read-only-root" :style="eStyle">

    <a-col class="overhead-floating" v-if="theme == 'default'">

        <h3 class="floating-label">{{ name }}</h3>

        <b><span class="bottom-label" v-html="value"></span></b>

    </a-col>

    <a-row class="inline" v-else>

        <h3>{{ name }}</h3>

        <b><span v-html="value"></span></b>

    </a-row>

</a-form-model-item>
</template>

<script>
export default {
	props: {
        size: {
            type: String,
            default: 'default',
        },
        eStyle: {
            type: String,
            default: '',
        },
		name: {
			type: String,
            required: true,
            default: '',
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
        addonBefore: {
            type: String,
        },
        theme: {
            type: String,
            default: () => 'default'
        }
	},
    computed: {
        keyP() {
            if (this.key) return this.key;

            return kebabCase(this.name);
        }
    },
};
</script>
