<style lang="less">
.delete-modal-root {
    padding-left: 15px;
    padding-right: 15px;

    .info {
        font-weight: 400;
        font-size: 12px;
        color: #4F4F4F;
        margin-bottom: 15px;
    }

    .title {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 15px;
    }

    .warn-alert { margin-bottom: 15px; }
}
</style>

<template>
<EModal
    ref="modal"
    :width="400"
    :title="tr('delete-project')"
    :isLoading="isDoingRequest"
    :shouldDisableRightBtn="!deleteConfirm"
    @right-btn-clicked="rightBtnClicked"
>
    <div class="delete-modal-root">

        <ProjectDeleteContent @delete-confim-changed="deleteConfirmedText = $event" />

    </div>

</EModal>
</template>

<script lang="ts">
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('project/proj' , [ 'entity' ]),

        deleteConfirm() { return (this as any).deleteConfirmedText == 'DELETE PROJECT' },
    },

    data() {
        return {
            onCompleteCb: undefined,
            isDoingRequest: false,
            isEdit: false,
            deleteConfirmedText: '',
        }
    },

	methods: {
        rightBtnClicked() {
            let self: any = this;

            console.log('Delete project');
        },

        show (entity: any, successCb?: Function) {
            let self: any = this;

            self.deleteConfirmed = '';

            // self.propsSyncTmr();

            // if (successCb) self.onCompleteCb = successCb;
            // self.setNewEditEntity(entity);
            self.$refs['modal'].show();
        },

        hide () {
            let self: any = this;

            // if (typeof self.onCompleteCb == 'function') {
            //     self.onCompleteCb(self.entity.key);
            //     self.onCompleteCb = undefined;
            // }

            self.$refs['modal'].hide();

            // self.os(
            //     () => {
            //         self.$notification.success({
            //             placement: 'topRight',
            //             message: self.tr('operation-was-successful')
            //         });
            //     },
            //     300
            // );
        },
	}
};
</script>