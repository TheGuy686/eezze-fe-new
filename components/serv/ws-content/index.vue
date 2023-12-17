<style lang="less" scoped>
.ws-content-root {
    width: 100%;
}
</style>

<template>
<a-col class="ws-content-root mt-3 mb-3" :span="10">

    <a-tabs
      tab-position="left"
      :style="{ height: '100%' }"
      v-model="activeKey"
      w-100
    >
        <a-tab-pane key="info" :tab="tr('info')">

            <EFormInput
                :name="tr('name')"
                :placeholder="tr('name')"
                inputCase="titleCase"
                :hasError="entity.isNew && serviceExists(entity.name)"
                :errorMessage="entity.isNew && serviceExists(entity.name) ? tr('service-name-already-exists') : ''"
                v-model="name"
            />

            <EFormInput
                class="mt-7"
                :name="tr('description')"
                :placeholder="tr('description')"
                v-model="desc"
            />

            <EInfoHelp trKey="authenticator-ws-help" />

        </a-tab-pane>

        <a-tab-pane key="event" :tab="tr('event')">

            <label>{{ tr('select-event-type') }}</label><br>

            <a-radio-group
                class="mt-2"
                button-style="solid"
                non-sel
                v-model="eventType"
            >
                <a-radio-button value="on">

                    {{ tr('on') }}

                </a-radio-button>

                <a-radio-button value="channel">

                    {{ tr('channel') }}

                </a-radio-button>

                <a-radio-button value="broadcast">

                    {{ tr('broadcast') }}

                </a-radio-button>

                <a-radio-button value="notify">

                    {{ tr('notify') }}

                </a-radio-button>

                <a-radio-button value="on-connect">

                    {{ tr('on-connect') }}

                </a-radio-button>

                <a-radio-button value="on-disconnect">

                    {{ tr('on-disconnect') }}

                </a-radio-button>

            </a-radio-group>

            <ServWsContentEvent
                :entity="entity"
                :defMdl="defMdl"
                v-if="eventType == 'on'"
            />

            <ServWsContentChannel
                :entity="entity"
                :defMdl="defMdl"
                v-else-if="eventType == 'channel'"
            />

            <ServWsContentBroadcast
                :entity="entity"
                :defMdl="defMdl"
                v-else-if="eventType == 'broadcast'"
            />

            <ServWsContentNotify
                :entity="entity"
                :defMdl="defMdl"
                v-else-if="eventType == 'notify'"
            />

            <ServWsContentOnConnect
                :entity="entity"
                :defMdl="defMdl"
                v-else-if="eventType == 'on-connect'"
            />

            <ServWsContentOnDisconnect
                :entity="entity"
                :defMdl="defMdl"
                v-else-if="eventType == 'on-disconnect'"
            />

        </a-tab-pane>

    </a-tabs>

    <!-- <EFormSelect 
        class="mt-5" 
        :name="tr('datasource')"
        leftIcon="database-db"
        :placeholder="tr('select-datasource')"
        keyProp="id"
        valueProp="name"
        :options="wsDss"
        v-model="datasource"
    /> -->

</a-col>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapState } from 'vuex';

const WS_DEFAULTS = { eventType: 'on' };

export default {
    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
    beforeMount() {
        if (this.direction == '' || !this.direction) {
            this.setDefinitionVal('eventType', 'broadcast');
        }
    },  
    computed: {
        ...mapGetters({
            serviceExists: 'project/services/serviceExists',
        }),
        ...mapState('project/data-sources', {
            dss: (state) => state?.entities ?? [],
        }),
        wsDss() {
            return this.dss.filter((ds) => ds.type == 'ws-service');
        },
        defMdl() {
            return function (key) {
                if (typeof this.entity?.definition != 'object') {
                    Vue.set(this.entity, 'definition', {...WS_DEFAULTS});
                }

                return this.entity.definition[key];
            }
        },
        eventType: {
            get() { return this.defMdl('eventType') },
            set(value) { this.setDefinitionVal('eventType', value) }
        },
        name: {
            get() { return this.entity.name },
            set(value) {
                Vue.set(this.entity, 'name', value);

                this.events.emit('update-entity', this.entity);
            }
        },
        desc: {
            get() { return this.entity.description },
            set(value) { Vue.set(this.entity, 'description', value) }
        },
    },
    data() {
        return {
            // activeKey: 'info',
            activeKey: 'event',
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
                eventType: this?.entity?.definition?.eventType ?? 'on',
                eventName: this?.entity?.definition?.eventName ?? '',
                onConnectionSubscribe: this?.entity?.definition?.onConnectionSubscribe,
                onDisConnectionSubscribe: this?.entity?.definition?.onDisConnectionSubscribe,
                channel: this?.entity?.definition?.channel,
                id: this?.entity?.definition?.id,
                channel: this?.entity?.definition?.channel,
                user: this?.entity?.definition?.user,
                emitState: this?.entity?.definition?.emitState,
                connection: this?.entity?.definition?.connection,
            };

            out[key] = value;

            Vue.set(this.entity, 'definition', out);
        }
    }
}
</script>
