<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('misc')"
        :subAction="tr('service-caller')"
        :details="tr('service-caller-desc')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <ActionServiceCallerDetails
        :actionStep="actionStep"
        v-model="actionStep.schema"
    />

    <ActionListSource
        :actionStep="actionStep"
        mdlKey="actionListSource"
        @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
    />

    <ActionRequestTabs
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