<template>
<e-col>

    <EInfoHelp trKey="on-info" />

    <EFormInput
        class="mt-7"
        :name="tr('event-name')"
        :placeholder="tr('event-name')"
        inputCase="kebabCase"
        :addMessage="tr('on-event-name-help')"
        v-model="eventName"
        w-50
    />

</e-col>
</template>

<script>
import Vue from 'vue';

const WS_DEFAULTS = { eventType: 'on' };

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
        eventName: {
            get() { return this.defMdl('eventName') },
            set(value) { this.setDefinitionVal('eventName', value) }
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
                eventType: this?.entity?.definition?.eventType ?? 'on',
                eventName: this?.entity?.definition?.eventName ?? '',
            };

            out[key] = value;

            Vue.set(this.entity, 'definition', out);
        }
    }
}
</script>
