<template>
<div>

    <a-page-header :title="tr('roles')" non-sel />

    <TablePaginated
        :showRowCheckboxs="false"
		:data="entities"
		:columns="columns"
		:showNewButton="true"
		:deleteTitle="tr('role')"
		:loading="isDoingRequest"
		:isDoingDeleteRequest="isDoingDeleteRequest"
		@action-new-clicked="$refs['mdl'].show()"
		@action-edit-clicked="$refs['mdl'].show($event)"
		@action-delete-clicked="$store.commit('project/roles/setDeleteEntity', $event)"
		@action-delete-confirmed="$store.dispatch('project/roles/deleteEntity', {...$event, projectId: $route.params.id})"
    />

    <RoleCreateEditModal ref="mdl" />

</div>
</template>

<script lang="ts">
import RoleModel from '~/models/RoleModel';

import { mapState, mapGetters } from 'vuex';

export default {
    computed: {...mapState('project/roles', [
        'entities', 
        'isDoingRequest',
        'isDoingDeleteRequest',
    ])},

    data() {return {columns: [...RoleModel.getColumns()]}},
}
</script>
