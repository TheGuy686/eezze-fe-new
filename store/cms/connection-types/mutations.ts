import { InitCrudMutations } from '~/factories/crud/Mutations';
import ConnectionTypeModel from '~/models/ConnectionTypeModel';

export default {
    ...InitCrudMutations({
        storeKey: 'cms/connection-type',
        entityClass: ConnectionTypeModel,
        entityId: 'id',
    }),
}