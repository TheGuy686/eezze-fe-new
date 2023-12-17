<template>
<div>

    <a-page-header :title="tr('bl-action-types')" non-sel />

    <TablePaginated
        :showRowCheckboxs="false"
		:data="entities"
		:columns="columns"
		:showNewButton="true"
		:deleteTitle="tr('bl-action-type')"
		:loading="isDoingRequest"
		:isDoingDeleteRequest="isDoingDeleteRequest"
		@action-new-clicked="$refs['mdl'].show()"
		@action-edit-clicked="$refs['mdl'].show($event)"
		@action-delete-clicked="$store.commit('cms/bl-action-types/setDeleteEntity', $event)"
		@action-delete-confirmed="$store.dispatch('cms/bl-action-types/deleteEntity', $event)"
    />

    <BlActionTypeCreateEditModal ref="mdl" />

</div>
</template>

<script lang="ts">
import BlActionTypeModel from '~/models/BlActionTypeModel';

import {mapState} from 'vuex';

export default {
    computed: {...mapState('cms/bl-action-types', [
        'entities', 
        'isDoingRequest',
        'isDoingDeleteRequest',
    ])},

    data() {return {columns: [...BlActionTypeModel.getColumns()]}},
}
</script>
