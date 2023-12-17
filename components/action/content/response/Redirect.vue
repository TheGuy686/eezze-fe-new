<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('response')"
        :subAction="tr('redirect')"
        :details="tr('redirect-to-a-url')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <p class="font-semibold text-black-1 text-lg pt-5 pb-1">
        
        {{ tr('to-url') }}
        
    </p>

    <ActionLogicMdlInput
        icon="terminal-db"
        clss="pl-2.5"
        src="Resopnse->redirect"
        mdlKey="url"
        :placeholder="tr('enter-a-url')"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
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