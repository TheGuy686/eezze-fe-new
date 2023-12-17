<template>
<div class="mt-5">

    <p class="font-semibold text-black-1 text-lg pb-2">

        {{ title ? title : tr((isEmail ? 'email' : 'file') + '-template-info') }}

    </p>

    <e-row>

        <e-col :span="2">

            <EFormSelect
                name=""
                class="pr-2"
                leftIcon="group-db"
                :placeholder="tr('select-a-template')"
                keyProp="id"
                valueProp="name"
                :options="tpls"
                :inlineOver="true"
                v-model="actionStep.schema.template"
                @input="itteration++; actionStep.schema['templateName'] = currentTpl; $emit('value-changed');"
            />

        </e-col>

        <e-col :span="2" v-if="!isEmail">

            <EFormSelect
                name=""
                leftIcon="clear-db"
                :placeholder="tr('linter')"
                keyProp="key"
                valueProp="name"
                :options="linters"
                :inlineOver="true"
                v-model="actionStep.schema.linter"
                @input="$emit('value-changed')"
            />

        </e-col>

    </e-row>

    <ActionMappingTable
        srcKey="templateVars"
        :extendedTop="false"
        v-model="actionStep.schema"
        @input="$emit('value-changed')"
        @show-bl-mdl="$emit('show-bl-mdl')"
    />

</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
        title: String,
        isEmail: Boolean,
    },
    watch: {
        hasTemplate(to) {
            if (to?.value && !this.hasLinter.value) {
                this.actionStep.schema.linter = 'babel';
            }
        }
    },
    computed: {
        ...mapState('cms', {
            fileTypes: (state) => state?.['file-types']?.entities ?? [],
            linters: (state) => state?.linters?.entities ?? []
        }),
        ...mapGetters({
            emailTpls: 'project/service-configurables/emailTpls',
            renderTemplateTpls: 'project/service-configurables/renderTemplateTpls',
        }),

        tpls() {
            return this.isEmail ? this.emailTpls : this.renderTemplateTpls;
        },

        hasTemplate() {
            return {
                itteration: this.itteration,
                value: !!this.actionStep?.schema?.template
            }
        },

        currentTpl() {
            try {
                const tpl = this.tpls.filter(tpl => tpl.id == this.actionStep?.schema?.template)[0];

                const md = JSON.parse(tpl.metadata);

                return md.template;
            }
            catch (err) { return '' }
        },

        hasLinter() {
            return {
                itteration: this.itteration,
                value: !!this.actionStep?.schema?.linter
            }
        },
    },
    data() {
        return {
            itteration: 0,
        }
    },
    methods: {
        dlog(arg1) {
            console.log(arg1, this.currentTpl);
        }
    }
}
</script>