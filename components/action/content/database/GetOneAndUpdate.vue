<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('database')"
        :subAction="tr('get-one-and-update')"
        :details="tr('get-a-record-from-the-database-and-update-it')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <ActionDatasourceEntity
        :showDepth="true"
        :actionStep="actionStep"
        :dsFilterType="filterKey"
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

            <a-tab-pane key="update-values" :tab="tr('update-values')">

                <ActionMappingTable
                    :extendedTop="false"
                    class="mt-5"
                    :title="tr('update-values')"
                    srcKey="withValues"
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