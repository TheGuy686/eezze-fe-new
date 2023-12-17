import { InitCrudActions } from '~/factories/crud/Actions';
import ServiceGroupTypeModel from '~/models/ServiceGroupTypeModel';

export default {
    ...InitCrudActions({
        allPath: '/cms/service-group-type/all',
        editUpdatePath: '/cms/service-group-type',
        entityId: 'id',
        entityClass: ServiceGroupTypeModel,
    }),
};