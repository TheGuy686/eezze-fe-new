<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('files')"
        :subAction="tr('read')"
        :details="tr('read-a-file')"
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

    <ActionFileDetails
        :actionStep="actionStep"
        @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
    />

    <div class="mt-5 pt-5"></div>

    <ActionReturnObject
        :actionStep="actionStep"
        :showReturnObject="false"
        @show-bl-mdl="$emit('show-bl-mdl', $event)"
    />

</div>
</template>

<script>
import { FILE_STORAGE_KEY } from '~/consts/BusLogic';

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
            filterKey: FILE_STORAGE_KEY,
        }
    }
};
</script>