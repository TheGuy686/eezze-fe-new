<template>
<div class="mt-10 pt-10">

    <p class="font-semibold text-black-1 text-lg">
        
        {{ tr('email-details') }}
        
    </p>

    <ActionLogicMdlInput
        clss="pl-2.5"
        :placeholder="tr('email-to-qu')"
        :addonBefore="tr('email-to')"
        src="EmailDetails->to"
        mdlKey="to"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl')"
    />

    <ActionLogicMdlInput
        clss="pl-2.5"
        :placeholder="tr('email-from-qu')"
        :addonBefore="tr('email-from')"
        src="EmailDetails->from"
        mdlKey="from"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl')"
    />

    <ActionLogicMdlInput
        clss="pl-2.5"
        :addonBefore="tr('email-from-first-name')"
        :placeholder="tr('please-input-a-value')"
        src="EmailDetails->fromFirstName"
        mdlKey="fromFirstName"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl')"
    />

    <ActionLogicMdlInput
        clss="pl-2.5"
        :addonBefore="tr('email-from-last-name')"
        :placeholder="tr('please-input-a-value')"
        src="EmailDetails->fromLastName"
        mdlKey="fromLastName"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl')"
    />

    <ActionLogicMdlInput
        clss="pl-2.5"
        :placeholder="tr('email-subject-qu')"
        :addonBefore="tr('email-subject')"
        src="EmailDetails->subject"
        mdlKey="subject"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl')"
    />

</div>
</template>

<script>
export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
    },
}
</script>