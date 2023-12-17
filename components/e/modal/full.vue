<style lang="less" scoped>
.full-modal {
    .ant-modal {
        height: 97% !important;
    }
}

.back-arrow {
	position: absolute;
	left: 8px;
	top: -45px;
	cursor: pointer;
}
</style>

<template>
<a-modal
    ref="mdl"
    class=""
    v-model="visible"
    :style="{height: '97% !important'}"
    :wrapClassName="'full-modal ' + clss"
    width="100%"
    :destroy-on-close="true"
    :title="title"
    :dialog-style="dialogStyle"
    :body-style="{'position': 'relative'}"
    :footer="null"
    :closable="closable"
    @cancel="() => {
        $emit('modal-closed');
        hide();
    }"
    @ok="$emit('modal-closed')"
>
    <GeneralIcon
		class="back-arrow"
		type="back"
		v-if="showBackBtn"
		@click="$emit('back-btn-clicked')"
	/>

    <slot></slot>

</a-modal>
</template>

<script>
export default {
    props: {
        clss: String,
        closable: {
            type: Boolean,
            default: true,
        },
        showBackBtn: {
			type: Boolean,
			default: false,
		},
        title: {
            type: String,
            default: tr('model')
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
        leftBtnText: {
            type: String,
            default: tr('close')
        },
        rightBtnText: {
            type: String,
            default: tr('submit')
        },
        dialogStyle: {
            type: Object,
            default: () => ({
                width: '97% !important;',
                height: '97% !important;',
            }),
        },
        showFooter: {
            type: Boolean,
            default: true,
        },
        footer: {
            type: [Object],
            default: () => { }
        },
    },

    data() { return { visible: false } },

    watch: {
        visible(to, from) {
            if (!to) {
                this.$emit('modal-closed');
            }
        }
    },

    methods: {
        show() { this.visible = true },
        hide() { this.visible = false },

        handleOk(e) {
            this.$emit(
                'right-btn-clicked',
                () => setTimeout(
                    this.hide(),
                    1700
                )
            );
        },
        handleCancel(e) { this.hide() },
    },
};
</script>