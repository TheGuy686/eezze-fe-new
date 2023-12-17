import { InitCrudActions } from '~/factories/crud/Actions';
import ConnectionModel from '~/models/ConnectionModel';

export default {
    ...InitCrudActions({
        allPath: '/connection/all',
        editUpdatePath: '/connection',
        entityClass: ConnectionModel,
        transformToClassOnGetAll: true,
        entityId: 'id',
    }),
};