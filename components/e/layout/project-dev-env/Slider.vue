<style lang="less" scoped>

.collapsed {
    padding: 0.01px !important;
}

.open {
    padding: 20px;
}
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
</style>

<template>
<a-layout-sider
    :trigger="null"
    width="30"
    collapsedWidth="550"
    theme="light"
    collapsible
    :style="{ overflow: 'auto' }"
    v-model="collapsed"
>
    <div :class="collapsed ? 'open' : 'collapsed'">

        <a-col no-padding v-if="collapsed">

            <a-tabs type="card">

                <a-tab-pane key="1" :tab="tr('logging')">

                    <ELayoutProjectDevEnvTab1ContentOpened />

                </a-tab-pane>

                <a-tab-pane
                    key="2"
                    :disabled="!project?.hasLogger"
                    :tab="tr('unit-tests')"
                >
                    <ELayoutProjectDevEnvTab1ContentUnitTestList 
                        :isPopoverContext="false"
                    />

                </a-tab-pane>
                
            </a-tabs>

        </a-col>

        <ELayoutProjectDevEnvTab1ContentClosed
            ref="closed-menu"
            v-else
        />

    </div>

</a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	props: {
		collapsed: {
			type: Boolean,
			default: false,
		},
	},

    computed: {
        ...mapGetters('project/proj', {
            project: 'currrentProjectObj',
        }),
    },

	data() {
		return {
			server1Online: true,
			server2Online: true,
			server3Online: true,
            server1Feedback:[],
            server2Feedback:[],
            server3Feedback:[],
		};
	},

    mounted() {
        events.on('show-help', (key) => {
            this.$refs['closed-menu'].show(key);
        });
    }
};
</script>
