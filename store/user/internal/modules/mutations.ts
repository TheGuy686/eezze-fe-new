import { InitCrudMutations } from '~/factories/crud/Mutations';
import StoreModel from '~/models/StoreModel';

export default {
    ...InitCrudMutations({
        storeKey: 'user/internal/modules',
        entityClass: StoreModel,
    }),
}