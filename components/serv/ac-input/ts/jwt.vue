<template>
<e-col class="mt-1">

    <e-row>

        <e-col w-15>

            <h2 class="pt-2">{{ tr('required') }}</h2>

        </e-col>

        <e-col w-25>

            <h2 class="pt-2">{{ tr('serialize-property') }}</h2>

        </e-col>

        <e-col w-20>

            <h2 class="pt-2">{{ tr('refresh-on-validate') }}</h2>

        </e-col>

    </e-row>

    <e-row>

        <e-col w-15>

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

        <e-col w-25>

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

        <e-col w-20>

            <EFormCheckBox
                inlineLabelStyle="margin-left: 8px;"
                name="refresh-on-validate"
                :inlineOver="true"
                :trueValue="true"
                :defaultValue="false"
                :reverseLayout="true"
                :placeholder="tr(propItem.refreshOnValidate ? 'yes' : 'no')"
                v-model="propItem.refreshOnValidate"
            />

        </e-col>

    </e-row>

    <e-col jc="fe" class="pt-3">

        <e-row w-50>

            <EFormInput
                :name="tr('expires-in')"
                :message="tr('please-input-an-amount-of-min')"
                type="number"
                :addonAfter="tr('mins')"
                castTo="number"
                v-model="propItem.expiresIn"
            />

        </e-row>

    </e-col>

    <h3 class="mt-3">{{ tr('token-secret') }}</h3>

    <e-col class="pb-2" bev-cont>

        <e-row class="mt-5">

            <e-col :center="true" w-20>

                {{ tr('credentials') }}

            </e-col>

            <e-col w-60>

                <EFormSelect
                    class="pl-2"
                    name=""
                    leftIconContStyle="padding-left: 12px;"
                    leftIcon="vault-db"
                    :placeholder="tr('select-credentials')"
                    keyProp="id"
                    valueProp="name"
                    :options="credentials"
                    :inlineOver="true"
                    v-model="propItem.metadata.valut"
                />

            </e-col>

        </e-row>

        <e-row class="mt-5">

            <e-col :center="true" w-20>

                {{ tr('key') }}

            </e-col>

            <e-col w-60>

                <EFormSelect
                    class="pl-2"
                    name=""
                    leftIconContStyle="padding-left: 12px;"
                    leftIcon="user-db"
                    :placeholder="tr('select-a-user-property')"
                    keyProp="key"
                    valueProp="key"
                    :options="credentialOptions"
                    :inlineOver="true"
                    :disabled="!hasCreds"
                    v-model="propItem.valutKey"
                />

            </e-col>

        </e-row>

    </e-col>

    <h3 class="mt-3">{{ tr('additional-headers') }}</h3>

    <e-col>

        <ServiceGroupTypesAuthenticatorAdditionalHeaders
            :entIn="addHeadersObj"
            @md-changed="additionalHeadersChanged($event)"
        />

    </e-col>

    <EFormVariableLogic
        clss="pl-2.5"
        src="action-input-default"
        :hideInput="true"
        :inlineOver="false"
        :label="tr('input')"
        mdlKey="input"
        :obj="obj ?? {}"
        @model-changed="obj.input = $event.input"
        @item-deleted="obj.input = {}"
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
        :additionalIconHasContent="metadata.regex != ''"
        :obj="obj ?? {}"
        @model-changed="metadata.regex = ''; obj.validate = $event.validate"
        @item-deleted="metadata.regex = ''; obj.validate = {}"
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
        @model-changed="obj.serialize = $event.serialize"
        @item-deleted="obj.serialize = {}"
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
        v-model="propItem.metadata.regex"
        @regex-create-mdl="regexChanged($event)"
    />

</e-col>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

export default {
    props: {
        propItem: Object,
        aiProps: Object,
    },
    watch: {
        changeEmitter(to) {
            const props = Object.values(this.cloneObj(to)).filter(
                (t) => Object.keys(t).length > 0
            );
            this.$emit('props-changed', this.keyify(props, 'property'));
        },
        addHeadersIn(to) {
            Vue.set(this.propItem, 'additionalHeaders', to.headders);
            this.$emit('add-headers-changed', this.cloneArr(to.headders));
        },
    },
    computed: {
        ...mapState('project/vault', {
            credentials: (state) => state?.entities ?? [],
        }),
        changeEmitter() {
            try {
                return JSON.parse(JSON.stringify(this.obj));
            }
            catch (err) { return {} };
        },
        chosenVault() {
            return this.credentials.filter((v) => v.id == this.propItem.metadata.valut)[0];
        },
        hasCreds() {
            return typeof this.chosenVault === 'object' && Object.keys(this.chosenVault).length > 0;
        },
        credentialOptions() {
            try {
                return Object.values(this.chosenVault?.keyValues);
            }
            catch (err) { return [] };
        },
        addHeadersIn() {
            return {
                itteration: this.itteration,
                headders: this.cloneArr(this.addHeadersObj?.metadata?.additionalHeaders ?? []),
            }
        }
    },
    data() {
        return {
            itteration: 0,
            addHeadersObj: {
                metadata: {},
            },
            metadata: {
                valut: '',
            },
            obj: {
                input: {},
                validate: {},
                serialize: {},
            },
        };
    },
    beforeMount() {
        if (typeof this.propItem.metadata == 'undefined') {
            this.propItem.metadata = {};
        }

        if (this.aiProps) {
            this.addHeadersObj.metadata.additionalHeaders = this.propItem?.additionalHeaders ?? [];
            const propIn = this.keyify(this.cloneObj(this.aiProps), 'property');

            this.obj = {
                input: propIn?.input,
                validate: propIn?.validate,
                serialize: propIn?.serialize,
            };
        }
    },
    methods: {
        additionalHeadersChanged(value) {
            Vue.set(
                this.addHeadersObj.metadata,
                'additionalHeaders',
                value.additionalHeaders,
            );
            this.itteration++;
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