import { InitCrudActions } from '~/factories/crud/Actions';
import VaultModel from '~/models/VaultModel';

export default {
    ...InitCrudActions({
        allPath: '/credentials-vault/all',
        transformToClassOnGetAll: true,
        entityClass: VaultModel,
        editUpdatePath: '/credentials-vault',
        entityId: 'id'
    }),
};