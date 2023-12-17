<template>
<div style="text-align: left;">

    <a-descriptions
        style="max-height: 60vh;"
        bordered
        size="small"
        :title="'Service Group'"
        e-scroll
    >
        <a-descriptions-item :span="3" :label="tr('name')">

            <EFormInput
                :placeholder="tr('please-input-a-value')"
                inputCase="titleCase"
                v-model="name"
            />

        </a-descriptions-item>

        <a-descriptions-item :span="3" :label="tr('description')">

            <EFormTextArea
                :placeholder="tr('please-input-a-value')"
                v-model="description"
            />

        </a-descriptions-item>

        <a-descriptions-item :span="3" :label="tr('category')">

            <EFormSelect
                class="pr-2"
                name="category"
                :placeholder="tr('select-a-category')"
                keyProp="name"
                valueProp="nameTr"
                :options="storeCategories"
                :inlineOver="true"
                v-model="category"
            />

        </a-descriptions-item>

        <a-descriptions-item :span="3" :label="tr('subcategory')">

            <EFormSelect
                class="pr-2"
                name="category"
                :placeholder="tr('select-a-subcategory')"
                keyProp="name"
                valueProp="nameTr"
                :options="storeSubcategories"
                :inlineOver="true"
                :allowClear="true"
                v-model="subcategory"
                @option-selected="categoryLabel = $event.option.name; subcategoryIns = ''"
            />

            <span class="pt-2 pb-2" non-sel>----------- {{ tr('or') }}  -----------</span>

            <EFormInput
                :name="tr('insert-subcategory')"
                :placeholder="tr('please-input-a-value')"
                inputCase="kebabCase"
                :allowClear="true"
                v-model="subcategoryIns"
            />

        </a-descriptions-item>

        <a-descriptions-item :span="3" :label="tr('functional-description')">

            <EFormTextArea v-model="sgFunction" :placeholder="tr('functional-description-help')" />

        </a-descriptions-item>

        <a-descriptions-item :span="3" :label="tr('bullet-point-description')">

            <EFormTextArea :placeholder="tr('bullet-point-description-help')" v-model="shortFunction" />

        </a-descriptions-item>

        <a-descriptions-item :span="3" :label="tr('tags')">

            <a-select
                mode="tags"
                style="width: 100%"
                :token-separators="[' ']"
                :placeholder="tr('input-some-matching-tags')"
                :options="tagsP"
                v-model:value="tags"
            />

        </a-descriptions-item>

        <a-descriptions-item :span="3" :label="tr('ai-suggested-tags')">

            <a-select
                ref="ai-tags"
                mode="tags"
                style="width: 100%;"
                :token-separators="[' ']"
                :placeholder="tr('input-some-matching-tags')"
                :options="[]"
                v-model="aiSuggestedTags"
            />

            <h3 v-if="isDoingRequest">{{ tr('asking-ai') }}</h3>

        </a-descriptions-item>

    </a-descriptions>

</div>
</template>

<script>
import { mapState } from 'vuex';
import { store } from '~/consts/Endpoints';

export default {
    props: {
        serviceGroup: Object,
        scopeIn: String,
    },
    watch: {
        subcategoryIns(to) {
            if (to) return;

            this.subcategory = '';
            this.subcategoryLabel = '';
        },
        subcategory(to) {
            if (to) return;

            this.subcategoryIns = '';
        },
        form(to) {
            this.events.emit('set-publish-store-form-data', to);
        },
        sgFunction() {
            this.doGetTags();
        },
        shortFunction() {
            this.doGetTags();
        },
    },
    computed: {
        ...mapState('cms/sg-tags', {
            standardizedTags: (state) => [...state.entities]
                .sort((a, b) => a.length - b.length)
                .map(t => ({
                    value: t,
                    label: t,
                })),
        }),
        ...mapState('app/store/categories', {
            storeCategories: (state) => state.entities,
        }),

        tagsP() {
            return this.standardizedTags.filter(t => !this.tags.includes(t.value));
        },
        canAddTags() {
            return !!this.sgFunction && !!this.shortFunction;
        },
        form() {
            return JSON.parse(JSON.stringify({
                name: this.name,
                description: this.description,
                scope: this.scope,
                category: this.category,
                categoryLabel: this.categoryLabel,
                subcategory: this.subcategory,
                subcategoryLabel: this.subcategoryLabel,
                subcategoryIns: this.subcategoryIns,
                sgFunction: this.sgFunction,
                shortFunction: this.shortFunction,
                tags: [
                    ...this.tags,
                    ...this.aiSuggestedTags,
                ].join(' '),
            }));
        },
        aiSuggestedTags: {
            get() {
                return this.$data._aiSuggestedTags;
            },
            set(value) {
                if (value?.length >= this.$data._aiSuggestedTags.length) {
                    return;
                }

                this.$data._aiSuggestedTags = value;
            }
        }
    },
    data() {
        return {
            isDoingRequest: false,
            name: '',
            description: '',
            scope: 'store',
            category: '',
            categoryLabel: '',
            subcategory: '',
            subcategoryLabel: '',
            subcategoryIns: '',
            sgFunction: 'This module is a basic e-commerce store management. The primary task of this module is to manage the app store, listing of new items and bidding of new items. ',
            shortFunction: `product management
new listings
most popular features
e-commerce
product promotions
product image gallery management`,
            storeSubcategories: [],
            tags: [],
            _aiSuggestedTags: [],

            doTagsCheck: null,
        }
    },
    mounted() {
        this.scope = this.scopeIn;
    },
    methods: {
        doGetTags() {
            if (this.doTagsCheck) clearTimeout(this.doTagsCheck);

            this.doTagsCheck = setTimeout(async () => {

                await this.getTags();

            }, 2000);
        },
        async getTags() {
            let res;

            this.isDoingRequest = true;

            let totmr;

            // const totmr = setTimeout(() => {
            //     this.isDoingRequest = false;

            //     this.$notification.error(this.tr('request-timeout'), { timer: 2 });
            // }, 6000);

            try {
                const url = `${store.sgTags.all}?functionDesc=${this.sgFunction}&bulletPointDesc=${this.shortFunction}`;

                res = await this.$axios.get(url);

                if (res.status > 199 && res.status < 300) {
                    await this.setAiSUggestedTags(res.data);

                    if (totmr) clearTimeout(totmr);
                }

                this.isDoingRequest = false;
            }
            catch (e) {
                // console.log('ERROR: ', e);
                if (e?.response?.data?.error) {
					this.$notification.error(
						JSON.stringify(e?.response?.data?.error, null, 4),
						{ timer: 2 }
					);
				}

				this.isDoingRequest = false;
            }
        },
        async setAiSUggestedTags(tags) {
            this.aiSuggestedTags = [];

            for (const t of tags) {
                await new Promise((res) => {
                    setTimeout(() => {
                        this.aiSuggestedTags.push(t);
                        res();
                    }, 290);
                });
            }
        },
        getForm() {
            return {
                name: this.name,
                description: this.description,
                scope: this.scope,
                category: this.category,
                categoryLabel: this.categoryLabel,
                subcategory: this.subcategory,
                subcategoryLabel: this.subcategoryLabel,
                subcategoryIns: this.subcategoryIns,
                sgFunction: this.sgFunction,
                shortFunction: this.shortFunction,
                tags: [
                    ...this.tags,
                    ...this.aiSuggestedTags,
                ],
            };
        },

    },
}
</script>