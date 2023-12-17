import { InitCrudActions } from '~/factories/crud/Actions';
import DatasourceTypeModel from '~/models/DatasourceTypeModel';

export default {
    ...InitCrudActions({
        allPath: '/cms/datasource/types',
        editUpdatePath: '/cms/datasource/type',
        entityId: 'datasourceTypeId',
        entityClass: DatasourceTypeModel,
    }),
};