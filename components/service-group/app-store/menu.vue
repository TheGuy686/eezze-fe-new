<style lang="less">
.search-term {
    cursor: pointer;
}
</style>

<template>
<a-col class="side pt-10" :span="6" non-sel>

    <div class="pr-1 bg-white">

        <div class="ml-5 mr-5 mb-10">

            <p class="inline font-semibold text-xl text-black-1 text-center">
                
                {{ tr('store') }}
            
            </p>

            <a-button
                size="large"
                class="inline float-right text-black-1 ml-5 border-black-1 border-2 rounded-lg"
                @click="events.emit('send-feedback')"
            >

                {{ tr('send-feedback') }}

            </a-button>

        </div>

        <e-row class="mt-15 mb-5 pr-2" ai="c">

            <EFormInput
                class="pt-15 mx-5"
                :placeholder="tr('search')"
                keyProp="key"
                valueProp="name"
                :inlineOver="true"
                :value="storeSearch"
                @enter-pressed="$store.dispatch('app/searchStore')"
                @input="setAppSearch($event)"
            />

            <a-button
                type="default"
                @click="$store.dispatch('app/searchStore')"
            >

                {{ tr('search') }}

            </a-button>

        </e-row>

        <div style="max-height: 70vh" e-scroll>

            <e-row clss="pr-3 pt-3 pb-3 pl-1" @click="() => {
                $emit('menu-item-clicked');
                $emit('input', { filteredPresetId: 'search' });
            }">

                <p class="search-term font-medium text-base ml-5" :style="`color: rgba(0, 0, 0, ${storeSearch != '' ? '0.6' : '0.3'});`">

                    {{ tr('search-term', { args: [ storeSearch ] }) }}

                </p>

            </e-row>

            <a-menu
                id="main-menu"
                theme="light"
                mode="inline"
                :selected-keys="selectedKeys"
                :open-keys.sync="openKeys"
            >
                <component
                    class="text-black-3 font-medium text-lg"
                    :is="'a-sub-menu'"
                    :key="i"
                    :title="tr(cat.key)"
                    v-for="cat, i in storeMenu"
                    @click="() => {
                        $emit('menu-item-clicked');
                        $emit('input', {
                            filteredPresetId: cat.key,
                            filteredInnerPresetId: value.filteredInnerPresetId,
                        })
                    }"
                >
                    <a-menu-item
                        :key="child.key"
                        :style="child.style"
                        v-for="child in cat.children"
                    >
                        <p 
                            class="text-black-3 font-medium text-base ml-5"
                            @click="() => {
                                $emit('menu-item-clicked');
                                $emit('input', {
                                    filteredPresetId: value.filteredPresetId,
                                    filteredInnerPresetId: child.key,
                                })
                            }"
                        >

                            {{ tr(child.key) }}

                        </p>

                    </a-menu-item>

                </component>

            </a-menu>

        </div>

    </div>

</a-col>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        storeMenu: Array,
        value: Object,
    },
    computed: {
        ...mapState('app', [ 'storeSearch' ]),
    },
    data() {
        return {
            selectedKeys: [ 0 ],
            openKeys: [ 0 ],
        };
    },
    methods: {
        ...mapMutations({
            setAppSearch: 'app/setAppSearch'
        }),
    }
}
</script>