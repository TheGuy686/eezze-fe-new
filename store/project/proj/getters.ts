// /store/getters.js
const GLB: any = global;

export default {
    currentProject(state: any, getters: any) {
        return state.filteredProject;
    },
    currrentProjectObj(state: any) {
        try {
            return state?.currentProjItem ?? {};
        }
        catch (err) { return { message: 'no project detected'} }
    },
    allMembers(state: any, getters: any, appState: any) {
        let out: any = {};

        for (const p of (appState?.project?.proj?.entities ?? [])) {
            for (const t of p.teams) {
                for (const m of t.members) {
                    out[m.user.id] = {...m.user};
                }
            }
        }

        return out;
    },
}