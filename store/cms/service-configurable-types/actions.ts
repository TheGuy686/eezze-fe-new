import { InitCrudActions } from '~/factories/crud/Actions';
import ServiceConfigurableModel from '~/models/ServiceConfigurableModel';

export default {
    ...InitCrudActions({
        allPath: '/cms/service-configurable',
        editUpdatePath: '/cms/fservice-configurable',
        entityId: 'id',
        entityClass: ServiceConfigurableModel,
    }),
};