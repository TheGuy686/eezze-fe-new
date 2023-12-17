<style lang="less">
@import "~/assets/styles/custom/main.less";

.visible-extra-in-closed-mode {
    background-color: white;
    margin-left: -250px;
    border-radius: 5px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
}

.method-tablet {
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 5px;
    border: 1px solid;
    margin-right: 8px;
}

.main-list-unit-test-logs-cont {
    transition: margin-left 400ms;

    .ant-timeline {
        max-height: 43vh !important;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            width: 10px;
            cursor: pointer;
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
            background: rgb(177, 175, 175);
            border-radius: 20px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #555;
            border-radius: 20px;
            cursor: pointer;
        }
    }

    .logs-cont {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        
        .header {
            padding: 8px 16px;
            border-bottom: 1px solid #e8e8e8;

            b {
                font-size: 11px;
            } 
        }

        .tl-content {
            padding: 10px;
        }
    }

    .gen-log-item {
        font-size: 11px;
        letter-spacing: 0.055rem;
        display: flex;
        vertical-align: middle;
        padding-bottom: 0.01px !important;

        .cmd-title {
            padding-top: 4px;
            margin-bottom: 8px;
            font-weight: bold;
        }

        .unit-test-row-item {
            .icn-success {
                color: green;
                font-weight: bold;
                font-size: 13px;
                margin-left: 5px;
            }

            .icn-error {
                color: red;
                font-weight: bold;
                font-size: 13px;
                margin-left: 5px;
            }
        }
    }
}
</style>

<template>
<div 
    :class="'main-list-unit-test-logs-cont ' + (
        isClosedContext && Object.keys(logsUnitTest).length > 0 ? 'visible-extra-in-closed-mode' : ''
    )"
>
    <div class="pt-5 pr-1 mt-2" style="max-height: 50%" e-scroll>

        <a-list bordered :data-source="restUts" size="small">

            <template #header>

                <h3>{{ tr('rest-uts') }}</h3>

            </template>

            <template #renderItem="item">

                <a-list-item non-sel>
                    
                    <e-row>

                        <e-row ai="c" w-75>

                            <div class="method-tablet" :style="restMethodColor(item?.definition?.method)">

                                {{ (item?.definition?.method ?? '')?.toUpperCase() }}

                            </div>

                            /{{ item?.definition?.path }}

                        </e-row>

                        <e-row ai="c" jc="fe" w-25>

                            <a-button
                                size="small"
                                @click="runUt({
                                    projectId: item.projectId,
                                    item: item,
                                    utId: item.id,
                                    utKey: utKey(item),
                                })"
                                v-if="!utIsRunning(item)"
                            >
                               {{ tr('run', { toLower: true }) }}

                            </a-button>

                            <a-button
                                style="padding-left: 11px; padding-right: 27px;"
                                size="small"
                                :loading="true"
                                v-show="utIsRunning(item)"
                            >
                        
                                {{ ' ' }}

                            </a-button>

                        </e-row>

                    </e-row>

                </a-list-item>

            </template>

        </a-list>

    </div>

    <div class="logs-cont mt-5" v-if="Object.keys(logsUnitTest).length > 0">

        <a-row class="header" ver-center>

            <a-col no-padding :span="18">

                <b>{{ tr('unit-test-results') }}</b>

            </a-col>

            <e-row no-padding :span="6" dir="r">

                <a-button size="small" @click="$store.commit('dev/servers/gen-ws/clearWsLogs')">

                    {{ tr('clear-logs') }}

                </a-button>

            </e-row>

        </a-row>

        <a-timeline class="tl-content">

            <a-timeline-item
                class="gen-log-item"
                :color="groupWasSuccessful(logs) ? 'green' : 'red'"
                :key="key"
                v-for="(logs, key) in logsUnitTest"
            >
                <h3 class="cmd-title">{{ tr('unit-test') }}: {{ key }}</h3>

                <a-row class="unit-test-row-item" no-padding :key="ii" v-for="(log, ii) in logs">
                    
                    <p v-html="formatItemMessage(log.message, log.level)" />

                    <a-icon 
                        :type="wasSuccessful(log.message) ? 'check-circle' : 'close-circle'"
                        :class="wasSuccessful(log.message) ? 'icn-success' : 'icn-error'"
                        v-if="log?.level != 'INFO' && wasSuccessful(log)"
                    />
                    
                </a-row>

            </a-timeline-item>

        </a-timeline>

    </div>

    <div style="padding-top: 40px;" v-else>

        <a-empty />

        <div style="height: 30px;" />

    </div>

</div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
    beforeCreate() {self = this},
    props: {
        isClosedContext: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('dev/servers/gen-ws', [ 'logs' ]),
        ...mapState('dev/tasks', [
            'unitTestingIds',
            'lastPassedUts',
            'lastFailedUts'
        ]),
        ...mapGetters({
            restUts: 'dev/tasks/restUts',
        }),
        
        utKey() {
            return function (item) {
                const type = item.type == 'websocket' ? 'ws' : item.type;
                return `${pascalCase(item.sg.name)}.${pascalCase(type)}.${pascalCase(item.name)}.default`;
            }
        },
        utIsRunning() {
            return function (item) {
                return this.unitTestingIds.includes(this.utKey(item));
            }
        },
        logsF() {
            return this.logs.filter((l) => {
                return /unit-test/.test(l?.callSrc ?? '');
            });  
        },
        wasSuccessful() {
            return (log) => {
                return !(log.level == 'CRITICAL' || log.level == 'ERROR');
            }
        },
        groupWasSuccessful() {
            return (logs) => {
                for (let log of logs) {
                    if (!this.wasSuccessful(log)) return false;
                }

                return true;
            };
        },
        logsUnitTest() {
            let logs = {};

            for (let log of this.logsF) {
                let operationId = log.message.operationId;

                if (typeof logs[operationId] == 'undefined') {
                    logs[operationId] = [];
                }

                logs[operationId].push({
                    level: log.level,
                    message: log.message
                });
            }

            return logs;
        },
    },
    data() {
        return {
            search: '',
            searchColumns: [],
            searchColumnFormatter: undefined,
            stateTmr: null,
        }
    },
    methods: {
        restMethodColor(method) {
            switch (method) {
                case 'get': return 'border-color: rgba(39, 174, 96, 1); color: rgba(39, 174, 96, 1);';
                case 'post': return 'border-color: rgba(63, 136, 197, 1); color: rgba(63, 136, 197, 1);';
                case 'put': return 'border-color: rgba(226, 185, 59, 1); color: rgba(226, 185, 59, 1);';
                case 'delete': return 'border-color: rgba(235, 87, 87, 1); color: rgba(235, 87, 87, 1);';
            }
        },
        isRunningUt(item) {
            return this.unitTestingIds.includes(this.utKey(item));
        },
        formatItemMessage(message, logLevel) {
            let out = '';

            if (message?.data?.status) {
                out += `<b><i>${tr('status-code')}</i></b>: ${message.data.status}<br>`;
                
                if (message?.data?.data) {
                    out += `<b><i>${tr('data')}</i></b>: ${JSON.stringify(message.data.data, null, 4)}<br>`;
                }
            }

            if (logLevel == 'ERROR') {
                return `<div style="padding-bottom: 8px;"><span style="color: red;"><b><i>${tr('error')}</i></b>: ${message.data.message}<br></span></div>`;
            }

            if (message?.data?.body) {
                out += `<b><i>${tr('body')}</i></b>: ${JSON.stringify(message.data.body, null, 4)}<br>`;
            }

            if (message?.data?.message) {
                if (logLevel == 'SUCCESS') {
                    out += `<div style="padding-bottom: 8px;"><span style="color: green;"><b><i>${logLevel}</i></b></span>: ${message.data.message}<br></div>`;
                }
                else {
                    out += `<b><i>${logLevel ?? 'Error'}</i></b>: ${message.data.message}<br>`;
                }
            }

            if (out != '') return out;

            return `<b><i>${logLevel ?? 'Error'}</i></b>: ${typeof message == 'object' ? JSON.stringify(message) : message}`;
        },

        ...mapMutations({
            deleteUnitTestingIds: 'dev/tasks/deleteUnitTestingIds',
            addUnitTestPassedIds: 'dev/tasks/addUnitTestPassedIds',
            deleteUnitTestPassedIds: 'dev/tasks/deleteUnitTestPassedIds',
            addUnitTestFailedIds: 'dev/tasks/addUnitTestFailedIds',
            deleteUnitTestFailedIds: 'dev/tasks/deleteUnitTestFailedIds',
            runUt: 'dev/servers/gen-ws/runUt',
        }),
    }
};
</script>
