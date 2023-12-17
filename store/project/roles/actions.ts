import { InitCrudActions } from '~/factories/crud/Actions';
import RoleModel from '~/models/RoleModel';

export default {
    ...InitCrudActions({
        allPath: '/role/all',
        editUpdatePath: '/role',
        entityId: 'id',
        entityClass: RoleModel,
    }),
};