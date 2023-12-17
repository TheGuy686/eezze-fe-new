import { InitCrudActions } from '~/factories/crud/Actions';
import StoreCategoryModel from '~/models/StoreCategoryModel';

export default {
    ...InitCrudActions({
        allPath: '/store/categories',
        editUpdatePath: '/store/category',
        entityId: 'id',
        transformToClassOnGetAll: true,
        entityClass: StoreCategoryModel,
    }),
};