<template>
<div>

    <a-page-header :title="tr('my-store-publications')" non-sel />

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
    layout: 'user-store',
    computed: {...mapState('user/store', [
        'entities',
        'isDoingRequest',
        'isDoingDeleteRequest',
    ])},

    data() {
        return {
            columns: [...StoreModel.getColumns([ 'totalServices' ])],
            actions: [
				{
					action: 'view',
					icon: 'eye'
				},
				{
					action: 'delete',
					icon: 'dustbin'
				}
			],
        }
    },

    mounted() {
        this.$store.dispatch('user/store/getEntities');
    },
}
</script>