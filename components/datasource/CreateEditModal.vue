<template>
<!-- :dialogStyle="{ top: '50px'}" -->
<EModal
    ref="modal"
    :width="800"
    :title="title"
    :isLoading="isDoingRequest"
    :shouldDisableRightBtn="shouldDisableRightBtn"
    :showBackBtn="currentIndex > 0"
    :rightBtnText="rightBtnText"
    @modal-closed="currentIndex = 0; isConnOverride = false;"
    @right-btn-clicked="confirmBtnClicked"
    @back-btn-clicked="$refs['content'].carouselPrevious()"
>
    <DatasourceFormContent
        ref="content"
        :initIndex="currentIndex"
        :isConnOverride="isConnOverride"
        v-model="hasSelectedType"
        @index-changed="currentIndex = $event"
        @inner-form-validity-changed="innerFormValid = $event"
    />

</EModal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	computed: {
        ...mapState('project/data-sources', [ 'entity', 'isEdit', 'isDoingRequest' ]),
        shouldDisableRightBtn() {
            if (this.currentIndex == 0 && !this.hasSelectedType) return true;

            // if (this.currentIndex == 1 && !this.innerFormValid) return true;
            return false;
        },
        rightBtnText() {
            if (!this.hasSelectedType || this.currentIndex < 2) return this.tr('next');
            return this.tr('submit');
        },
        title() {
            if (this.currentIndex == 0) return this.tr('select-a-ds-type');
            if (this.currentIndex == 1) return this.tr('select-connection');
            
            if (this.isEdit) return this.tr('edit-datasource');

            return this.tr('add-ds-btn', {
                args: [
                    tr(this.$refs['content']?.currentSel)
                ]
            });
        },
    },
    data() {return {
        onCompleteCb: undefined,
        hasSelectedType: false,
        currentIndex: 0,
        innerFormValid: false,
        isConnOverride: false,
    }},
	methods: {
        show(entity, successCb, connection) {
            if (successCb) this.onCompleteCb = successCb;

            this.setNewEditEntity(entity);

            if (this.isEdit) {
                this.currentIndex = 2;
            }

            if (connection) {
                this.setEntityProp({
                    key: 'metadata',
                    value: {
                            connection: connection.id
                        }
                    }
                );

                this.isConnOverride = true;
            }

            setTimeout(() => {

                if (this.isEdit) {
                    this.$refs['content'].setIndex(this.currentIndex);  
                }

            }, 2);

            this.$refs['modal'].show()
        },
        confirmBtnClicked() {
            if (!this.hasSelectedType || this.currentIndex == 0) {

                if (!this.isEdit) {
                    this.setEntityProp({ key: 'metadata', value: {} });
                }

                this.$refs['content'].selectDatasource();
                return;
            }

            if (this.currentIndex == 1) {
                this.$refs['content'].selectConnection();
                return;
            }

            this.$store.dispatch(
                'project/data-sources/createEditEntity',
                {
                    hideModal: (entity) => {
                        this.$refs['modal'].hide();

                        this.os(
                            () => this.$notification.success({
                                placement: 'topRight',
                                message: this.tr('operation-was-successful'),
                            }),
                            300
                        );
                    },
                    projectId: this.$route.params.id,
                }
            );
        },

		...mapMutations({
			setNewEditEntity: 'project/data-sources/setNewEditEntity',
            setEntityProp: 'project/data-sources/setEntityProp',
		})
	}
};
</script>