<template>
<EModal
    ref="modal"
    :title="tr((isEdit ? 'edit' : 'create') + '-value-store')"
    :isLoading="isDoingRequest"
    @right-btn-clicked="() => {
        $store.dispatch(
            'project/value-store/createEditEntity',
            {
                hideModal: (entity) => {
                    if (typeof onCompleteCb == 'function') {
                        onCompleteCb(entity.key);
                        onCompleteCb = undefined;
                    }

                    $refs['modal'].hide();

                    os(
                        () => {
                            $notification.success(
                                {
                                    placement: 'topRight',
                                    message: tr('operation-successful'),
                                    description: tr('entity-operation-was-successful'),
                                }
                            );
                        },
                        300
                    );
                },
                projectId: currentProject,
            }
        );
    }"
>

    <a-col>

        <ValueStoreFormContent />

    </a-col>

</EModal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	computed: {
        ...mapState('project/value-store', ['entity', 'isEdit', 'isDoingRequest']),
    },

	data() {return {onCompleteCb: undefined}},

	methods: {
        show(entity, successCb) {
            if (successCb) this.onCompleteCb = successCb;
            this.setNewEditEntity(entity);
            this.$refs['modal'].show();
        },
		...mapMutations({
			setNewEditEntity: 'project/value-store/setNewEditEntity'
		}),
	},
};

</script>