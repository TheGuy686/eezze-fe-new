<template>
<EModal
    ref="modal"
    :title="(isEdit ? 'Edit' : 'Create') + ' Response Code'"
    :isLoading="isDoingRequest"
    @right-btn-clicked="() => {
        $store.dispatch(
            'project/response-codes/createEditEntity',
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
                                    description: tr('entity-opperation-was-successful'),
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

        <ResponsecodeFormContent />

    </a-col>

</EModal>
</template>

<script lang="ts">
import {mapState, mapMutations} from 'vuex';

let self: any;

export default {
    beforeCreate() {self = this},
	computed: {
        ...mapState('project/general/forms', ['formLayout']),
        ...mapState('project/response-codes', ['entity', 'isEdit', 'isDoingRequest']),
    },

	data() {
        return {
            onCompleteCb: undefined
        }
    },

	methods: {
        show(entity: any, successCb?: Function) {
            if (successCb) self.onCompleteCb = successCb;
            self.setNewEditEntity(entity);
            self.$refs['modal'].show();
        },
		...mapMutations({
			setNewEditEntity: 'project/response-codes/setNewEditEntity'
		}),
	},
};

</script>