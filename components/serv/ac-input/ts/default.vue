<template>
<e-col>

    <e-row>

        <e-col w-20>

            <h2 class="pt-2">{{ tr('required') }}</h2>

        </e-col>

        <e-col w-20>

            <h2 class="pt-2">{{ tr('serialize-property') }}</h2>

        </e-col>

    </e-row>

    <e-row>

        <e-col w-20>

            <EFormCheckBox
                inlineLabelStyle="margin-left: 8px;"
                name="required"
                :inlineOver="true"
                :trueValue="true"
                :defaultValue="false"
                :reverseLayout="true"
                :placeholder="tr(propItem.required ? 'yes' : 'no')"
                v-model="propItem.required"
            />

        </e-col>

        <e-col w-20>

            <EFormCheckBox
                inlineLabelStyle="margin-left: 8px;"
                name="serialize-property"
                :inlineOver="true"
                :trueValue="true"
                :defaultValue="false"
                :reverseLayout="true"
                :placeholder="tr(propItem.serializeProperty ? 'yes' : 'no')"
                v-model="propItem.serializeProperty"
            />

        </e-col>

    </e-row>

    <EFormVariableLogic
        clss="pl-2.5"
        src="action-input-default"
        :hideInput="true"
        :inlineOver="false"
        :label="tr('input')"
        mdlKey="input"
        :obj="obj"
        @model-changed="obj.input = $event.input; iteration++"
        @item-deleted="obj.input = {}; iteration++"
    />

    <EFormVariableLogic
        clss="pl-2.5"
        src="action-input-default"
        :hideInput="true"
        :inlineOver="false"
        :label="tr('validate')"
        mdlKey="validate"
        additionalIcon="mode-advanced-db-l"
        additionalIconSelected="mode-advanced-blue-l"
        :additionalIconHelp="tr('advanced-regex-validation')"
        :additionalIconHasContent="regex != ''"
        :obj="obj ?? {}"
        @model-changed="regex = ''; obj.validate = $event.validate; iteration++"
        @item-deleted="regex = ''; obj.validate = {}; iteration++"
        @additional-icon-clicked="addRegexValidation()"
    />

    <EFormVariableLogic
        clss="pl-2.5"
        src="action-input-default"
        :hideInput="true"
        :inlineOver="false"
        :label="tr('serialize')"
        mdlKey="serialize"
        :obj="obj ?? {}"
        @model-changed="obj.serialize = $event.serialize; iteration++"
        @item-deleted="obj.serialize = {}; iteration++"
    />

    <EFormInput
        class="mt-2"
        :name="tr('message')"
        :message="tr('please-input-a-value')"
        :allowClear="true"
        v-model="propItem.message"
    />

    <ServAcInputRegexValidationModal
        ref="mdl-adv-reg-validation"
        v-model="regex"
        @regex-create-mdl="regexChanged($event)"
    />
    
</e-col>
</template>

<script>
import Vue from 'vue';

export default {
    props: {
        propItem: Object,
        aiProps: Object,
    },
    watch: {
        changeEmitter(to) {
            const props = Object.values(this.cloneObj(to.mdl)).filter(
                (t) => Object.keys(t).length > 0
            );

            this.$emit('props-changed', this.keyify(props ?? [], 'property'));
        },
    },
    computed: {
        changeEmitter() {
            try {
                let hasValues = typeof this.obj == 'object' && Object.keys(this.obj).length > 0
                const out = this.cloneObj(hasValues ? this.obj : this.objDef);

                return {
                    mdl: out,
                    iteration: this.iteration,
                };
            }
            catch (err) {
                console.error('error: ', err);
                return this.cloneObj(this.objDef);
            };
        },
    },
    data() {
        return {
            iteration: 0,
            regex: '',
            objDef: {
                input: {},
                validate: {},
                serialize: {},
            },
            obj: {
                input: {},
                validate: {},
                serialize: {},
            },
        }
    },
    beforeMount() {
        if (this.aiProps) {
            this.obj = this.cloneObj(this.aiProps);
        }
    },
    methods: { 
        setInput(value) {
            this.obj.input = value.input;
            this.iteration++;
        },
        addRegexValidation() {
            this.$refs['mdl-adv-reg-validation'].show();
        },
        regexChanged(val) {
            this.obj.validate = val;
        },
    },
}
</script>