import { InitCrudMutations } from '~/factories/crud/Mutations';
import TeamModel from '~/models/TeamModel';

export default {
    ...InitCrudMutations({
        storeKey: 'project/teams',
        entityClass: TeamModel,
        entityId: 'id'
    }),
}