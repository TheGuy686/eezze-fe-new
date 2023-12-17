<style lang="less" scoped>
.root-padding-ui-builder {

    .section-divider {
        width: 100%;
        height: 1px;
        background-color: rgba(0, 0, 0, 0.2);
        margin-bottom: 10px;
        margin-top: 5px;
    }

    .clear-btn {
        height: 20px;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-left: solid 1px 5px;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        background-color: red;
        color: white;
        font-weight: bold;

        &:hover {
            cursor: pointer;
            background-color: white;
            color: black;
        }
    }
}
</style>

<template>
<div class="root-padding-ui-builder" non-sel>

    <template v-if="currentStyleTab == 'target'">

        <e-col>

            <h3 non-sel>{{ tr('target-settings') }}</h3>

            <ServiceConfigurableStyleListStyles
                :editingStyle="editingStyle"
                @style-changed="$emit('style-changed', $event)"
                v-if="isListStyle"
            />

            <ServiceConfigurableStyleTableStyles
                :editingStyle="editingStyle"
                @style-changed="$emit('style-changed', $event)"
                v-if="isTableStyle"
            />

        </e-col>

    </template>

    <template v-else>

        <e-layout-preview
            ref="preview-margin"
            topKey="margin-top"
            rightKey="margin-right"
            bottomKey="margin-bottom"
            leftKey="margin-left"
            bgColor="rgba(255, 255, 179, 0.5)"
            :editingStyle="editingStyle"
            @section-selected="selectedSection = 'margin'"
            @style-changed="$emit('style-changed', $event)"
        >

            <e-layout-preview
                ref="preview-border"
                :hasBorder="true"
                topKey="border-top"
                rightKey="border-right"
                bottomKey="border-bottom"
                leftKey="border-left"
                topLeftKey="border-top-left-radius"
                topRightKey="border-top-right-radius"
                bottomLeftKey="border-bottom-left-radius"
                bottomRightKey="border-bottom-right-radius"
                bgColor="rgba(255, 99, 71, 0.4)"
                :showAllSettings="true"
                title="border"
                cornerTitle="border-radius"
                :editingStyle="editingStyle"
                @section-selected="selectedSection = 'border'"
                @style-changed="$emit('style-changed', $event)"
            >

                <e-layout-preview
                    ref="preview-padding"
                    topKey="padding-top"
                    rightKey="padding-right"
                    bottomKey="padding-bottom"
                    leftKey="padding-left"
                    bgColor="rgba(59, 130, 246, 0.5)"
                    :showContentBorder="true"
                    title="padding"
                    :editingStyle="editingStyle"
                    @section-selected="selectedSection = 'padding'"
                    @style-changed="$emit('style-changed', $event)"
                >

                    <span non-sel>{{ tr('widget-content') }}</span>

                </e-layout-preview>

            </e-layout-preview>

        </e-layout-preview>

        <e-col clss="mt-5">

            <h3 non-sel>{{ tr('additional-settings') }}</h3>

            <e-col>

                <e-row>

                    <e-col w-30 jc="c" non-sel>

                        {{ tr('select-a-bg-color') }}:

                    </e-col>

                    <e-col w-70 :center="true">

                        <EFormColorPicker
                            class="mb-3"
                            :dbounce="500"
                            :value="val('background-color')"
                            @input="$emit('style-changed', { key: 'background-color', value: $event })"
                        />

                    </e-col>

                </e-row>

                <e-row>

                    <e-col w-30 jc="c" non-sel>

                        {{ tr('select-a-font-color') }}:

                    </e-col>

                    <e-col w-70 :center="true">

                        <EFormColorPicker
                            class="mb-3"
                            :dbounce="500"
                            :value="val('color')"
                            @input="$emit('style-changed', { key: 'color', value: $event })"
                        />

                    </e-col>

                </e-row>

                <e-row>

                    <e-col w-30 jc="c" non-sel>

                        {{ tr('font-weight') }}:

                    </e-col>

                    <e-col w-70 :center="true">

                        <EFormInput
                            name=""
                            :placeholder="tr(`input-a-weight`)"
                            :inlineOver="true"
                            :value="val('font-weight')"
                            @input="$emit('style-changed', { key: 'font-weight', value: convertFontWeight($event) })"
                        />

                    </e-col>

                </e-row>

                <e-row>

                    <e-col w-30 jc="c" non-sel>

                        {{ tr('font-size') }}:

                    </e-col>

                    <e-col w-35 :center="true">

                        <EFormInput
                            name=""
                            :placeholder="tr(`input-an-amount`)"
                            :inlineOver="true"
                            castTo="number"
                            :value="fontSize"
                            @input="$emit('style-changed', {
                                key: 'font-size',
                                value: `${getFontSize($event)}${fontSizeUnit}`
                            });"
                        />

                    </e-col>

                    <e-col w-35 stle="padding-top: 4px;">

                        <EFormSelect
                            w-100
                            name=""
                            :placeholder="tr('select-unit')"
                            keyProp="key"
                            valueProp="name"
                            :options="units"
                            :inlineOver="true"
                            :value="fontSizeUnit"
                            @input="$emit('style-changed', {
                                key: 'font-size',
                                value: `${fontSize}${getFontSizeUnit($event)}`
                            });"
                        />

                    </e-col>

                </e-row>

                <e-row>

                    <e-col w-30 jc="c" non-sel>

                        {{ tr('font-style') }}:

                    </e-col>

                    <e-col w-70 stle="padding-top: 4px;">

                        <EFormSelect
                            w-100
                            name=""
                            :placeholder="tr('select-a-style')"
                            keyProp="key"
                            valueProp="name"
                            :options="fontStyles"
                            :inlineOver="true"
                            :value="val('font-style')"
                            @input="$emit('style-changed', { key: 'font-style', value: $event })"
                        />

                    </e-col>

                </e-row>

                <e-row class="mt-2" non-sel>

                    <e-col w-30 jc="c">

                        {{ tr('text-decoration') }}:

                    </e-col>

                    <e-row w-70 ai="c" jc="se">

                        <a-radio-group
                            class="mt-2"
                            button-style="solid"
                            :value="val('text-decoration')"
                            @input="$emit('style-changed', { key: 'text-decoration', value: $event })"
                        >

                            <a-radio-button value="overline">

                                <GeneralIcon :type="textDecoration == 'overline' ? 'text-overline-w' : 'text-overline'" />

                            </a-radio-button>

                            <a-radio-button value="line-through">

                                <GeneralIcon :type="textDecoration == 'line-through' ? 'text-line-through-w' : 'text-line-through'" />

                            </a-radio-button>

                            <a-radio-button value="underline">

                                <GeneralIcon :type="textDecoration == 'underline' ? 'text-underline-w' : 'text-underline'" />

                            </a-radio-button>

                            <a-radio-button value="underline overline">

                                <GeneralIcon :type="textDecoration == 'underline overline' ? 'text-underline-overline-w' : 'text-underline-overline'" />

                            </a-radio-button>

                        </a-radio-group>

                        <div class="clear-btn" @click="$emit('style-changed', { key: 'text-decoration', value: '' })">

                            x

                        </div>

                    </e-row>

                </e-row>

                <e-row class="mt-2" non-sel v-if="!isTextAlignStyle">

                    <e-col w-30 jc="c">

                        {{ tr('text-align') }}:

                    </e-col>

                    <e-row w-70 ai="c" jc="se">

                        <a-radio-group
                            class="mt-2"
                            button-style="solid"
                            :value="textAlign"
                            @input="$emit('style-changed', { key: 'text-align', value: $event })"
                        >

                            <a-radio-button value="left">

                                <GeneralIcon :type="textAlign == 'left' ? 'align-left-w' : 'align-left'" />

                            </a-radio-button>

                            <a-radio-button value="center">

                                <GeneralIcon :type="textAlign == 'center' ? 'align-center-w' : 'align-center'" />

                            </a-radio-button>

                            <a-radio-button value="right">

                                <GeneralIcon :type="textAlign == 'right' ? 'align-right-w' : 'align-right'" />

                            </a-radio-button>

                        </a-radio-group>

                        <div class="clear-btn" @click="$emit('style-changed', { key: 'text-align', value: '' })">

                            x

                        </div>

                    </e-row>

                </e-row>

            </e-col>

        </e-col>

    </template>

</div>
</template>

<script>
import { mapState } from 'vuex';

const LIST_TYPES = [ 'ul', 'ol' ],
      TABLE_TYPES = [ 'th', 'td' ],
      TEXT_ALIGN_TYPES = [
        'text-align-left',
        'text-align-center',
        'text-align-right'
      ];

export default {
    props: {
        currentStyleTab: String,
        editingStyle: {
            type: Object,
            required: true,
        }
    },
    computed: {
        ...mapState('app', [ 'units', 'borderTypes', 'fontStyles' ]),

        key() {
            return this.editingStyle?.key ?? '';
        },
        isListStyle() {
            return LIST_TYPES.includes(this.key);
        },
        fontSize() {
            let es = this?.editingStyle?.style ?? {}, val = es['font-size'] ?? '';

            return Number(val.replace(/[a-z]+$/, '').replace(/(.*?)\.$/, '$1'));
        },
        fontSizeUnit() {
            let es = this?.editingStyle?.style ?? {}, val = es['font-size'] ?? '';

            return val.replaceAll(/[0-9]+/g, '').replace(/^\./g, '');
        },
        isTableStyle() {
            return TABLE_TYPES.includes(this.key);
        },
        isTextAlignStyle() {
            return TEXT_ALIGN_TYPES.includes(this.key);
        },
        textAlign() {
            return this.val('text-align');
        },
        textDecoration() {
            return this.val('text-decoration');
        },
        val() {
            return function (key, subtype) {
                try {
                    const es = this?.editingStyle?.style ?? {};

                    let val = es[key] ?? '';

                    switch (key) {
                        case 'font-weight':
                        case 'color':
                        case 'background-color':
                        case 'text-decoration':
                        case 'text-align':

                            return val;
                    }

                    return es[key] ?? '';
                }
                catch (err) { return '' }
            }
        }
    },
    data() {
        return {
            selectedSection: '',
        }
    },
    mounted() {
        setTimeout(() => {
            try {
                this.setInitValues();
            }
            catch (err) {}

        }, 1000);
    },
    methods: {
        convertFontWeight(val) {
            if (val == 'bold') return 'bold';

            return Number((val + '').replace(/[^0-9.-]/g, ''));
        },
        getFontSize(value) {
            return Number((value + '').replace(/[^0-9.-]/g, ''));
        },
        getFontSizeUnit(value) {
            return `${value ?? ''}`.replaceAll(/^\./g, '');
        },
        setInitValues() {
            this.$refs['preview-margin'].setInitValues();
            this.$refs['preview-border'].setInitValues();
            this.$refs['preview-padding'].setInitValues();
        },
    }
}
</script>
