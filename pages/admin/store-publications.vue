<template>
<div>

    <a-page-header :title="tr('store-publications-awaiting-approval')" non-sel />

    <TablePaginated
        :showRowCheckboxs="false"
        :actions="actions"
        :data="entities"
        :columns="columns"
        :showNewButton="false"
        :deleteTitle="tr('delete-store-entry')"
        :loading="isDoingRequest"
        :isDoingDeleteRequest="isDoingDeleteRequest"
        @action-new-clicked="$refs['mdl'].show()"
        @action-edit-clicked="$refs['mdl'].show($event)"
        @action-delete-clicked="$store.commit('admin/store/setDeleteEntity', $event)"
        @action-delete-confirmed="$store.dispatch('admin/store/deleteEntity', $event)"
    />

    <StorePublicationCreateEditModal ref="mdl" />

</div>
</template>

<script>
import StoreModel from '~/models/StoreModel';
import { mapState } from 'vuex';

export default {
    layout: 'admin',
    computed: {...mapState('admin/store', [
        'entities',
        'isDoingRequest',
        'isDoingDeleteRequest',
    ])},
    data() {
        return {
            columns: [...StoreModel.getColumns()],
            actions: [
				{
					action: 'edit',
					icon: 'edit'
				},
			],
        };
    },
    mounted() {
        this.$store.dispatch('admin/store/getEntities');
    },
}
</script>