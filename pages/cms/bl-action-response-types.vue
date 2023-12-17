<template>
<div>

    <a-page-header :title="tr('bl-action-response-types')" non-sel />

    <TablePaginated
        :showRowCheckboxs="false"
		:data="entities"
		:columns="columns"
		:showNewButton="true"
		:deleteTitle="tr('bl-action-response-type')"
		:loading="isDoingRequest"
		:isDoingDeleteRequest="isDoingDeleteRequest"
		@action-new-clicked="$refs['mdl'].show()"
		@action-edit-clicked="$refs['mdl'].show($event)"
		@action-delete-clicked="$store.commit('cms/bl-action-response-types/setDeleteEntity', $event)"
		@action-delete-confirmed="$store.dispatch('cms/bl-action-response-types/deleteEntity', $event)"
    />

    <BlActionResponseTypeCreateEditModal ref="mdl" />

</div>
</template>

<script lang="ts">
import BlActionResponseTypeModel from '~/models/BlActionResponseTypeModel';

import {mapState} from 'vuex';

export default {
    computed: {...mapState('cms/bl-action-response-types', [
        'entities', 
        'isDoingRequest',
        'isDoingDeleteRequest',
    ])},

    data() {return {columns: [...BlActionResponseTypeModel.getColumns()]}},
}
</script>
