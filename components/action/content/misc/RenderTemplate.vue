<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('files')"
        :subAction="tr('render-template')"
        :details="tr('render-template')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <ActionFileVariables
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
};
</script>