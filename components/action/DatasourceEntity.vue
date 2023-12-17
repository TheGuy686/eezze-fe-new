<template>
<div class="mt-5 mb-5">

    <p class="font-semibold text-black-1 text-lg pb-1">

        {{ tr('datasource-and-entity') }}

    </p>

    <a-col :span="span">

        <EFormSelect 
            class="pr-2" 
            name="datasource"
            leftIcon="database-db"
            :placeholder="tr('select-datasource')"
            keyProp="key"
            valueProp="name"
            :options="dss"
            :inlineOver="true"
            v-model="datasource"
            @input="entity = '';"
        />

    </a-col>

    <a-col :span="span" v-if="!isDefault">

        <EFormSelect 
            class="pl-2" 
            name="entity"
            leftIconContStyle="padding-left: 12px;"
            leftIcon="diff-db"
            :placeholder="tr('select-entity')"
            keyProp="id"
            valueProp="name"
            :options="entitiesP"
            :inlineOver="true"
            :disabled="!datasource"
            v-model="entity"
            @option-selected="optionSelected"
        />
        
    </a-col>

    <a-col class="pl-4" :span="span" v-if="showDepth">

        <EFormInput
            name=""
            castTo="number"
            v-model="maxDepth"
            :helpText="tr('max-depth-explan')"
        />

    </a-col>

</div>
</template>

<script>
import { mapState } from 'vuex';

import { FILE_STORAGE_KEY, SMTP_EMAIL_KEY, REST_SERVICE_KEY, WS_SERVICE_KEY } from '~/consts/BusLogic';

const defaultTypes = [ 
    FILE_STORAGE_KEY,
    SMTP_EMAIL_KEY,
    REST_SERVICE_KEY,
    WS_SERVICE_KEY,
];

export default {
    props: {
        showDepth: Boolean,
        actionStep: {
            type: Object,
            required: true,
        },
        title: {
            type: String,
            default: ''
        },
        dsFilterType: String | Array,
    },
    watch: {
        definition(to) {
            this.$emit('input', {
                ...this.actionStep.schema,
                ...to,
            });
        },
        datasource() {
            if (!this.inited) return;
            this.entity = '';
        },
    },
    computed: {
        ...mapState('project', {
            datasources: (state) => {
                return Object.values(state?.['data-sources']?.entities);
            },
            entities: (state) => {
                return Object.values(state?.erd?.entities ?? []);
            },
            repo() {
                const ds = this.pascalCase(this.filteredDatasource?.name ?? '');

                return `${ds}${!this.isDefault ? '.' : ''}${this.pascalCase(this?.entityName)}`;
            },
            dss() {
                try {
                    const ents = Object.values(this.datasources);

                    if (typeof this?.dsFilterType == 'string') {
                        return ents.filter(e => {
                            return e.type === this.dsFilterType;
                        });
                    }
                    else if (Array.isArray(this.dsFilterType)) {
                        return ents.filter(e => this.dsFilterType.includes(e.type));
                    }

                    return ents;
                }
                catch (err) { return [] }
            }
        }),
        isDefault() {
            if (!this.dsFilterType) return false;

            if (Array.isArray(this.dsFilterType)) {
                return this.arraySames(this.dsFilterType, defaultTypes).length > 0;
            }

            return defaultTypes.includes(this.dsFilterType);
        },
        span() {
            return this.showDepth ? 8 : 12;
        },
        filteredDatasource() {
            try {
                return this.datasources.filter((ds) => ds.key == this.datasource)[0];
            }
            catch (err) { return {} }
        },
        entitiesP() {
            const ds = this.datasource ?? '';

            return (this?.filteredDatasource?.initModel ?? []);
        },
        definition() {
            const ds = this.pascalCase(this.filteredDatasource?.name ?? '');

            const out = {
                datasource: ds,
                entity: this.entity,
                repo: '',
            };

            try {
                out[this.isDefault ? 'datasource' : 'repo'] = `${ds}${!this.isDefault ? '.' : ''}${this.pascalCase(this?.entityName)}`;
            }
            catch (err) {
                console.log('There was an error setting your definition->repo pascal case');
            }

            if (this.showDepth) {
                out['maximumDepth'] = this.maxDepth;
            }

            return out;
        }
    },
    data() {
        return {
            datasource: '',
            entity: '',
            entityName: '',
            maxDepth: 4,
            inited: false,
        };
    },
    mounted() {
        this.datasource = this?.actionStep?.schema?.datasource ?? '';
        this.entity = this?.actionStep?.schema?.entity ?? '';

        if (this?.actionStep?.schema?.repo) {
            const bits = (this?.actionStep?.schema?.repo ?? '').split('.');

            if (bits.length == 2) {
                this.entityName = bits[1];
            }
            else {
                this.entityName = '';
            }
        }

        setTimeout(() => this.inited = true, 200);
    },
    methods: {
        optionSelected({ option }) {
            this.entityName = option.name;
        }
    }
}
</script>
