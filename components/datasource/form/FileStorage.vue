<template>
<div :style="`margin-top: -31px; position: absolute; width: ${width}px; height: 400px;`">

    <e-col>

        <a-tabs v-model="activeKey" style="padding-bottom: 30px;">

            <a-tab-pane key="connection-info" :tab="tr('connection-info')" e-scroll :style="`max-height: ${maxHeight}px;`">
                
                <DatasourceFormOConnectionOverrides
                    :connection="connection"
                    :hideDefaults="true"
                    :hideLogger="true"
                    :hideAuth="true"
                />

            </a-tab-pane>

            <a-tab-pane key="connection-state" :tab="tr('file-info')">

                <e-row>

                    <e-col>

                        <EText :text="`${tr('root-path')} (${tr('optional')})`" />

                        <ActionLogicMdlInput
                            clss="pl-2.5"
                            src="connection-overrides"
                            :placeholder="tr('input-a-file-root-path')"
                            :nonStoreMdl="true"
                            :setOnlyKeyValue="false"
                            :partitionMargin="10"
                            :innerLogicChain="true"
                            mdlKey="rootPath"
                            v-model="rootPathMdl"
                        />

                        <!-- <EFormInput
                            :name="`${tr('root-path')} (${tr('optional')})`"
                            :placeholder="tr('input-a-file-root-path')"
                            :inlineOver="false"
                            :value="entity?.metadata?.rootPath"
                            @input="setEntityProp({ key: 'metadata', value: {
                                ...(entity?.metadata ?? {}),
                                rootPath: $event}
                            })"
                        /> -->
                
                    </e-col>
        
                </e-row>

            </a-tab-pane>

        </a-tabs>

    </e-col>

</div>
</template>
    
<script>
import { mapState, mapMutations } from 'vuex';
import BlLogicChain from '~/models/BlLogicChain';

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
        rootPathMdlChanger(to) {
            this.setEntityProp({ key: 'metadata', value: {
                    ...(this.entity?.metadata ?? {}),
                    rootPath: JSON.parse(JSON.stringify(to?.rootPath ?? {})),
                }
            });
        }
    },
    computed: {
        ...mapState('project/data-sources', ['entity']),
        formIsValid() {
            if (typeof this.entity != 'object') return false;
            if (!this.entity?.connection) return false;
            if (!this.entity?.rootPath) return false;
            if (!this.entity?.fileName) return false;
            if (!this.entity?.fileType) return false;

            return true;
        },
        rootPathMdlChanger() {
            try {
                return JSON.parse(JSON.stringify(this.rootPathMdl ?? {}));
            }
            catch (err) {
                return {};
            }
        }
    },
    data() {
        return {
            rootPathMdl: {
                rootPath: {},
            },
            activeKey: 'connection-info',
        }
    },
    mounted() {
        this.rootPathMdl = JSON.parse(JSON.stringify(this.entity?.metadata)) ?? BlLogicChain.create();
    },
    methods: {
        ...mapMutations({
            setEntityProp: 'project/data-sources/setEntityProp',
        }),
    }
};
</script>
    