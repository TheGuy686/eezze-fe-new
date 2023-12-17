<template>
<e-col>

    <EInfoHelp trKey="channel-info" />

    <EFormInput
        class="mt-3"
        :name="tr('id')"
        :placeholder="tr('defined-a-channel-id')"
        inputCase="kebabCase"
        v-model="id"
    />

    <ActionLogicMdlInput
        clss="pl-2.5 mt-3"
        :addonBefore="tr('channel')"
        :placeholder="tr('channel-ph')"
        :extraHelp="tr('channel-prompt')"
        mdlKey="channel"
        src="Serv->WsContent->Channel"
        v-model="entity.definition"
        @show-bl-mdl="property = 'channel'; $refs['action-chain'].show()"
    />

    <ActionLogicMdlInput
        clss="pl-2.5 mt-3"
        :addonBefore="tr('user')"
        :placeholder="tr('user-ph')"
        :extraHelp="tr('user-prompt')"
        mdlKey="user"
        src="Serv->WsContent->Channel"
        v-model="entity.definition"
        @show-bl-mdl="property = 'user'; $refs['action-chain'].show()"
    />

    <e-row class="mt-3 p-1.5" bev-cont>

        <EFormCheckBox
            :inlineOver="true"
            inlineLabelStyle="margin-left: 8px;"
            name="emit-state"
            :placeholder="tr('emit-state-qu')"
            :trueValue="true"
            :defaultValue="false"
            :reverseLayout="true"
            v-model="emitState"
        />

    </e-row>

    <EFormBlActionChain
        ref="action-chain"
        :prop="property"
        type="string"
        :filteredItem="editingLogicChain"
        @save-clicked="finishedEditingCb(editingLogicChain)"
    />

</e-col>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

const WS_DEFAULTS = { eventType: 'channel' };

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
        id: {
            get() { return this.defMdl('id') },
            set(value) { this.setDefinitionVal('id', value) }
        },
        emitState: {
            get() { return this.defMdl('emitState') },
            set(value) { this.setDefinitionVal('emitState', value) }
        }
    },
    data() {
        return {
            property: '',
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
                eventType: 'channel',
                id: this?.entity?.definition?.id,
                channel: this?.entity?.definition?.channel,
                user: this?.entity?.definition?.user,
                emitState: this?.entity?.definition?.emitState ?? false,
            };

            out[key] = value;

            Vue.set(this.entity, 'definition', out);
        }
    }
}
</script>
