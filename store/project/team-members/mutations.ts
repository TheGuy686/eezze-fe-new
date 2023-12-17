import { InitCrudMutations } from '~/factories/crud/Mutations';
import TeamMemberModel from '~/models/TeamMemberModel';

export default {
    ...InitCrudMutations({
        storeKey: 'project/team-members',
        entityClass: TeamMemberModel,
        entityId: 'id'
    }),
}