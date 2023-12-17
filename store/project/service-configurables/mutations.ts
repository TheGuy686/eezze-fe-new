import { InitCrudMutations } from '~/factories/crud/Mutations';
import ServiceConfigurableModel from '~/models/ServiceConfigurableModel';

export default {
    ...InitCrudMutations({
        storeKey: 'project/service-configurables',
        entityClass: ServiceConfigurableModel,
        entityId: 'id'
    }),
}