import { InitCrudActions } from '~/factories/crud/Actions';

export default {
    ...InitCrudActions({
        allPath: '/cms/sg-tag/all',
        editUpdatePath: '/cms/sg-tag',
        entityId: 'id',
    }),
};