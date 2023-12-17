<template>
<div :style="`margin-top: -31px; position: absolute; width: ${width}px;`">

    <e-col>

        <a-tabs v-model="activeKey" style="padding-bottom: 30px;">

            <a-tab-pane key="connection-info" :tab="tr('connection-info')" e-scroll :style="`max-height: ${maxHeight}px;`">
                
                <DatasourceFormOConnectionOverrides
                    :connection="connection"
                    :hideDefaults="true"
                    :hideLogger="true"
                    :hideAuth="true"
                    :hideHealthCheck="true"
                >
                    <template v-slot:topBefore>

                        <div style="width: 99%;">

                            <EFormInput
                                class="mt-5"
                                name=""
                                :placeholder="tr('db-name')"
                                :inlineOver="false"
                                inputCase="lcUnderscoreCase"
                                :value="entity?.metadata?.dbName"
                                @input="setEntityProp({ key: 'metadata', value: {
                                    ...(entity?.metadata ?? {}),
                                    dbName: $event}
                                })"
                            />
                    
                        </div>

                    </template>

                </DatasourceFormOConnectionOverrides>

            </a-tab-pane>

            <a-tab-pane key="connection-state" :tab="tr('authentication')">

                <DatasourceFormAuthBasic />

            </a-tab-pane>

        </a-tabs>

    </e-col>

</div>
</template>
    
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        connection: {
            type: Object,
            required: false,
        },
        width: {
            type: Number,
            required: true,
        },
        maxHeight: {
            type: Number,
            required: true,
        },
    },
    watch: {
        formIsValid() {
            this.$emit('validity-changed');
        },
    },
    computed: {
        ...mapState('project/data-sources', ['entity']),
        formIsValid() {
            if (typeof this.entity != 'object') return false;
            if (!this.entity?.host) return false;
            if (!this.entity?.port) return false;

            return true;
        },
    },
    data() {
        return {
            activeKey: 'connection-info',
        }
    },
    methods: {
        ...mapMutations({
            setEntityProp: 'project/data-sources/setEntityProp',
        }),
    }
};
</script>
        