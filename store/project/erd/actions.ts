import { InitCrudActions } from '~/factories/crud/Actions';
import Request from '@/classes/Request';
import EntityModel from '~/models/EntityModel';

const GLB: any = global;

export default {
    ...InitCrudActions({
        allPath: '/entity/all',
        editUpdatePath: '/entity',
        entityId: 'id',
        transformToClassOnGetAll: true,
        entityClass: EntityModel,
    }),
};