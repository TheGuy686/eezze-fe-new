<template>
<div style="text-align: left; max-height: 60vh;" e-scroll>

    <div style="max-height: 60vh;" e-scroll>

        <a-descriptions
            :class="i > 0 ? 'mt-5' : ''"
            bordered
            size="small"
            :title="d.name"
            v-for="d, i in Object.values(datasources)"
        >
            <a-descriptions-item :span="3" :label="tr('description')">
                        
                {{ d.description }}
            
            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('type')">
                    
                {{ d.type }}
            
            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr(k)" v-for="v, k in metadata(d.type, d)">
                    
                <template v-if="typeof v == 'boolean'">

                    <span style="color: green; font-size: 22px;" v-if="v">✓</span>

                    <span style="color: red; font-size: 18px;" v-else>✗</span>

                </template>

                <a-tag color="blue" v-else-if="k == 'port'">
                    
                    {{ v }}
                
                </a-tag>

                <span v-else>

                    {{ v }}

                </span>
            
            </a-descriptions-item>

        </a-descriptions>

    </div>

</div>
</template>

<script>
export default {
    props: {
        datasources: Array,
    },
    computed: {
        metadata() {
            return function(type, ds) {
                const md = ds?.metadata ?? {};

                switch (type) {
                    case 'eezze-logger': return this.trLoggerMD(md);
                    case 'rest-service': return this.trRestServiceMD(md);
                    case 'Mysql': return this.trMysqlServiceMD(md);

                    default: return {};
                }
            }
        },
    },
    methods: {
        trLoggerMD(md) {
            return {
                secure: md?.secure,
                devIsSecure: md?.devIsSecure,
                secureProtocol: md?.secureProtocol,
                protocol: md?.protocol,
                localhost: md?.localhost,
                host: md?.host,
                port: md?.port,
                path: md?.path,
                storeState: md?.storeState,
            };
        },
        trRestServiceMD(md) {
            return {
                secure: md?.secure,
                devIsSecure: md?.devIsSecure,
                secureProtocol: md?.secureProtocol,
                protocol: md?.protocol,
                localhost: md?.localhost,
                host: md?.host,
                port: md?.port,
                path: md?.path,
                storeState: md?.storeState,
            };
        },
        trMysqlServiceMD(md) {
            return {
                secure: md?.secure,
                devIsSecure: md?.devIsSecure,
                secureProtocol: md?.secureProtocol,
                protocol: md?.protocol,
                localhost: md?.localhost,
                host: md?.host,
                port: md?.port,
                path: md?.path,
                storeState: md?.storeState,
            };
        },
    }
}
</script>