<template>
<div>

    <a-page-header :title="tr('linters')" non-sel />

    <TablePaginated
        :showRowCheckboxs="false"
		:data="entities"
		:columns="columns"
		:showNewButton="true"
		:deleteTitle="tr('linter')"
		:loading="isDoingRequest"
		:isDoingDeleteRequest="isDoingDeleteRequest"
		@action-new-clicked="$refs['mdl'].show()"
		@action-edit-clicked="$refs['mdl'].show($event)"
		@action-delete-clicked="$store.commit('project/cms-linters/setDeleteEntity', $event)"
		@action-delete-confirmed="$store.dispatch('project/cms-linters/deleteEntity', $event)"
    />

    <LinterCreateEditModal ref="mdl" />

</div>
</template>

<script lang="ts">
import LinterModel from '~/models/LinterModel';

import {mapState} from 'vuex';

export default {
    computed: {...mapState('cms/linters', [
        'entities', 
        'isDoingRequest',
        'isDoingDeleteRequest',
    ])},

    data() {return {columns: [...LinterModel.getColumns()]}},
}
</script>
