<style lang="less" scoped>
.root-layout-preview {
    border: 1px dashed rgba(0, 0, 0, 0.6);

    .top-row {
        .title {
            margin-left: 5px;
            margin-bottom: 8px;
            margin-top: 8px;
            font-weight: 600;
        }
    }

    .settings-dot {
        width: 10px;
        height: 10px;
        background-color: black;
        border-radius: 5px;
    }

    .feedback {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>

<template>
<e-col class="root-layout-preview">

    <e-row
        class="top-row"
        :style="`background-color: ${hovered ? hoverColor : bgColor};`"
        :clickable="true"
        :hoverable="true"
        @hovered="hovered = $event"
        @clicked="bgClicked"
    >

        <e-row jc="c">

            <a-popover placement="left" trigger="click" v-if="isCornerValue || showAllSettings">

                <div class="feedback"
                    @mouseenter="valBtnHovered = true"
                    @mouseleave="valBtnHovered = false"
                >

                    <template v-if="!showAllSettings">

                        -

                    </template>

                    <div class="settings-dot" v-else></div>

                </div>

                <template #title>

                    <span>{{ tr(`${cornerTitle ? cornerTitle : title}-top-left`) }}</span>

                </template>

                <template #content>

                    <e-col>

                        <e-row>

                            <e-col w-30 jc="c">

                                {{ tr('amount') }}:

                            </e-col>

                            <e-col w-70 :center="true">

                                <EFormInput
                                    name=""
                                    :placeholder="tr(`input-${cornerTitle ? cornerTitle : title}`)"
                                    type="number"
                                    :inlineOver="true"
                                    v-model="topLeftVal"
                                />

                            </e-col>

                        </e-row>

                        <e-row class="mt-2">

                            <e-col w-30 jc="c">

                                {{ tr('unit') }}:

                            </e-col>

                            <e-col w-70 :center="true">

                                <EFormSelect
                                    w-100
                                    name=""
                                    :placeholder="tr('select-unit')"
                                    keyProp="key"
                                    valueProp="name"
                                    :options="units"
                                    :inlineOver="true"
                                    v-model="topLeftUnits"
                                />

                            </e-col>

                        </e-row>

                    </e-col>

                </template>

            </a-popover>

            <span class="title" non-sel>{{ tr(title) }}{{ cornerTitle ? ' / ' + tr(cornerTitle) : '' }}</span>

        </e-row>

        <e-col jc="c" ai="c">

            <a-popover placement="left" trigger="click" v-model="popoverVisibility1" v-if="!isCornerValue || showAllSettings">

                <div class="feedback"
                    @mouseenter="valBtnHovered = true"
                    @mouseleave="valBtnHovered = false"
                >-</div>

                <template #title>

                    <span>{{ tr(`${title}-top`) }}</span>

                </template>

                <template #content>

                    <e-col>

                        <div v-if="!hasBorder">

                            <e-row>

                                <e-col w-30 jc="c">

                                    {{ tr('amount') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormInput
                                        name=""
                                        :placeholder="tr(`input-${title}`)"
                                        type="number"
                                        :inlineOver="true"
                                        v-model="topVal"
                                    />

                                </e-col>

                            </e-row>

                            <e-row class="mt-2">

                                <e-col w-30 jc="c">

                                    {{ tr('unit') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormSelect
                                        w-100
                                        name=""
                                        :placeholder="tr('select-unit')"
                                        keyProp="key"
                                        valueProp="name"
                                        :options="units"
                                        :inlineOver="true"
                                        v-model="topUnits"
                                    />

                                </e-col>

                            </e-row>

                        </div>

                        <template v-else>

                            <e-row class="mt-2">

                                <e-col w-30 jc="c" non-sel>

                                    {{ tr('border-type') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormSelect
                                        w-100
                                        name=""
                                        :placeholder="tr('select-a-type')"
                                        keyProp="key"
                                        valueProp="name"
                                        :options="borderTypes"
                                        :inlineOver="true"
                                        v-model="topBorderType"
                                    />

                                </e-col>

                            </e-row>

                            <e-row>

                                <e-col w-30 jc="c" non-sel>

                                    {{ tr('border-thickness') }}:

                                </e-col>

                                <e-col w-35 :center="true">

                                    <EFormInput
                                        name=""
                                        :placeholder="tr(`input-an-amount`)"
                                        type="number"
                                        :inlineOver="true"
                                        v-model="topVal"
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
                                        v-model="topUnits"
                                    />

                                </e-col>

                            </e-row>

                            <e-row>

                                <e-col w-30 jc="c" non-sel>

                                    {{ tr('select-a-border-color') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormColorPicker
                                        class="mb-3"
                                        v-model="topBorderColor"
                                    />

                                </e-col>

                            </e-row>

                        </template>

                    </e-col>

                </template>

            </a-popover>

        </e-col>

        <e-col jc="c" ai="fe">

            <a-popover placement="left" trigger="click" v-model="popoverVisibility2" v-if="isCornerValue || showAllSettings">

                <div class="feedback"
                    @mouseenter="valBtnHovered = true"
                    @mouseleave="valBtnHovered = false"
                >
                    <template v-if="!showAllSettings">

                        -

                    </template>

                    <div class="settings-dot" v-else></div>

                </div>

                <template #title>

                    <span>{{ tr(`${cornerTitle ? cornerTitle : title}-top-right`) }}</span>

                </template>

                <template #content>

                    <e-col>

                        <e-row>

                            <e-col w-30 jc="c">

                                {{ tr('amount') }}:

                            </e-col>

                            <e-col w-70 :center="true">

                                <EFormInput
                                    name=""
                                    :placeholder="tr(`input-${cornerTitle ? cornerTitle : title}`)"
                                    type="number"
                                    :inlineOver="true"
                                    v-model="topRightVal"
                                />

                            </e-col>

                        </e-row>

                        <e-row class="mt-2">

                            <e-col w-30 jc="c">

                                {{ tr('unit') }}:

                            </e-col>

                            <e-col w-70 :center="true">

                                <EFormSelect
                                    w-100
                                    name=""
                                    :placeholder="tr('select-unit')"
                                    keyProp="key"
                                    valueProp="name"
                                    :options="units"
                                    :inlineOver="true"
                                    v-model="topRightUnits"
                                />

                            </e-col>

                        </e-row>

                    </e-col>

                </template>

            </a-popover>

        </e-col>

    </e-row>

    <e-row class="content-row">

        <e-col
            jc="c"
            w-10
            :style="`background-color: ${hovered ? hoverColor : bgColor};`"
            ai="c" :clickable="true"
            :hoverable="true"
            @hovered="hovered = $event"
            @clicked="bgClicked"
        >

            <a-popover placement="top" trigger="click" v-model="popoverVisibility3" v-if="!isCornerValue || showAllSettings">

                <div class="feedback"
                    @mouseenter="valBtnHovered = true"
                    @mouseleave="valBtnHovered = false"
                >-</div>

                <template #title>

                    <span>{{ tr(`${title}-left`) }}</span>

                </template>

                <template #content>

                    <e-col>

                        <template v-if="!hasBorder">

                            <e-row>

                                <e-col w-30 jc="c">

                                    {{ tr('amount') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormInput
                                        name=""
                                        :placeholder="tr(`input-${title}`)"
                                        type="number"
                                        :inlineOver="true"
                                        v-model="leftVal"
                                    />

                                </e-col>

                            </e-row>

                            <e-row class="mt-2">

                                <e-col w-30 jc="c">

                                    {{ tr('unit') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormSelect
                                        w-100
                                        name=""
                                        :placeholder="tr('select-unit')"
                                        keyProp="key"
                                        valueProp="name"
                                        :options="units"
                                        :inlineOver="true"
                                        v-model="leftUnits"
                                    />

                                </e-col>

                            </e-row>

                        </template>

                        <template v-else>

                            <e-row class="mt-2">

                                <e-col w-30 jc="c" non-sel>

                                    {{ tr('border-type') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormSelect
                                        w-100
                                        name=""
                                        :placeholder="tr('select-a-type')"
                                        keyProp="key"
                                        valueProp="name"
                                        :options="borderTypes"
                                        :inlineOver="true"
                                        v-model="leftBorderType"
                                    />

                                </e-col>

                            </e-row>

                            <e-row>

                                <e-col w-30 jc="c" non-sel>

                                    {{ tr('border-thickness') }}:

                                </e-col>

                                <e-col w-35 :center="true">

                                    <EFormInput
                                        name=""
                                        :placeholder="tr(`input-an-amount`)"
                                        :inlineOver="true"
                                        type="number"
                                        v-model="leftVal"
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
                                        v-model="leftUnits"
                                    />

                                </e-col>

                            </e-row>

                            <e-row>

                                <e-col w-30 jc="c" non-sel>

                                    {{ tr('select-a-border-color') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormColorPicker
                                        class="mb-3"
                                        v-model="leftBorderColor"
                                    />

                                </e-col>

                            </e-row>

                        </template>

                    </e-col>

                </template>

            </a-popover>

        </e-col>

        <e-col jc="c" ai="c" w-80 :style="showContentBorder? 'border: 1px dashed rgba(0, 0, 0, 0.6);' : ''">

            <slot></slot>

        </e-col>

        <e-col
            jc="c"
            ai="fe"
            w-10
            :style="`background-color: ${hovered ? hoverColor : bgColor};`"
            :clickable="true"
            :hoverable="true"
            @hovered="hovered = $event"
            @clicked="bgClicked"
        >

            <a-popover placement="topLeft" trigger="click" v-model="popoverVisibility4" v-if="!isCornerValue || showAllSettings">

                <div class="feedback"
                    @mouseenter="valBtnHovered = true"
                    @mouseleave="valBtnHovered = false"
                >-</div>

                <template #title>

                    <span>{{ tr(`${title}-right`) }}</span>

                </template>

                <template #content>

                    <e-col>

                        <template v-if="!hasBorder">

                            <e-row>

                                <e-col w-30 jc="c">

                                    {{ tr('amount') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormInput
                                        name=""
                                        :placeholder="tr(`input-${title}`)"
                                        type="number"
                                        :inlineOver="true"
                                        v-model="rightVal"
                                    />

                                </e-col>

                            </e-row>

                            <e-row class="mt-2">

                                <e-col w-30 jc="c">

                                    {{ tr('unit') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormSelect
                                        w-100
                                        name=""
                                        :placeholder="tr('select-unit')"
                                        keyProp="key"
                                        valueProp="name"
                                        :options="units"
                                        :inlineOver="true"
                                        v-model="rightUnits"
                                    />

                                </e-col>

                            </e-row>

                        </template>

                        <template v-else>

                            <e-row class="mt-2">

                                <e-col w-30 jc="c" non-sel>

                                    {{ tr('border-type') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormSelect
                                        w-100
                                        name=""
                                        :placeholder="tr('select-a-type')"
                                        keyProp="key"
                                        valueProp="name"
                                        :options="borderTypes"
                                        :inlineOver="true"
                                        v-model="rightBorderType"
                                    />

                                </e-col>

                            </e-row>

                            <e-row>

                                <e-col w-30 jc="c" non-sel>

                                    {{ tr('border-thickness') }}:

                                </e-col>

                                <e-col w-35 :center="true">

                                    <EFormInput
                                        name=""
                                        :placeholder="tr(`input-an-amount`)"
                                        :inlineOver="true"
                                        type="number"
                                        v-model="rightVal"
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
                                        v-model="rightUnits"
                                    />

                                </e-col>

                            </e-row>

                            <e-row>

                                <e-col w-30 jc="c" non-sel>

                                    {{ tr('select-a-border-color') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormColorPicker
                                        class="mb-3"
                                        v-model="rightBorderColor"
                                    />

                                </e-col>

                            </e-row>

                        </template>

                    </e-col>

                </template>

            </a-popover>

        </e-col>

    </e-row>

    <e-row
        :style="`background-color: ${hovered ? hoverColor : bgColor};`"
        :clickable="true"
        :hoverable="true"
        @hovered="hovered = $event"
        @clicked="bgClicked"
    >

        <e-col jc="c">

            <a-popover placement="left" trigger="click" v-model="popoverVisibility5" v-if="isCornerValue || showAllSettings">

                <div class="feedback"
                    @mouseenter="valBtnHovered = true"
                    @mouseleave="valBtnHovered = false"
                >
                    <template v-if="!showAllSettings">

                        -

                    </template>

                    <div class="settings-dot" v-else></div>

                </div>

                <template #title>

                    <span>{{ tr(`${cornerTitle ? cornerTitle : title}-bottom-left`) }}</span>

                </template>

                <template #content>

                    <e-col>

                        <e-row>

                            <e-col w-30 jc="c">

                                {{ tr('amount') }}:

                            </e-col>

                            <e-col w-70 :center="true">

                                <EFormInput
                                    name=""
                                    :placeholder="tr(`input-${cornerTitle ? cornerTitle : title}`)"
                                    type="number"
                                    :inlineOver="true"
                                    v-model="bottomLeftVal"
                                />

                            </e-col>

                        </e-row>

                        <e-row class="mt-2">

                            <e-col w-30 jc="c">

                                {{ tr('unit') }}:

                            </e-col>

                            <e-col w-70 :center="true">

                                <EFormSelect
                                    w-100
                                    name=""
                                    :placeholder="tr('select-unit')"
                                    keyProp="key"
                                    valueProp="name"
                                    :options="units"
                                    :inlineOver="true"
                                    v-model="bottomLeftUnits"
                                />

                            </e-col>

                        </e-row>

                    </e-col>

                </template>

            </a-popover>

        </e-col>

        <e-col jc="c" ai="c">

            <a-popover placement="left" trigger="click" v-model="popoverVisibility6" v-if="!isCornerValue || showAllSettings">

                <div class="feedback"
                    @mouseenter="valBtnHovered = true"
                    @mouseleave="valBtnHovered = false"
                >-</div>

                <template #title>

                    <span>{{ tr(`${title}-bottom`) }}</span>

                </template>

                <template #content>

                    <e-col>

                        <template v-if="!hasBorder">

                            <e-row>

                                <e-col w-30 jc="c">

                                    {{ tr('amount') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormInput
                                        name=""
                                        :placeholder="tr(`input-${title}`)"
                                        type="number"
                                        :inlineOver="true"
                                        v-model="bottomVal"
                                    />

                                </e-col>

                            </e-row>

                            <e-row class="mt-2">

                                <e-col w-30 jc="c">

                                    {{ tr('unit') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormSelect
                                        w-100
                                        name=""
                                        :placeholder="tr('select-unit')"
                                        keyProp="key"
                                        valueProp="name"
                                        :options="units"
                                        :inlineOver="true"
                                        v-model="bottomUnits"
                                    />

                                </e-col>

                            </e-row>

                        </template>

                        <template v-else>

                            <e-row class="mt-2">

                                <e-col w-30 jc="c" non-sel>

                                    {{ tr('border-type') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormSelect
                                        w-100
                                        name=""
                                        :placeholder="tr('select-a-type')"
                                        keyProp="key"
                                        valueProp="name"
                                        :options="borderTypes"
                                        :inlineOver="true"
                                        v-model="bottomBorderType"
                                    />

                                </e-col>

                            </e-row>

                            <e-row>

                                <e-col w-30 jc="c" non-sel>

                                    {{ tr('border-thickness') }}:

                                </e-col>

                                <e-col w-35 :center="true">

                                    <EFormInput
                                        name=""
                                        :placeholder="tr(`input-an-amount`)"
                                        :inlineOver="true"
                                        type="number"
                                        v-model="bottomVal"
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
                                        v-model="bottomUnits"
                                    />

                                </e-col>

                            </e-row>

                            <e-row>

                                <e-col w-30 jc="c" non-sel>

                                    {{ tr('select-a-border-color') }}:

                                </e-col>

                                <e-col w-70 :center="true">

                                    <EFormColorPicker
                                        class="mb-3"
                                        v-model="bottomBorderColor"
                                    />

                                </e-col>

                            </e-row>

                        </template>

                    </e-col>

                </template>

            </a-popover>

        </e-col>

        <e-col jc="c" ai="fe">

            <a-popover placement="left" trigger="click" v-model="popoverVisibility7" v-if="isCornerValue || showAllSettings">

                <div class="feedback"
                    @mouseenter="valBtnHovered = true"
                    @mouseleave="valBtnHovered = false"
                >
                    <template v-if="!showAllSettings">

                        -

                    </template>

                    <div class="settings-dot" v-else></div>

                </div>

                <template #title>

                    <span>{{ tr(`${cornerTitle ? cornerTitle : title}-bottom-right`) }}</span>

                </template>

                <template #content>

                    <e-col>

                        <e-row>

                            <e-col w-30 jc="c">

                                {{ tr('amount') }}:

                            </e-col>

                            <e-col w-70 :center="true">

                                <EFormInput
                                    name=""
                                    :placeholder="tr(`input-${cornerTitle ? cornerTitle : title}`)"
                                    type="number"
                                    :inlineOver="true"
                                    v-model="bottomRightVal"
                                />

                            </e-col>

                        </e-row>

                        <e-row class="mt-2">

                            <e-col w-30 jc="c">

                                {{ tr('unit') }}:

                            </e-col>

                            <e-col w-70 :center="true">

                                <EFormSelect
                                    w-100
                                    name=""
                                    :placeholder="tr('select-unit')"
                                    keyProp="key"
                                    valueProp="name"
                                    :options="units"
                                    :inlineOver="true"
                                    v-model="bottomRightUnits"
                                />

                            </e-col>

                        </e-row>

                    </e-col>

                </template>

            </a-popover>

        </e-col>

    </e-row>

</e-col>
</template>

<script>
import { mapState } from 'vuex';
import { randColor } from '~/classes/globals';

export default {
    props: {
        showContentBorder: Boolean,
        showAllSettings: Boolean,
        bgColor: {
            type: String,
            default: () => randColor()
        },
        hoverColor: {
            type: String,
            default: () => '#3198fc'
        },
        isCornerValue: Boolean,
        title: {
            type: String,
            default: 'margin',
        },
        cornerTitle: String,
        topKey: String,
        rightKey: String,
        bottomKey: String,
        leftKey: String,
        topLeftKey: String,
        topRightKey: String,
        bottomLeftKey: String,
        bottomRightKey: String,
        hasBorder: Boolean,
        editingStyle: {
            type: Object,
            required: true,
        }
    },
    computed: {
        ...mapState('app', [ 'units', 'borderTypes' ]),
    },
    watch: {
        topVal(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.topKey,
                value: `${this.topBorderType ?? ''} ${this.topBorderColor ?? ''} ${to ?? ''}${this.topUnits ?? ''}`
            });
        },
        topUnits(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.topKey,
                value: `${this.topBorderType ?? ''} ${this.topBorderColor ?? ''} ${this.topVal ?? ''}${to ?? ''}`
            });
        },
        topBorderType(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.topKey,
                value: `${to ?? ''} ${this.topBorderColor + ' ' ?? ''} ${to ?? ''}${this.topUnits ?? ''}`
            });
        },
        topBorderColor(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.topKey,
                value: `${this.topBorderType ?? ''} ${to ?? ''} ${this.topVal ?? ''}${this.topUnits ?? ''}`
            });
        },
        rightVal(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.rightKey,
                value: `${this.rightBorderType ?? ''} ${this.rightBorderColor ?? ''} ${to ?? ''}${this.rightUnits ?? ''}`
            });
        },
        rightUnits(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.rightKey,
                value: `${this.rightBorderType ?? ''} ${this.rightBorderColor ?? ''} ${this.rightVal ?? ''}${to ?? ''}`
            });
        },
        rightBorderType(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.rightKey,
                value: `${to ?? ''} ${this.rightBorderColor ?? ''} ${this.rightVal ?? ''}${this.rightUnits ?? ''}`
            });
        },
        rightBorderColor(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.rightKey,
                value: `${this.rightBorderType ?? ''} ${to ?? ''} ${this.rightVal ?? ''}${this.rightUnits ?? ''}`
            });
        },
        bottomVal(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.bottomKey,
                value: `${this.bottomBorderType ?? ''} ${this.bottomBorderColor ?? ''} ${to ?? ''}${this.bottomUnits ?? ''}`
            });
        },
        bottomUnits(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.bottomKey,
                value: `${this.bottomBorderType ?? ''} ${this.bottomBorderColor ?? ''} ${this.bottomVal ?? ''}${to ?? ''}`
            });
        },
        bottomBorderType(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.bottomKey,
                value: `${to ?? ''} ${this.bottomBorderColor ?? ''} ${this.bottomVal ?? ''}${this.bottomUnits ?? ''}`
            });
        },
        bottomBorderColor(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.bottomKey,
                value: `${this.bottomBorderType ?? ''} ${to ?? ''} ${this.bottomVal ?? ''}${this.bottomUnits ?? ''}`
            });
        },
        leftVal(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.leftKey,
                value: `${this.leftBorderType ?? ''} ${this.leftBorderColor ?? ''} ${to ?? ''}${this.leftUnits ?? ''}`
            });
        },
        leftUnits(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.leftKey,
                value: `${this.leftBorderType ?? ''} ${this.leftBorderColor ?? ''} ${this.leftVal ?? ''}${to ?? ''}`
            });
        },
        leftBorderType(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.leftKey,
                value: `${to ?? ''} ${this.leftBorderColor ?? ''} ${this.leftVal ?? ''}${this.leftUnits ?? ''}`
            });
        },
        leftBorderColor(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.leftKey,
                value: `${this.leftBorderType ?? ''} ${to ?? ''} ${this.leftVal ?? ''}${this.leftUnits ?? ''}`
            });
        },
        topLeftVal(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.topLeftKey,
                value: `${to ?? ''}${this.topLeftUnits ?? ''}`
            });
        },
        topLeftUnits(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.topLeftKey,
                value: `${this.topLeftVal ?? ''}${to ?? ''}`
            });
        },
        topRightVal(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.topRightKey,
                value: `${to ?? ''}${this.topRightUnits ?? ''}`
            });
        },
        topRightUnits(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.topRightKey,
                value: `${this.topRightVal ?? ''}${to ?? ''}`
            });
        },
        bottomLeftVal(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.bottomLeftKey,
                value: `${to ?? ''}${this.bottomLeftUnits ?? ''}`
            });
        },
        bottomLeftUnits(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.bottomLeftKey,
                value: `${this.bottomLeftVal ?? ''}${to ?? ''}`
            });
        },
        bottomRightVal(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.bottomRightKey,
                value: `${to ?? ''}${this.bottomRightUnits ?? ''}`
            });
        },
        bottomRightUnits(to) {
            if (!this.loaded) return;
            this.$emit('style-changed', {
                key: this.bottomRightKey,
                value: `${this.bottomRightVal ?? ''}${to ?? ''}`
            });
        },
        popoverVisibility1(to) {if (to) this.setInitValues()},
        popoverVisibility2(to) {if (to) this.setInitValues()},
        popoverVisibility3(to) {if (to) this.setInitValues()},
        popoverVisibility4(to) {if (to) this.setInitValues()},
        popoverVisibility5(to) {if (to) this.setInitValues()},
        popoverVisibility6(to) {if (to) this.setInitValues()},
        popoverVisibility7(to) {if (to) this.setInitValues()},
    },
    data() {
        return {
            valBtnHovered: false,
            hovered: false,
            loaded: false,

            popoverVisibility1: false,
            popoverVisibility2: false,
            popoverVisibility3: false,
            popoverVisibility4: false,
            popoverVisibility5: false,
            popoverVisibility6: false,
            popoverVisibility7: false,

            borderType: 'solid',
            borderColor: '',
            borderThicknessAmount: '',
            borderThicknessUnit: 'px',
            borderStyle: 'solid',

            topVal: '',
            topUnits: 'px',
            topBorderType: '',
            topBorderColor: '',

            rightVal: '',
            rightUnits: 'px',
            rightBorderType: '',
            rightBorderColor: '',

            bottomVal: '',
            bottomUnits: 'px',
            bottomBorderType: '',
            bottomBorderColor: '',

            leftVal: '',
            leftUnits: 'px',
            leftBorderType: '',
            leftBorderColor: '',

            topLeftVal: '',
            topLeftUnits: 'px',

            topRightVal: '',
            topRightUnits: 'px',

            bottomLeftVal: '',
            bottomLeftUnits: 'px',

            bottomRightVal: '',
            bottomRightUnits: 'px',
        }
    },
    methods: {
        bgClicked() {
            if (this.valBtnHovered) return;

            this.$emit('section-selected');
        },
        getColorValues(style) {
            const out = {
                border: {
                    color: '',
                    type: '',
                },
                units:{
                    size: '',
                    unit: '',
                },
            };

            const bits = style.split(' ');

            for (let b of bits) {
                if (/[0-9\.]+[a-zA-Z]+/.test(b)) {
                    const m = b.match(/([0-9\.]+)([a-zA-Z]+)/);

                    out.units.size = m[1];
                    out.units.unit = m[2];
                }
                else if (/[a-z]+/.test(b) && b.length > 4 && out.border.type == '') {
                    out.border.type = b.trim();
                }
                else if (/([a-zA-Z0-9\(\)%,#\. ]+)/.test(b)) {
                    out.border.color = b.trim();
                }
            }

            return out;
        },
        setInitValues() {
            const es = this?.editingStyle?.style ?? {};

            this.borderType = 'solid';
            this.borderColor = '';
            this.borderThicknessAmount = '';
            this.borderThicknessUnit = 'px';
            this.borderStyle = 'solid';

            this.topVal = '';
            this.topUnits = 'px';
            this.topBorderType = '';
            this.topBorderColor = '';

            this.rightVal = '';
            this.rightUnits = 'px';
            this.rightBorderType = '';
            this.rightBorderColor = '';

            this.bottomVal = '';
            this.bottomUnits = 'px';
            this.bottomBorderType = '';
            this.bottomBorderColor = '';

            this.leftVal = '';
            this.leftUnits = 'px';
            this.leftBorderType = '';
            this.leftBorderColor = '';

            this.topLeftVal = '';
            this.topLeftUnits = 'px';

            this.topRightVal = '';
            this.topRightUnits = 'px';

            this.bottomLeftVal = '';
            this.bottomLeftUnits = 'px';

            this.bottomRightVal = '';
            this.bottomRightUnits = 'px';

            const keys = {
                [this.topKey]: 'top',
                [this.rightKey]: 'right',
                [this.bottomKey]: 'bottom',
                [this.leftKey]: 'left',
                [this.topLeftKey]: 'topLeft',
                [this.topRightKey]: 'topRight',
                [this.bottomLeftKey]: 'bottomLeft',
                [this.bottomRightKey]: 'bottomRight',
            };

            for (let k in keys) {
                if (!k || k == 'undefined' || k == undefined) continue;

                const style = es[k], ck = keys[k];

                if (typeof style == 'undefined') continue;

                const values = this.getColorValues(style);

                if (values.units.size && typeof this[`${ck}Val`] != 'undefined') {
                    this[`${ck}Val`] = values.units.size;
                }

                if (values.units.unit && typeof this[`${ck}Units`] != 'undefined') {
                    this[`${ck}Units`] = values.units.unit;
                }

                if (values.border.type && typeof this[`${ck}BorderType`] != 'undefined') {
                    this[`${ck}BorderType`] = values.border.type;
                }

                if (values.border.type && typeof this[`${ck}BorderColor`] != 'undefined') {
                    this[`${ck}BorderColor`] = values.border.color;
                }

                // console.log('Set values to: ', {
                //     [`${ck}Val`]: this[`${ck}Val`],
                //     [`${ck}Units`]: this[`${ck}Units`],
                //     [`${ck}BorderType`]: this[`${ck}BorderType`],
                //     [`${ck}BorderColor`]: this[`${ck}BorderColor`],
                // });
            }

            setTimeout(() => this.loaded = true, 300);
        }
    }
}
</script>
