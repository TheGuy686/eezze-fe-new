<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('misc')"
        :subAction="tr('success')"
        :details="tr('success-desc')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <p class="font-semibold text-black-1 text-lg pt-5">
        
        {{ tr('success-output') }}
        
    </p>

    <!-- <e-col> -->

        <e-row :fillParent="true">

            <ActionLogicMdlInput
                clss="pl-2.5"
                :placeholder="tr('output')"
                src="ActionSuccess"
                mdlKey="success"
                v-model="actionStep.schema"
                @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
            />

        </e-row>

        <!-- <d :d="actionStep.schema" />

    </e-col> -->

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