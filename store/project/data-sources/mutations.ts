import DatasourceModel from '~/models/DatasourceModel';
import { InitCrudMutations } from '~/factories/crud/Mutations';

import Vue from 'vue';

export default {
    ...InitCrudMutations({
        storeKey: 'project/data-sources',
        entityClass: DatasourceModel,
        entityId: 'id'
    }),
    setDatasourceFilter(state: any, datasource: string) {
        Vue.set(state, 'filterDatasource', datasource);
    },
    updateCurrentEditingEntry(state: any) {
        const ents = state.entities;

        ents[state.editingIndex] = state.entity;

        Vue.set(state, 'entities', ents);
    }
}