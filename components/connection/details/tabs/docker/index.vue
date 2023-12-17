<style lang="less" scoped>
.docker-div {
    border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
    padding-bottom: 5px;
    padding-top: 5px;
}

.non-botm-border {
    padding-bottom: 5px;
    border-bottom: none !important;
}
</style>

<template>
<a-collapse class="docker-root" v-model="activeKey" accordion>

    <a-collapse-panel key="general" :header="tr('general')">

        <a-descriptions
            size="small"
            class="mt-5"
            bordered
        >
            <a-descriptions-item :label="tr(kebabCase(c))" :span="2" v-for="c in diCols">

                {{ getValue(c, stats?.docker?.info?.[c]) }}

            </a-descriptions-item>

        </a-descriptions>

    </a-collapse-panel>

    <a-collapse-panel key="docker-images" :header="tr('docker-images')">
    
        <a-descriptions
            size="small"
            class="mb-5"
            bordered
            :title="img.name"
            :key="i"
            v-for="img, i in stats?.docker?.images ?? []"
        >
            <a-descriptions-item :label="tr('id')">

                <a-tooltip placement="right" :title="img?.id">

                    {{ maxLen(img?.id, 10) }}

                </a-tooltip>

            </a-descriptions-item>

            <a-descriptions-item :label="tr('image-id')">

                <a-tooltip placement="right" :title="img?.imageID">

                    {{ maxLen(img?.imageID, 10) }}

                </a-tooltip>

            </a-descriptions-item>

            <a-descriptions-item :label="tr('image')">

                {{ img?.image }}

            </a-descriptions-item>

            <a-descriptions-item :label="tr('mem-usage')">

                <span v-html="tr('docker-mem-usage', { 
                        args: [ 
                            formatBytes(img?.memUsage),
                            formatBytes(img?.memPercent),
                            formatBytes(img?.memLimit),
                    ]})"
                ></span>

            </a-descriptions-item>

            <a-descriptions-item :label="tr('mem-usage')">

                {{ formatBytes(img?.memUsage) }}

            </a-descriptions-item>

            <a-descriptions-item :label="tr('total-usage')">

                {{ formatBytes(img?.cpuStats?.cpu_usage?.total_usage) }}

            </a-descriptions-item>

            <a-descriptions-item :label="tr('command')">

                <a-tooltip placement="right" :title="img?.command">

                    {{ maxLen(img?.command, 25) }}

                </a-tooltip>

            </a-descriptions-item>

            <a-descriptions-item :label="tr('started')">

                {{ img?.startedAt ? formatDate(new Date(img?.startedAt), 'h:mm dd/mm/yyyy') : '' }}

            </a-descriptions-item>

            <a-descriptions-item :label="tr('finished')">

                {{ img?.finishedAt ? formatDate(new Date(img?.finishedAt), 'h:mm dd/mm/yyyy') : '' }}

            </a-descriptions-item>

            <a-descriptions-item :span="1" :label="tr('mounts')">

                <template v-for="m, i in img?.mounts">

                    <div :key="i" :class="'docker-div' + (i < img?.mounts?.length - 1 ? '' : 'non-botm-border mt-3')">

                        {{ tr('type') }}: <b>{{ m?.Type }}</b><br />


                        {{ tr('source') }}:  <a-tooltip placement="right" :title="m?.Source">

                            <b>{{ maxLen(m?.Source, 25) }}</b><br />

                        </a-tooltip>

                        {{ tr('destination') }}: <b>{{ m?.Destination }}</b><br />
                        {{ tr('mode') }}: <b>{{ m?.Mode }}</b><br />
                        {{ tr('rights') }}: <b>{{ m?.RW }}</b><br />
                        {{ tr('propagation') }}: <b>{{ m?.Propagation }}</b><br />

                    </div>

                </template>

            </a-descriptions-item>

            <a-descriptions-item :span="1" :label="tr('ports')">

                <template v-for="p, i in img?.ports">

                    <div :key="i" :class="'docker-div' + (i < img?.ports?.length - 1 ? '' : 'non-botm-border mt-3')">

                        {{ tr('ip-address') }}: <b>{{ p?.IP }}</b><br />
                        {{ tr('type') }}: <b>{{ p?.Type }}</b><br />
                        {{ tr('private-port') }}: <b>{{ p?.PrivatePort }}</b><br />
                        {{ tr('public-port') }}: <b>{{ p?.PublicPort }}</b><br />

                    </div>

                </template>

            </a-descriptions-item>

            <a-descriptions-item :span="1" :label="tr('ports')">

                <template v-for="p, i in img?.processes">

                    <div :key="i" :class="'docker-div' + (i < img?.processes?.length - 1 ? '' : 'non-botm-border mt-3')">

                        {{ tr('group') }}: <b>{{ p?.group }}({{ p?.pgid }})</b><br />
                        {{ tr('user') }}: <b>{{ p?.user }}</b><br />
                        {{ tr('command') }}: <a-tooltip placement="right" :title="p?.command">

                            <b>{{ maxLen(p?.command, 25) }}</b><br />

                        </a-tooltip>

                    </div>

                </template>

            </a-descriptions-item>

            <!-- processes -->

        </a-descriptions>

    </a-collapse-panel>

</a-collapse>
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
            // activeKey: 'general',
            activeKey: 'docker-images',
            diCols: [
                'id',
                'initBinary',
                'name',
                'containers',
                'osType',
                'containersRunning',
                'serverVersion',
                'containersStopped',
                'operatingSystem',
                'driver',
                'kernelVersion',
                'defaultRuntime',
                'dockerRootDir',
                'architecture',
                'httpsProxy',
                'httpProxy',
                'memoryLimit',
                'swapLimit',
                'memTotal',
                'ipv4Forwarding',
                'bridgeNfIp6tables',
                'bridgeNfIptables',
            ]
        }
    },
    methods: {
        getValue(key, value) {
            switch (key) {
                case 'memTotal': return this.formatBytes(value);

                default: return value;
            }
        }
    }
}
</script>