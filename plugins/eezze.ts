import Vue from 'vue';

import { mapMutations, mapState, mapGetters } from 'vuex';

Vue.prototype.$eezze = {
    $socket: null,
    $loggingSocket: null
};

const GLB: any = global;

Vue.mixin({
    beforeMount() {
        const self: any = this;
        self.currentProject = self.$route?.params?.id ?? -1;
    },
    computed: {
        ...mapState('project/proj', [ 'filteredProject' ]),
        ...mapState('app', [ 'devMode' ]),

        ...mapGetters({
            allMembers: 'project/proj/allMembers',
            currrentProjectObj: 'project/proj/currrentProjectObj',
            teamSessions: 'app/teamSessions',
            guestSessions: 'app/guestSessions',
        }),

        hasSessions() {
            const self: any = this;

            try {
                if (Object.keys(self.teamSessions().sessions ?? []).length > 0) return true;
                if (Object.keys(self.guestSessions().sessions ?? []).length > 0) return true;
            }
            catch (err) { return false }
        },

        projects() {
            try {
                const self: any = this;

                return self?.$store?.state?.project?.proj?.entities ?? [];
            }
            catch (err) { return [] }
        },

        pSesh() {
            try {
                const self: any = this;

                return self?.$store.getters['app/currentProjectSession'];
            }
            catch (err) { return [] }
        },
    },
    data() {
        return {
            currentProjectName: '',
            currentProject: -1,
            _ckTimer: null,
            _setPrJustRanCheck: null,
            _justSetPr: false,
            _emitMouseTmr: null,
        }
    },
    methods: {
        setCoords(event) {
            const self: any = this;

            self.setMouseCoordinates({
                mouseX: event.clientX,
                mouseY: event.clientY,
            });
        },
        setCursorMovementEvent() {
            const self: any = this;

            document.removeEventListener('mousemove', (event: any) => self.setCoords(event));
            document.addEventListener('mousemove', (event: any) => self.setCoords(event));
        },
        refreshConnections(projectId) {
            const self: any = this;
            self.$store.dispatch('project/connections/getEntities', { projectId: projectId });
        },
        refreshDds(projectId) {
            const self: any = this;
            self.$store.dispatch('project/data-sources/getEntities', { projectId: projectId });
        },
        refreshSgsAndServ(projectId) {
            const self: any = this;

            const params = { projectId: projectId };

            self.$store.dispatch('project/service-groups/getEntities', params);
            self.$store.dispatch('project/services/getEntities', params);
        },
        populateProjectData(projectId) {
            const self: any = this;

            if (self.$route.path == '/') return;
      
            self.refreshConnections(projectId);
            
            // App populations
            self.$store.dispatch('app/store/categories/getEntities');

            // const params = { projectId: projectId ?? self.$route.params.id };
            const params = { projectId: projectId };

            self.$store.dispatch('project/value-store/getEntities', params);
            self.$store.dispatch('project/datasource-types/getEntities', params);

            self.refreshSgsAndServ(projectId);
            self.refreshDds(projectId);
            
            self.$store.dispatch('project/service-configurables/getEntities', params);
            self.$store.dispatch('project/vault/getEntities', params);
            self.$store.dispatch('project/roles/getEntities', params);
            
            // CMS populations
            self.$store.dispatch('cms/bl-action-types/getEntities');
            self.$store.dispatch('cms/bl-action-response-types/getEntities');
            self.$store.dispatch('cms/linters/getEntities');

            self.connectToEezzeSocket();

            if (!self.currentProject || self.currentProject == 0) {
                console.log('There is probably something wrong here. Please look into this');
            }

            setTimeout(() => self.subscribeToProject(self.currentProject), 200);
        },
        connectToEezzeSocket() {
            const self: any = this;

            if (self?.$eezze?.$socket?.isConnected) return;

            require('../factories/socket-connection');

            self.$eezze.$loggingSocket = GLB['$eezzeLoggingServer'];

            self.setGenerationLoggingWsServerVars({
                currentProject: self.currentProject,
                context: self,
                onNotificationClicked: self.notificationClicked
            });
        },
        notificationClicked(notifications: any) {
            const self: any = this;
            self.events.emit('notification-clicked');
        },
        notifyWs(evt: string, data: any) {
            const self: any = this;

            self.$eezze.$socket.emitToServer(evt, data);
        },
        getCurrentProject(projectId) {
            try {
                const self: any = this;

                return self.projects.filter((p: any) => p.id == projectId)[0];
            }
            catch (err) { return {} }
        },
        setProject(project) {
            if (!project) return;

            const self: any = this;

            self.currentProject = project.id;

            if (typeof project == 'undefined') return;

            if (self._justSetPr) {
                clearTimeout(self._setPrJustRanCheck);
                self._setPrJustRanCheck = setTimeout(() => self._justSetPr = false, 400);
                return;
            }

            self._justSetPr = true;

            self.setCurrentProject(project);
            self.setNewEditEntity(project);
            self.currentProjectName = project.projectName;

            // if (!GLB.CURRENT_PROJECT || !project?.projectName) {
            //     self.$router.push({ name: 'home' });
            // }

            self._setPrJustRanCheck = setTimeout(() => self._justSetPr = false, 400);
        },
        resetProject() {
            const self: any = this;

            const idparma = Number(self.$route.params.id);

            if (idparma != self.currrentProjectObj?.id) {
                self.setProject(self.getCurrentProject(idparma));
            }
        },
        ...mapMutations({
            setNewEditEntity: 'project/proj/setNewEditEntity',
            setCurrentProject: 'project/proj/setCurrentProject',
            subscribeToProject: 'app/subscribeToProject',
            emitEditingProject: 'app/emitEditingProject',
            setGenerationLoggingWsServerVars: 'app/setGenerationLoggingWsServerVars',
            updateMousePosition: 'app/updateMousePosition',
            setMouseCoordinates: 'app/setMouseCoordinates',
        }),
    },
});
  