// /store/getters.js
import { keyify } from '../../../../classes/globals';

export default {
    logicTypesDict(state: any) {
        return keyify(state.entities, 'id');
    },
    booleanOperattionsDic(state: any) {
        return keyify(state.booleanOperattions, 'id');
    },
    actionTypesDict(state: any) {
        return keyify(state.actionTypes, 'id');
    },
}