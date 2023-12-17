<template>
<div>

    <ActionLogicMdlInput
        clss="pl-2.5"
        icon="folder-db"
        :placeholder="tr('write-to-path')"
        mdlKey="toPath"
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