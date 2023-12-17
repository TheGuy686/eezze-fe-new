<style lang="less">
.list-source-root {
    .help-dot {
        margin-left: 5px;
        margin-top: 4px;
    }
}
</style>

<template>
<e-col clss="list-source-root pt-10">

    <e-row>

        <p class="font-semibold text-black-1 text-lg pb-1.5" non-sel>
        
            {{ tr('list-source') }}
            
        </p>

        <a-tooltip placement="right">

            <GeneralIcon clss="help-dot" type="solid-input-help-prompt" />

            <template #title>

                <div v-html="tr('list-source-help')" />

            </template>

        </a-tooltip>

    </e-row>

    <ActionLogicMdlInput
        icon="folder-db"
        clss="pl-2.5"
        placeholder=""
        src="RenderTemplateListSource"
        :mdlKey="mdlKey"
        :hideInput="true"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl')"
    />

</e-col>
</template>

<script>
export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
        mdlKey: {
            type: String,
            default: 'listSource',
        },
    },
}
</script>