// /store/getters.js

import ProjectModel from '~/models/ProjectModel';

export default {
    currentProjectTeams(state: any, getters: any, appState: any, appGetters: any) {
        try {
            const cp = ProjectModel.create(appState?.project?.proj?.currentProjItem);

            return cp?.teams;
        }
        catch (err) { return [] }
    }
}