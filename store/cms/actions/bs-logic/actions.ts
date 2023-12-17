import { InitCrudActions } from '~/factories/crud/Actions';
import ActionBsLogicTypeModel from '~/models/ActionBsLogicTypeModel';

export default {
    ...InitCrudActions({
        allPath: '/cms/action-bs-logic/types',
        editUpdatePath: '/cms/action-bs-logic/type',
        entityId: 'id',
        entityClass: ActionBsLogicTypeModel,
    }),
};