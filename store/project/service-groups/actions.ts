import { InitCrudActions } from '~/factories/crud/Actions';
import ServiceGroupModel from '~/models/ServiceGroupModel';



import Request from '@/classes/Request';

const GLB: any = global;

export default {
    ...InitCrudActions({
        allPath: '/service-group/all',
        editUpdatePath: '/service-group',
        entityId: 'id',
        transformToClassOnGetAll: true,
        entityClass: ServiceGroupModel,
    }),
    async publishToStore(state: any) {
        const res: any = await Request.put(
            '/service-group/publish',
            {
                "id": 2,
                "projectId": "1",
                "serviceGroupId": 3,
                "name": "A Test Module 2",
                "description": "A Test Module Description",
                "scope": "store",
                "category": "cate1",
                "subcategory": "subcat 2"
            },
            { authorization: GLB['AUTH_TOKEN'] }
        )
            .then((data: any) => data.toObject())
            .catch((data: any) => data.toObject());
    },
};