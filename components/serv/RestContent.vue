<style lang="less" scoped>
.rest-content-root {
    .divider {
        margin-bottom: 15px;
        margin-top: 15px;
        width: 100%;
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
    }
}
</style>

<template>
<a-col class="rest-content-root mt-3 mb-3" :span="10">

    <EFormInput
        :name="tr('name')"
        :placeholder="tr('name')"
        inputCase="titleCase"
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
        :options="restDss"
        v-model="datasource"
    /> -->

    <div class="divider" />

    <label non-sel>{{ tr('select-method') }}</label>

    <a-radio-group
        class="mt-2"
        button-style="solid"
        v-model="method"
    >
        <a-radio-button value="get">

            {{ tr('get', {toUpper: true}) }}

        </a-radio-button>

        <a-radio-button value="post">

            {{ tr('post', {toUpper: true}) }}

        </a-radio-button>

        <a-radio-button value="put">

            {{ tr('put', {toUpper: true}) }}

        </a-radio-button>

        <a-radio-button value="delete">

            {{ tr('delete', {toUpper: true}) }}

        </a-radio-button>

    </a-radio-group>

    <EFormInput
        class="mt-7"
        :name="tr('path-name')"
        :placeholder="tr('path')"
        castTo="website-path"
        addonBefore="/"
        v-model="path"
    />

    <EFormSelect
        class="mt-7"
        :name="tr('requires-authentication-qu')"
        :placeholder="tr('select-an-authenticator')"
        keyProp="id"
        valueProp="name"
        :options="authenticators"
        :disabled="authenticators.length == 0"
        :toolTipText="authenticators.length == 0 ? tr('no-authenticators-available-yet') : ''"
        v-model="auth"
        @option-selected="setDefinitionVal('authKey', pascalCase($event.option.name))"
    />

</a-col>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapState } from 'vuex';

const DEFINITION_DEF = { method: 'get' };

export default {
    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
    watch: {
        editingBlChainItem(to) {
            this.editingLogicChain = {...JSON.parse(JSON.stringify(to))};

            const i = this.editingLogicChain;

            // if (i?.type == 'context-mapping' && )

            // console.log('this.editingLogicChain: ', this.editingLogicChain);
        },
    },
    computed: {
        ...mapState('app', [ 'editingBlChainItem' ]),
        ...mapGetters({
            authenticators: 'project/service-groups/authenticators',
            serviceExists: 'project/services/serviceExists',
        }),
        ...mapState('project', {
            editingService: (state) => state?.services?.entity,
        }),
        ...mapState('project/data-sources', {
            dss: (state) => state?.entities ?? [],
        }),
        restDss() {
            return this.dss.filter((ds) => ds.type == 'rest-service');
        },
        defMdl() {
            return function (key) {
                if (typeof this.entity?.definition != 'object') {
                    Vue.set(this.entity, 'definition', {...DEFINITION_DEF});
                }

                return this.entity.definition[key];
            }
        },
        datasource: {
            get() { return this.defMdl('datasource') },
            set(value) {
                const ds = this.restDss.filter((ws) => ws.id == value)[0];
                this.setDefinitionVal('datasource', value);
                this.setDefinitionVal('datasourceName', this.kebabCase(ds?.name ?? ''));
            }
        },
        method: {
            get() { return this.defMdl('method') },
            set(value) { this.setDefinitionVal('method', value) }
        },
        auth: {
            get() { return this.defMdl('auth') },
            set(value) { this.setDefinitionVal('auth', value) }
        },
        path: {
            get() { return this.defMdl('path') },
            set(value) { this.setDefinitionVal('path', value.replace(/^\//, '')) }
        },
    },
    data() {
        return {
            editingLogicChain: {},
        };
    },
    methods: {
        setDefinitionVal(key, value) {
            if (typeof this?.entity.definition != 'object'){
                Vue.set(this.entity, 'definition', {...DEFINITION_DEF});
            }

            const out = {
                auth: this?.entity?.definition?.auth,
                authKey: this?.entity?.definition?.authKey,
                method: this?.entity?.definition?.method ?? 'get',
                path: this?.entity?.definition?.path ?? '',
                datasource: this?.entity?.definition?.datasource ?? '',
                datasourceName: this?.entity?.definition?.datasourceName ?? '',
            };

            out[key] = value;

            Vue.set(this.entity, 'definition', out);
        },
    }
}
</script>
