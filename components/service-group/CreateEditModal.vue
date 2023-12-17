<template>
<EModal
    ref="modal"
    :width="700"
    :title="tr((isEdit ? 'edit' : 'add') + '-service-group')"
    :isLoading="isDoingRequest"
    :rightBtnText="rightBtnText"
    :showBackBtn="currentTabIndex > 0"
    @modal-closed="currentTabIndex = 0"
    @back-btn-clicked="currentTabIndex--"
    @right-btn-clicked="rightBtnClicked()"
>
    <ServiceGroupFormContent v-if="currentTabIndex == 0" />

    <ServiceGroupFormDsDetails v-if="currentTabIndex == 1" />

    <ServiceGroupType v-else-if="currentTabIndex == 2" />

    <ServiceGroupTypes
        :type="entity?.type"
        @show-bl-mdl="openBlPopup"
        v-else-if="currentTabIndex == 3"
    />

    <EFormBlActionChain
        ref="action-chain"
        :prop="editingLogicChain.property"
        type="string"
        :filteredItem="blMdl"
        @save-clicked="saveBlChainClicked"
    />
   
</EModal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        isCustom() {
            return this.entity?.type == 'custom';
        },
        rightBtnText() {
            if ((this.currentTabIndex == 2 && this.isCustom) || this.currentTabIndex > 2) {
                return this.tr('submit');
            }

            return this.tr('next');
        },
        ...mapState('project/service-groups', ['entity', 'isEdit', 'isDoingRequest']),
    },
    watch: {
        blMdl(to) {
            this.editingLogicChain = {...JSON.parse(JSON.stringify(to ?? {}))};
        },
    },
    data() {
        return {
            onCompleteCb: undefined,
            currentTabIndex: 0,
            editingLogicChain: {},
            blSaveCb: null,
            blMdl: {},
        }
    },

	methods: {
        saveBlChainClicked(chain) {
            if (this.blSaveCb && typeof this.blSaveCb == 'function') {
                this.blSaveCb(chain);
            }
        },

        openBlPopup(pl) {
            let self = this;

            this.blMdl = pl.chain;
            this.blSaveCb = function (mdl) {
                pl.successCb(self.blMdl ?? mdl);
            };
            this.$refs['action-chain'].show();
        },

        show(entity, successCb) {
            if (successCb) this.onCompleteCb = successCb;

            if (typeof entity == 'object') {
                if (entity?.type == 'custom') {
                    this.currentTabIndex = 1;
                }
                else this.currentTabIndex = 3;
            }

            this.setNewEditEntity(entity);
            this.$refs['modal'].show();
        },
        rightBtnClicked() {
            if (!this.isCustom && this.currentTabIndex < 3) {
                this.currentTabIndex++;
                return;
            }
            else if (this.currentTabIndex < 2) {
                this.currentTabIndex++;
                return;
            }

            this.$store.dispatch(
                'project/service-groups/createEditEntity',
                {
                    hideModal: (entity) => {
                       if (typeof this.onCompleteCb == 'function') {
                            this.onCompleteCb(entity.key);
                            this.onCompleteCb = undefined;
                        }

                        this.$refs['modal'].hide();

                        this.os(() => {
                            this.$notification.success({
                                placement: 'topRight',
                                message: this.tr('operation-was-successful')
                            });
                        },
                        300);
                    },
                    projectId: this.currentProject,
                }
            );
        },
		...mapMutations({
			setNewEditEntity: 'project/service-groups/setNewEditEntity',
		}),
	}
};
</script>