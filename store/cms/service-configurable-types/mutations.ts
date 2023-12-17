import { InitCrudMutations } from '~/factories/crud/Mutations';
import ServiceConfigurableModel from '~/models/ServiceConfigurableModel';

export default {
    ...InitCrudMutations({
        storeKey: 'cms/service-configurable/types',
        entityClass: ServiceConfigurableModel,
        entityId: 'id',
    }),
}