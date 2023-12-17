<template>
<a-tabs v-model="activeKey">

    <a-tab-pane key="info" :tab="tr('info')">

        <e-row>

            <e-col w-45>

                <div class="px-5">

                    <div class="mt-5 mx-5">

                        <p class="text-gray-2">

                            {{ mdl?.subcDescription ?? mdl?.description }}

                        </p>

                    </div>

                </div>

            </e-col>

            <e-col w-55>

                <a-card>

                    <e-col>

                        <e-row class="pr-5" ai="c">

                            <e-row w-40 ai="c">

                                <e-col clss="pl-5" w-60>

                                    <e-avatar
                                        :size="70"
                                        :color="randDarkColor()"
                                        :initials="mdl?.creator"
                                    />

                                </e-col>

                                <e-col ai="fs" w-40>

                                    <p>{{ mdl?.creator }}</p>

                                </e-col>

                            </e-row>

                            <e-row w-60 ai="c" jc="fe">

                                <star-rating
                                    class="mr-1"
                                    :rating="parseFloat(mdl?.rating ?? 0)"
                                    :show-rating="true"
                                    :read-only="true"
                                    :increment="0.5"
                                    :star-size="27"
                                />

                                / 5

                            </e-row>

                        </e-row>

                    </e-col>

                </a-card>

                <a-card class="mt-5">

                    <a-descriptions size="small" :title="tr('tempalte-info')" bordered>

                        <a-descriptions-item :span="3" :label="tr(k)" v-for="s, k in summary">

                            {{ s }}

                        </a-descriptions-item>

                      </a-descriptions>

                </a-card>

            </e-col>

        </e-row>

    </a-tab-pane>

    <a-tab-pane key="modules" :tab="tr('modules')">

        <div>

            <div :key="i" v-for="(sg, i) in template?.serviceGroups ?? []" class="px-5">

                <div class=" mt-15 pt-15">

                    <p class="font-semibold text-lg text-black-1 mt-5">

                        {{ sg?.name }}

                    </p>

                </div>

                <a-row>

                    <div class="max-w-screen-sm">

                        <a-col :key="i" v-for="(s, i) in sg?.services ?? []" class="mt-3" :span="12">

                            <EFormCheckBox
                                class="text-black-1"
                                inlineLabelStyle="padding-left: 20px; min-width: 130px;"
                                :inlineOver="true"
                                :trueValue="true"
                                :name="s?.name"
                                :defaultValue="false"
                                :value="(template.allServiceIds ?? []).includes(s.id)"
                                @input="() => {
                                    if (template.allServiceIds.includes(s.id)) {
                                        template.allServiceIds = template.allServiceIds.filter((id) => id != s.id);
                                    }
                                    else template.allServiceIds.push(s.id);
                                }"
                            />

                        </a-col>

                    </div>

                </a-row>

            </div>

        </div>

    </a-tab-pane>

    <a-tab-pane key="deps" :tab="tr('dependancies')">

        <DashSummary :project="template" />

    </a-tab-pane>

    <a-tab-pane key="reviews" :tab="tr('reviews-tab', {args: [ (template?.reviews?? []).length ]})">

        <ServiceGroupAppStoreModuleReviews
            :storeModuleId="mdl.id"
            :reviews="template?.reviews ?? []"
            @review-added="getStoreDependancies()"
        />

    </a-tab-pane>

</a-tabs>
</template>

<script>
import StarRating from 'vue-star-rating';
import StoreModel from '~/models/StoreModel';

export default {
    components: { StarRating },
    props: {
        mdl: Object,
    },
    computed: {
        summary() {
            return {
                connections: (this.template?.connections ?? []).length,
                datasources: (this.template?.datasources ?? []).length,
                roles: (this.template.roles ?? []).length,
                vault: (this.template.vault ?? []).length,
                values: (this.template.values ?? []).length,
                entities: 10,
                'service-configs': (this.template?.serviceConfigs ?? []).length,
                'service-groups': (this.template?.serviceGroups ?? []).length,
            }
        }
    },
    data() {
        return {
            activeKey: 'info',
            reviews: [
                // {
                //     author: 'Han Solo',
                //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                //     content:
                //         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                //     //datetime: moment().subtract(1, 'days'),
                //     datetime: '',
                //     rating: 2,
                // },
            ],
            template: {
                info: {},
                connections: [],
                datasources: [],
                roles: [],
                vault: [],
                values: [],
                serviceConfigs: [],
                serviceGroups: [],
                reviews: [],
            },
        }
    },
    mounted() {
        this.getStoreDependancies();
    },
    methods: {
        async getStoreDependancies() {
            await this.$store.dispatch('app/getStoreDependancies', {
                storeId: this.mdl.id,
                successCb: (project) => {
                    const storeEntry = StoreModel.create(project);

                    this.template = storeEntry.serializeToTemplate(project);
                }
            });
        }
    }
}
</script>