import { InitCrudActions } from '~/factories/crud/Actions';
import ProjectModel from '~/models/ProjectModel';
import Request from '@/classes/Request';

const GLB: any = global;

export default {
    ...InitCrudActions({
        allPath: '/project/all',
        editUpdatePath: '/project',
        entityId: 'id',
        entityClass: ProjectModel,
        transformToClassOnGetAll: true,
    }),
    async deployProject(storeArgs: any, pl: any) {
        storeArgs.commit('setIsDeployingProject', true);

        let self: any = this,
            dis       = self.dispatch;

        const res: any = await Request.post(
            '/project/deploy',
            {
                projectId: pl.projectId,
            },
            {
                authorization: GLB['AUTH_TOKEN']
            }
        )
            .then((data: any) => data.toObject())
            .catch((data: any) => data.toObject());

        if (res.success) {
            dis('project/proj/getEntities', { successCb: () => pl.successCb() });

            setTimeout(() => storeArgs.commit('setIsDeployingProject', false), 1000);
            return;
        }

        setTimeout(() => storeArgs.commit('setIsDeployingProject', false), 1000);

        console.log('There was an error: ', res);
    },
    async createProjectFromWizard(storeArgs: any, pl: any) {
        storeArgs.commit('setIsCreatingProjectFromWizard', true);

        let self: any = this,
            dis       = self.dispatch;

        const res: any = await Request.post(
            '/project/scaffold',
            {
                project: pl.project,
            },
            {
                authorization: GLB['AUTH_TOKEN']
            }
        )
            .then((data: any) => data.toObject())
            .catch((data: any) => data.toObject());

        setTimeout(() => {
            storeArgs.commit('setIsCreatingProjectFromWizard', false);

            console.log('THIS: '), self;

        }, 5000);

        if (res.success) {
            dis('project/proj/getEntities', { successCb: () => pl.successCb() });

            setTimeout(() => storeArgs.commit('setIsCreatingProjectFromWizard', false), 1000);
            return;
        }

        setTimeout(() => storeArgs.commit('setIsCreatingProjectFromWizard', false), 1000);

        console.log('There was an error: ', res);
    },
};