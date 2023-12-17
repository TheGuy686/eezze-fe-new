import Vue from 'vue';
import ProjectModel from '~/models/ProjectModel';
import { InitCrudMutations } from '~/factories/crud/Mutations';
import { setCookie } from '~/classes/globals';

export default {
    ...InitCrudMutations({
        storeKey: 'project/proj',
        entityClass: ProjectModel,
        entityId: 'id',
    }),

    setCurrentProject(state: any, project: any) {
        Vue.set(state, 'filteredProject', project.id);
        Vue.set(state, 'currentProjItem', project);
    },
    setIsCreatingProjectFromWizard(state: any, ste: boolean) {
        Vue.set(state, 'isCreatingProjectFromWizard', ste);
    },
    setIsDeployingProject(state: any, ste: boolean) {
        Vue.set(state, 'isDeployingProject', ste);
    },
}