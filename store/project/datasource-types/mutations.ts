import DatasourceTypeModel from '~/models/DatasourceTypeModel';
import { InitCrudMutations } from '~/factories/crud/Mutations';

export default {
    ...InitCrudMutations({
        storeKey: 'project/datasource-types',
        entityClass: DatasourceTypeModel,
        entityId: 'id'
    }),
}