<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('files')"
        :subAction="tr('save')"
        :details="tr('save-a-file')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <ActionDatasourceEntity
        :actionStep="actionStep"
        :dsFilterType="filterKey"
        v-model="actionStep.schema"
    />

    <ActionFileDetails
        :actionStep="actionStep"
        :isSaveFile="true"
        :showFileContent="true"
        @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
    />

    <!-- <a-tabs v-model="activeKey">

        <a-tab-pane
            key="text-content"
            :tab="tr('text-content')"
            :disabled="fileType != 'plain-text'"
        >
            <e-col>

                <EFormTextArea
                    inputStyle="min-height: 250px;"
                    :disabled="fileType != 'plain-text'"
                    v-model="actionStep.schema.message"
                    @input="(value) => {
                        actionStep.schema.message = value;

                        if (actionStep.schema['content']) {
                            delete actionStep.schema['content'];
                        }

                        if (actionStep.schema['html']) {
                            delete actionStep.schema['html'];
                        }
                    }"
                />

            </e-col>

        </a-tab-pane>

        <a-tab-pane
            key="html-content"
            :tab="tr('html-content')"
            :disabled="fileType != 'html'"
        >
            <e-col>

                <vue-editor
                    :editor-toolbar="customToolbar"
                    :disabled="fileType != 'html'"
                    v-model="actionStep.schema.html"
                    @input="(value) => {
                        actionStep.schema.html = value;

                        if (actionStep.schema['content']) {
                            delete actionStep.schema['content'];
                        }

                        if (actionStep.schema['message']) {
                            delete actionStep.schema['message'];
                        }
                    }"
                />

            </e-col>

        </a-tab-pane>

    </a-tabs> -->

    <ActionReturnObject
        :actionStep="actionStep"
        :showReturnObject="false"
        @show-bl-mdl="$emit('show-bl-mdl', $event)"
    />

</div>
</template>

<script>
import { ref } from 'vue';
// import { VueEditor } from 'vue2-editor';

import { FILE_STORAGE_KEY } from '~/consts/BusLogic';

export default {
    // components: { VueEditor },
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
    computed: {
        fileType() {
            try {
                return this.actionStep.schema.fileType;
            }
            catch (err) { return '' }
        }
    },
    data() {
        return {
            filterKey: FILE_STORAGE_KEY,
            activeKey: ref('text-content'),
            customToolbar: [
                [{ font: [] }],

                [{ header: [ false, 1, 2, 3, 4, 5, 6 ] }],

                [{ size: ['small', false, 'large', 'huge'] }],

                ['bold', 'italic', 'underline', 'strike'],

                [
                    { align: '' },
                    { align: 'center' },
                    { align: 'right' },
                    { align: 'justify' }
                ],

                [{ header: 1 }, { header: 2 }],

                ['blockquote', 'code-block'],

                [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],

                [{ script: 'sub' }, { script: 'super' }],

                [{ indent: '-1' }, { indent: '+1' }],

                [{ color: [] }, { background: [] }],

                [ 'link', 'formula' ],

                [{ direction: 'rtl' }],

                [ 'clean' ]
            ],
        }
    },
};
</script>