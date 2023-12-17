import { InitCrudActions } from '~/factories/crud/Actions';
import FileTypeModel from '~/models/FileTypeModel';

export default {
    ...InitCrudActions({
        allPath: '/cms/file-type/all',
        editUpdatePath: '/cms/file-type',
        entityId: 'id',
        entityClass: FileTypeModel,
    }),
};