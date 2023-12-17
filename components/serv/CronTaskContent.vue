<style lang="less" scoped>
.cron-content-root {
    width: 75%;
    
    .divider {
        margin-top: 15px;
        margin-bottom: 15px;
        width: 100%;
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
    }

    .run-tim { color: rgba(0, 0, 0, 0.4); }
    
    .tabs-content {
        position: relative;

        .clone-tab {
            position: absolute;
            border-bottom-style: solid;
            border-bottom-width: 1px;
            border-bottom-color: transparent;
            color: #363636;
            padding: 8px 16px;
            right: 0px;
            top: 3px;

            .active {
                border-bottom-color: #3273dc;

                span { color: #3273dc !important; }
            }

            &:hover {
                cursor: pointer;
                border-bottom-color: #363636;
            }
        }

        .clone-tab-active {
            position: absolute;
            border-bottom-style: solid;
            border-bottom-width: 1px;
            border-bottom-color: #3273dc;
            color: #3273dc !important;
            padding: 8px 16px;
            right: 0px;
            top: 3px;

            &:hover { cursor: pointer; }
        }

        .tabs-content-tabs {
            position: absolute;
            top: 41px;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: white;
            padding-left: 10px;
        }
    }
}
</style>

<template>
<a-col class="cron-content-root mt-3 mb-3" :span="10">

    <EFormInput
        class="mt-7"
        :name="tr('name')"
        :placeholder="tr('name')"
        :hasError="entity.isNew && serviceExists(entity.name)"
        :errorMessage="entity.isNew && serviceExists(entity.name) ? tr('service-name-already-exists') : ''"
        v-model="entity.name"
    />

    <EFormInput
        class="mt-7"
        :name="tr('description')"
        :placeholder="tr('description')"
        v-model="entity.description"
    />

    <!-- <EFormSelect 
        class="mt-5" 
        :name="tr('datasource')"
        leftIcon="database-db"
        :placeholder="tr('select-datasource')"
        keyProp="id"
        valueProp="name"
        :options="cronDss"
        v-model="datasource"
    /> -->

    <div class="divider" />

    <h3 class="run-time">

        {{ tr('run-time') }}

    </h3>

    <div class="tabs-content">

        <div :class="'clone-tab' + (isAdvanced ? '-active' : '')" non-sel @click="advancedSelected()">
            
            <span>{{  tr('advanced', {toUpper: true})  }}</span>

        </div>

        <VueCronEditorBuefy
            ref="editor"
            :visibleTabs="['minutes', 'hourly', 'daily', 'weekly', 'monthly']"
            :context="context"
            v-model="raw"
        />

        <e-col class="tabs-content-tabs" jc="c" v-if="isAdvanced">

            <EFormInput
                name=""
                :placeholder="tr('input-advanced-pattern')"
                :inlineOver="true"
                v-model="advanced"
            />

        </e-col>

    </div>

    <div style="height: 300px;"></div>

</a-col>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapState } from 'vuex';
import VueCronEditorBuefy from '~/plugins/vue-cron-editor-buefy/dist/vue-cron-editor-buefy.umd';

//  https://abichinger.github.io/vue-js-cron/next/demo.html
export default {
    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
    components: { VueCronEditorBuefy },
    watch: {
        editingBlChainItem(to) {
            this.editingLogicChain = {...JSON.parse(JSON.stringify(to))};

            const i = this.editingLogicChain;

            // if (i?.type == 'context-mapping' && )

            // console.log('this.editingLogicChain: ', this.editingLogicChain);
        },
    },
    computed: {
        ...mapGetters({
            serviceExists: 'project/services/serviceExists',
        }),
        ...mapState('app', [ 'editingBlChainItem' ]),
        ...mapState('project/data-sources', {
            dss: (state) => state?.entities ?? [],
        }),

        cronDss() {
            return this.dss.filter((ds) => ds.type == 'cron-service');
        },

        context() {return this},
        defMdl() {
            return function (key) {
                if (typeof this.entity?.definition != 'object') {
                    Vue.set(this.entity, 'definition', {});
                }

                return this.entity.definition[key];
            }
        },
        raw: {
            get() { return this.defMdl('raw') },
            set(value) { this.setDefinitionVal('raw', value) }
        },
        advanced: {
            get() { return this.defMdl('advanced') },
            set(value) { this.setDefinitionVal('advanced', value, true) }
        },
        datasource: {
            get() { return this.defMdl('datasource') },
            set(value) {
                const ds = this.cronDss.filter((ws) => ws.id == value)[0];
                this.setDefinitionVal('datasource', value);
                this.setDefinitionVal('datasourceName', this.kebabCase(ds?.name ?? ''));
            }
        },
    },
    data() {
        return {
            isAdvanced: false,
            valueJustSet: false,
            resetTmr: null,
            isInited: false,
            editingLogicChain: {},
        }
    },
    mounted() {
        if (this.advanced != '') {
            this.isAdvanced = true;
        }

        setTimeout(() => this.isInited = true, 350);
    },
    methods: {
        cronTabChanged() {
            this.isAdvanced = false;
        },
        advancedSelected() {
            this.isAdvanced = true;
        },
        setDefinitionVal(key, value, isAdvanced = false) {
            if (this.valueJustSet) {
                this.valueJustSet = false;
                return;
            }

            if (this.resetTmr) clearTimeout(this.resetTmr);

            if (typeof this?.entity.definition != 'object'){
                Vue.set(this.entity, 'definition', {});
            }

            const out = {
                datasource: this?.entity?.definition?.datasource ?? '',
                datasourceName: this?.entity?.definition?.datasourceName ?? '',
                roles: (this?.entity?.definition?.roles ?? []),
                raw: this.raw,
                advanced: this.advanced,
            };

            if (isAdvanced) out['raw'] = '';
            if (key == 'raw' && value != '' && this.isInited) out['advanced'] = '';

            out[key] = value;

            Vue.set(this.entity, 'definition', out);

            this.valueJustSet = true;

            this.resetTmr = setTimeout(() => this.valueJustSet = false, 200);
        },
    }
}
</script>
