<style lang="less">
.store-drawer-root {

}
</style>
<template>
<a-drawer
    :title="tr('store')"
    placement="right"
    :width="windowWidth * 0.29"
    :closable="true"
    :visible="visible"
    :get-container="false"
    :wrap-style="{ position: 'absolute' }"
    :body-style="{ height: '91.2%', padding: '2px 5px 0px 5px' }"
    @close="$emit('close')"
>
    <e-col h-100 f-1>

        <e-col clss="p-0" f-2>

            <a-list size="small" :loading="retrievingModules" bordered :data-source="featured">

                <template #header>

                    <div non-sel>{{ tr('featured-modules') }}</div>

                </template>

                <template #renderItem="item">

                    <dash-ai-store-drawer-li
                        :item="item"
                        @item-clicked="storeModuleClicked(item)"
                    />

                </template>

            </a-list>

        </e-col>

        <e-col clss="p-0 mt-2" f-5>

            <a-list
                size="small"
                :loading="retrievingModules"
                bordered
            >
                <template #header>

                    <div non-sel>{{ tr('recommend-modules') }}</div>

                </template>

                <dash-ai-store-drawer-li
                    :item="item"
                    :key="index"
                    v-for="item, index in recommended"
                    @item-clicked="storeModuleClicked(item, index)"
                />

            </a-list>

        </e-col>

    </e-col>

    <dash-ai-store-drawer-module-overview
        ref="module-overview"
        :finalizeCb="finalizeCb"
        @confirm-add-module="finalizeCb($event)"
    />

</a-drawer>
</template>

<script>
import { mapState } from 'vuex';
import { store } from '~/consts/Endpoints';

export default {
    props: {
        visible: Boolean,
    },
    computed: {
        ...mapState('app', [ 'windowWidth' ]),
    },
    data() {
        return {
            finalizeCb: null,
            retrievingModules: false,
            storeDetailsDrawerVisible: false,
            featured: [],
            recommended: [],
        }
    },
    methods: {
        storeModuleClicked(mdul) {
            this.$refs['module-overview'].show(mdul);
        },
        async openStore(term, finalizeCb) {
            this.finalizeCb = (mod) => {
                this.os(() => this.$refs['module-overview'].hide(), 200);
                finalizeCb(mod);
            };

            let res;

            this.retrievingModules = true;

            let totmr;

            // const totmr = setTimeout(() => {
            //     this.retrievingModules = false;

            //     this.$notification.error(this.tr('request-timeout'), { timer: 2 });
            // }, 6000);

            try {
                const url = `${store.searchOnTags}?term=${term}`;

                res = await this.$axios.get(url);

                if (res.status > 199 && res.status < 300) {
                    this.featured = res.data?.featured.map((i, index) => ({
                        _index: index,
                        ...i,
                    })) ?? [];
                    this.recommended = res.data?.recommended.map((i, index) => ({
                        _index: index,
                        ...i,
                    })) ?? [];

                    if (totmr) clearTimeout(totmr);
                }

                this.retrievingModules = false;
            }
            catch (e) {
                // console.log('ERROR: ', e);
                if (e?.response?.data?.error) {
					this.$notification.error(
						JSON.stringify(e?.response?.data?.error, null, 4),
						{ timer: 2 }
					);
				}

				this.retrievingModules = false;
            }
        },
    }
}
</script>