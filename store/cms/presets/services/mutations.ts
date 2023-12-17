import Vue from 'vue';
// import AuthenticatorModel from '~/models/AuthenticatorModel';
import { InitCrudMutations } from '~/factories/crud/Mutations';

export default {
    ...InitCrudMutations({
        storeKey: 'cms/presets/services',
        //entityClass: AuthenticatorModel,
    }),
    toggleToSelectedStoreKeys(state: any, args: any) {
        if (typeof state.selectedStoreKeys[args.presetKey] != 'undefined') {
            return Vue.delete(state.selectedStoreKeys, args.presetKey);
        }

        Vue.set(state.selectedStoreKeys, args.presetKey, {
            mainCategoryKey: args.mainCategoryKey,
            categoryKey: args.categoryKey,
        });
    },
    setNewPresetName(state: any, value: string) {
        Vue.set(state, 'newPresetName', value);
    },
    setCurrentlySelectedIndex(state: any, index: number) {
        Vue.set(state, 'currentlySelectedIndex', index);
    },
    setAddToProjectErrors(state: any, res: any) {
        Vue.set(state, 'addToProjectErrors', res);
    },
    setKeyOverride(state: any, args: any) {
        if (typeof state.keyOverrides[args.groupKey] != 'object') {
            Vue.set(state.keyOverrides, args.groupKey, {});
        }
        
        Vue.set(state.keyOverrides[args.groupKey], args.key, args.value);
    },
    keyOversideVmol(state: any, args: any) : string {
        if (typeof state.keyOverrides[args.groupKey] != 'object') return '';

        return state.keyOverrides[args.groupKey][args.key];
    },
    resetDefaults(state: any) {
        state.newPresetName = '';
        state.currentlySelectedIndex = 0;
    },
    resetDrawerDefaults(state: any) {
        state.selectedStoreKeys = {};
        state.addToProjectErrors = {};
        state.keyOverrides = {};
    },
    setDatasourceKeyOverrides(state: any, args: any) {
        if (args.overrideDsKey == undefined) {
            // console.log('after getting to delete thing: ', {key, overrideDsKey});
            // return Vue.delete(state['datasourceKeyOverrides'], key);
        }

        Vue.set(state['datasourceKeyOverrides'], args.key, args.overrideDsKey)
    },
}