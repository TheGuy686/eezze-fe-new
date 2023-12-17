<template>
<EModal
    ref="modal"
    :title="(isEdit ? 'Edit' : 'Create') + ' Datasource Type'"
    :isLoading="isDoingRequest"
    @right-btn-clicked="() => {
        $store.dispatch(
            'project/datasource-types/createEditEntity',
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
                projectId: this.$route.params.id,
            }
        );
    }"
>

    <a-col>

        <DatasourcetypeFormContent />

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
        ...mapState('project/datasource-types', ['entity', 'isEdit', 'isDoingRequest']),
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
			setNewEditEntity: 'project/datasource-types/setNewEditEntity'
		}),
	},
};

</script>