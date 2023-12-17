<style lang="less">
.comment-list {
    text-align: left;
}
</style>

<template>
<div>

    <e-row jc="fe">

        <a-button
            style="z-index: 1000;"
            class="add-prop-btn"
            type="primary"
            shape="circle"
            size="small"
            @click="$refs['add-review-mdl'].show()"
        >
            <GeneralIcon type="plus-white" />

        </a-button>

    </e-row>

    <a-list
        class="comment-list"
        item-layout="horizontal"
        :data-source="reviews"
        style="margin-top: -30px;"
    >
        <template #renderItem="item">
                
            <a-list-item>

                <a-comment :author="item.author" :avatar="item.avatar" style="width: 100%;">

                    <template #content>

                        <e-row :fillParant="true">

                            <e-col w-75>

                                {{ item.comment }}

                            </e-col>

                            <e-col w-25>

                                <star-rating
                                    class="mr-1"
                                    :rating="parseFloat(item?.rating ?? 0)"
                                    :read-only="true"
                                    :show-rating="false"
                                    :increment="0.5"
                                    :star-size="18"
                                    :round-start-rating="true"
                                    active-color="orange"
                                />

                            </e-col>

                        </e-row>

                    </template>

                    <template #datetime>

                        <a-tooltip :title="item.reviewedAt">

                            <span>{{ fdate(item.reviewedAt) }}</span>

                        </a-tooltip>

                    </template>

                </a-comment>

            </a-list-item>

        </template>

    </a-list>
    
    <EModal
        ref="add-review-mdl"
        :title="tr('review-module')"
        :width="700"
        :isLoading="isAddingReview"
        @modal-closed="review = { rating: 5, comment: '' }"
        @right-btn-clicked="$store.dispatch('user/store/addReview', {
            review: {
                store: storeModuleId,
                ...review,
            },
            successCb: async () => {
                $emit('review-added');
                os(() => {
                    $refs['add-review-mdl'].hide();
                }, 200)
            },
            errorFallback: (error) => {}
        })"
    >
        <e-col :fillParant="true">

            <e-row>

                <e-col w-30>

                    {{ tr('rating') }}

                </e-col>

                <e-col w-30>

                    <star-rating
                        class="mr-1"
                        :rating="review.rating"
                        :show-rating="false"
                        :increment="0.5"
                        :star-size="18"
                        :round-start-rating="true"
                        active-color="orange"
                        v-model="review.rating"
                    />

                </e-col>

            </e-row>

            <e-row class="mt-5">

                <e-col w-30>

                    {{ tr('comment') }}

                </e-col>

                <e-col w-70>

                    <EFormTextArea
                        :placeholder="tr('please-input-a-value')"
                        v-model="review.comment"
                    />

                </e-col>

            </e-row>

        </e-col>

    </EModal>

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import StarRating from 'vue-star-rating';
import moment from 'moment';

export default {
    components: { StarRating },
    props: {
        storeModuleId: String | Number,
        reviews: Array,
    },
    computed: {
        ...mapState('user/store', [ 'isAddingReview' ]),
        fdate() {
            return function (dte) {
                return moment(dte, 'YYYY-MM-DD HH:mm:ss').fromNow();
            }
        }
    },
    data() {
        return {
            review: {
                rating: 5,
                comment: '',
            },
        }
    },
    methods: {
        dlog() {
            console.log.apply(console.log, arguments);
        },
        ...mapMutations({
            setAppSearch: 'app/setAppSearch'
        }),
    }
}
</script>