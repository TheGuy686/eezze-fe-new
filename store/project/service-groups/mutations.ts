import ServiceGroupModel from '~/models/ServiceGroupModel';
import { InitCrudMutations } from '~/factories/crud/Mutations';

export default {
    ...InitCrudMutations({
        storeKey: 'project/service-groups',
        entityClass: ServiceGroupModel,
        entityId: 'id'
    }),
}