<style lang="less">
@import '~/assets/styles/custom/main.less';

.dev-env-unit-test-list-item-root {
    padding: 0.01px;
    margin-bottom: 10px;

    .run-uts-btns-cont {
        flex-direction: row-reverse !important; 
        padding-right: 10px !important;
    }

    .title {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
    }

    .list-item {
        margin-bottom: 5px;

        .ledgend {padding-left: 20px}
        .method-get {color: #2196f3;}
        .method-post {color: #4caf50;}
        .method-put {color: #ff9800;}
        .method-delete {color: #f44336;}

        .actions-cont {
            align-items: center;
            flex-direction: row-reverse !important;

            .icn-execute {margin-left: 8px;}
        }

        &:hover {
            cursor: pointer;
            color: var(--primary-blue) !important;
        }
    }

    .disabled-no-hover {
        cursor:  not-allowed !important;
    }

    .no-hover {
        &:hover{
            cursor: progress;

            span {
                color: black !important;
                font-weight: normal !important;
            }
        }
    }
}
</style>

<template>
<a-col no-padding class="dev-env-unit-test-list-item-root">

    <a-row no-padding>

        <a-col no-padding :span="isPopoverContext ? 17 : 19">

            <h3 class="title">{{ group.title }}</h3>

        </a-col>

        <a-col class="run-uts-btns-cont" no-padding :span="isPopoverContext ? 7 : 5">

            <EButtonWithTt
                eStyle="margin-right: -10px;"
                :disabled="btnTtText != ''"
                :loading="isRunningAllUts"
                :btnText="paths.length > 0 ? `Run All UT's` : `No UT's`"
                :toolTipText="btnTtText"
                @click="executeAllGroupUts"
            />

        </a-col>

    </a-row>

    <div 
        no-padding
        :class="pathClass(m.handler)"
        :key="mi"
        v-for="(m, mi) in paths"
        @click="executePathUT(m.handler)"
    >

        <a-col no-padding :span="16" class="ledgend">

            <span>
                            
                /{{ (m.path + '').replace(/^[\/]/, '') }}
                
            </span>

        </a-col>

        <a-row no-padding :span="8" class="actions-cont">

            <a-icon
                :style="itemIconStyle(m.handler)"
                :type="itemIconType(m.handler)" 
                class="icn-execute"
            />

            <span :class="`method-${m.method}`">
                
                {{ m.method.toUpperCase() }}
                
            </span>

        </a-row>

    </div>

</a-col>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
    props: {
        group: {
            type: Object,
            required: true
        },
        isPopoverContext: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        btnTtText() {
            if (!this.loggingServerConnected) {
                return 'Please connect to development WS to run UT\'s'
            }

            if (this.paths.length == 0) {
                return 'No unit tests are available';
            }

            return '';
        },

        isRunningAllUts() {return false},

        pathClass() {
            return (pathId) => {
                let out = 'list-item non-sel';

                if (this.isRunningUt(pathId)) {
                    out += ' no-hover';
                }

                if (!this.loggingServerConnected) {
                    out += ' disabled-no-hover';
                }

                return out;
            }
        },

        itemIconType() {
            return (pathId) => {
                if (!this.loggingServerConnected) {
                    return 'close-circle';
                }
                else if (this.lastPassedUts.includes(pathId)) {
                    return 'check-circle';
                }
                else if (this.lastFailedUts.includes(pathId)) {
                    return 'close-circle';
                }
                else if (this.isRunningUt(pathId)) {
                    return 'loading';
                }

                return 'play-circle';
            }
        },
        
        itemIconStyle() {
            return (pathId) => {
                if (!this.loggingServerConnected) {
                    return 'color: gray;';
                }
                else if (this.lastPassedUts.includes(pathId)) {
                    return 'color: green;';
                }
                else if (this.lastFailedUts.includes(pathId)) {
                    return 'color: red;';
                }
                else if (this.isRunningUt(pathId)) {
                    return '';
                }

                return '';
            };
        },
        paths() {
            if (typeof this.group['paths'] != 'object') return [];

            let out = [], k, m, path;

            // loop over each path
            for (k in this.group.paths) {
                path = this.group.paths[k];

                // now loop over watch method
                for (m in path) {
                    out.push(
                        {
                            methodIndex: parseInt(m),
                            method: k,
                            ...path[m],
                        }
                    );
                }
            }

            return out;
        },
        isRunningUt() {
            return (key) => {
                return this.unitTestingIds.includes(key);
            }
        },
        ...mapState('dev/tasks', ['unitTestingIds', 'lastPassedUts', 'lastFailedUts']),
        ...mapState('dev/servers/gen-ws', [
            'apiServerConnected', 
            'loggingServerConnected',
            'generatorWsServerConnected',
        ]),
    },
    methods: {
        executeAllGroupUts() {
            if (this.paths.length == 0) {
                return this.$notification.error(
                    {
                        placement: 'topRight',
                        message: 'Opperation Un Successful',
                        description: 'There was no valid unit tests to run',
                    }
                );
            }

            this.paths.forEach((path) => {
                this.addUnitTestingIds(path.handler);
                this.deleteUnitTestPassedIds(path.handler);
                this.deleteUnitTestFailedIds(path.handler);
                this.$store.dispatch('dev/tasks/bootUpUnitTests', path.handler);
            });

            this.clearUnitTestLogs();
        },
        executePathUT(handler) {
            if (!this.loggingServerConnected) return;

            this.addUnitTestingIds(handler);
            this.deleteUnitTestPassedIds(handler);
            this.deleteUnitTestFailedIds(handler);
            
            this.$store.dispatch('dev/tasks/bootUpUnitTests', handler);
        },
        ...mapMutations({
            addUnitTestingIds: 'dev/tasks/addUnitTestingIds',
            deleteUnitTestPassedIds: 'dev/tasks/deleteUnitTestPassedIds',
            deleteUnitTestFailedIds: 'dev/tasks/deleteUnitTestFailedIds',
            clearUnitTestLogs: 'dev/servers/gen-ws/clearUnitTestLogs',
        }),
    }
};
</script>
