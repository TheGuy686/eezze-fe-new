<style lang="less" scoped>
.store-list-item {
    cursor: pointer;

    .title {
        margin-bottom: 0px;
    }

    &:hover {
        background-color: rgba(59, 130, 246, 0.1);
    }
}
</style>

<template>
<div style="height: 74vh; max-height: 69dvh" e-scroll>

    <div class="px-5" non-sel w-100>

        <div class="mt-15 pt-15">

            <p class="font-semibold text-lg text-black-1 mt-5">
                
                {{ tr('modules') }}
            
            </p>

        </div>

        <a-row w-100>

            <div w-100>

                <a-list
                    size="large"
                    item-layout="vertical"
                    :loading="isGettingModules"
                    :pagination="pagination" 
                    :data-source="filteredModules"
                >
                    <template #renderItem="item">

                        <a-list-item class="store-list-item" @click="$emit('filter-pressed', item.id)">

                            <e-row>

                                <e-col class="pl-5" jc="c" w-10>

                                    <e-avatar
                                        :size="30"
                                        :color="randDarkColor()"
                                        :initials="item.creator"
                                    />

                                </e-col>

                                <e-col clss="pl-2" w-40>

                                    <e-row>

                                        <h4 class="title">#{{ item.id }} - {{ item.subcName }}</h4>

                                    </e-row>

                                    <e-row>

                                        {{ item.subcDescription }}

                                    </e-row>

                                </e-col>

                                <e-row clss="pr-5" jc="fe" ai="c" w-50 non-sel>

                                    <star-rating
                                        class="mr-1"
                                        :rating="parseFloat(item?.rating ?? 0)"
                                        :show-rating="true"
                                        :read-only="true"
                                        :increment="0.5"
                                        :star-size="27"
                                    />

                                    / 5

                                    <GeneralIcon class="ml-5" type="right-arrow-sm" />

                                </e-row>

                            </e-row>

                          </a-list-item>

                    </template>

                </a-list>

            </div>

        </a-row>

    </div>

</div>
</template>

<script>
import { mapState } from 'vuex';
import StarRating from 'vue-star-rating';

export default {
    components: { StarRating },
    computed: {
        ...mapState('app', [ 'isGettingModules', 'filteredModules' ])
    },
    data() {
        return {
            pagination: { pageSize: 10 },
        }
    },
}
</script>