<template>
<EModal
    ref="modal"
    :title="tr((isEdit ? 'edit' : 'create') + '-bl-action-response-type')"
    :isLoading="isDoingRequest"
    @right-btn-clicked="() => {
        $store.dispatch(
            'cms/bl-action-response-types/createEditEntity',
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

        <BlActionResponseTypeFormContent />

    </a-col>

</EModal>
</template>

<script lang="ts">
import {mapState, mapMutations} from 'vuex';

export default {
	computed: {
        ...mapState('cms/bl-action-response-types', ['entity', 'isEdit', 'isDoingRequest']),
    },

	data() {
        return {
            onCompleteCb: undefined
        }
    },

	methods: {
        show(entity: any, successCb?: Function) {
            let self: any = this;
            if (successCb) self.onCompleteCb = successCb;
            self.setNewEditEntity(entity);
            self.$refs['modal'].show();
        },
		...mapMutations({
			setNewEditEntity: 'cms/bl-action-response-types/setNewEditEntity'
		}),
	},
};

</script>