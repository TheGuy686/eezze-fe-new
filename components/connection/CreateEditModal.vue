<template>
<EModal
    ref="modal"
    :title="tr((isEdit ? 'edit' : 'create') + '-connection') + (currentTabIndex == 2 ? `: ${title}` : '')"
    :width="700"
    :isLoading="isDoingRequest"
    :shouldDisableRightBtn="!shouldShowNext"
    :showBackBtn="currentTabIndex > 0"
    :rightBtnText="tr(currentTabIndex < 2 ? 'next' : 'save')"
    :footerMessage="hoveringItemComingSoon ? tr('feature-coming-soon') : ''"
    @back-btn-clicked="currentTabIndex--"
    @right-btn-clicked="rightBtnClicked"
    @modal-closed="os(() => currentTabIndex = 0, 200)"
>
    <ConnectionFormContent v-if="currentTabIndex == 0" />

    <ConnectionFormTypeContent
        v-model="hoveringItemComingSoon"
        v-if="currentTabIndex == 1"
    />

    <ConnectionFormKeyValueItems v-if="currentTabIndex == 2" />

</EModal>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
	computed: {
        ...mapState('project/connections', ['entity', 'isEdit', 'isDoingRequest']),
        step1valid() {
            return this.entity?.name != '';
        },
        step2valid() {
            return this.entity?.type != '';
        },
        title() {
            return this.tr(this.entity?.type);
        },
        shouldShowNext() {
            if (!this.step1valid) return false;
            else {
                if (this.currentTabIndex == 0) return true;
            }

            if (!this.step2valid) return false;
            else {
                if (this.currentTabIndex == 1) return true;
            }

            return true;
        }
    },

	data() {
        return {
            onCompleteCb: undefined,
            currentTabIndex: 0,
            hoveringItemComingSoon: false,
        }
    },

	methods: {
        rightBtnClicked() {
            if (this.currentTabIndex == 2) {
                this.$store.dispatch(
                    'project/connections/createEditEntity',
                    {
                        hideModal: (entity) => {
                            if (typeof onCompleteCb == 'function') {
                                onCompleteCb(entity.key);
                                onCompleteCb = undefined;
                            }

                            this.$refs['modal'].hide();

                            this.os(() => {
                                    this.$notification.success({
                                        placement: 'topRight',
                                        message: tr('operation-successful'),
                                        description: tr('entity-operation-was-successful'),
                                    });
                                },
                                300
                            );
                        },
                        projectId: this.$route.params.id,
                    }
                );
            }
            else this.currentTabIndex++;
        },
        show(entity, successCb) {
            let self = this;
            if (successCb) self.onCompleteCb = successCb;
            self.setNewEditEntity(entity);

            if (!self.isEdit) {
                this.setEntityProp({ key: 'name',  value: '' });
                this.setEntityProp({ key: 'description',  value: '' });
                this.setEntityProp({ key: 'type',  value: 'server' });
                this.setEntityProp({ key: 'metadata',  value: {} });

                this.currentTabIndex = 0;
            }
            else {
                this.currentTabIndex = 2;
            }

            self.$refs['modal'].show();
        },
		...mapMutations({
			setNewEditEntity: 'project/connections/setNewEditEntity',
            setEntityProp: 'project/connections/setEntityProp',
		}),
	},
};

</script>