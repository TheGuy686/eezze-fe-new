import { InitCrudActions } from '~/factories/crud/Actions';

export default {
    ...InitCrudActions({
        allPath: '/cms/datasource/type/all',
        editUpdatePath: '/cms/datasource/type',
        entityId: 'id'
    }),
};