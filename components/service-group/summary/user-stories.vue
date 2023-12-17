<style lang="less">
.root-user-stories {
    margin-top: -20px;
    max-height: 60vh;
    position: relative;

    .roles-header {
        height: 60px;
        position: fixed;
        background-color: white;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }

    .roles-div {
        width: 100%;
        height: 1px;
        margin-top: 72px;
    }
}
</style>

<template>
<div class="pr-5 root-user-stories" e-scroll>

    <div class="roles-header" :style="{ width: `${modalWidth * 0.94}px` }">

        <e-row>

            <e-row jc="c" w-20>

                <h2 class="p-0 m-0 ant-descriptions-title">

                    {{ tr('current-roles') }}:

                </h2>

            </e-row>

            <e-row ai="c" w-80>

                <template v-if="roles.length > 0">

                    <a-tag
                        non-sel
                        :color="randDarkColor()"
                        :key="r.role"
                        v-for="r in roles"
                    >
                        {{ r.role }}

                    </a-tag>

                </template>

                <span v-else>{{ tr('no-items-to-show') }}</span>

            </e-row>

        </e-row>

    </div>

    <div class="roles-div" />

    <a-descriptions
        bordered
        size="small"
        :class="i > 0 ? `pt-5` : ''"
        :title="ser.name"
        v-for="ser, i in services"
    >
        <a-descriptions-item :span="3" :label="tr('description')">

            {{ ser.description }}

        </a-descriptions-item>

        <a-descriptions-item :span="3" :label="tr('details')">

            <e-row>

                <e-row ai="c" jc="se">

                    <b>{{ tr('who') }}:</b>

                </e-row>

                <e-row ai="c" jc="se">

                    <b>{{ tr('what') }}:</b>

                </e-row>

                <e-row ai="c" jc="se">

                    <b>{{ tr('why') }}:</b>

                </e-row>

            </e-row>

        </a-descriptions-item>

        <a-descriptions-item :span="3">

            <template #label>

                <e-row ai="c" jc="sb">

                    <span>{{ tr('story') }}</span>

                    <a-tooltip style="max-width: none; width: auto !important;" placement="right">

                        <GeneralIcon clss="help-dot" type="solid-input-help-prompt" />

                        <template #title>

                            <div v-html="tr('story-help')" />

                        </template>

                    </a-tooltip>

                </e-row>

                <!-- <a-popover placement="right">

                    <template #content>

                        <div style="width: 300px;" v-html="tr('story-help')" />

                    </template>

                    <GeneralIcon clss="help-dot" type="solid-input-help-prompt" />

                </a-popover> -->

            </template>

            <e-row>

                <e-row ai="c">

                    <span class="pr-1">{{ tr('u-story-as-a-an') }}</span>

                    <EFormSelect
                        name="datasource"
                        :placeholder="tr('select-a-role')"
                        keyProp="role"
                        valueProp="role"
                        :options="roles"
                        :inlineOver="true"
                        v-model="ser.story.who"
                        @input="$emit('update-services')"
                    />

                </e-row>

                <e-row>

                    <EFormInput
                        v-model="ser.story.what"
                        @input="$emit('update-services')"
                    />

                </e-row>

                <e-row>

                    <EFormInput
                        v-model="ser.story.why"
                        @input="$emit('update-services')"
                    />

                </e-row>

            </e-row>

        </a-descriptions-item>

    </a-descriptions>

</div>
</template>

<script>
import Vue from 'vue';
import { randDarkColor } from '~/classes/globals';

export default {
    props: {
        services: Array,
        modalWidth: Number,
        roles: {
            type: Array,
            default: () => [],
        },
        addRoles: Array,
    },
    data() {
        return {

        };
    },
}
</script>