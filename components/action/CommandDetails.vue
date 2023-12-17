<template>
<div class="mt-3" style="clear: both;">

    <div class="pt-5" style="clear: both;" />

    <p class="font-semibold text-black-1 text-lg">
        
        {{ tr('command-details') }}
        
    </p>

    <ActionLogicMdlInput
        icon="folder-db"
        clss="pl-2.5"
        :placeholder="tr('select-root-folder')"
        src="CommandDetails->rootFolder"
        mdlKey="rootFolder"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl')"
    />

    <ActionLogicMdlInput
        icon="terminal-db"
        clss="pl-2.5"
        src="CommandDetails->command"
        mdlKey="command"
        :placeholder="tr('command-to-execute')"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl')"
    />

    <e-row class="mt-3 p-1.5" bev-cont>

        <EFormCheckBox
            :inlineOver="true"
            inlineLabelStyle="margin-left: 8px;"
            name="run-asynchronous"
            :placeholder="tr('run-asynchronous-qu')"
            :trueValue="true"
            :defaultValue="false"
            :reverseLayout="true"
            v-model="actionStep.schema.runAsynchronous"
        />

    </e-row>

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('cms/linters', [ 'entities' ]),
    },
}
</script>