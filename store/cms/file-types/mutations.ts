import { InitCrudMutations } from '~/factories/crud/Mutations';
import FileTypeModel from '~/models/FileTypeModel';

export default {
    ...InitCrudMutations({
        storeKey: 'cms/datasource/types',
        entityClass: FileTypeModel,
        entityId: 'id',
    }),
}