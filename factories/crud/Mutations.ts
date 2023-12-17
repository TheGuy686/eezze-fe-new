import Vue from 'vue';

interface FactoryParams {
    storeKey: string;
    entityClass?: any;
    defaultEntity?: any;
    entityId?: string;
}

export function InitCrudMutations(params: FactoryParams) {
    return {
        setIsEdit(state: any, editState: any) {
            state.isEdit = editState;
        },

        setEntityId(state: any, entityId: any) { state.entityId = entityId },

        setDeleteEntity(state: any, entity: any) {
            state.deleteEntity = entity;
        },

        setDoingRequestState(state: any, requestState: boolean) {
            state.isDoingRequest = requestState;
        },

        setDoingDeleteRequestState(state: any, requestState: boolean) {
            state.isDoingDeleteRequest = requestState;
        },

        setEntities(state: any, entities: any[]) {
            Vue.set(state, 'entities', Object.values(entities));
        },

        setNewEditEntityObject(state: any, entity: any) {
            Vue.set(state, 'entity', entity);
        },

        setNewEditEntity(state: any, entity: any) {
            let entityId: string;

            if (typeof params?.entityId === 'string') {
                entityId = params?.entityId;
            }
            else if (typeof state?.entityId === 'string' && state?.entityId != '') {
                entityId = state.entityId;
            }
            else {
                console.log(`InitCrudMutations.setNewEditEntity Error: There was no valid "entityId" to be able find the editing entity`);
                return;
            }

            if (entity !== undefined && typeof entity[entityId] != 'undefined') {
                state.editingKey = entity[entityId];
                state.isEdit = true;

                let fEnt = Object.values(state.entities).filter(
                    (p: any, i: number) => {
                        if (p[entityId] == state.editingKey) {
                            state.editingIndex = i;
                            return true;
                        }
                    }
                )[0];

                if (typeof fEnt != 'undefined') entity = fEnt;

                if (params.entityClass !== undefined) {
                    entity = params.entityClass.create(entity, 'MutationsFactory > Edit > setNewEditEntity');
                }

                if (params.entityClass) {
                    state.entity = params.entityClass.create(entity);
                }
                else {
                    state.entity = entity;
                }

                if (typeof state.entity == 'undefined') {
                    console.error('Could not find filtered entity from: setNewEditEntity: ' + entity.key);
                }

                return;
            }

            if (params.defaultEntity !== undefined) {
                entity = params.defaultEntity;
            }
            else {
                entity = {};
            }

            if (params.entityClass !== undefined) {
                entity = params.entityClass.create(entity, 'MutationsFactory > Create > setNewEditEntity');
            }

            state.entity = entity;
            state.isEdit = false;
            state.editingKey = '';
            state.editingIndex = -1;
        },

        setEntityProp(state: any, keyVals: any) {
            if (typeof state == 'undefined') {
                console.log(`State was undefined: `, params);
                return;
            }

            Vue.set(state?.entity ?? {}, keyVals?.key, keyVals?.value);
        },

        deleteEntity(state: any) {
            try {
                for (let i in state.entities) {
                    if (state.entities[i].id != state.deleteEntity.id) continue;

                    state.entities.splice(i, 1);
                    break;
                }
            }
            catch (err: any) {
                console.log(`There was an error deleting your entity: ${err.message}`)
            }
        },
    }
}