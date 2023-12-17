<style lang="less" scoped>
.li-root {

}
</style>
<template>
<a-list-item class="hoverable" @click="$emit('item-clicked')">

    <e-row ai="c">

        <e-col jc="c" w-10 class="pr-2">

            <a-tooltip placement="left">

                <a-avatar non-sel src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />

                <template #title>

                    User rating : 5 / 5<br>
                    Creator Since: 3 years ago<br>
                    Models Created: 4<br>
                    User Reviews: 4<br>
                    Module Reviews: 5<br>

                </template>

            </a-tooltip>

        </e-col>

        <e-row ai="c" jc="sb" w-90>
                
            <a-tooltip placement="bottom">

                <template #title>

                    {{ item.description }}

                </template>

                <h3 class="p-0 m-0" non-sel>

                    {{ item.title }}

                </h3>

            </a-tooltip>

            <e-row w-60 ai="c" jc="fe" non-sel>

                <star-rating
                    class="mr-1"
                    :rating="item?.rating ?? 0"
                    :show-rating="true"
                    :read-only="true"
                    :increment="0.5"
                    :star-size="15"
                />

                <span non-sel>/ 5</span>

                <GeneralIcon class="hoverable ml-3" type="right-arrow-sm" />

            </e-row>

        </e-row>

    </e-row>

</a-list-item>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
    components: { StarRating },
    props: {
        item: Object,
    },
}
</script>