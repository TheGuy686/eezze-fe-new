<template>
<div class="mt-10 mb-5">

    <div class="pt-5" style="clear: both;" />

    <p class="font-semibold text-black-1 text-lg pb-1">

        {{ tr('service-call-details') }}

    </p>

    <a-col :span="12">

        <EFormSelect 
            class="pr-2" 
            name="datasource"
            leftIcon="database-db"
            :placeholder="tr('select-a-type')"
            keyProp="key"
            valueProp="name"
            :options="serviceTypes"
            :inlineOver="true"
            v-model="schema.type"
            @input="service = ''"
        />

    </a-col>

    <a-col :span="12">

        <EFormSelect 
            class="pl-2" 
            name="entity"
            leftIconContStyle="padding-left: 12px;"
            leftIcon="diff-db"
            :placeholder="tr('select-a-service')"
            keyProp="id"
            valueProp="name"
            :options="filteredServices"
            :inlineOver="true"
            :disabled="!schema.type"
            v-model="schema.serviceId"
            @option-selected="setServiceAlias($event.option)"
        />
        
    </a-col>

</div>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue';

export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('project/service-groups', {
            sgs: (state) => state.entities,
        }),
        ...mapState('project/service-types', {
            serviceTypes: (state) => (state?.entities ?? []).filter((t) => {
                return t.isMainService;
            }),
        }),
        ...mapState('project/services', {
            services: (state) => state?.entities ?? [],
        }),
        filteredServices() {
            return this.services.filter((serv) => serv.type == this.schema?.type);
        },
        schema() {
            return this?.actionStep?.schema;
        },
    },
    methods: {
        getFilteredSg(sgId) {
            try {
                return this.sgs.filter(sg => sg.id == sgId)[0];
            }
            catch (err) { return {} }
        },
        setServiceAlias(service) {
            const sg = this.getFilteredSg(service.serviceGroupId);

            Vue.set(this.actionStep.schema, 'service', `${pascalCase(sg.name)}.${camelCase(service.name)}`);
        }
    }
}
</script>
