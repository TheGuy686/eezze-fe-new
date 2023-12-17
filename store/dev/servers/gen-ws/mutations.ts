import Vue from 'vue';
import WSocket from '~/classes/WSocket';
import { pascalCase } from '~/classes/globals';
import { WS_HOST } from '~/consts/Endpoints';

import DatasourceModel from '~/models/DatasourceModel';

const GLB: any = global;

var genWsLoggingSocket: WSocket;

const GEN_WS_LOGGING_SERVER = {
    clearWsLogs(state: any) {state.logs = []},

    clearUnitTestLogs(state: any) {
        state.logs = state.logs.filter((log: any) => log.type != 'UNIT-TEST');
    },

    setGeneratorLoggingWsServerConnected(state: any, socketState: boolean) {
        state.loggingServerConnected = socketState;
    },

    setGlwssIsDoingRequest(state: any, requestState: boolean) {
        state.glwssIsDoingRequest = requestState;
    },

    closeGenerationLoggingSocketServer(state: any) {
        genWsLoggingSocket.close();
    },

    setGlwssPeers(state: any, peers: number) {state.glwssPeers = peers},

    addLog(state: any, log: any) {
        Vue.set(state.logs, state.logs.length, log);
    },

    runUt(state: any, params: any) {
        let self: any = this;

        const logger = self.getters['project/data-sources/currentLogger'];
console.clear();
console.log('params: ', params);

        if (logger || Object.keys(logger).length > 0) {
            // run the target UT
            if (typeof params?.item == 'object') {
                const utKey = params.utKey;
            
                const utIds = self.getters['dev/tasks/unitTestingIds'];

                self.commit('dev/tasks/deleteUnitTestPassedIds', utKey);
                self.commit('dev/tasks/deleteUnitTestFailedIds', utKey);

                if (!utIds.includes(utKey)) {
                    self.commit('dev/tasks/addUnitTestingIds', utKey);

                    setTimeout(() => {
                        self.commit('dev/tasks/deleteUnitTestingIds', utKey);
                    }, 6000);
                }

                try {
                    genWsLoggingSocket.emitToServer('exec-unit-tests', {
                        host: logger?.metadata?.host,
                        port: logger?.metadata?.port,
                        projectId: params?.projectId,
                        uts: utKey,
                    });
                }
                catch (err) {}
            }
            // run all of the uts
            else {
                try {
                    genWsLoggingSocket.emitToServer('exec-unit-tests', {
                        host: logger?.metadata?.host,
                        port: logger?.metadata?.port,
                        projectId: params?.projectId,
                    });
                }
                catch (err) {}
            }
        }
    },

    connectToLoggingResource(state: any) {
        var W3CWebSocket = require('websocket').w3cwebsocket;

        let self: any = this;

        const project = self.getters['project/proj/currrentProjectObj'];

        if (!project?.hasLogger) return;

        let logger;

        try {
            logger = DatasourceModel.create(
                self.getters['project/connections/loggers'][0]
            );
        }
        catch (err) {
            console.log('There was an error getting your logger: ', err);
            return;
        }

        const pc   = logger?.metadata?.protocol ?? 'ws',
              host = logger?.metadata?.host ?? 'localhost',
              path = `${logger?.metadata?.path}`,
              port = `${logger?.metadata?.port ? `:${logger?.metadata?.port}` : ''}`;

        const url = `${pc}://${host}${port}${path}?token=${GLB['AUTH_TOKEN']}`;

        genWsLoggingSocket = new WSocket(new W3CWebSocket(url));

        genWsLoggingSocket.setCommit(self.commit);

        genWsLoggingSocket.on(
            'connected',
            (data: any, commit: any) => {
                commit('dev/servers/gen-ws/setGeneratorLoggingWsServerConnected', true);
                commit('dev/servers/gen-ws/setGlwssIsDoingRequest', false);

                setTimeout(() => {
                    genWsLoggingSocket.emitToServer('project-logging-channel', { 
                        projectId: project.id
                    });
                }, 2000);
            }
        );

        // genWsLoggingSocket.on(
        //     'socket-stats',
        //     (data: any, commit: any) => {
        //         commit('dev/servers/gen-ws/setGlwssPeers', data.peers);
        //     }
        // );

        genWsLoggingSocket.on(
            'project-channel-subscription-state-changed',
            (data: any, commit: any) => {
console.log('Logging project data: ', data);
                // const project = {...data?.project ?? {}, sessions: data?.sessions ?? {}};
                
                // commit('app/setProjectSession', project);
                // commit('app/itterateProjects');

                // GLB['events'].emit('refresh-projects');
            }
        );

        genWsLoggingSocket.on(
            'log',
            (log: any, commit: any) => {
                // this is the event that is fired when unit test is successful
                if (log?.callSrc == 'unit-test-success') {
                    self.commit('dev/tasks/addUnitTestPassedIds', log?.message?.id);
                }

                commit('dev/servers/gen-ws/addLog', log);
            }
        );

        genWsLoggingSocket.on(
            'disconnected',
            (data: any, commit: any) => {
                commit('dev/servers/gen-ws/setGeneratorLoggingWsServerConnected', false);
                commit('dev/servers/gen-ws/setGlwssPeers', 0);
            }
        );

        genWsLoggingSocket.on(
            'error',
            (data: any, commit: any) => {
                commit('dev/servers/gen-ws/setGeneratorLoggingWsServerConnected', false);
                commit('dev/servers/gen-ws/setGlwssIsDoingRequest', false);
                commit('dev/servers/gen-ws/setGlwssPeers', 0);
            }
        );
    },
};

export default {
    ...GEN_WS_LOGGING_SERVER,
};