<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('database')"
        :subAction="tr('create-one-if-not-exists')"
        :details="tr('create-a-new-record-if-it-does-not-exist-in-the-database')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <ActionDatasourceEntity
        class="mt-4"
        :extendedTop="false"
        :showDepth="false"
        :dsFilterType="filterKey"
        :actionStep="actionStep"
        v-model="actionStep.schema"
    />

    <e-row class="mt-3 p-1.5" bev-cont>

        <EFormCheckBox
            :inlineOver="true"
            inlineLabelStyle="margin-left: 8px;"
            name="fail-on-empty"
            :placeholder="tr('fail-on-empty-qu')"
            :trueValue="true"
            :defaultValue="false"
            :reverseLayout="true"
            v-model="actionStep.schema.failOnEmpty"
        />

    </e-row>

    <e-col>

        <a-tabs v-model="activeKey">

            <a-tab-pane key="check-on" :tab="tr('check-on')">

                <ActionMappingTable
                    :extendedTop="false"
                    class="mt-2"
                    :title="tr('check-on')"
                    propMdlSrcKey="checkOn"
                    srcKey="input"
                    v-model="actionStep.schema"
                    @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
                />

            </a-tab-pane>

            <a-tab-pane key="create-values" :tab="tr('create-values')">

                <ActionMappingTable
                    :extendedTop="false"
                    class="mt-2"
                    :title="tr('create-values')"
                    srcKey="createValues"
                    v-model="actionStep.schema"
                    @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
                />

            </a-tab-pane>

        </a-tabs>

    </e-col>

    <ActionReturnObject
        :actionStep="actionStep"
        @show-bl-mdl="$emit('show-bl-mdl', $event)"
    />

</div>
</template>

<script>
import { ref } from 'vue';
import { DB_TYPES } from '~/consts/BusLogic';

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        actionStep: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            activeKey: ref('check-on'),
            filterKey: DB_TYPES,
        }
    },
};
</script>