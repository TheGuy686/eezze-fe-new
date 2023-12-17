<style scoped>
.form-div {
    height: 100%;
    width: 1px;
    background-color: #d9d9d9;
    margin-left: 10px;
}
</style>

<template>
<a-form-model style="flex: 4; margin-top: -20px;" layout="vertical">

    <EFormSelect 
        class="mt-5" 
        :name="tr('rest-datasource')"
        leftIcon="database-db"
        :placeholder="tr('select-datasource')"
        keyProp="id"
        valueProp="name"
        :options="restDss"
        :value="(entity?.metadata ?? {}).restDs"
        @input="setEntityProp({ key: 'metadata', value: {
            ...entity?.metadata ?? {},
            restDs: $event,
        }})"
        @option-selected="setEntityProp({ key: 'metadata', value: {
            ...entity?.metadata ?? {},
            restDsName: kebabCase($event.option.name),
        }})"
    />

    <EFormSelect 
        class="mt-5" 
        :name="tr('ws-datasource')"
        leftIcon="database-db"
        :placeholder="tr('select-datasource')"
        keyProp="id"
        valueProp="name"
        :options="wsDss"
        :value="(entity?.metadata ?? {}).wsDs"
        @input="setEntityProp({ key: 'metadata', value: {
            ...entity?.metadata ?? {},
            wsDs: $event,
        }})"
        @option-selected="setEntityProp({ key: 'metadata', value: {
            ...entity?.metadata ?? {},
            wsDsName: kebabCase($event.option.name),
        }})"
    />

    <EFormSelect 
        class="mt-5" 
        :name="tr('cron-datasource')"
        leftIcon="database-db"
        :placeholder="tr('select-datasource')"
        keyProp="id"
        valueProp="name"
        :options="cronDss"
        :value="(entity?.metadata ?? {}).cronDs"
        @input="setEntityProp({ key: 'metadata', value: {
            ...entity?.metadata ?? {},
            cronDs: $event,
        }})"
        @option-selected="setEntityProp({ key: 'metadata', value: {
            ...entity?.metadata ?? {},
            cronDsName: kebabCase($event.option.name),
        }})"
    />

</a-form-model>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('project/service-groups', [ 'entity' ]),
        ...mapState('project/data-sources', {
            dss: (state) => state?.entities ?? [],
        }),
        restDss() {
            return this.dss.filter((ds) => ds.type == 'rest-service');
        },
        wsDss() {
            return this.dss.filter((ds) => [ 'eezze-logger', 'ws-service' ] .includes(ds.type));
        },
        cronDss() {
            return this.dss.filter((ds) => ds.type == 'cron-service');
        },
    },
    methods: {
        ...mapMutations({
            setEntityProp: 'project/service-groups/setEntityProp',
        }),
    }
};
</script>
