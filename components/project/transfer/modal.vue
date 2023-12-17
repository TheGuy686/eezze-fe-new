<style lang="less">
.transfer-modal-root {
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

    .warn-alert {
        margin-bottom: 15px;
    }
}
</style>

<template>
<EModal
    ref="modal"
    :width="400"
    :title="tr('transfer-a-project')"
    :footerMessage="tr('transfer-steps', {args: [ currentTabIndex + 1, '2']})"
    :isLoading="isDoingRequest"
    :showBackBtn="currentTabIndex > 0"
    :rightBtnText="tr(currentTabIndex < 1 ? 'next' : 'submit')"
    @right-btn-clicked="rightBtnClicked"
    @back-btn-clicked="currentTabIndex--"
>
    <div class="transfer-modal-root">

        <ProjectTransferContInfo v-if="currentTabIndex == 0" />

        <ProjectTransferContToInfo v-else-if="currentTabIndex == 1" />

    </div>

</EModal>
</template>

<script lang="ts">
import { mapMutations, mapState } from 'vuex';

export default {
    computed: {
        ...mapState('project/proj' , [ 'entity' ]),
    },

    data() {
        return {
            onCompleteCb: undefined,
            isDoingRequest: false,
            isEdit: false,

            currentTabIndex: 0,
        }
    },

	methods: {
        rightBtnClicked() {
            let self: any = this;

            if (self.currentTabIndex < 1) {
                self.currentTabIndex++;
            }
            else {
                console.log('DO Transfer');
            }
        },

        show (entity: any, successCb?: Function) {
            let self: any = this;

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