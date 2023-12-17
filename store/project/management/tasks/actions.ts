import { InitCrudActions } from '~/factories/crud/Actions';
import TaskBoardModel from '~/models/TaskBoardModel';

export default {
    ...InitCrudActions({
        allPath: '/project/all',
        editUpdatePath: '/management/task',
        entityId: 'id',
        transformToClassOnGetAll: true,
        entityClass: TaskBoardModel,
        transformEntityAfterClassCreate(entity: any, oldEntity: any) {
            return {
                ...oldEntity,
                projectId: entity?.projectId
            };
        }
    }),
};