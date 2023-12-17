import { InitCrudActions } from '~/factories/crud/Actions';

export default {
    ...InitCrudActions({
        allPath: '/service-config/all',
        editUpdatePath: '/service-config',
        entityId: 'id'
    }),
};