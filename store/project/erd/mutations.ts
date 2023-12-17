import Vue from 'vue';
import EntityModel from '~/models/EntityModel';
import EntityItemModel from '~/models/EntityItemModel';
import { InitCrudMutations } from '~/factories/crud/Mutations';

const PRESET_METHODS = {
    setChosenPreset(state: any, preset: any) {
        state.chosenPreset = preset;
    },

    setChosenPresetDatasource(state: any, datasource: string) {
        Vue.set(state.chosenPreset.preset, 'datasource', datasource);
    },

    addEntityFromPreset(state: any, args: any) {
        state.entities.push(EntityModel.create(args.entityObj));

        if (typeof args.completedCb == 'function') args.completedCb();
    },

    addEntityLevelPresets(state: any, args: any) {
        args.properties.forEach(
            (propObj: any) => {
                state.entity.entityItems.push(EntityItemModel.create(propObj));
            }
        );

        if (typeof args.completedCb == 'function') args.completedCb();
    },
}

export default {
    ...InitCrudMutations({
        storeKey: 'api/erd/entities',
        entityClass: EntityModel,
        entityId: 'id',
    }),

    setDatasourceFilter(state: any, datasource: string) {
        Vue.set(state, 'filterDatasource', datasource);
    },

    setEditingEntitySeshId(state: any, id: string) {
        Vue.set(state, 'editingEntitySeshId', id);
    },

    ...PRESET_METHODS,
}