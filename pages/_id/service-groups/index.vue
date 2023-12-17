<template>
<div>
  
	<a-page-header :title="tr('service-group')" />

	<TablePaginated
		:data="entities"
		:columns="columns"
		:showNewButton="true"
		:addBtnText="tr('add-service-group')"
		:deleteTitle="tr('delete-service-group')"
		:loading="isDoingRequest"
		:showRowCheckboxs="false"
		:showTableBorder="true"
		:actions="[
			{
				action: 'services',
				title: tr('services'),
				type: 'clickable-text',
			},
			{
				action: 'save-to-internal',
				icon: 'cloud-upload'
			},
			{
				action: 'publish-to-store',
				icon: 'app-store'
			},
			{
				action: 'edit',
				icon: 'edit'
			},
			{
				action: 'delete',
				icon: 'delete'
			},
		]"
		:isDoingDeleteRequest="isDoingDeleteRequest"
		@action-new-clicked="$refs['mdl'].show()"
		@action-edit-clicked="$refs['mdl'].show($event)"
		@action-delete-clicked="$store.commit('project/service-groups/setDeleteEntity', $event)"
		@action-delete-confirmed="$store.dispatch('project/service-groups/deleteEntity', {...$event, projectId: $route.params.id})"
		@action-save-to-internal-clicked="publishToStoreClicked($event, 'internal')"
		@action-publish-to-store-clicked="publishToStoreClicked($event, 'store')"
		@action-services-clicked="servicesClicked"
	>

		<template v-slot:before-add-btn>

			<a-button size="large" @click="events.emit('open-store')">

				{{ tr('store') }}

			</a-button>

		</template>

	</TablePaginated>

	<ServiceGroupCreateEditModal ref="mdl" />

	<ServiceGroupPublishToAppStoreModal ref="pub-to-store-mdl" />

	<!-- <ServicePresetsStoreModal ref="mdl-store" /> -->

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ServiceGroupModel from '~/models/ServiceGroupModel';

export default {
	data() {return {columns: [...ServiceGroupModel.getColumns()]}},
	computed: {
		...mapState('project/service-groups', [
			'entities',
			'isDoingRequest',
			'isDoingDeleteRequest',
		]),
	},
	methods: {
		servicesClicked(row) {
			this.setNewEditEntity(row);
			this.$router.push({ path: `/${this.$route.params?.id}/service-groups/${row.id}`});
		},
		publishToStoreClicked(entity, scope) {
			this.$refs['pub-to-store-mdl']?.show(entity, scope);
		},

		...mapMutations({
			setEntityProp: 'project/data-sources/setEntityProp',
			setNewEditEntity: 'project/service-groups/setNewEditEntity',
		}),
	},
}
</script>
