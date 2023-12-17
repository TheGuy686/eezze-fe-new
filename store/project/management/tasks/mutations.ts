import { InitCrudMutations } from '~/factories/crud/Mutations';
import TaskBoardModel from '~/models/TaskBoardModel';

export default {
    ...InitCrudMutations({
        storeKey: 'management/task',
        entityClass: TaskBoardModel,
        entityId: 'id'
    }),
}