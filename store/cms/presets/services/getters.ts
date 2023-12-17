function hasFilteredKey(key: string, getters: any) {
    if (getters?.filtedCategories?.length == 0) return false;
    if (typeof getters.deps[key] != 'object') return false;
    if (Object.keys(getters.deps[key]).length == 0) return false;

    return true;
};

function foreachPath(getters: any, cb: Function) {
    let methodGroup: any;
    getters.filtedCategories.forEach((cat: any) => {
        for (let ps of cat.presets) {
            for (methodGroup of Object.values(ps.paths)) {
                for (let path of Object.values(methodGroup)) {
                    cb(path);
                }
            }
        }   
    });
};

const KEY_ERROR_GETTERS = {
    errorData: (state: any, getters: any) => {
        try {
            return state.addToProjectErrors?.data?.errorData?.keys ?? {};
        }
        catch (e) {
            return {};
        }
    },
    hasErrors: (state: any, getters: any) => {
        return Object.keys(getters.errorData).length > 0;
    },
    restfulGroupErrors: (state: any, getters: any) => {
        if (Object.keys(getters.errorData).length == 0) return [];

        return getters.errorData?.restfulGroups ?? [];
    },
    pathErrors: (state: any, getters: any) => {
        if (Object.keys(getters.errorData).length == 0) return [];

        return getters?.errorData?.paths ?? [];
    },
    datasourceErrors: (state: any, getters: any) => {
        if (Object.keys(getters.errorData).length == 0) return [];

        return getters.errorData?.datasources ?? [];
    },
    roleErrors: (state: any, getters: any) => {
        if (Object.keys(getters.errorData).length == 0) return [];

        return getters.errorData?.roles ?? [];
    },
    actionErrors: (state: any, getters: any) => {
        if (Object.keys(getters.errorData).length == 0) return [];

        return getters.errorData?.actions ?? [];
    },
    entityErrors: (state: any, getters: any) => {
        if (Object.keys(getters.errorData).length == 0) return [];

        return getters.errorData?.entities ?? [];
    },
    urlParameterErrors: (state: any, getters: any) => {
        if (Object.keys(getters.errorData).length == 0) return [];

        return getters.errorData?.urlParameters ?? [];
    },
    requestBodyErrors: (state: any, getters: any) => {
        if (Object.keys(getters.errorData).length == 0) return [];

        return getters.errorData?.requestBodies ?? [];
    },
    responseErrors: (state: any, getters: any) => {
        if (Object.keys(getters.errorData).length == 0) return [];

        return getters.errorData.responses ?? [];
    },
};

const TABS_DATA = {
    datasourcesTab(state: any, getters: any) {
        if (!hasFilteredKey('datasources', getters)) return false;
        if (!hasFilteredKey('entities', getters)) return false;
        if (!hasFilteredKey('actions', getters)) return false;

        let dsKeys: any = [], 
            entityDsKeyPairs: any = getters?.deps?.entities ?? {},
            actionsDsKeyPairs: any = getters?.deps?.actions ?? {};

        foreachPath(getters, (path: any) => {
            try {
                let action: any = actionsDsKeyPairs[path.action];

                dsKeys.push(entityDsKeyPairs[action.entity].datasource);
            }
            catch (e) {}
        });

        let ds: any, tabData: any = {
            key: 'datasources',
            name: 'Datasources',
            data: [],
        };

        for (ds of Object.values(getters.deps['datasources'])) {
            if (!dsKeys.includes(ds.key)) continue;
            tabData.data.push({...ds});
        }

        if (tabData.data.length == 0) return false;

        return tabData;
    },
    tabRole(state: any, getters: any) {
        if (!hasFilteredKey('roles', getters)) return false;

        let roleKeys: any = [];

        foreachPath(getters, (path: any) => {
            let r: any;

            for (r of Object.values(path.roles)) {
                if (r.length == 0) continue;
                roleKeys = [...Object.values(r)];
            }
        });

        let role: any, tabData: any = {
            key: 'roles',
            name: 'Roles',
            data: [],
        };

        for (role of Object.values(getters.deps['roles'])) {
            if (!roleKeys.includes(role.key)) continue;
            tabData.data.push({...role});
        }

        if (tabData.data.length == 0) return false;

        return tabData;
    },
    entitiesTab(state: any, getters: any) {
        if (!hasFilteredKey('entities', getters)) return false;
        if (!hasFilteredKey('actions', getters)) return false;

        let entityKeys: any = [],
            actionsDsKeyPairs: any = getters?.deps?.actions ?? {};

        foreachPath(getters, (path: any) => {
            try {
                let action: any = actionsDsKeyPairs[path.action];

                entityKeys.push(action.entity);
            }
            catch (e) {}
        });

        let entity: any, tabData: any = {
            key: 'entities',
            name: 'Entities',
            data: [],
        };

        for (entity of Object.values(getters.deps['entities'])) {
            if (!entityKeys.includes(entity.key)) continue;
            tabData.data.push({...entity});
        }

        if (tabData.data.length == 0) return false;

        return tabData;
    },
    actionsTab(state: any, getters: any) {
        if (!hasFilteredKey('entities', getters)) return false;
        if (!hasFilteredKey('actions', getters)) return false;

        let actionKeys: any = [],
            actionsKeyPairs: any = getters?.deps?.actions ?? {};

        foreachPath(getters, (path: any) => {
            try {
                let action: any = actionsKeyPairs[path.action];

                actionKeys.push(action.key);
            }
            catch (e) {}
        });

        let action: any, tabData: any = {
            key: 'actions',
            name: 'Actions',
            data: [],
        };

        for (action of Object.values(getters.deps['actions'])) {
            if (!actionKeys.includes(action.key)) continue;
            tabData.data.push({...action});
        }

        if (tabData.data.length == 0) return false;

        return tabData;
    },
    urlParmasTab(state: any, getters: any) {
        if (!hasFilteredKey('url-parameters', getters)) return false;

        let urlParamKeys: any = [];

        foreachPath(getters, (path: any) => {
            if (path.urlParams.length == 0) return;

            for (let param of path.urlParams) {
                urlParamKeys.push(param.relation);
            }
        });

        let param: any, tabData: any = {
            key: 'url-parameters',
            name: 'URL Parmas',
            data: [],
        };

        for (param of Object.values(getters.deps['url-parameters'])) {
            if (!urlParamKeys.includes(param.key)) continue;
            tabData.data.push({...param});
        }

        if (tabData.data.length == 0) return false;

        return tabData;
    },
    reqBodiesTab(state: any, getters: any) {
        if (!hasFilteredKey('request-bodies', getters)) return false;

        let reqBodyKeys: any = [];

        foreachPath(getters, (path: any) => {
            if (path?.reqBody == '') return;
            reqBodyKeys.push(path.requestBody);
        });

        let reqBody: any, tabData: any = {
            key: 'request-bodies',
            name: 'Request Bodies',
            data: [],
        };

        for (reqBody of Object.values(getters.deps['request-bodies'])) {
            if (!reqBodyKeys.includes(reqBody.key)) continue;
            tabData.data.push({...reqBody});
        }

        if (tabData.data.length == 0) return false;

        return tabData;
    },
    responsesTab(state: any, getters: any) {
        if (!hasFilteredKey('responses', getters)) return false;

        let responseKeys: any = [];

        foreachPath(getters, (path: any) => {
            if (path?.reqBody == '') return;
            for (let k in path.responses) {
                if (responseKeys.includes(k)) continue;
                responseKeys.push(k);
            }
        });

        let response: any, tabData: any = {
            key: 'responses',
            name: 'Responses',
            data: [],
        };

        for (response of Object.values(getters.deps['responses'])) {
            if (!responseKeys.includes(response.key)) continue;
            tabData.data.push({...response});
        }

        if (tabData.data.length == 0) return false;

        return tabData;
    },
};

const FILTERED_DATA_GETTERS = {
    filtedCategoryKeys(state: any, getters: any) {
        let out: any = {}, k: any;

        for (k in state.selectedStoreKeys) {
            let option = state.selectedStoreKeys[k];

            if (typeof out[option['mainCategoryKey']] == 'undefined') {
                out[option['mainCategoryKey']] = {};
            }

            if (typeof out[option['mainCategoryKey']][option['categoryKey']] == 'undefined') {
                out[option['mainCategoryKey']][option['categoryKey']] = [];
            }

            out[option['mainCategoryKey']][option['categoryKey']].push(k);
        }

        return out;
    },
    filtedCategories(state: any, getters: any) {
        try {
            let categoryFilters = getters.filtedCategoryKeys[getters.currentlySelectedPresetGroup.key];

            let categories = (getters.currentlySelectedPresetGroup as any).categories.filter((category: any) => {
                return Object.keys(categoryFilters).includes(category.key);
            });

            let out = [], catTmp: any;

            // loop over each preset category
            for (let cat of categories) {
                catTmp = {...cat};

                let presets = [], pathFilters: any = categoryFilters[cat.key];

                // then loop over each preset
                for (let ps of cat.presets) {
                    if (!pathFilters.includes(ps.key)) continue;

                    presets.push(ps);
                }

                catTmp.presets = presets;

                out.push(catTmp);
            }

            return out;
        }
        catch (e) {return []}
    },
}

const GROUP_PRESET_GETTERS = {
    deps: (state: any, getters: any) => {
        try {
            return getters.currentlySelectedPresetGroup.dependancies;
        }
        catch (e: any) {
            console.log('ERROR: ', e.message);
            return {};
        }
    },
};

export default {
    ...KEY_ERROR_GETTERS,
    ...FILTERED_DATA_GETTERS,
    ...GROUP_PRESET_GETTERS,
    ...TABS_DATA,

    bottomSection: (state: any) => {
        let out: any = [...state.entities];

        return out;
    },
    currentlySelectedPresetGroup(state: any, getters: any) {
        try {
            return state.entities[state.currentlySelectedIndex];
        }
        catch (e) {return {}}
    },
}