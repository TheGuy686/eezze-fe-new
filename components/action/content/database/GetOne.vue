<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('database')"
        :subAction="tr('get-one')"
        :details="tr('get-a-record-from-the-database')"
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

    <ActionMappingTable
        class="mt-4"
        :extendedTop="false"
        :title="tr('check-on')"
        srcKey="input"
        propMdlSrcKey="checkOn"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
    />

    <ActionReturnObject
        :actionStep="actionStep"
        @show-bl-mdl="$emit('show-bl-mdl', $event)"
    />

</div>
</template>

<script>
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
            filterKey: DB_TYPES,
        }
    }
};
</script>