<template>
<div>

    <a-tabs v-model="activeKey">

        <a-tab-pane key="general" :tab="tr('general')" style="max-height: 76vh;" e-scroll>
            
            <ConnectionDetailsTabsGeneralPerformance :stats="stats" />

            <ConnectionDetailsTabsGeneralInfo :stats="stats" />

        </a-tab-pane>

        <a-tab-pane key="network" :tab="tr('network')" style="max-height: 76vh;" e-scroll>
            
            <ConnectionDetailsTabsNetwork :stats="stats" />

        </a-tab-pane>

        <a-tab-pane key="docker" :tab="tr('docker')" style="max-height: 76vh;" e-scroll>
            
            <ConnectionDetailsTabsDocker :stats="stats" />

        </a-tab-pane>

        <a-tab-pane key="events" :tab="tr('events')" style="max-height: 76vh;" e-scroll>
            
            Events

        </a-tab-pane>

    </a-tabs>

</div>
</template>

<script>
export default {
    props: {
        stats: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            // activeKey: 'general',
            activeKey: 'docker',
        }
    },
}
</script>