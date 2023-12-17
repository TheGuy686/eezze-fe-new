import { InitCrudActions } from '~/factories/crud/Actions';
import ValueStoreModel from '~/models/ValueStoreModel';

export default {
    ...InitCrudActions({
        allPath: '/value-store/all',
        transformToClassOnGetAll: true,
        entityClass: ValueStoreModel,
        editUpdatePath: '/value-store',
        entityId: 'id'
    }),
};