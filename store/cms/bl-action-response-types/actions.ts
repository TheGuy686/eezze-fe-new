import { InitCrudActions } from '~/factories/crud/Actions';

export default {
    ...InitCrudActions({
        allPath: '/cms/actions/bl-action-response-type/all',
        editUpdatePath: '/cms/actions/bl-action-response-type',
        entityId: 'id'
    }),
};