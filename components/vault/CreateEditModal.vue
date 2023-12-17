<template>
<EModal
    ref="modal"
    :width="1200"
    :title="tr((isEdit ? 'edit' : 'create') + '-vault-entry')"
    :showBackBtn="tabIndex > 0"
    :isLoading="isDoingRequest"
    :shouldDisableRightBtn="!formIsValid"
    :rightBtnText="tr(tabIndex == 0? 'next' : 'submit')"
    @back-btn-clicked="tabIndex--"
    @right-btn-clicked="rightBtnClicked()"
    @modal-closed="os(() => tabIndex = 0, 200)"
>

    <VaultFormContent :tabIndex="tabIndex" />

</EModal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	computed: {
        ...mapState('project/vault', ['entity', 'isEdit', 'isDoingRequest']),

        formIsValid() {
            if (!this.entity?.name || this.entity?.name == '') return false;
            if (!this.entity?.description || this.entity?.description == '') return false;
            return true;
        },
    },

	data() {
        return {
            onCompleteCb: undefined,
            tabIndex: 0,
        }
    },

	methods: {
        show(entity, successCb) {
            if (successCb) this.onCompleteCb = successCb;
            this.setNewEditEntity(entity);
            if (this.isEdit) this.tabIndex = 1;
            this.$refs['modal'].show();
        },
        rightBtnClicked() {
            if (this.tabIndex > 0) {
                this.$store.dispatch(
                    'project/vault/createEditEntity',
                    {
                        hideModal: (entity) => {
                            if (typeof this.onCompleteCb == 'function') {
                                this.onCompleteCb(entity.key);
                                this.onCompleteCb = undefined;
                            }

                            this.$refs['modal'].hide();

                            this.tabIndex = 0;

                            this.os(
                                () => {
                                    this.$notification.success({
                                        placement: 'topRight',
                                        message: this.tr('operation-successful'),
                                        description: this.tr('entity-operation-was-successful'),
                                    });
                                },
                                300
                            );
                        },
                        projectId: this.currentProject,
                    }
                );
                return;
            }

            this.tabIndex++;
        },
		...mapMutations({
			setNewEditEntity: 'project/vault/setNewEditEntity'
		}),
	},
};

</script>