import { InitCrudActions } from '~/factories/crud/Actions';

export default {
    ...InitCrudActions({
        allPath: '/cms/response/code/all',
        editUpdatePath: '/cms/response/code',
        entityId: 'id'
    }),
};