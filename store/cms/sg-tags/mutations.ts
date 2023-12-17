import { InitCrudMutations } from '~/factories/crud/Mutations';
import DatasourceTypeModel from '~/models/DatasourceTypeModel';

export default {
    ...InitCrudMutations({
        storeKey: 'cms/sg-tags',
    }),
}