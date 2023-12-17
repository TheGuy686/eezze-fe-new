<style lang="less" scoped>
.ae-page-root {
    position: relative;
    .advanced-root {
        position: relative;
        height: 79vh;
        max-height: 79vh;
        padding: 10px;
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0px 1px 1px #091E4240, 0px 0px 1px #091E424F;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        white-space: normal;
        width: 100%!important;
        margin-right: -5px;
        border: solid 1px rgba(0, 0, 0, 0.1);

        .con-row {
            max-height: 400px;
            padding: 10px;
            background-color: #F7F8F9;
            border-radius: 3px;
            border: solid 1px rgba(0, 0, 0, 0.1);
            box-shadow: 0px 1px 1px #091E4240, 0px 0px 1px #091E424F;
        }
    }

    .ae-title {
        margin-top: -17px;
    }

    .ae-card {
        background-color: white;
        border: solid 1px rgba(0, 0, 0, 0.1);
		margin-right: 4px;
        margin-bottom: 5px;
        border-radius: 5px;
        padding: 5px;
    }

    .con-title {
        font-size: 1.15em;
    }

    .text-blight {
        color: rgba(0, 0, 0, 0.6);
        font-weight: 800;
    }

    .sg-desc {
        font-size: 11px;
        color: rgba(0, 0, 0, 0.5);
        padding-bottom: 12px;
    }
}
</style>

<template>
<div class="ae-page-root">

    <div class="ae-title">

        <h1 class="ant-page-header-heading-title" non-sel>
            
            {{ tr('advanced-edit') }}

        </h1>

    </div>

    <div class="advanced-root mt-7" e-scroll>

        <e-col>

            <e-row>

                <h2 class="con-title">{{ tr('connections') }}</h2>

                <a-button class="ml-2" type="primary" shape="circle" size="small" @click="$refs['mdl-ce-connection'].show()">

                    <GeneralIcon type="plus-white" />

                </a-button>

            </e-row>
            
            <template v-for="con, index in connections">

                <div class="ds-root" :key="con.id">

                    <e-row class="ds-title" jc="sb" ai="c">

                        <h3 :class="`con-title text-blight ${index > 0 ? 'pt-3' : ''}`">
                        
                            <i>#{{ con.id }} - {{ con.name }}</i>
                        
                        </h3>

                        <a-dropdown>

                            <a-button shape="circle" size="small">

                                <GeneralIcon type="burger-menu-db" />

                            </a-button>

                            <template #overlay>

                                <a-menu>

                                    <a-menu-item @click="$refs['mdl-ce-connection'].show(con)">
                                        
                                        {{ tr('edit-connection') }}
                                    
                                    </a-menu-item>

                                    <a-menu-item @click="$refs['mdl-ce-datasources'].show(undefined, undefined, con)">
                                        
                                        {{ tr('add-datasource') }}
                                    
                                    </a-menu-item>

                                </a-menu>

                            </template>

                        </a-dropdown>

                    </e-row>

                    <e-row clss="con-row">

                        <e-col e-scroll>

                            <h2 class="ds-title">
                                
                                {{ tr('datasources') }}
                            
                            </h2>

                            <template v-if="dssFiltered(con).length > 0">

                                <e-col class="ae-card" :key="ds.id" v-for="ds in dssFiltered(con)">

                                    <e-row jc="sb">

                                        <e-row>

                                            <h3 class="text-blight">
                                            
                                                <i>{{ ds.name }}</i>
                                            
                                            </h3>

                                            <a-tag
                                                class="ml-3"
                                                :color="typeColor(ds.type)"
                                                non-sel
                                            >
                                                {{ tr(ds.type) }}

                                            </a-tag>

                                        </e-row>

                                        <e-row w-15 jc="fe">

                                            <a-button shape="circle" size="small" @click="$router.push({
                                                    path: `/${currentProject}/advanced-edit/entity`,
                                                    params: {
                                                        ds: ds.id,
                                                    },
                                                })"
                                                v-if="isDbDs(ds.type)"
                                            >

                                                <GeneralIcon type="entity-sm" />

                                            </a-button>

                                            <a-button class="ml-1" shape="circle" size="small" @click="$refs['mdl-ce-datasources'].show(ds)">

                                                <GeneralIcon type="edit-sm" />

                                            </a-button>

                                        </e-row>

                                    </e-row>

                                </e-col>

                            </template>

                            <template v-else>

                                <a-empty>

                                    <template #description>

                                        <span v-html="tr('no-dss-please-add')"></span>

                                    </template>

                                    <a-button type="primary" @click="$refs['mdl-ce-datasources'].show(undefined, undefined, con)">
                                        
                                        {{ tr('add-datasource') }}
                                    
                                    </a-button>

                                </a-empty>

                            </template>

                        </e-col>

                    </e-row>

                </div>

            </template>

        </e-col>

    </div>

    <ConnectionCreateEditModal ref="mdl-ce-connection" />

    <DatasourceCreateEditModal ref="mdl-ce-datasources" />

</div>
</template>

<script>
import { mapState } from 'vuex';

const DB_TYPES = [ 'Mysql' ];

export default {
    layout: 'advanced-edit',
    computed: {
        ...mapState('project', {
            connections: (state) => state.connections.entities,
            datasources: (state) => state['data-sources'].entities,
            serviceGroups: (state) => state['service-groups'].entities,
            services: (state) => state.services.entities,
        }),

        isDbDs() {
			return function (type) {
				return DB_TYPES.includes(type);
			}
		},
        dssFiltered() {
            return function(con) {
                return this.datasources.filter((ds) => {
                    return ds.metadata?.connection == con.id;
                });
            };
        },
        typeColor() {
            return function (type) {
                switch (type) {
                    case 'rest-service': return 'blue';
                    case 'ws-service': return 'orange';
                    case 'cron-service': return 'purple';
                    case 'eezze-logger': return 'red';
                    case 'Mysql': return 'green';
                    default: return 'pink';
                }
            }
        }
    },
}
</script>
