import Request from '@/classes/Request';

type REQUEST_METHOD = 'post' | 'put';

interface FactoryParamsI {
    allPath: string;
    editUpdatePath: string;
    entityId: string;
    entityClass?: any;
    transformEntityBeforeUpdate?: Function;
    transformEntityAfterClassCreate?: Function;
    transformToClassOnGetAll?: boolean;
}

interface GetEntitiesI {
    commit: Function;
    state: any;
    rootGetters: any;
}

interface GetEntitiesPassPropsI {
    getKeys?: any;
    successCb?: Function;
    projectId?: string | number;
}

interface CreateEditEntitiesI {
    dispatch: Function;
    commit: Function;
    state: any;
    allPath: string;
    rootGetters: any;
}

interface DeleteEditEntitiesI {
    commit: Function;
    state: any;
    rootGetters: any;
}

const GLB: any = global;

export class GetAll {
    static async run(
        path: string,
        commit: any,
        state?: any,
        getKeys?: any,
        successCb?: Function,
        transformToClassOnGetAll?: boolean,
        mdlClass?: any,
        rootGetters?: any,
        projectId?: string | number
    ) {
        commit('setDoingRequestState', true);

        // we default to the project id from here as we almost in every case need to use the proejctId
        // but just incase we don't need to the we rely on the API to do the filting of the unnessecary vars
        let params: (string | number)[] = [];

        if (projectId) {
            params.push(`projectId=${projectId}`);
        }

        if (typeof getKeys == 'object') {
            for (let k of Object.values(getKeys)) {
                params.push(`${(k as any).key}=${state[(k as any).stateKey]}`);
            }
        }

        let res: any = await Request.get(
            path + `${params.length > 0 ? '?' + params.join('&') : ''}`,
            {},
            {
                authorization: GLB['AUTH_TOKEN']
            }
        )
            .then((data: any) => data.toObject())
            .catch((data: any) => data.toObject());

        if (res.success) {

            let body = res.body;

            if (typeof body['result'] == 'object') {
                body = body['result'];
            }

            if (!transformToClassOnGetAll) {
                commit('setEntities', body);
            }
            else {
                if (typeof transformToClassOnGetAll != 'undefined') {
                    const out: any = [];

                    for (let o of Object.values(body)) {
                        let ent = mdlClass.create(o);

                        if (ent?.serialize) ent = ent.serialize();

                        out.push(ent);
                    }

                    commit('setEntities', out);
                }
                else {
                    commit('setEntities', body);
                }
            }

            if (successCb) successCb();
            setTimeout(() => commit('setDoingRequestState', false), 300);
            return;
        }

        commit('setDoingRequestState', false);

        //console.log('Get all error: ', res);
    }
}

export class DeleteOne {
    static async run(
        path: string, 
        state: any, 
        commit: any, 
        entityId: string, 
        hideModal: Function, 
        rootGetters: any,
        projectId?: string | number
    ) {
        commit('setDoingDeleteRequestState', true);

        let url = `${path}?${entityId}=${state.deleteEntity.id}`;

        if (state.deleteEntity?.projectId) url += `&projectId=${state.deleteEntity.projectId}`;
        else if (projectId) {
            url += `&projectId=${projectId}`;
        }

        const res: any = await Request.delete(
            url,
            {},
            {
                authorization: GLB['AUTH_TOKEN']
            }
        )
            .then((data: any) => data.toObject())
            .catch((data: any) => data.toObject());

        if (res.success) {
            commit('deleteEntity', res.data);
            hideModal();
            commit('setDoingDeleteRequestState', false);
            return;
        }

        commit('setDoingDeleteRequestState', false);

        console.log('There was an error: ', res);
    }
}

export class CreateEditOne {
    static async run(
        path: string,
        state: any,
        commit: any,
        idKey: string,
        hideModal: any,
        entityClass?: any,
        allPath?: string,
        transformEntityBeforeUpdate?: Function,
        transformToClassOnGetAll?: boolean,
        mdlClass?: any,
        rootGetters?: any,
        transformEntityAfterClassCreate?: Function,
        overrideIdHacksWithOldId: boolean = true,
        projectId?: string | number,
    ) {
        commit('setDoingRequestState', true);

        let method: REQUEST_METHOD = 'post';

        if (state.isEdit) method = 'put';

        let entity = { ...state.entity };

        if (typeof transformEntityBeforeUpdate == 'function') {
            entity = transformEntityBeforeUpdate(entity, state);
        }

        let ignoreEditCheck = false;

        // this is a hack that allows the services to work
        if (!state.entity[idKey] && state.isEdit) {
            ignoreEditCheck = true;
            method = 'post';
        }
        else if (state.entity[idKey] && state.isEdit) {
            console.warn(`We are updating from a potential bug hack. Please look into this`);
            ignoreEditCheck = true;
            method = 'put';
        }

        if (!ignoreEditCheck) {
            if (state.isEdit && (!state.editingKey || state.editingKey == '')) {
                commit('setDoingRequestState', false);
                alert('Editing key not set');
                //console.log('state: ', state, ' : ', state.entity[idKey], ' : ', state.isEdit);
                return;
            }
        }

        let oldEnt = JSON.parse(JSON.stringify({...entity}));

        if (typeof entityClass != 'undefined') {
            entity = entityClass.create(entity);

            if (entity?.serialize) {
                entity = entity.serialize();
            }
        }

        if (state.isEdit && !ignoreEditCheck) {
            entity[idKey] = state.editingKey;
        }
        else entity[idKey] = entity.key;

        if (overrideIdHacksWithOldId && oldEnt?.[idKey] != entity?.[idKey]) {
            if (typeof oldEnt?.id != 'undefined') {
                entity.id = oldEnt.id;
                console.log('Entity edit id has been overridden');
            }
        }

        if (transformEntityAfterClassCreate) {
            entity = transformEntityAfterClassCreate(entity, oldEnt, state);
        }

        // console.log(`${method == 'post' ? 'Creating' : 'Updating'} Entity with id of: "${entity[idKey]}"`);

        // console.log('Entity: ', entity, ' : ' , prId);

        if (typeof entity['projectId'] == 'undefined') {
            console.warn(`Project Id was not set for`, entity);
        }

        if (typeof entity['projectId'] == 'undefined' && projectId) {
            entity['projectId'] = projectId;
        }

        if (state.isEdit && !ignoreEditCheck && !entity[idKey]) {
            console.log(`Editing your entity wasn't possible`);
            console.log(`isEdit: ${state.isEdit}`);
            console.log(`ignoreEditCheck: ${state.ignoreEditCheck}`);
            console.log(`idKey: ${entity[idKey]} - ${idKey}`);
            console.log('Entity: ', entity);
            commit('setDoingRequestState', false);
            return;
        }

        const res: any = await Request[method](
            path,
            {...entity},
            {
                authorization: GLB['AUTH_TOKEN'],
            },
        )
            .then((data: any) => data.toObject())
            .catch((data: any) => data.toObject());

        if (res.success || (res.status > 199 && res.status < 300)) {
            commit('setDoingRequestState', true);

            if (allPath != '') await GetAll.run(
                allPath || '', 
                commit,
                state,
                undefined,
                undefined,
                transformToClassOnGetAll ?? false,
                entityClass,
                rootGetters,
                projectId,
            );

            setTimeout(
                () => {
                    if (typeof hideModal == 'function') hideModal(entity, res);
                    commit('setDoingRequestState', false);
                },
                400
            );
            return;
        }
        else {
            commit('setDoingRequestState', false);

            console.log('There was an error: ', JSON.stringify(res, null, 4));
        }
    }
}

export function InitCrudActions(params: FactoryParamsI) {
    return {
        getEntities: async (ps: GetEntitiesI, pp: GetEntitiesPassPropsI) => {
            ps.commit('setEntityId', params.entityId);

            return await GetAll.run(
                params.allPath,
                ps.commit,
                ps?.state,
                pp?.getKeys,
                pp?.successCb,
                params?.transformToClassOnGetAll ?? false,
                params.entityClass,
                ps.rootGetters,
                pp?.projectId,
            );
        },
        createEditEntity: async (ps: CreateEditEntitiesI, pp: { projectId: number | string, hideModal: Function }) => {
            ps.commit('setEntityId', params.entityId);

            return await CreateEditOne.run(
                params.editUpdatePath,
                ps.state,
                ps.commit,
                params.entityId,
                pp.hideModal,
                params.entityClass,
                params.allPath,
                params.transformEntityBeforeUpdate,
                params?.transformToClassOnGetAll ?? false,
                params.entityClass,
                ps.rootGetters,
                params.transformEntityAfterClassCreate,
                true,
                pp?.projectId,
            );
        },
        deleteEntity: async (ps: DeleteEditEntitiesI, args: any) => {
            ps.commit('setEntityId', params.entityId);

            return await DeleteOne.run(
                params.editUpdatePath,
                ps.state,
                ps.commit,
                params.entityId,
                args.successCb,
                ps.rootGetters,
                args?.projectId,
            );
        },
    }
}