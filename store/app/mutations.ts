import Vue from 'vue';
import { getCookie, randDarkColor, setCookie, deleteAllCookies, tr } from '~/classes/globals';

const GLB: any = global;

var statsWs: any;

let lastX: any, lastY: any, lastProject: any;

const UI_FEEDBACK_MUTATIONS = {
    setMouseCoordinates(state: any, coords: any) {
        Vue.set(state, 'mouseX', coords.mouseX);
        Vue.set(state, 'mouseY', coords.mouseY);
    },
    setDevBarCollapsed(state: any) {
        Vue.set(state, 'devBarCollpsed', !state.devBarCollpsed);
    },
    stopSendingMouseEvents(state: any) {
        if (state._sendMounseEventTmr) clearInterval(state._sendMounseEventTmr);
    },
    sendMouseEvents(state: any) {
        const self: any = this;

        self.commit('app/stopSendingMouseEvents');
  
        clearInterval(state._sendMounseEventTmr);

        state._sendMounseEventTmr = setInterval(() => {
            const wps = `${(state.mouseX / state.windowWidth) * 100}`;
            const hps = `${(state.mouseY / state.windowHeight) * 100}`;

            const wp = Number(parseFloat(wps).toFixed(2)),
                  hp = Number(parseFloat(hps).toFixed(2)),
                  cp = self?.getters['project/proj/currentProject'];

            if (state.mouseX != lastX || state.mouseY != lastY || cp != lastProject) {
                self.commit('app/updateMousePosition', {
                    projectId: cp,
                    mouseX: state.mouseX,
                    mouseY: state.mouseY,
                    widthPercent: wp,
                    heightPercent: hp,
                });

                lastX       = state.mouseX;
                lastY       = state.mouseY;
                lastProject = cp;
            }
            
        }, 20);
    },
    setIsSendingFeedback(state: any, stateBool: boolean) {
        Vue.set(state, 'isSendingFeedback', stateBool);
    },
};

const NOTIS_MUTATIONS = {
    setIsGettingNotifications(state: any, stateBool: boolean) {
        state.isGettingNotifications = stateBool;
    },
    setNotifications(state: any, stateBool: boolean) {
        state.notifications = stateBool;
    },
};

const PROJECT_STATS_MUTATIONS = {
    setProjectStats(state: any, stats: object) {
        state.projectStats = stats;
    },
};

const BL_LOGIC_CHAIN_MUTATIONS = {
    setCurrentBlChain(state: any, args: any) {
        state.finishedEditingCb = args?.finishedCb;
        state.editingBlChainItem = args?.logicChainItem;
    },
};

const GENERAL_UI = {
    setViewMode(state: any, mode: string) {
        Vue.set(state, 'viewMode', mode);
    }
};

const SESSIONS_MUTATIONS = {
    addTeamMemberColor(state: any, uid: string) {
        // if (typeof state.membersColors[uid] == 'string') return;
        Vue.set(state.membersColors, uid, randDarkColor());
    },

    setTeamMemberColor(state: any, args: any) {
        // if (typeof state.membersColors[args.uid] == 'string') return;
        Vue.set(state.membersColors, args.uid, args.color);
    },

    addTeamSession(state: any, user: any) {
        const sessions = {...state.teamSessions()};

        // first add the session
        sessions[user?.id ?? 'na'] = {
            ...user,
            active: true,
        };

        // then get the set the other sessions to inactive in the other projects
        console.log('project sessions: ', state.projectSessions);

        Vue.set(state, 'teamSessions', sessions);
    },
    removeTeamSession(state: any, user: any) {
        const sessions = {...state.teamSessions};

        if (typeof sessions[user?.id] == 'undefined') return;

        delete sessions[user?.id];

        Vue.set(state, 'teamSessions', sessions);
    },
    addGuestSession(state: any, user: any) {
        const sessions = {...state.guestSessions};

        sessions[user?.id ?? 'na'] = user;

        Vue.set(state, 'guestSessions', sessions);
    },
    removeGuestSession(state: any, user: any) {
        const sessions = {...state.guestSessions};

        if (typeof sessions[user?.id] == 'undefined') return;

        delete sessions[user?.id];

        Vue.set(state, 'guestSessions', sessions);
    },
};

const STORE_UI = {
    setIsGettingStoreMenu(state: any, stateBool: boolean) {
        Vue.set(state, 'isGettingStoreMenu', stateBool);
    },
    setStoreMenu(state: any, menu: any) {
        Vue.set(state, 'storeMenu', menu);
    },
    setIsGettingModules(state: any, stateBool: boolean) {
        Vue.set(state, 'isGettingModules', stateBool);
    },
    setCategoryModules(state: any, modules: any) {
        Vue.set(state, 'filteredModules', modules);
    },
    setAppSearch(state: any, term: any) {
        Vue.set(state, 'storeSearch', term);
    },
    setShowSearchView(state: any, stateBool: boolean) {
        Vue.set(state, 'showSearchView', stateBool);
    },
}

export default {
    toggleNotiDrawer(state: any, stateBool: boolean) {
        if (typeof stateBool == 'boolean') {
            state.toggleNotiDrawer = stateBool;
            return;
        }
        state.toggleNotiDrawer =! !!state.toggleNotiDrawer;
    },
    incrementAvatarCounter(state: any) {
        state.avatarCounter++;
    },
    ...NOTIS_MUTATIONS,
    ...PROJECT_STATS_MUTATIONS,
    ...BL_LOGIC_CHAIN_MUTATIONS,
    ...SESSIONS_MUTATIONS,
    ...UI_FEEDBACK_MUTATIONS,
    ...STORE_UI,
    ...GENERAL_UI,

    setWsServerState(state: any, socketState: boolean) {
        Vue.set(state, 'wsServerConnected', socketState);
    },

    setWsServerIsDoingRequest(state: any, socketState: boolean) {
        state.setWsServerIsDoingRequest = socketState;
    },

    setIsMarkingAllNotificationsAsReadRequest(state: any, socketState: boolean) {
        state.isMarkingAllNotificationsAsRead = socketState;
    },

    setIsDeleteingAllNotificationsRequest(state: any, socketState: boolean) {
        state.isDeleteingAllNotifications = socketState;
    },

    itterateProjects(state: any) {
        state.projectsItteration++;
    },

    subscribeToProject(state: any, currentProject: any) {
        if (currentProject == -1 || currentProject == 0 || !currentProject) return;

        statsWs.emitToServer('project-channel-subscription', { 
            projectId: currentProject
        });
    },

    setFilteredUserCollapsible(state: any, ste: any) {
        Vue.set(state, 'filteredUserCollapsibled', !state.filteredUserCollapsibled);
    },

    setWindowHeight(state: any, height: any) {
        Vue.set(state, 'windowHeight', height);
    },

    setWindowWidth(state: any, width: any) {
        Vue.set(state, 'windowWidth', width);
    },

    setFilteredUser(state: any, user: any) {
        Vue.set(state, 'filteredUserProfile', user);
    },

    setProjectSession(state: any, project: any) {
        if (typeof project.id == 'undefined') return;

        state.projectSessions[project.id] = project;
    },

    emitEditingProject(state: any, currentProject: any) {
        if (currentProject == -1 || currentProject == 0 || !currentProject) return;

        statsWs.emitToServer('user-editing-project', { projectId: currentProject } );
    },

    updateMousePosition(state: any, pl: any) {
        if (pl?.projectId == -1 || pl?.projectId == 0 || !pl?.projectId) return;
        if (!statsWs) return;

        const self: any = this;

        let sessions = self.getters['app/teamSessions'].bind({
            '$store': {
                commit: self.commit,
            }
        });

        sessions = sessions()?.sessions;

        if (sessions.length == 1) return;

        //statsWs.emitToServer('host-mouse-moved', pl);
    },

    emitEditingEntities(state: any, prId: any) {
        if (prId == -1 || prId == 0 || !prId) {
            console.error('Project id wasnt set');
            return;
        }

        if (!state?.sessionId || state?.sessionId == '') {
            console.error('session id wasnt set');
            return;
        }

        (this as any).commit('project/erd/setEditingEntitySeshId', state?.sessionId);

        statsWs.emitToServer('editing-entities', {
            projectId: prId,
            sessionId: state.sessionId,
        });
    },

    emitReleaseEntities(state: any, prId: any) {
        if (prId == -1 || prId == 0 || !prId) {
            console.error('Project id wasnt set');
            return;
        }

        if (!state?.sessionId || state?.sessionId == '') {
            console.error('session id wasnt set');
            return;
        }

        statsWs.emitToServer('release-entities', {
            projectId: prId,
            sessionId: state.sessionId,
        });
    },

    setProjectSessionMouseCoors(state: any, pl: any) {
        try {
            let session = state?.projectSessions?.[pl?.projectId]?.sessions?.[pl?.userId];

            Vue.set(session, 'mouseX', pl.mouseX);
            Vue.set(session, 'mouseY', pl.mouseY);
            Vue.set(session, 'hp', pl.hp);
            Vue.set(session, 'wp', pl.wp);
        }
        catch (err) {
            //console.log(`setProjectSessionMouseCoors->There was an error: `, err);
        }
    },

    setSeshionId(state: any, id: any) {
        const cke = getCookie('sessionId');
        if (cke) id = cke;
        else setCookie('sessionId', id, 30);
        Vue.set(state, 'sessionId', id);
    },

    toggleMainMenuCollpsed(state: any, id: any) {
        Vue.set(state, 'mainMenuCollpsed', !state.mainMenuCollpsed);
    },

    setGenerationLoggingWsServerVars(state: any, params: any) {
        let self: any = this,
            dis       = self.dispatch;

        self.commit('app/setWsServerIsDoingRequest', true);

        statsWs = GLB['$eezzeSocket'];

        statsWs.setCommit(self.commit);

        statsWs.on(
            'connected',
            (data: any, commit: any) => commit('app/setWsServerState', true)
        );

        statsWs.on('host-mouse-moved', (data: any, commit: any) => {
            commit('app/setProjectSessionMouseCoors', {
                userId: data.userId,
                projectId: data.projectId,
                mouseX: data.mouseX,
                mouseY: data.mouseY,
                wp: data.widthPercent,
                hp: data.heightPercent,
            });
            commit('app/itterateProjects');
        });

        statsWs.on(
            'project-channel-subscription-state-changed',
            (data: any, commit: any) => {
                const eeSesh = {...data?.editingEntitiesSession ?? {}};

                const project = {
                    ...data?.project ?? {},
                    editingEntitiesSession: eeSesh,
                    sessions: data?.sessions ?? {}
                };

                const editngSeshId = eeSesh?.sessionId;

                if (typeof editngSeshId != 'undefined') {
                    commit('project/erd/setEditingEntitySeshId', editngSeshId);
                }
                else {
                    commit('project/erd/setEditingEntitySeshId', '');
                }

                commit('app/setProjectSession', project);
                commit('app/itterateProjects');

                GLB['events'].emit('refresh-projects');
            }
        );

        statsWs.on(
            'project-channel-subscription-connection',
            (data: any, commit: any) => commit('app/addTeamSession', data.user),
        );

        statsWs.on(
            'datasources-changed',
            (data: any, commit: any) => {
                const currentlyEditing = self?.getters['project/erd/currentlyEditing'];

                if (currentlyEditing) return;

                dis('project/data-sources/getEntities', {
                    successCb: () => {
                        GLB['events'].emit('update-datasources-ui');
                    }
                });
            }
        );

        statsWs.on(
            'project-channel-subscription-disconnect',
            (data: any, commit: any) => commit('app/removeTeamSession', data.user),
        );

        statsWs.on(
            'init-project-data',
            (data: any, commit: any) => commit('app/setWsServerState', true),
        );

        statsWs.on('user-received-notification', () => {
            dis('app/getNotifications', {
                successCb: (notifications: any) => {
                    params.context.$notification.info({
                        message: tr('new-notification'),
                        duration: 4,
                        // onClick: params.onNotificationClicked(notifications)
                        onClick: () => {
                            params.onNotificationClicked(notifications)
                        },
                    });
                },
                errorFallback: () => {
                    params.context.$notification.info({
                        message: tr('new-notification'),
                        duration: 4,
                        // onClick: params.onNotificationClicked(),
                        onClick: () => {
                            params.onNotificationClicked([])
                        }
                    });
                }
            });
        });

        // ---------------- user webhooks end ----------------

        statsWs.on(
            'disconnected',
            (data: any, commit: any) => commit('app/setWsServerIsDoingRequest', false)
        );

        statsWs.on(
            'error',
            (data: any, commit: any) => commit('app/setWsServerIsDoingRequest', false)
        );
    },
}