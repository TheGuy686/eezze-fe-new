import { InitCrudMutations } from '~/factories/crud/Mutations';
import StoreModel from '~/models/StoreModel';

export default {
    ...InitCrudMutations({
        storeKey: 'admin/store',
        entityClass: StoreModel,
    }),
}