import BlActionTypeModel from '~/models/BlActionTypeModel';
import { InitCrudMutations } from '~/factories/crud/Mutations';

export default {
    ...InitCrudMutations({
        storeKey: 'cms/bl-action-types',
        entityClass: BlActionTypeModel,
        entityId: 'id'
    }),
}