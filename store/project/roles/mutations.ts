import { InitCrudMutations } from '~/factories/crud/Mutations';
import RoleModel from '~/models/RoleModel';

export default {
    ...InitCrudMutations({
        storeKey: 'project/roles',
        entityClass: RoleModel,
        entityId: 'id'
    }),
}