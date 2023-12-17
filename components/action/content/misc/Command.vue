<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('misc')"
        :subAction="tr('command')"
        :details="tr('command-desc')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <ActionCommandDetails
        :actionStep="actionStep"
        @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
    />

    <ActionReturnObject
        :title="tr('output')"
        :actionStep="actionStep"
        @show-bl-mdl="$emit('show-bl-mdl', $event)"
    />

</div>
</template>

<script>
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
};
</script>