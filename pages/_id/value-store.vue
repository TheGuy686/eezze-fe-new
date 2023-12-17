<template>
<div>

    <a-page-header :title="tr('value-store')" non-sel />

    <TablePaginated
        :showRowCheckboxs="false"
        :data="entities"
        :columns="columns"
        :showNewButton="true"
        :deleteTitle="tr('value-store-entry')"
        :loading="isDoingRequest"
        :isDoingDeleteRequest="isDoingDeleteRequest"
        @action-new-clicked="$refs['mdl'].show()"
        @action-edit-clicked="$refs['mdl'].show($event)"
        @action-delete-clicked="$store.commit('project/value-store/setDeleteEntity', $event)"
        @action-delete-confirmed="$store.dispatch('project/value-store/deleteEntity', {...$event, projectId: $route.params.id})"
    />

    <ValueStoreCreateEditModal ref="mdl" />

</div>
</template>

<script lang="ts">
import ValueStoreModel from '~/models/ValueStoreModel';
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('project/value-store', [
            'entities',
            'isDoingRequest',
            'isDoingDeleteRequest',
        ])
    },

	data() {return {columns: [...ValueStoreModel.getColumns()]}},
}
</script>
