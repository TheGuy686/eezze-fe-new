<style lang="less" scoped>

.ui-readonly {
    vertical-align: middle;
    text-align: left;
    min-width: 100px;
}

</style>

<template>
<div class="ui-readonly" :style="eStyle">
    <span :label="name">

        {{ value }}

    </span>
</div>
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
