<template>
<a-tabs v-model="activeKey">

    <a-tab-pane
        key="template"
        :tab="tr('template')"
    >
        <ActionFileVariables
            :actionStep="actionStep"
            :isEmail="true"
            @show-bl-mdl="$emit('show-bl-mdl')"
            @value-changed="() => {
                if (actionStep.schema['html']) {
                    delete actionStep.schema['html'];
                }

                if (actionStep.schema['message']) {
                    delete actionStep.schema['message'];
                }
            }"
        />

    </a-tab-pane>

    <a-tab-pane
        key="text-content"
        :tab="tr('text-content')"
    >
        <e-col>

            <EFormTextArea
                inputStyle="min-height: 250px;"
                v-model="actionStep.schema.message"
                @input="(value) => {
                    actionStep.schema.message = value;

                    if (actionStep.schema['html']) {
                        delete actionStep.schema['html'];
                    }

                    if (actionStep.schema['template']) {
                        delete actionStep.schema['template'];
                    }

                    if (actionStep.schema['templateVars']) {
                        delete actionStep.schema['templateVars'];
                    }
                }"
            />

        </e-col>

    </a-tab-pane>

    <a-tab-pane
        key="html-content"
        :tab="tr('html-content')"
    >
        <e-col>

            <vue-editor
                :editor-toolbar="customToolbar"
                v-model="actionStep.schema.html"
                @input="(value) => {
                    actionStep.schema.html = value;

                    if (actionStep.schema['message']) {
                        delete actionStep.schema['message'];
                    }

                    if (actionStep.schema['template']) {
                        delete actionStep.schema['template'];
                    }

                    if (actionStep.schema['templateVars']) {
                        delete actionStep.schema['templateVars'];
                    }
                }"
            />

        </e-col>

    </a-tab-pane>

</a-tabs>
</template>

<script>
import { ref } from 'vue';
import { VueEditor } from 'vue2-editor';

export default {
    components: { VueEditor },
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            activeKey: ref('template'),
            customToolbar: [
                [{ font: [] }],

                [{ header: [false, 1, 2, 3, 4, 5, 6] }],

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
}
</script>