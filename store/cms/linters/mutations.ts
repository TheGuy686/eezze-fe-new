import { InitCrudMutations } from '~/factories/crud/Mutations';
import LinterModel from '~/models/LinterModel';

export default {
    ...InitCrudMutations({
        storeKey: 'cms/linter',
        entityClass: LinterModel,
        entityId: 'id',
    }),
}