<template>
<a-col>

	<!-- <ELayoutSubHeader title="CMS > Datasource Types" /> -->

	<TablePaginated
		:data="entities"
		:columns="columns"
		:showNewButton="true"
		:loading="isDoingRequest"
		:isDoingDeleteRequest="isDoingDeleteRequest"
		@action-new-clicked="$refs['mdl'].show()"
		@action-edit-clicked="$refs['mdl'].show($event)"
		@action-delete-clicked="$store.commit('cms/datasources/type/setDeleteEntity', $event)"
		@action-delete-confirmed="$store.dispatch('cms/datasources/type/deleteEntity', $event)"
	/>

	<!-- <CmsDatasourcesTypeCreateEditModal ref="mdl" /> -->

</a-col>
</template>

<script lang="ts">
import {mapState} from 'vuex';

export default {
	middleware: 'auth',
	
	computed: {...mapState('cms/datasources/type', [
		'entities', 
		'isDoingRequest',
		'isDoingDeleteRequest'
	])},

	data() {
		return {
			columns: [
				{
					title: 'Key',
					dataIndex: 'key',
					sorter: true,
				},
				{
					title: 'Name',
					dataIndex: 'name',
					sorter: true
				},
				{
					title: 'Has Lifecycle Events',
					dataIndex: 'hasLifecycleEvents',
					sorter: true
				},
				{
					title: 'Has Authentication Events',
					dataIndex: 'hasAuthenticationEvents',
					sorter: true
				},
			]
		}
	},
};
</script>