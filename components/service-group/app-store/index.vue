<style lang="less" scoped>
.ant-checkbox-inner {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border: 2px solid #3F88C5 !important;
    border-radius: 2px;
    border-collapse: separate;
    transition: all 0.3s;
}

.inner-action-chain-root {
    .add-action {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 16px 8px;
        width: 100%;
        height: 56px;
        border: 2px solid #3F88C5;
        border-radius: 8px;
        flex: none;
        order: 0;
        flex-grow: 0;
        color: #3F88C5;
    }
}

.store-back { cursor: pointer; }
</style>

<template>
<EModalFull
    ref="modal"
    :title="''"
    :width="1200"
    :isLoading="isDoingRequest"
    :showFooter="false"
    @modal-closed="setAppSearch('')"
>
    <div class="inner-action-chain-root">

        <ServiceGroupAppStoreMenu
            :storeMenu="storeMenuP"
            v-model="filters"
            @menu-item-clicked="filteredModule = ''"
        />

        <a-col :span="18">

            <div class="inline mx-5">

                <!-- <GeneralIcon class="inline-block" :type="'fb'" /> -->
                    
                <template v-if="!hasModuleFiltered">

                    <p class="inline-block font-semibold text-xl text-black-1 pt-4 absolute">

                        {{ tr(showSearchView ? 'search-results' : filters.filteredInnerPresetId) }}

                    </p>

                </template>

                <template row v-else>

                    <div class="font-semibold text-xl text-black-1 pt-4 absolute">

                        <GeneralIcon type="back" class="store-back" non-sel @click="filteredModule = ''" />

                        <span class="pb-2">

                            {{ fltModule?.subcName }}

                        </span>

                    </div>

                </template>

                <a-row class="inline float-right pt-3">

                    <a-button 
                        size="large"
                        style="margin-left: 5px;" 
                        class="inline bg-success text-white"
                        @click="$emit('action-new-clicked')"
                        v-if="hasModuleFiltered"
                    >
                        {{ tr('add-to-project') }}

                    </a-button>

                </a-row>

            </div>

            <div>

                <template v-if="filteredModule == ''">

                    <div class="pt-10">

                        <div class="mt-5 mx-5">
    
                            <p class="max-w-screen-sm font-semibold text-lg text-black-1">
                                
                                {{ tr('summary') }}
    
                            </p>
                            
                        </div>
    
                        <div class="mt-5 mx-5 mb-3">
    
                            <p 
                                class="text-gray-2"
                                v-html="tr(showSearchView ? 'search-summary' : filteredPreset?.description, { args: [ storeSearch ] })"
                            />
    
                        </div>
    
                    </div>
    
                    <ServiceGroupAppStoreModulesList
                        :filters="filters"
                        @filter-pressed="filteredModule = $event"
                    />

                </template>

                <template v-else>

                    <ServiceGroupAppStoreModuleDetails :mdl="fltModule" />

                </template>

            </div>

        </a-col>

    </div>

</EModalFull>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        value: {
            type: Object,
            require: true,
        },
        isDoingRequest: Boolean,
    },
    watch: {
        filters(to) {
            this.$store.dispatch('app/getCategoryModules', {
                category: to.filteredPresetId,
                subcategory: to.filteredInnerPresetId,
            });
        }
    },
    computed: {
        ...mapState('app', {
            storeMenu: (state) => state.storeMenu,
            storeSearch: (state) => state.storeSearch,
            showSearchView: (state) => state.showSearchView,
            filteredModules: (state) => state.filteredModules,
            storeCategories: (state) => state.storeCategories,
            staticStoreCategories: (state) => state.store.categories.entities,
        }),
        hasModuleFiltered() {
            return Object.keys(this?.fltModule ?? {}).length > 0;
        },
        filteredPreset() {
            try {
                const parentPreset = this.storeMenu.filter((item) => item.key == this.filters.filteredPresetId)[0];

                return (parentPreset?.children ?? []).filter((item) => item.key === this.filters.filteredInnerPresetId)[0];
            }
            catch (error) { return {} }
        },
        fltModule() {
            try {
                return this.filteredModules.filter((mdl) => mdl.id == this.filteredModule)[0];
            }
            catch (error) { return {} }
        },
        storeMenuP() {
            try {
                const out = {};

                // first compile the object of categories from the db (cached / default categories)
                for (const i of this.staticStoreCategories) {
                    out[i.name] = {
                        key: i.name,
                        name: i.nameTr,
                        description: this.tr(i.description),
                        children: [],
                    };
                }

                // Then we need to add in all the different categories that has come from the 
                // endpoint that compiles everything into an ob ject of categoriess and subcats
                for (const i of this.storeMenu) {
                    out[i.key].children = i.children;
                }

                return Object.values(out);
            }
            catch (err) {
                return [];
            }
        }
    },
    data() {
        return {
            filters: {
                filteredPresetId: '',
                filteredInnerPresetId: '',
            },
            filteredModule: '',
        };
    },
    methods: {
        show(search) {
            if (typeof search == 'string' && search.length > 0) {
                this.setAppSearch(search);

                this.filters.filteredPresetId = 'search';

                this.$store.dispatch('app/searchStore');
            }

            this.visible = true;
            this.setDefault();
            this.$refs['modal'].show();
        },
        hide() { this.visible = false },
        setDefault() {
            try {
                const mi = this.storeMenu[0];

                this.filters = {
                    filteredPresetId: mi.key,
                    filteredInnerPresetId: mi.children[0].key,
                };
            }
            catch (err) {
                console.log('Error: ', err);
            }
        },
        handleOk(e) {
            this.$emit(
                'right-btn-clicked',
                () => setTimeout(
                    this.hide(),
                    1700
                )
            );
        },
        handleCancel(e) { this.hide() },
        ...mapMutations({
            setAppSearch: 'app/setAppSearch'
        }),
    },
}
</script>