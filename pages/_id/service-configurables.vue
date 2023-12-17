<template>
<div>

    <a-page-header :title="tr('service-configurables')" non-sel />

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
		@action-delete-clicked="$store.commit('project/service-configurables/setDeleteEntity', $event)"
		@action-delete-confirmed="$store.dispatch('project/service-configurables/deleteEntity', {...$event, projectId: $route.params.id})"
    />

    <ServiceConfigurableCreateEditModal ref="mdl" />

</div>
</template>

<script lang="ts">
import {mapState} from 'vuex';
import ServiceConfigurableModel from '~/models/ServiceConfigurableModel';

export default {
    computed: {...mapState('project/service-configurables', [
        'entities', 
        'isDoingRequest',
        'isDoingDeleteRequest',
    ])},

    data() {return {columns: [...ServiceConfigurableModel.getColumns()]}},

    mounted() {
        // @Ryan
        // setTimeout(() => {
        //     (this as any).$refs['mdl'].show();
        // }, 200);
    }
}
</script>
