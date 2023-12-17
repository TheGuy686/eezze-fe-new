<template>
<div>

    <a-page-header :title="tr('completed-modules')" non-sel />

    <TablePaginated
        :showRowCheckboxs="false"
        :actions="actions"
        :data="entities"
        :columns="columns"
        :showNewButton="false"
        :deleteTitle="tr('delete-store-entry')"
        :loading="isDoingRequest"
        :isDoingDeleteRequest="isDoingDeleteRequest"
        @action-delete-clicked="$store.commit('admin/store/setDeleteEntity', $event)"
        @action-delete-confirmed="$store.dispatch('admin/store/deleteEntity', $event)"
    />

</div>
</template>

<script>
import StoreModel from '~/models/StoreModel';
import { mapState } from 'vuex';

export default {
	layout: 'internal',
	computed: {...mapState('user/internal/modules', [
		'entities',
		'isDoingRequest',
		'isDoingDeleteRequest',
	])},
	data() {
		return {
			columns: [ ...StoreModel.getColumns() ],
			actions: [
				{
					action: 'view',
					icon: 'eye',
				},
				{
					action: 'edit',
					icon: 'edit',
				},
				{
					action: 'delete',
					icon: 'dustbin',
				}
			],
		}
	},
	mounted() {
		this.$store.dispatch('user/internal/modules/getEntities');
	},
}
</script>