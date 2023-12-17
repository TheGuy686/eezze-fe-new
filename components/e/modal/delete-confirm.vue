<template>
<EModal 
    ref="mdl-delete" 
    title="Delete Confirm"
    left-btn-text="Cancel"
    right-btn-text="Confirm"
    :is-loading="isDoingDeleteRequest"
    ver-center
    @right-btn-clicked="$emit('action-delete-confirmed', () => {
        $refs['mdl-delete'].hide();

        os(
            () => {
                $notification.success(
                    {
                        placement: 'topRight',
                        message: 'Delete Successful',
                        description: 'Entity was successfully deleted',
                    }
                );
            },
            300
        );
    })"
>
    <a-row ver-center>

        <a-icon type="warning" class="route-icon-cont" />

        Are you sure you would like to delete this item?

    </a-row>

</EModal>
</template>

<script>
export default {
	props: {
        isDoingDeleteRequest: {
            type: Boolean,
            default: false,
        }
    },

	data() {
		return {visible: false};
	},

    methods: {
        show() {this.$refs['mdl-delete'].show()},
        hide() {this.$refs['mdl-delete'].hide()},
    },
};
</script>

<style lang="less" scoped>

.route-icon-cont {
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: orangered;
	color: white;
	font-size: 28px;
	border-radius: 25px;
	margin-right: 20px;

	svg {
		margin-top: -3px;
	}
}
</style>