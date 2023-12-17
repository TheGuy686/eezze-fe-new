<template>
<e-col>

    <EInfoHelp trKey="notify-info" />

    <EFormInput
        class="mt-7"
        :name="tr('event-name')"
        :placeholder="tr('event-name')"
        inputCase="kebabCase"
        :addMessage="tr('notify-event-name-help')"
        v-model="eventName"
        w-50
    />

    <ActionLogicMdlInput
        clss="pl-2.5 mt-3"
        :addonBefore="tr('connection')"
        :placeholder="tr('connection-ph')"
        :extraHelp="tr('connection-prompt')"
        mdlKey="connection"
        src="Serv->WsContent->Channel"
        v-model="entity.definition"
        @show-bl-mdl="$refs['action-chain'].show()"
    />

    <EFormBlActionChain
        ref="action-chain"
        prop="connection"
        type="string"
        :filteredItem="editingLogicChain"
        @save-clicked="finishedEditingCb(editingLogicChain)"
    />

</e-col>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

const WS_DEFAULTS = { eventType: 'notify' };

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
    watch: {
        editingBlChainItem(to) {
            this.editingLogicChain = {...JSON.parse(JSON.stringify(to))};
        },
    },
    computed: {
        ...mapState('app', [
            'editingBlChainItem',
            'finishedEditingCb',
        ]),

        eventName: {
            get() { return this.defMdl('eventName') },
            set(value) { this.setDefinitionVal('eventName', value) }
        },
    },
    data() {
        return {
            editingLogicChain: {},
        }
    },
    methods: {
        setDefinitionVal(key, value) {
            if (typeof this?.entity.definition != 'object'){
                Vue.set(this.entity, 'definition', {...WS_DEFAULTS});
            }

            const out = {
                datasource: this?.entity?.definition?.datasource ?? '',
                datasourceName: this?.entity?.definition?.datasourceName ?? '',
                eventType: 'notify',
                eventName: this?.entity?.definition?.eventName,
                connection: this?.entity?.definition?.connection,
            };

            out[key] = value;

            Vue.set(this.entity, 'definition', out);
        }
    }
}
</script>
