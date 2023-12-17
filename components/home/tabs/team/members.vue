<style lang="less" scoped>
.members-tab-root {

}
</style>

<template>
<e-col class="members-tab-root tab-cont-item pl-10 pr-10">

    <TablePaginated
        :showRowCheckboxs="false"
		:data="members ?? []"
		:columns="columns"
		:showNewButton="false"
		:loading="isDoingRequest"
		:isDoingDeleteRequest="isDoingDeleteRequest"
        :mainDeleteTitle="tr('deactivate-member')"
        :mainDeleteConfirmMessage="tr('deactivate-member-confirm-message')"
        :mainDeleteConfirmBtnText="tr('confirm')"
        @action-edit-clicked="editMemberClicked"
        @action-delete-clicked="deactivateMemberClicked"
        @action-delete-confirmed="deactivateMemberConfirmed"
    />

    <EModal 
        ref="mdl-members"
        :title="tr('edit-team-member')"
        :isLoading="isDoingRequest"
        @modal-closed="editingIndex = -1"
        @right-btn-clicked="() => {
            $store.dispatch(
                'project/team-members/createEditEntity',
                {
                    hideModal: (entity) => {
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
        <e-col>

            <e-row>

                <e-col w-50>

                    {{ tr('role') }}

                </e-col>

                <e-col dir="reverse" w-50>

                    <!-- :value="editingItem()?.roles"
                        @input="editingItem().roles = [ $event ]" -->

                    <e-tag-drop-down
                        colorCol="color"
                        keyCol="id"
                        valueCol="name"
                        :maxLength="15"
                        :options="Object.values(memberRoles)"
                        :placeholder="tr('select-a-role')"
                        :value="editingMember?.roles"
                        @input="setEntityProp({key: 'roles', value: [ $event ]})"
                    />

                </e-col>

            </e-row>

        </e-col>

    </EModal>

</e-col>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import TeamMemberModel from '~/models/TeamMemberModel';

export default {
    props: {
        members: {
            type: Array,
            required: true,
        },
    },
    computed: {
        ...mapState('app', [ 'memberRoles' ]),
        ...mapState('project/team-members', {
            editingMember: (state) => state?.entity,
            isDoingRequest: (state) => state?.isDoingRequest
        }),
        ...mapGetters({
            rolesDict: 'project/roles/rolesDict'
        }),

        projects() {
            return this.$store.state?.project?.proj?.entities ?? [];
        },

        editingItem() {
            return function () {
                if (this.editingIndex == -1) return {};

                try {
                    return this.members[this.editingIndex];
                }
                catch (err) { return {} }
            }
        }
    },
    data() {
        return {
            columns: TeamMemberModel.getColumns(),
            isDoingDeleteRequest: false,
            editingIndex: -1,
        }
    },
    methods: {
        editMemberClicked(row, index) {
            this.editingIndex = index;

            console.log('row: ', row);

            this.setNewEditEntity(row);

            this.$refs['mdl-members'].show();
        },
        deactivateMemberClicked(member) {
            this.$store.commit('project/team-members/setDeleteEntity', member);
        },
        deactivateMemberConfirmed(args) {
            const self = this;

            this.$store.dispatch('project/team-members/deleteEntity', {
                index: args.index,
                successCb: () => {
                    this.$store.dispatch('project/proj/getEntities', {
                        successCb: () => {
                            try {
                                const project = self.projects.filter((p) => p.id == self.currentProject)[0];

                                self.setCurrentProject(project);

                                args.successCb();
                            }
                            catch (err) {
                                console.log('inviteMembers set project error: ', err);

                                args.successCb();
                            }
                        }
                    });
                }
            });
        },

        ...mapMutations({
            setCurrentProject: 'project/proj/setCurrentProject',
            setNewEditEntity: 'project/team-members/setNewEditEntity',
            setEntityProp: 'project/team-members/setEntityProp',
        }),
    }
}
</script>
