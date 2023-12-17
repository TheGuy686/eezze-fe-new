<template>
<div>

    <a-page-header :title="tr('connections')" non-sel />

    <TablePaginated
        :showRowCheckboxs="false"
        :actions="actions"
        :data="entities"
        :columns="columns"
        :showNewButton="true"
        :deleteTitle="tr('connection')"
        :loading="isDoingRequest"
        :isDoingDeleteRequest="isDoingDeleteRequest"
        @action-new-clicked="$refs['mdl'].show()"
        @action-edit-clicked="$refs['mdl'].show($event)"
        @action-view-clicked="(connection) => $router.push({ 
            path: `/${$route.params.id}/connection/${connection.id}`
        })"
        @action-delete-clicked="$store.commit('project/connections/setDeleteEntity', $event)"
        @action-delete-confirmed="$store.dispatch('project/connections/deleteEntity', {...$event, projectId: $route.params.id})"
    />

    <ConnectionCreateEditModal ref="mdl" />

</div>
</template>

<script>
import ConnectionModel from '~/models/ConnectionModel';

import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('project/connections', [
            'entities',
            'isDoingRequest',
            'isDoingDeleteRequest',
        ]),
        currentConnection() {
            
        },
    },

    data() {
        return {
            actions: [
				{
					action: 'view',
					icon: 'eye'
				},
				{
					action: 'edit',
					icon: 'edit'
				},
				{
					action: 'delete',
					icon: 'dustbin'
				}
			],
            columns: [...ConnectionModel.getColumns()],
        }
    },
}
</script>
