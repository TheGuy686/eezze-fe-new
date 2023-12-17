import { InitCrudActions } from '~/factories/crud/Actions';
import StoreModel from '~/models/StoreModel';

export default {
    ...InitCrudActions({
        allPath: '/internal/modules/all',
        editUpdatePath: '/store/publish-module',
        entityId: 'id',
        entityClass: StoreModel,
    }),
};