import BlActionResponseTypeModel from '~/models/BlActionResponseTypeModel';
import { InitCrudMutations } from '~/factories/crud/Mutations';

export default {
    ...InitCrudMutations({
        storeKey: 'cms/bl-action-response-types',
        entityClass: BlActionResponseTypeModel,
        entityId: 'id'
    }),
}