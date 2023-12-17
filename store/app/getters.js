export default {
    currentProjectSession(state, getters, appState, appGetters) {
        const cp = appGetters?.['project/proj/currentProject'];

        return {
            itteration: state.projectsItteration,
            project: state?.projectSessions?.[cp] ?? {}
        }
    },

    teamSessions(state, getters) {
        return function () {
            const self = this;

            const cp       = getters.currentProjectSession?.project ?? {},
                  sessions = cp?.sessions ?? {};

            const out = [];

            for (let conId in sessions) {
                const sesh = {
                    ...sessions[conId],
                    connectionId: conId
                };

                self.$store.commit('app/setTeamMemberColor', {
                    uid: sesh.email,
                    color: sesh.avatarColor,
                });

                out.push(sesh);
            }

            return {
                itteration: state.projectsItteration,
                sessions: out
            }
        }
    },

    guestSessions(state) { 
        return function () {
            // const self = (this as any);

            return {
                itteration: 0,
                sessions: []
            }
        }
    },

    teamSessionDict(state, getters) {
        let out = {}, seshs = getters.teamSessions().sessions;

        for (let i in seshs) out[seshs[i].id] = i;

        return out;
    },

    memberColor(state) {
        return function (uid) {
            const self = this;

            if (typeof state.membersColors?.[uid] == 'undefined') {
                self.$store.commit('app/addTeamMemberColor', uid);
            }

            return state.membersColors?.[uid];
        };
    },
}