<style lang="less" scoped>
.members-tab-root {

}
</style>

<template>
<e-col class="members-tab-root tab-cont-item pl-10 pr-10">

	<TablePaginated
		clss="pt-10"
		:showRowCheckboxs="false"
		:data="project?.teams ?? []"
		:columns="columns"
		:showNewButton="true"
		:loading="isDoingRequest"
		:isDoingDeleteRequest="isDoingDeleteRequest"
		@action-edit-clicked="editTeam($event)"
		@action-new-clicked="$refs['mdl-team'].show()"
		@action-delete-clicked="(value) => {
			$store.commit('project/teams/setDeleteEntity', value);
			os(() => events.emit('refresh-projects'), 300);
		}"
		@action-delete-confirmed="(value) => {
			$store.dispatch('project/teams/deleteEntity', value);
			os(() => events.emit('refresh-projects'), 300);
		}"
	/>

	<EModal :title="tr('modal-team-title', { args: [ editingTeam?.name ] })" :width="1200" ref="mdl-members">

		<HomeTabsTeamMembers :members="editingTeam?.members" />

	</EModal>

	<TeamCreateEditModal ref="mdl-team" />

</e-col>
</template>

<script>
import { mapGetters } from 'vuex';
import TeamModel from '~/models/TeamModel';

export default {
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters({
            rolesDict: 'project/roles/rolesDict',
        }),
    },
    data() {
        return {
            columns: TeamModel.getColumns(),
            isDoingRequest: false,
            isDoingDeleteRequest: false,
            editingTeam: { members: []  },
        }
    },
    methods: {
        editTeam(team) {
            this.editingTeam = team;
            this.$refs['mdl-members'].show()
        },
    }
}
</script>
