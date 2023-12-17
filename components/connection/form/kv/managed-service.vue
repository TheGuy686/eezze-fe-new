<style lang="less" scoped>
.server-title {
    font-size: 17px;
}
</style>

<template>
<div style="margin-top: -15px;">

    <!-- <h2 class="server-title" non-sel>
        
        {{ tr('server') }}
    
    </h2> -->

    <a-tabs v-model="activeKey">

        <a-tab-pane key="connection-info" :tab="tr('connection-info')" style="max-height: 400px;" e-scroll>

            <DatasourceFormOConnectionOverrides
                :connection="entity"
                :hideDefaults="true"
                :hideHealthCheck="true"
            >

                <template v-slot:topBefore>

                    <ConnectionFormKvCTypes 
                        :types="entity?.metadata?.serviceTypes ?? []"
                    />

                </template>

            </DatasourceFormOConnectionOverrides>

        </a-tab-pane>

        <a-tab-pane key="authentication" :tab="tr('authentication')">

            <h2 class="pt-5">
                
                {{ tr('authentication') }}
            
            </h2>

            <a-radio-group
                class="mt-2 mb-1"
                button-style="solid"
                :value="entity?.metadata?.auth?.type"
                @input="setEntityProp({ key: 'metadata', value: {
                        ...entity.metadata,
                        auth: {
                            ...entity.metadata.auth,
                            type: $event,
                        },
                    }
                })"
            >
                <a-radio-button value="basic">

                    {{ tr('basic') }}

                </a-radio-button>

                <a-radio-button value="rsa-key">

                    {{ tr('rsa-key') }}

                </a-radio-button>

            </a-radio-group>

            <ConnectionFormKvAtRsa v-if="entity?.metadata?.auth?.type == 'rsa-key'" />

            <ConnectionFormKvAtBasic v-else />

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
    methods: {
        ...mapMutations({
            setEntityProp: 'project/connections/setEntityProp',
        }),
    }
}
</script>