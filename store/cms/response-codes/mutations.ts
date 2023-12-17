import ResponseCodeModel from '~/models/ResponseCodeModel';
import { InitCrudMutations } from '~/factories/crud/Mutations';

export default {
    ...InitCrudMutations({
        storeKey: 'project/response-codes',
        entityClass: ResponseCodeModel,
        entityId: 'id'
    }),
}