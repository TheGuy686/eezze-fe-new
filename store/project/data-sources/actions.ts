import { InitCrudActions } from '~/factories/crud/Actions';
import DatasourceModel from '~/models/DatasourceModel';
import Request from '@/classes/Request';

const GLB: any = global;

export default {
    ...InitCrudActions({
        allPath: '/datasource/all',
        editUpdatePath: '/datasource',
        entityId: 'id',
        transformToClassOnGetAll: true,
        entityClass: DatasourceModel,
    }),
    async updateAllEntities(storeArgs: any, args: any) {
        storeArgs.commit('setDoingRequestState', true); 

        const res: any = await Request.put(
            '/datasource/entity/all',
            {
                projectId: args.projectId,
                id: storeArgs.state.filterDatasource,
                initModel: storeArgs.state.entity.initModel,
            },
            {
                authorization: GLB['AUTH_TOKEN']
            }
        )
            .then((data: any) => data.toObject())
            // remember to check this
            .catch((data: any) => data.toObject());

        if (res.success) {
            storeArgs.commit('updateCurrentEditingEntry', res.data);

            setTimeout(() => storeArgs.commit('setDoingRequestState', false), 1000);
            return;
        }

        setTimeout(() => storeArgs.commit('setDoingRequestState', false), 1000);

        console.log('There was an error: ', res);
    },
};