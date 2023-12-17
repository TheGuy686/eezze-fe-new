import { InitCrudMutations } from '~/factories/crud/Mutations';
import ServiceGroupTypeModel from '~/models/ServiceGroupTypeModel';

export default {
    ...InitCrudMutations({
        storeKey: 'cms/service-group-types',
        entityClass: ServiceGroupTypeModel,
        entityId: 'id',
    }),
}