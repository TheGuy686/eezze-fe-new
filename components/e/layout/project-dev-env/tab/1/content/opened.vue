<style lang="less" scoped>
@import "~/assets/styles/custom/main.less";

</style>

<template>
<a-col no-padding>

    <template v-if="project?.hasLogger">

        <ELayoutProjectDevEnvTab1ContentServerItem
            title="Logging WS"
            btnLabel="Connect to WS"
            :isConnected="loggingServerConnected"
            :isDoingRequest="glwssIsDoingRequest"
            :peers="glwssPeers"
            @clear-logs="$store.commit('dev/servers/gen-ws/clearWsLogs')"
            @btn-clicked="$store.commit('dev/servers/gen-ws/connectToLoggingResource')"
            @close-socket="$store.commit(
                'dev/servers/gen-ws/closeGenerationLoggingSocketServer'
            );"
        />

        <ELayoutProjectDevEnvTab1ContentLogList />

    </template>

    <template v-else>

        <h3>
        
            {{ tr('attention') }}
        
        </h3>

        <p
            v-html="tr('no-logging-server-detected-help')"
            @click.prevent="handleLineClick"
        />

    </template>

</a-col>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
	props: {},

    computed: {
        ...mapState('dev/servers/gen-ws', [
            'loggingServerConnected',
            'glwssIsDoingRequest',
            'glwssPeers',
        ]),
        ...mapGetters('project/proj', {
            project: 'currrentProjectObj',
        }),
    },
    methods: {
        handleLineClick(e) {
            try {
                const t = e.target.getAttribute('e-type');
                const v = e.target.getAttribute('e-val');

                switch (t) {
                    case 'a-tag-nav':
                        this.$router.push({
                            path: `/${this.$route.params?.id}/datasource`,
                            query: {
                                showEezzeLoggerTut: true,
                            }
                        });

                }
            }
            catch (err) {}
        },
    }
};
</script>
