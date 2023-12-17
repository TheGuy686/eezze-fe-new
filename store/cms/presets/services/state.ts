import { InitStateCrudVars } from '~/factories/crud/State';

export default () => ({
    ...InitStateCrudVars(),
    newPresetName: '',
    currentlySelectedIndex: 0,
    selectedStoreKeys: {},
    addToProjectErrors: {},
    keyOverrides: {},
    datasourceKeyOverrides: {},
})