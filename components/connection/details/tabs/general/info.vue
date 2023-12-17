<template>
<div>

    <div bev-cont style="background-color: white; align-items: normal;" class="p-5">

        <a-collapse v-model="activeKey" accordion>

            <a-collapse-panel key="information" :header="tr('information')">

                <a-descriptions :title="tr('general')" bordered size="small">

                    <a-descriptions-item :label="tr('manufacturer')">
                    
                        {{ stats?.manufacturer }}

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('model')">
                    
                        {{ stats?.model }}

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('architecture')">
                        
                        {{ tr(stats?.os?.arch == 'x64' ? '64-bit' : '32-bit') }}

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('timeszone')">
                        
                        {{ stats?.time }}

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('ip-address')">
                        
                        {{ stats?.summary?.ip }}

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('default-gateway')">
                        
                        {{ stats?.network?.defaultGateway }}

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('uptime')">
                        
                        {{ stats?.uptime }}

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('version')">

                        {{ stats?.version }}

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('is-virtual-machine')">

                        {{ tr(stats?.virtual ? 'yes': 'no', {toUpper: true}) }}

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('shell')">

                        {{ stats?.os?.shell }}

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('cpu', { toUpper: true })">

                        {{ stats?.cpu?.brand }}

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('os', { toUpper: true })">

                        {{ stats?.os?.distro }} - {{ stats?.os?.release }} ({{ stats?.os?.platform }})

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('status')" :span="3">

                        <a-badge status="processing" :text="tr('running')" non-sel/>

                    </a-descriptions-item>

                    <a-descriptions-item :label="tr('storage')">

                        {{ tr('free') }}: {{ stats?.summary?.storage?.totalUsed }}<br />

                        {{ tr('used') }}: {{ stats?.summary?.storage?.totalFree }}<br />
                        
                        {{ tr('total') }}: {{ stats?.summary?.storage?.totalSize }}<br />

                    </a-descriptions-item>

                </a-descriptions>

                <a-descriptions class="mt-4" :title="tr('package-versions')" size="small" bordered>

                    <a-descriptions-item
                        :label="p.package"
                        :span="2"
                        :key="i"
                        v-for="p, i in stats?.os?.packages"
                    >

                        {{ p.version }}

                    </a-descriptions-item>

                </a-descriptions>

            </a-collapse-panel>

            <a-collapse-panel key="os" :header="tr('os', { toUpper: true })">
            
                <ConnectionDetailsTabsGeneralTabsOs :stats="stats" />

            </a-collapse-panel>

            <a-collapse-panel key="cpu" :header="tr('cpu', { toUpper: true })">

                <a-descriptions :title="tr('general')" bordered size="small">

                    <a-descriptions-item :span="2" :label="tr('brand')">
                    
                        {{ stats?.cpu?.brand }}

                    </a-descriptions-item>

                    <a-descriptions-item :span="2" :label="tr('cores')">
                    
                        {{ stats?.cpu?.cores }}

                    </a-descriptions-item>

                    <a-descriptions-item :span="2" :label="tr('physical-cores')">
                        
                        {{ stats?.cpu?.physicalCores }}

                    </a-descriptions-item>

                    <a-descriptions-item :span="2" :label="tr('processors')">
                        
                        {{ stats?.cpu?.processors }}

                    </a-descriptions-item>

                    <a-descriptions-item :span="2" :label="tr('virtualization-supported')">
                        
                        {{ tr(stats?.virtualization ? 'yes': 'no', {toUpper: true}) }}

                    </a-descriptions-item>

                </a-descriptions>

                <a-descriptions class="mt-4" :title="tr('speed')" bordered size="small">
                
                    <a-descriptions-item :span="1" :label="tr('min-speed')">
                        
                        {{ stats?.cpu?.speedMin }} GHz

                    </a-descriptions-item>

                    <a-descriptions-item :span="1" :label="tr('speed')">
                        
                        {{ stats?.cpu?.speed }} GHz

                    </a-descriptions-item>

                    <a-descriptions-item :span="1" :label="tr('max-speed')">
                        
                        {{ stats?.cpu?.speedMax }} GHz

                    </a-descriptions-item>

                </a-descriptions>

            </a-collapse-panel>

            <a-collapse-panel key="memory" :header="tr('memory')">

                <a-descriptions class="mt-4" bordered size="small">
                
                    <a-descriptions-item :span="2" :label="tr('free')">
                        
                        {{ stats?.memory?.free }}

                    </a-descriptions-item>

                    <a-descriptions-item :span="1" :label="tr('swap-free')">
                        
                        {{ stats?.memory?.swapFree }}

                    </a-descriptions-item>

                    <a-descriptions-item :span="2" :label="tr('swap-used')">
                        
                        {{ stats?.memory?.swapUsed }}

                    </a-descriptions-item>

                    <a-descriptions-item :span="2" :label="tr('swap-total')">
                        
                        {{ stats?.memory?.swapTotal }}

                    </a-descriptions-item>

                    <a-descriptions-item :span="2" :label="tr('used')">
                        
                        {{ stats?.memory?.used }}

                    </a-descriptions-item>

                    <a-descriptions-item :span="2" :label="tr('percent-free')">
                        
                        {{ stats?.memory?.percentFree }}

                    </a-descriptions-item>

                    <a-descriptions-item :span="2" :label="tr('percent-used')">
                        
                        {{ stats?.memory?.percentUsed }}

                    </a-descriptions-item>

                    <a-descriptions-item :span="2" :label="tr('total')">
                        
                        {{ stats?.memory?.total }}

                    </a-descriptions-item>

                </a-descriptions>

            </a-collapse-panel>

        </a-collapse>

    </div>

</div>
</template>

<script>
export default {
    props: {
        stats: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            // activeKey: 'information',
            activeKey: 'os',
        }
    },
    methods: {
        
    },
}
</script>