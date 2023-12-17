<style lang="less" scoped>
.form-div {
    height: 100%;
    width: 1px;
    background-color: #d9d9d9;
    margin-left: 10px;
}

.model-content-root {
    .title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        margin-bottom: 30px;
    }
}
</style>

<template>
<a-form-model ref="form-mdl" :footer="null" class="model-content-root">

    <div>

        <a-carousel
            effect="scrollx"
            ref="content-carousel"
            :dots="false"
            :after-change="(pos) => index = pos"
        >
            <e-col>

                <GeneralBeveledGrid  style="width: 102%; margin-left: -8px; height: 450px;">

                    <GeneralBeveledGridItem
                        :id="item.key"
                        :bgColor="item.color"
                        :title="item.name"
                        :helpText="item?.help ?? ''"
                        v-model="selectedKeys"
                        :key="index"
                        v-for="(item, index) in datasourceTypes"
                    />

                </GeneralBeveledGrid>

            </e-col>

            <div>

                <EFormInput
                    :name="tr('name')"
                    :message="tr('please-input-a-name')"
                    inputCase="titleCase"
                    :value="entity.name"
                    @input="setEntityProp({ key: 'name', value: $event })"
                />

                <EFormSelect
                    class="mt-5 mb-5"
                    :name="tr('connection')"
                    :placeholder="tr('select-a-connection')"
                    keyProp="id"
                    valueProp="name"
                    :options="filteredConns"
                    :value="entity?.metadata?.connection"
                    @input="setEntityProp({ key: 'metadata', value: {
                        ...(entity?.metadata ?? {}),
                        connection: $event}
                    })"
                    v-if="needsConnection && !isConnOverride"
                />

                <div v-else-if="isConnOverride"></div>

            </div>

            <div>

                <div style="flex: 1;">

                    <DatasourceFormRestService
                        ref="form-content"
                        :width="width"
                        :maxHeight="maxHeight"
                        :connection="filteredConnection"
                        @validity-changed="counter++"
                        v-if="currentSel == 'rest-service'"
                    />

                    <DatasourceFormWsService
                        ref="form-content"
                        :width="width"
                        :maxHeight="maxHeight"
                        :connection="filteredConnection"
                        @validity-changed="counter++"
                        v-else-if="currentSel == 'ws-service'"
                    />

                    <DatasourceFormMysql
                        ref="form-content"
                        :width="width"
                        :maxHeight="maxHeight"
                        :connection="filteredConnection"
                        @validity-changed="counter++"
                        v-else-if="currentSel == 'Mysql'"
                    />

                    <DatasourceFormFileStorage
                        ref="form-content"
                        :width="width"
                        :maxHeight="maxHeight"
                        :connection="filteredConnection"
                        @validity-changed="counter++"
                        v-else-if="currentSel == 'FileStorage'"
                    />

                    <DatasourceFormSmtpMailService
                        ref="form-content"
                        :width="width"
                        :maxHeight="maxHeight"
                        :connection="filteredConnection"
                        @validity-changed="counter++"
                        v-else-if="currentSel == 'SmtpMailService'"
                    />

                    <DatasourceFormRestApiInteg
                        ref="form-content"
                        :width="width"
                        :maxHeight="maxHeight"
                        :connection="filteredConnection"
                        @validity-changed="counter++"
                        v-else-if="currentSel == 'rest-api-integration'"
                    />

                    <DatasourceFormWsApiInteg
                        ref="form-content"
                        :width="width"
                        :maxHeight="maxHeight"
                        :connection="filteredConnection"
                        @validity-changed="counter++"
                        v-else-if="currentSel == 'ws-api-integration'"
                    />

                    <DatasourceFormEezzeLogger
                        ref="form-content"
                        :width="width"
                        :maxHeight="maxHeight"
                        :connection="filteredConnection"
                        @validity-changed="counter++"
                        v-else-if="currentSel == 'eezze-logger'"
                    />

                </div>

            </div>

        </a-carousel>

    </div>

</a-form-model>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

const VALID_TYPES = [
    'rest-service',
    'ws-service',
    'Mysql',
    'FileStorage',
    'SmtpMailService',
    'ws-api-integration',
    'rest-api-integration',
    'eezze-logger',
];

export default {
    props: {
        value: Boolean,
        initIndex: Number,
        isConnOverride: Boolean,
    },
    watch:{
        selectedKeys(to) {
            this.setEntityProp({ key: 'type', value: to[0] });
            this.$emit('input', this.selectedKeys.length > 0);
        },
        index(to) {
            this.$emit('index-changed', to);
        },
        innerFormIsValid(to) {
            this.$emit('inner-form-validity-changed', to);
        },
    },
    computed: {
        ...mapState('project', {
            entity: (state) => state?.['data-sources']?.entity ?? {},
            connections: (state) => state?.connections?.entities ?? [], 
        }),
        ...mapState('cms/datasources/type', {
            datasourceTypes: state => state.entities
        }),
        width() {
            try {
                return this.$refs['form-mdl'].$el.clientWidth;
            }
            catch (err) { return 0 }
        },
        currentSel() {
            return this.selectedKeys[0];
        },
        needsConnection() {
            if (this.currentSel == 'SmtpMailService') return false;
            if (this.currentSel == 'rest-api-integration') return false;
            if (this.currentSel == 'ws-api-integration') return false;

            return true;
        },
        innerFormIsValid() {
            if (this.counter > 100000000) return true;

            try {
                return !!this.$refs['form-content'].formIsValid;
            }
            catch (err) { return false }
        },
        formIsValid() {
            return this.selectedKeys.length > 0 && !(!this.entity?.metadata?.connection);
        },
        filteredConns() {
            try {
                return this.connections.filter((c) => {
                    return (c?.metadata?.serviceTypes ?? []).includes('installable-services');
                });
            }
            catch (err) {
                console.log('filteredConns.error: ', err);
                return [];
            }
        },
        filteredConnection() {
            try {
                return this.filteredConns.filter((con) => con.id == this.entity?.metadata?.connection)[0];
            }
            catch (err) {return {}}
        }
    },
    data() {
        return {
            selectedKeys: [],
            index: 0,
            counter: 0,
            maxHeight: 400,
        }
    },
    mounted() {
        this.index = this.initIndex ?? 0;

        if (VALID_TYPES.includes(this?.entity?.type)) {
            this.selectedKeys = [ this?.entity?.type ];
        }
    },
    methods: {
        setIndex(index) {
            this.index = index;

            this.$refs['content-carousel'].goTo(index);
        },
        selectDatasource() {
            this.$refs['content-carousel'].goTo(1);
        },
        selectConnection() {
            this.$refs['content-carousel'].goTo(2)
        },
        carouselPrevious(){
            this.$refs['content-carousel'].prev();
        },
        ...mapMutations({
            setEntityProp: 'project/data-sources/setEntityProp',
        }),
    }
};
</script>