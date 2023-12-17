import { InitCrudMutations } from '~/factories/crud/Mutations';
import DatasourceTypeModel from '~/models/DatasourceTypeModel';

export default {
    ...InitCrudMutations({
        storeKey: 'cms/datasource/types',
        entityClass: DatasourceTypeModel,
    }),
}