import { InitCrudMutations } from '~/factories/crud/Mutations';
import ValueStoreModel from '~/models/ValueStoreModel';

export default {
    ...InitCrudMutations({
        storeKey: 'project/value-store',
        entityClass: ValueStoreModel,
        entityId: 'id'
    }),
}