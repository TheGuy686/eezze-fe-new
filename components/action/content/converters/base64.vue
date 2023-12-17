<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('converter')"
        :subAction="tr('base64-content-decoder')"
        :details="tr('base64-content-decoder')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <p class="font-semibold text-black-1 text-lg pt-5">
        
        {{ tr('base64-content') }}
        
    </p>

    <e-row class="mt-3" :fillParent="true">

        <ActionLogicMdlInput
            clss="pl-2.5"
            :hideInput="true"
            src="Converters->base64"
            mdlKey="content"
            v-model="actionStep.schema"
            @show-bl-mdl="$emit('show-bl-mdl')"
        />

    </e-row>

    <ActionReturnObject
        :actionStep="actionStep"
        :showReturnObject="false"
        :hideReturnSection="true"
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