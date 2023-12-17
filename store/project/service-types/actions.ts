import { InitCrudActions } from '~/factories/crud/Actions';

export default {
    ...InitCrudActions({
        allPath: '/service-type/all',
        editUpdatePath: '/service-type',
        entityId: 'id'
    }),
};