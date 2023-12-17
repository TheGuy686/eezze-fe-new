<template>
<div :style="`margin-top: -31px; position: absolute; width: ${width}px;`">

    <e-col>

        <a-tabs v-model="activeKey" style="padding-bottom: 30px;">

            <a-tab-pane key="connection-info" :tab="tr('connection-info')" e-scroll :style="`max-height: ${maxHeight}px;`">
                
                <DatasourceFormOConnectionOverrides
                    :connection="connection"
                    :hideDefaults="true"
                    :hideAuth="true"
                    :hideLogger="true"
                />

            </a-tab-pane>

            <a-tab-pane key="connection-state" :tab="tr('authentication')">

                <div>

                    <a-row style="padding-top: 10px; padding-bottom: 10px;">
        
                        <EFormCheckBox
                            :inlineOver="false"
                            :name="tr('secure')"
                            :placeholder="tr('secure-qu')"
                            :trueValue="true"
                            :defaultValue="false"
                            :value="entity?.metadata?.secure"
                            @input="setEntityProp({ key: 'metadata', value: {
                                    ...(entity?.metadata ?? {}),
                                    secure: $event
                                }
                            })"
                        />
        
                    </a-row>
        
                    <DatasourceFormAuthBasic />
        
                </div>

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