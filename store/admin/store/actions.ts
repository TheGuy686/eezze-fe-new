import { InitCrudActions } from '~/factories/crud/Actions';
import StoreModel from '~/models/StoreModel';

export default {
    ...InitCrudActions({
        allPath: '/admin/store/all/non-approved',
        editUpdatePath: '/admin/store/publish-module',
        entityId: 'id',
        entityClass: StoreModel,
    }),
};