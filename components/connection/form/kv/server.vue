<style lang="less" scoped>
.server-title {
    font-size: 17px;
}
</style>

<template>
<div style="margin-top: -15px;">

    <a-tabs v-model="activeKey">

        <a-tab-pane key="connection-info" :tab="tr('connection-info')" style="max-height: 400px;" e-scroll>

            <DatasourceFormOConnectionOverrides
                :connection="entity"
                :hideDefaults="true"
                :hideLogger="true"
                :hidePath="true"
                :hidePort="true"
                :hideProtocals="true"
                :hideHealthCheck="true"
                :hideAuth="true"
                :entity="entity"
                :setEntityProp="setEntityProp"
            >
                <template v-slot:topBefore>

                    <ConnectionFormKvCTypes
                        :types="entity?.metadata?.serviceTypes ?? []"
                    />

                </template>

            </DatasourceFormOConnectionOverrides>

        </a-tab-pane>

        <a-tab-pane key="authentication" :tab="tr('authentication')">

            <h2>
                
                {{ tr('authentication-ssh-key') }}
            
            </h2>

            <e-info-help class="pb-1" trKey="authentication-ssh-key-info" />

            <ConnectionFormKvAtRsa />

            <h2 class="pt-2">
                
                {{ tr('authentication-sudo-user') }}
            
            </h2>

            <e-info-help class="pb-1" trKey="authentication-sudo-user-info" />

            <ConnectionFormKvAtBasic />

        </a-tab-pane>

    </a-tabs>

</div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapState('project', {
            serviceTypes: (state) => state?.['service-types']?.entities ?? [],
            entity: (state) => state?.connections?.entity,
        }),
        ...mapGetters({
            typesDict: 'project/service-types/typesDict',
        }),
    },
    data() {
        return {
            activeKey: 'connection-info',
        }
    },
    mounted() {

    },
    methods: {
        ...mapMutations({
            setEntityProp: 'project/connections/setEntityProp',
        }),
    }
}
</script>
