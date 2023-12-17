<template>
<e-col>

    <EInfoHelp trKey="on-connect-info" />

    <e-row class="mt-3 p-1.5" bev-cont>

        <EFormCheckBox
            :inlineOver="true"
            inlineLabelStyle="margin-left: 8px;"
            name="on-connection-subscribe"
            :placeholder="tr('subscribe-to-event-qu')"
            :trueValue="true"
            :defaultValue="false"
            :reverseLayout="true"
            v-model="onConnectionSubscribe"
        />

    </e-row>

</e-col>
</template>

<script>
import Vue from 'vue';

const WS_DEFAULTS = { eventType: 'on-connect' };

export default {
    props: {
        entity: {
            type: Object,
            required: true,
        },
        defMdl: {
            type: Function,
            required: true,
        },
    },
    computed: {
        onConnectionSubscribe: {
            get() { return this.defMdl('onConnectionSubscribe') },
            set(value) { this.setDefinitionVal('onConnectionSubscribe', value) }
        },
    },
    methods: {
        setDefinitionVal(key, value) {
            if (typeof this?.entity.definition != 'object'){
                Vue.set(this.entity, 'definition', {...WS_DEFAULTS});
            }

            const out = {
                datasource: this?.entity?.definition?.datasource ?? '',
                datasourceName: this?.entity?.definition?.datasourceName ?? '',
                eventType: 'on-connect',
                onConnectionSubscribe: this?.entity?.definition?.onConnectionSubscribe ?? false,
            };

            out[key] = value;

            Vue.set(this.entity, 'definition', out);
        }
    }
}
</script>
