<style lang="less">
@import "~/assets/styles/custom/main.less";

.dev-env-unit-test-list-root {
    .top-section {
        max-height: 45vh;
    }
}
</style>

<template>
<div class="dev-env-unit-test-list-root" :style="isPopoverContext ? 'width: 300px;' : ''">

    <div class="top-section">

        <ELayoutProjectDevEnvTab1ContentUnitTestListItem
            :key="i"
            :group="g"
            :runningUts="runningUts"
            v-for="(g, i) in entities"
        />

    </div>

    <ELayoutProjectDevEnvTab1ContentUnitTestWsHeader
        :title="tr('unit-test-feedback')"
        :btnLabel="tr('connect-to-ws')"
        :isConnected="loggingServerConnected"
        :isDoingRequest="glwssIsDoingRequest"
        @clear-logs="$store.commit('dev/servers/gen-ws/clearWsLogs')"
        @btn-clicked="$store.commit('dev/servers/gen-ws/connectToLoggingResource')"
        @close-socket="$store.commit(
            'dev/servers/gen-ws/closeGenerationLoggingSocketServer'
        );"
        v-if="!isPopoverContext"
    />

    <ELayoutProjectDevEnvTab1ContentLogListUnitTest 
        :isClosedContext="isPopoverContext"
    />

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        isPopoverContext: {
            type: Boolean,
            default: true,
        },
    },
    
    computed: {
        // ...mapState('api/groups/restful', {
        //     entities: (state) => state.entities,
        // }),
        ...mapState('dev/servers/gen-ws', [
            'loggingServerConnected',
            'glwssIsDoingRequest',
        ]),
    },

    data() {return {runningUts: [], entities: []}},

    methods: {
        initAllUts() {
            // loop over all groups
            for (let g of this.entities) {
                let method = g['paths'];
                // loop over each Method[]
                for (let m in method) {
                    let paths = g['paths'][m];
                    // then loop over each paths in the method array
                    for (let p of Object.values(paths)) {
                        let pr = p;
                        this.runningUts.push(pr.key);
                    }
                }
            }
        },
    }
};
</script>
