import ServiceModel from '~/models/ServiceModel';
import { InitCrudMutations } from '~/factories/crud/Mutations';

export default {
    ...InitCrudMutations({
        storeKey: 'project/services',
        entityClass: ServiceModel,
        entityId: 'id',
    }),
}