<style lang="less" scoped>
.file-details-root {}
</style>

<template>
<div class="mt-10 pt-10 file-details-root">

    <p class="font-semibold text-black-1 text-lg">
        
        {{ tr('file-details') }}
        
    </p>

    <e-row :fillParent="true">

        <ActionLogicMdlInput
            clss="pl-2.5"
            icon="file-db"
            :placeholder="tr('enter-a-folder') + '...'"
            src="FileDetails->folder"
            mdlKey="folder"
            v-model="actionStep.schema"
            @show-bl-mdl="$emit('show-bl-mdl')"
        />

    </e-row>

    <e-col :fillParent="true" v-if="isSaveFile">

        <ActionLogicMdlInput
            clss="pl-2.5"   
            icon="file-db"
            :hideInput="true"
            :label="tr('previous-file-name')"
            :extraHelp="tr('previous-file-name-help')"
            mdlKey="previousFileName"
            src="FileDetails->previousFileName"
            v-model="actionStep.schema"
            @show-bl-mdl="$emit('show-bl-mdl')"
        />

    </e-col>

    <e-row :fillParent="true">

        <ActionLogicMdlInput
            clss="pl-2.5"
            icon="file-db"
            :placeholder="tr('enter-file-name') + '...'"
            mdlKey="fileName"
            src="FileDetails->input"
            v-model="actionStep.schema"
            @show-bl-mdl="$emit('show-bl-mdl')"
        />

        <e-col jc="c" w-25 v-if="!hideFileType">

            <EFormSelect
                name=""
                leftIconContStyle="padding-left: 15px;"
                icon="file-ex-db"
                class="pl-2"
                :placeholder="tr('file-type')"
                keyProp="key"
                valueProp="name"
                :options="fileTypes"
                :inlineOver="true"
                v-model="actionStep.schema.fileType"
            />

        </e-col>

    </e-row>

    <p class="font-semibold text-black-1 text-lg pt-5" v-if="showFileContent">
        
        {{ tr('file-content') }}
        
    </p>

    <e-row :fillParent="true" v-if="showFileContent">

        <ActionLogicMdlInput
            clss="pl-2.5"
            icon="file-db"
            :placeholder="tr('content')"
            src="FileDetails->content"
            mdlKey="content"
            :hideInput="true"
            v-model="actionStep.schema"
            @show-bl-mdl="$emit('show-bl-mdl')"
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
        hideFileType: Boolean,
        showFileContent: Boolean,
        isSaveFile: Boolean
    },
    computed: {
        ...mapState('cms/file-types', {
            fileTypes: (state) => state?.entities ?? [],
        })
    },
}
</script>