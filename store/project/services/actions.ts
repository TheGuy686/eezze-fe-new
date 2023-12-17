import { InitCrudActions } from '~/factories/crud/Actions';
import ServiceModel from '~/models/ServiceModel';

export default {
    ...InitCrudActions({
        allPath: '/service/all',
        transformToClassOnGetAll: true,
        entityClass: ServiceModel,
        editUpdatePath: '/service',
        entityId: 'id',
    }),
};