import { InitCrudActions } from '~/factories/crud/Actions';
import ConnectionTypeModel from '~/models/ConnectionTypeModel';

export default {
    ...InitCrudActions({
        allPath: '/cms/connection-type/all',
        editUpdatePath: '/cms/connection-type',
        entityId: 'id',
        entityClass: ConnectionTypeModel,
    }),
};