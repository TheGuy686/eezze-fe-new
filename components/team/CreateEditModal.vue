<template>
<EModal
    ref="modal"
    :title="tr((isEdit ? 'edit' : 'create') + '-team')"
    :isLoading="isDoingRequest"
    @right-btn-clicked="() => {
        $store.dispatch(
            'project/teams/createEditEntity',
            {
                hideModal: (entity) => {
                    this.events.emit('refresh-projects');

                    os(() => {
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
                    }, 300);
                },
                projectId: currentProject,
            }
        );
    }"
>

    <a-col>

        <TeamFormContent />

    </a-col>

</EModal>
</template>

<script lang="ts">
import {mapState, mapMutations} from 'vuex';

export default {
	computed: {
        ...mapState('project/teams', ['entity', 'isEdit', 'isDoingRequest']),
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
			setNewEditEntity: 'project/teams/setNewEditEntity'
		}),
	},
};

</script>