<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('server')"
        :subAction="tr('rest-action')"
        :details="tr('rest-action-desc')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <ActionDatasourceEntity
        :actionStep="actionStep"
        :dsFilterType="dsFilterType"
        v-model="actionStep.schema"
    />

    <ActionRestDetails
        :actionStep="actionStep"
        @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
    />

    <ActionRequestTabs
        :actionStep="actionStep"
        @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
    />

    <ActionReturnObject
        :title="tr('output')"
        :actionStep="actionStep"
        :showReturnObject="true"
        @show-bl-mdl="$emit('show-bl-mdl', $event)"
    />

</div>
</template>

<script>
import { REST_SERVICE_KEY } from '~/consts/BusLogic';

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        actionStep: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            dsFilterType: REST_SERVICE_KEY,
        }
    },
};
</script>