import Vue from 'vue';

const UNIT_TESTING_MUTATIONS = {
    addUnitTestingIds(state: any, pathKey: string) {
        if (state.unitTestingIds.includes(pathKey)) return;
        state.unitTestingIds.push(pathKey);
    },
    deleteUnitTestingIds(state: any, pathKey: string) {
        Vue.delete(state.unitTestingIds, state.unitTestingIds.indexOf(pathKey));
    },
    addUnitTestPassedIds(state: any, pathKey: string) {
        if (state.unitTestingIds.includes(pathKey)) {
            Vue.delete(state.unitTestingIds, state.unitTestingIds.indexOf(pathKey));
        }

        if (state.lastPassedUts.includes(pathKey)) return;
        state.lastPassedUts.push(pathKey);
    },
    deleteUnitTestPassedIds(state: any, pathKey: string) {
        Vue.delete(state.lastPassedUts, state.lastPassedUts.indexOf(pathKey));
    },
    addUnitTestFailedIds(state: any, pathKey: string) {
        if (state.lastFailedUts.includes(pathKey)) return;
        state.lastFailedUts.push(pathKey);
    },
    deleteUnitTestFailedIds(state: any, pathKey: string) {
        Vue.delete(state.lastFailedUts, state.lastFailedUts.indexOf(pathKey));
    },
}

export default {
    ...UNIT_TESTING_MUTATIONS,
};