<style lang="less" scoped>
.theme-widget-root {
    .item {
        cursor: pointer;

        &:hover {
            background-color: rgba(59, 130, 246, 0.5);

            h3 { color: white; }
        }
    }

    .back-button {
        cursor: pointer;
    }
}
</style>

<template>
<e-col clss="theme-widget-root">

    <a-carousel ref="car-styles" :dots="false">

        <div>

            <a-list size="small" bordered :data-source="styles">

                <template #renderItem="s">

                    <a-list-item class="item" :key="s.key" non-sel @click="openMenuClicked(s)">

                        <e-row ai="c" jc="sb">

                            <h3>{{ tr(s.key) }}</h3>

                            <GeneralIcon type="right-arrow-sm" />

                        </e-row>

                    </a-list-item>

                </template>

            </a-list>

        </div>

        <div class="pl-2">

            <e-row ai="c">

                <GeneralIcon
                    class="back-button"
                    type="back"
                    @click="backClicked()"
                />

                <a-button class="mr-1 ml-1"
                    :type="currentStyleTab == 'target' ? 'primary' : 'default'"
                    :disabled="shouldDisableTargetTab"
                    @click="currentStyleTab = 'target'"
                >

                    {{ tr('target-styles') }}

                </a-button>

                <a-button
                    :type="currentStyleTab == 'common' ? 'primary' : 'default'"
                    @click="currentStyleTab = 'common'"
                >

                    {{ tr('common-styles') }}

                </a-button>

            </e-row>

            <ServiceConfigurableStyle
                ref="styles-cont"
                :editingStyle="editingStyle"
                :currentStyleTab="currentStyleTab"
                @style-changed="setStyleProp($event.key, $event.value)"
            />

        </div>

    </a-carousel>

</e-col>
</template>

<script>
import { ref } from 'vue';

const DISABLE_TYPES = [
    'heading-1',
    'heading-2',
    'heading-3',
    'heading-4',
    'heading-5',
    'heading-6',
    'text-align-left',
    'text-align-center',
    'text-align-right',
    'blockquote',
    'code',
];

export default {
    props: {
        metadata: {
            type: Object,
            required: true,
        },
        value: {
            type: Object,
            reuqired: true,
        },
    },
    computed: {
        key() {
            return this.editingStyle?.key ?? '';
        },
        shouldDisableTargetTab() {
            return DISABLE_TYPES.includes(this.key);
        },
        reactiveMdl() {
            return {
                counter: this.counter,
                editingStyle: this.editingStyle,
            };
        },
        editing() {
            return {
                counter: this.counter,
                recEditingItem: this.editingStyle,
            };
        },
        stylesMdl() {
            try {
                let obj = {...this.value};

                return {...JSON.parse(JSON.stringify(obj))};
            }
            catch (err) {
                return {};
            }
        },
        styles() {
            try {
                return Object.values(this.stylesMdl);
            }
            catch (err) { return [] }
        },
    },
    data() {
        return {
            dotPosition: ref('0'),
            backOpacity: 0,
            aniTmr: null,
            currentStyleTab: 'common',
            editingStyle: {},
            // stylesMdl: {},
            counter: 0,
            resetTmr: null,
        }
    },
    mounted() {
        // let obj = {...this.value};

        // this.stylesMdl = {...JSON.parse(JSON.stringify(obj))};
    },
    methods : {
        openMenuClicked(style) {
            this.editingStyle = style;

            this.$refs['styles-cont'].setInitValues();
            this.$refs['car-styles'].next();
        },
        backClicked() {
            this.$refs['car-styles'].prev();

            setTimeout(() => this.currentStyleTab = 'common', 30);
        },
        setStyleProp(key, value) {
            if (this.resetTmr) clearTimeout(this.resetTmr);

            try {
                this.counter++;

                if (this.editingStyle) {
                    const k = this.editingStyle.prefix ,
                        style = (this.editingStyle.style ?? {});

                    if (!value) delete style[key];
                    else style[key] = value;

                    this.editingStyle.style = {...style};

                    if (typeof this.stylesMdl[k] == 'object') {
                        const md = {...this.metadata};
                        this.stylesMdl[k].style = {...style};

                        md['templateStyles'] = {...JSON.parse(JSON.stringify(this.stylesMdl))};

                        this.$emit('input', md);
                    }
                }

                this.resetTmr = setTimeout(() => this.counter = 0, 200);
            }
            catch (err) { console.log('Error: ', err) }
        },
    }
}
</script>
