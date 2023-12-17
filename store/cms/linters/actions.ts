import { InitCrudActions } from '~/factories/crud/Actions';
import LinterModel from '~/models/LinterModel';

export default {
    ...InitCrudActions({
        allPath: '/cms/linter/all',
        editUpdatePath: '/cms/linter',
        entityId: 'id',
        entityClass: LinterModel,
    }),
};