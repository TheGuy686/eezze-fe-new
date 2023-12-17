import ConnectionModel from '~/models/ConnectionModel';
import { InitCrudMutations } from '~/factories/crud/Mutations';

export default {
    ...InitCrudMutations({
        storeKey: 'project/connections',
        entityClass: ConnectionModel,
        entityId: 'id'
    }),
}