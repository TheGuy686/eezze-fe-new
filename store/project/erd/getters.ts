// /store/getters.js
import { keyify } from '../../../classes/globals';

export default {
    currentlyEditingSession(state: any, getters: any, appState: any, appGetters: any) {
        const cp = appGetters['app/currentProjectSession']?.project;

        return cp?.editingEntitiesSession ?? {};
    },
    entityViewIsLocked(state: any, getters: any, appState: any) {
        if (!state?.editingEntitySeshId) return false;
        return state?.editingEntitySeshId != appState?.sessionId;
    },
    currentlyEditing(state: any, getters: any, appState: any) {
        return state?.editingEntitySeshId == appState?.app?.sessionId;
    },
    editingEntitiesMember(state: any, getters: any, appState: any, appGetters: any) {
        const members = appGetters?.['project/proj/allMembers'],
              ces = appGetters?.['project/erd/currentlyEditingSession'];
        return members?.[ces?.['userId']] ?? 'na';
    },  

    entitiesDict(state: any) {
        return keyify(
            Object.values(state.entities),
            'key',
            (item: any, key: string) => {
                return `${item.datasource}:${key}`;
            }
        );
    },
    filteredEntities(state: any) {
        const dsFilter = state?.filterDatasource;

        if (typeof dsFilter === 'undefined') return [];

        return Object.values(state?.entities ?? []).filter((e: any) => {
            return e?.datasource == dsFilter;
        });
    },
}