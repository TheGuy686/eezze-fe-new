import { InitCrudMutations } from '~/factories/crud/Mutations';
import VaultModel from '~/models/VaultModel';

export default {
    ...InitCrudMutations({
        storeKey: 'project/vault',
        entityClass: VaultModel,
        entityId: 'id'
    }),
}