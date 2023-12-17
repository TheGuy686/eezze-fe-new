<template>
<div>

    <a-collapse v-model="activeKey" accordion>

        <a-collapse-panel key="default-network" :header="tr('default-network')">

            <a-descriptions size="small" bordered>

                <a-descriptions-item :span="3" :label="tr('name')">

                    {{ def?.name }}

                </a-descriptions-item>

                <a-descriptions-item :span="3" :label="tr('status')">

                    <a-badge :status="online ? 'processing' : 'default' " :text="tr(online ? 'running' : 'not-running')" non-sel/>

                </a-descriptions-item>

                <a-descriptions-item :span="3" :label="tr('ip-address')">

                    {{ def?.ip }}

                </a-descriptions-item>

                <a-descriptions-item :span="3" :label="tr('gateway')">

                    {{ def?.gateway }}

                </a-descriptions-item>

                <a-descriptions-item :span="3" :label="tr('upload')">

                    {{ def?.upload + tr('kps') }}

                </a-descriptions-item>

                <a-descriptions-item :span="3" :label="tr('download')">

                    {{ def?.download + tr('kps') }}

                </a-descriptions-item>

            </a-descriptions>

            <div class="ant-descriptions-title mt-5">
            
                {{ tr('network-processes') }}
            
            </div>

            <a-descriptions
                size="small"
                class="mt-5"
                bordered
                :key="t"
                :title="tr(t, { toUpper: true })"
                v-for="pr, t in def?.ports"
            >
                <a-descriptions-item
                    :key="i"
                    :span="3"
                    :label="`${p.protocal} / ${p.localAddress}:${p.port}`"
                    v-for="p, i in pr"
                >
                    <template v-if="p.pid">
                    
                        {{ tr('pid') }}: <b>{{ p.pid }}</b><br />

                    </template>

                    {{ tr('protocal') }}: <b>{{ p.protocal }}</b><br />
                    {{ tr('port') }}: <b>{{ p.port }}</b><br />
                    {{ tr('local-address') }}: <b>{{ p.localAddress }}</b><br />
                    {{ tr('peer-address') }}: <b>{{ p.peerAddress }}</b><br />
                    {{ tr('peer-port') }}: <b>{{ p.peerPort }}</b><br />

                    <template v-if="p.pid">
                        
                        {{ tr('process') }}: <b>{{ p.process?.command }} {{ p.process?.params }}</b><br />

                    </template>

                </a-descriptions-item>

            </a-descriptions>

        </a-collapse-panel>

        <a-collapse-panel key="interfaces" :header="tr('interfaces')">

            <a-descriptions
                size="small"
                class="mt-5"
                bordered
                :key="ind"
                :title="`${i.ifaceName} (${i.iface})`"
                v-for="i, ind in net?.interfaces"
            >
                <a-descriptions-item :label="tr(kebabCase(c))" :span="2" v-for="c in iCols">

                    {{ i?.[c] }}

                </a-descriptions-item>

            </a-descriptions>

        </a-collapse-panel>

    </a-collapse>

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
    computed: {
        net() { return this.stats?.network },
        def(){
            return {
                ip: this.stats?.summary?.ip,
                gateway: this.net?.defaultGateway,
                name: this.net?.interfaceDefault,
                ports: this.net?.running,
                upload: this.stats?.summary?.network?.upload?.speed,
                download: this.stats?.summary?.network?.download?.speed,
                stat: this.stats?.summary?.network
            };
        },
        online() {
            return this.def?.stat?.operstate == 'up';
        }
    },
    data() {
        return {
            // activeKey: 'default-network',
            activeKey: 'interfaces',
            iCols: [
                'iface',
                'ifaceName',
                'ip4',
                'ip4subnet',
                'ip6',
                'ip6subnet',
                'mac',
                'internal',
                'virtual',
                'operstate',
                'type',
                'duplex',
                'mtu',
                'dhcp',
                'dnsSuffix',
                'ieee8021xAuth',
                'ieee8021xState',
                'state',
            ]
        }
    }
}
</script>