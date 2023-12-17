import { InitCrudActions } from '~/factories/crud/Actions';
import TeamModel from '~/models/TeamModel';

const GLB: any = global;

export default {
    ...InitCrudActions({
        allPath: '/project/all',
        editUpdatePath: '/team',
        entityId: 'id',
        entityClass: TeamModel,
    }),
};