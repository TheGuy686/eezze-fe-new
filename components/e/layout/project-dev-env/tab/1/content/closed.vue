<style lang="less">
.closed-dev-env-cont-1 {
    .server-notification-cont {
        position: relative;
        padding: 6px;

        .notification-dot {
            left: -5px;
            top: 1px;
        }

        .server-dot {
            position: absolute;
            top: 15px;
            left: 8px;
        }
    }

    .bottom-section {
        height: 81vh;
        
        .dev-section {
            flex: 16;
            height: 500px;
        }

        .help-section {
            flex: 1;
            flex-direction: column-reverse;
            justify-content: center;
        }
    }

    .server-offline {
        .ant-radio-checked.ant-radio-inner{
            border-color: var(--offline-gray) !important;
        }
        .ant-radio-checked.ant-radio-inner::after{background-color: var(--offline-gray) !important;}
        .ant-radio:hover.ant-radio-inner {border-color: var(--offline-gray) !important;}
        .ant-radio-input, .ant-radio-inner {cursor: default !important;}
    }

    .server-offline {
        .ant-radio-checked.ant-radio-inner{
            border-color: var(--offline-gray) !important;
        }
        /* .ant-radio-inner::after{background-color: var(--offline-gray) !important;}
        .ant-radio-inner {border-color: var(--offline-gray) !important;}
        .ant-radio-inner {cursor: default !important;} */
    }

    .server-online-with-issues {
        .ant-radio-inner{border-color: orange !important;}
        .ant-radio-inner::after{background-color: orange;}
        .ant-radio-inner {border-color: orange;}
        .ant-radio-inner {cursor: default !important;}
    }

    .server-online {
        .ant-radio-inner{border-color: green !important;}
        .ant-radio-inner::after{background-color: green;}
        .ant-radio-inner {border-color: green;}
        .ant-radio-inner {cursor: default !important;}
    }

    .non-clickable-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .closed-btn-item {
        width: 22px;
        height: 22px;
        border-radius: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        display: flex;
        background-color: white;
        justify-content: center;
        align-items: center;
        border: dashed 1px #a7a7a7;
        cursor: pointer;
        font-size: 10px;
        color: black;
        font-weight: bold;

        &:hover {
            background-color: var(--primary-blue);
            border: 1px solid var(--primary-blue);
            color: white;
        }
    }
}
</style>

<template>
<a-col no-padding class="closed-dev-env-cont-1">

    <div class="server-notification-cont development-ws">

        <a-tooltip placement="leftBottom">

            <template slot="title">

                <span>{{ tr('development-ws') }}</span>

            </template>

            <div :class="loggingServerConnected ? 'server-online' : 'server-offline'">

                <a-badge :count="server1Feedback.length" class="notification-dot" />

                <a-radio
                    id="dot"
                    class="server-dot"
                    :disabled="true"
                    v-model="loggingServerConnected"
                />

                <div class="non-clickable-overlay"></div>

            </div>

        </a-tooltip>

    </div>

    <a-divider style="margin: 10px 0.01px;" />

    <a-col ver-center no-padding class="bottom-section">

        <a-col no-padding ver-center class="dev-section">

            <a-tooltip placement="leftBottom">

                <template slot="title">

                    <span>{{ tr('unit-tests') }}</span>

                </template>

                <a-popover trigger="click" placement="leftTop" v-model="utMenuVisible">

                    <a-row style="justify-content: space-between;" no-padding slot="title">

                        <a-row no-padding>

                            {{ tr('unit-tests') }}

                        </a-row>

                        <a-row no-padding style="justify-content: flex-end;">

                            <!-- <a-button 
                                style="margin-right: -10px;" 
                                size="small" 
                                type="primary"
                                :loading="isRunningAllUts"
                                @click="execRunAllUts()"
                            >

                                Run All UT's

                            </a-button> -->

                        </a-row>

                    </a-row>

                    <div slot="content">

                        <ELayoutProjectDevEnvTab1ContentUnitTestList 
                            ref="uts-list"
                        />
                        
                    </div>

                    <div class="closed-btn-item">

                        UT

                    </div>

                </a-popover>

            </a-tooltip>

        </a-col>

        <a-divider style="margin: 0.01px 0.01px;" />

        <a-col no-padding ver-center class="help-section">

            <a-tooltip placement="leftBottom">

                <template slot="title">

                    <span>{{ tr('help') }}</span>

                </template>

                <a-popover trigger="click" placement="leftTop" v-model="helpMenuVisible">

                    <a-row no-padding slot="title">

                        Help{{ helpKey != '' ? ': ' : ''}} <b>{{ helpKey != '' ? helpKey : ''}}</b>

                    </a-row>

                    <div slot="content">

                        <EHelper :helpKey="helpKey" />
                        
                    </div>

                    <div class="closed-btn-item">

                        HP

                    </div>

                </a-popover>

            </a-tooltip>

        </a-col>

    </a-col>

</a-col>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('dev/servers/gen-ws', [
            'loggingServerConnected',
        ]),
        isRunningAllUts() {
            return this.runAllUts && this.$refs['uts-list'].runningUts.length > 0;
        },
    },

	data() {
		return {
            utMenuVisible: false,
            helpMenuVisible: false,
            runAllUts: false,
            helpKey: '',
            server1Feedback:[],
		};
	},

    methods: {
        execRunAllUts() {
            this.runAllUts = true;
            this.$refs['uts-list'].initAllUts();
        },
        show(key) {
            this.helpKey = key;
            this.helpMenuVisible = true;
        },
    }
};
</script>