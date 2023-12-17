<template>
<div :style="`margin-top: -31px; position: absolute; width: ${width}px;`">

    <e-col>

        <a-tabs v-model="activeKey" style="padding-bottom: 10px;">

            <a-tab-pane key="connection-info" :tab="tr('connection-info')" hello="eezze-yeah" e-scroll :style="`max-height: ${maxHeight}px;`">
                
                <DatasourceFormOConnectionOverrides :connection="connection" :hideAuth="true" />

            </a-tab-pane>

            <a-tab-pane key="connection-state" :tab="tr('connection-state')">

                <e-col>

                    <e-row clss="mt-2">

                        <e-col jc="se" :span="2">
                
                            <EText 
                                :text="tr('store-state')"
                                :helpText="tr('store-state-help')"
                            />
                
                            <EFormCheckBox
                                :inlineOver="true"
                                inlineLabelStyle="margin-left: 8px;"
                                name="run-asynchronous"
                                :placeholder="tr('yes-store-resource-state-and-stats')"
                                :trueValue="true"
                                :defaultValue="false"
                                :reverseLayout="true"
                                :value="entity?.metadata?.storeState"
                                @input="setEntityProp({ key: 'metadata', value: {
                                        ...(entity?.metadata ?? {}),
                                        storeState: $event
                                    }
                                })"
                            />
                
                        </e-col>
                
                        <e-col :span="2" jc="fe">

                            <EFormInput
                                class="mt-5 mr-2"
                                :name="tr('store-state-interval')"
                                :placeholder="tr('input-an-amount-in-milliseconds')"
                                castTo="number"
                                :inlineOver="false"
                                :value="entity?.metadata?.storeStateInterval"
                                @input="setEntityProp({ key: 'metadata', value: {
                                        ...(entity?.metadata ?? {}),
                                        storeStateInterval: $event
                                    }
                                })"
                            />

                        </e-col>
                
                    </e-row>

                </e-col>

            </a-tab-pane>

        </a-tabs>

    </e-col>

</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

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
