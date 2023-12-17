<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('email')"
        :subAction="tr('send-smtp-email')"
        :details="tr('send-email-tempalte-via-smtp')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <ActionDatasourceEntity
        :actionStep="actionStep"
        :dsFilterType="filterKey"
        v-model="actionStep.schema"
    />

    <ActionEmailDetails
        :actionStep="actionStep"
        @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
    />

    <ActionEmailContentTabs
        :actionStep="actionStep"
        @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
    />

    <ActionReturnObject
        :actionStep="actionStep"
        :showReturnObject="false"
        @show-bl-mdl="$emit('show-bl-mdl', $event)"
    />

</div>
</template>

<script>
import { EMAIL_TYPES } from '~/consts/BusLogic';

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
            filterKey: EMAIL_TYPES,
        }
    }
};
</script>