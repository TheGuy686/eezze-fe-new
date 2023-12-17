<template>
<div>

    <a-page-header :title="tr('vault')" non-sel />

    <TablePaginated
        :showRowCheckboxs="false"
        :data="entities"
        :columns="columns"
        :showNewButton="true"
        :deleteTitle="tr('vault-entry')"
        :loading="isDoingRequest"
        :isDoingDeleteRequest="isDoingDeleteRequest"
        @action-new-clicked="$refs['mdl'].show()"
        @action-edit-clicked="$refs['mdl'].show($event)"
        @action-delete-clicked="$store.commit('project/vault/setDeleteEntity', $event)"
        @action-delete-confirmed="$store.dispatch('project/vault/deleteEntity', {...$event, projectId: $route.params.id})"
    />

    <VaultCreateEditModal ref="mdl" />

</div>
</template>

<script lang="ts">
import VaultModel from '~/models/VaultModel';
import { mapState, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            rolesDict: 'project/roles/rolesDict'
        }),
        ...mapState('project/vault', [
            'entities',
            'isDoingRequest',
            'isDoingDeleteRequest',
        ])
    },

	data() {return {columns: [...VaultModel.getColumns()]}},
}
</script>
