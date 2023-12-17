import ServiceTypeModel from '~/models/ServiceTypeModel';
import { InitCrudMutations } from '~/factories/crud/Mutations';

export default {
    ...InitCrudMutations({
        storeKey: 'project/service-type',
        entityClass: ServiceTypeModel,
        entityId: 'id'
    }),
}