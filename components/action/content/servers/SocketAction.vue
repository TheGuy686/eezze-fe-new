<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('server')"
        :subAction="tr('socket-action')"
        :details="tr('socket-action-desc')"
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

    <ActionWsDetails
        :actionStep="actionStep"
        @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
    />

    <ActionRequestTabs
        :actionStep="actionStep"
        :hideHeaders="true"
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
import { WS_SERVICE_KEY } from '~/consts/BusLogic';

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
            dsFilterType: WS_SERVICE_KEY,
        }
    },
};
</script>