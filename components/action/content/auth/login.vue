<style lang="less">
.full-modal {
    .ant-modal {
        max-width: 100%;
        top: 0;
        padding-bottom: 0;
        margin: 0;
    }

    .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh);
    }

    .ant-modal-body {
        flex: 1;
    }
}

.side {
    box-sizing: border-box;
    height: 100%;
    background: #FFF;
    border-right: 1px solid #E0E0E0;
    left: -20px;
    top: -20px;
}

.boxReturn {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 24px 20px 20px;
    gap: 16px;
    width: 100%;
    background: #FFF;
    border: 1px solid #E0E0E0;
    border-radius: 2px;
    flex: none;
    order: 1;
    flex-grow: 0;
}
</style>

<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('authentication')"
        :subAction="tr('login')"
        :details="tr('login-action')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <e-row>

        <e-col w-25>

            <EFormSelect
                class="mt-7"
                :name="tr('requires-authentication-qu')"
                :placeholder="tr('select-an-authenticator')"
                keyProp="id"
                valueProp="name"
                :options="authenticators"
                :toolTipText="authenticators.length == 0 ? tr('no-authenticators-available-yet') : ''"
                v-model="auth"
                @option-selected="setSchemaVal('authenticatorLbe', pascalCase($event.option.name))"
            />

        </e-col>

        <e-col jc="fe" w-25>

            <EFormInput
                class="mb-1 pl-2"
                :name="tr('expires-in')"
                :message="tr('please-input-an-amount-of-min')"
                type="number"
                :addonAfter="tr('mins')"
                v-model="expiresIn"
            />

        </e-col>

        <e-col class="mt-5" jc="fe" w-25>

            <EFormSelect
                class="pl-2"
                :name="tr('vault')"
                leftIconContStyle="padding-left: 12px;"
                leftIcon="vault-db"
                :placeholder="tr('select-vault')"
                keyProp="id"
                valueProp="name"
                :options="credentials"
                v-model="vault"
                @input="resetSecret()"
            />

        </e-col>

        <e-col class="mt-5" jc="fe" w-25>

            <EFormSelect
                class="pl-2"
                :name="tr('secret')"
                leftIconContStyle="padding-left: 12px;"
                leftIcon="vault-db"
                :placeholder="tr('select-vault-key')"
                keyProp="key"
                valueProp="key"
                :options="vaultValues"
                :disabled="!vault"
                v-model="secret"
            />

        </e-col>

    </e-row>

    <e-row :fillParent="true">

        <ActionLogicMdlInput
            clss="pl-2.5"
            icon="file-db"
            :hideInput="true"
            :label="tr('password-help')"
            src="Login->passowrd"
            mdlKey="password"
            v-model="actionStep.schema"
            @show-bl-mdl="$emit('show-bl-mdl')"
        />

    </e-row>

    <e-row :fillParent="true">

        <ActionLogicMdlInput
            clss="pl-2.5"
            icon="file-db"
            :hideInput="true"
            :label="tr('verifier-help')"
            src="Login->verifier"
            mdlKey="verifier"
            v-model="actionStep.schema"
            @show-bl-mdl="$emit('show-bl-mdl')"
        />

    </e-row>

    <e-row class="mt-3" jc="sb" ai="e">

        <p class="font-semibold text-black-1 text-lg">
        
            {{ tr('sources') }}
            
        </p>

        <div>

            <a-button class="add-prop-btn" type="primary" shape="circle" size="small" @click="$refs['mdl-fail-on'].show()">

                <GeneralIcon type="plus-white" />

            </a-button>

        </div>

    </e-row>

    <TablePaginated
        :columns="columns"  
        :data="failOn"
        :showRowCheckboxs="false"
        :showSearch="false"
        :showActions="true"
        :actions="[
            {
                action: 'delete',
                icon: 'dustbin'
            },
            {
                action: 'edit',
                icon: 'edit'
            },
        ]"
        @action-edit-clicked="editProp"
        @action-delete-confirmed="(params) => {
            failOn.splice(params.deleteIndex, 1);
            params.successCb();
        }"
    />

    <ActionReturnObject
        :actionStep="actionStep"
        @show-bl-mdl="$emit('show-bl-mdl', $event)"
    />

    <EModal
        ref="mdl-fail-on"
        :width="800"    
        :title="tr(isEdit || isEditingProp ? 'edit' : 'add' + '-property')"
        :rightBtnText="tr(isEditingProp ? 'save' : 'add')"
        :shouldDisableRightBtn="!newFormIsValid"
        @right-btn-clicked="addProp()"
        @modal-closed="newPropMdlClosed()"
    >
       <e-row class="mt-3" :fillParent="true">

            <ActionLogicMdlInput
                clss="pl-2.5"
                :hideInput="true"
                :label="tr('condition')"
                :extraHelp="tr('login-condition-help')"
                src="Login->condition"
                mdlKey="condition"
                v-model="editingSrc"
                @show-bl-mdl="blIconClicked('condition', editingSrc?.condition)"
            />

        </e-row>

        <e-row class="mt-1" :fillParent="true">

            <ActionLogicMdlInput
                clss="pl-2.5"
                :hideInput="true"
                :label="tr('condition-message')"
                :extraHelp="tr('login-condition-message-help')"
                src="Login->message"
                mdlKey="message"
                :value="editingSrc"
                @show-bl-mdl="blIconClicked('src', editingSrc?.src)"
            />

        </e-row>

    </EModal>

</div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapState } from 'vuex';
import { DB_TYPES } from '~/consts/BusLogic';

import BlLogicChain from '~/models/BlLogicChain';

export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapGetters({
            authenticators: 'project/service-groups/authenticators',
        }),
        ...mapState('project', {
            credentials: (state) => state?.vault?.entities ?? [],
        }),
        newFormIsValid() {
            return this.editingSrc?.property != '' && this.returnType != '' && !this.propertyExists;
        },
        schMdl() {
            return function (key) {
                if (key == 'secret' && !this.loaded) return;

                if (typeof this.actionStep?.schema != 'object') {
                    Vue.set(this.actionStep, 'definition', {});
                }

                return this.actionStep.schema[key];
            }
        },
        auth: {
            get() { return this.schMdl('authenticator') },
            set(value) { this.setSchemaVal('authenticator', value) }
        },
        expiresIn: {
            get() { return this.schMdl('expiresIn') },
            set(value) { this.setSchemaVal('expiresIn', value) }
        },
        vault: {
            get() { return this.schMdl('vault') },
            set(value) { this.setSchemaVal('vault', value) }
        },
        secret: {
            get() { return this.schMdl('secret') },
            set(value) { this.setSchemaVal('secret', value) }
        },
        failOn: {
            get() {
                if (!this.actionStep?.schema?.failOn) {
                    this.setSchemaVal('failOn', []);
                }

                return this.schMdl('failOn');
            },
            set(value) { this.setSchemaVal('failOn', value) }
        },
        vaultValues() {
            try {
                const vault = this.credentials.filter(v => v.id == this.vault)[0];
                return vault.keyValues;
            }
            catch (err) { return [] }
        },
    },
    data() {
        return {
            columns: [...BlLogicChain.getColumns([ 'baseType' ])],
            filterKey: DB_TYPES,
            loaded: false,
            clickedSection: '',
            blMdl: {},

            openItem: { metadata: {} },

            isEdit: false,
            returnType: 'boolean',
            innerMdl: [],
            editingIndex: -1,
            isEditingProp: false,
            editingSrc: {},
        };
    },
    mounted() {
        setTimeout(() => this.loaded = true, 200);
    },
    methods: {
        setSchemaVal(key, value) {
            const out = {...this.actionStep?.schema ?? {}};

            out[key] = value;

            Vue.set(this?.actionStep, 'schema', JSON.parse(JSON.stringify(out)));
        },
        resetSecret() {
            if (!this.loaded) return;

            this.secret = '';
        },
        editProp(row, index) {
            this.isEditingProp = true;
            this.returnType = row.type;
            this.editingIndex = index;
            this.editingSrc = JSON.parse(JSON.stringify(row));

            this.$refs['mdl-fail-on'].show();
        },
        newPropMdlClosed() {
            this.editingSrc = {};
            this.isEditingProp = false;
            this.editingRow = {};
        },
        blAddClicked(item) {
            let schema = {};

            try {
                schema = {...(JSON.parse(JSON.stringify(this.actionStep?.schema ?? {})))};

                schema[this.clickedSection] = BlLogicChain.create({
                    ...JSON.parse(JSON.stringify(item)),
                    property: this.clickedSection,
                });

                Vue.set(this.actionStep, 'metadata', schema);

                this.clickedSection = '';
            }
            catch (err) {
                console.log('error: ', err);
            }
        },
        blIconClicked(src) {
            this.clickedSection = src;
            this.$emit('show-bl-mdl', {
                chain: this?.actionStep?.schema?.[src],
                successCb: this.blAddClicked,
            });
        },
        addProp() {
            if (!this.isEditingProp) {
                const name = `Fail On #${this.failOn.length + 1}`;

                this.editingSrc.property = name;
                this.editingSrc.type = 'text';

                this.actionStep.schema.failOn.push(this.editingSrc);
            }
            else {
                Vue.set(this.failOn, this.editingIndex, {...this.editingSrc});
            }

            this.$refs['mdl-fail-on'].hide();

            this.returnType = 'boolean';
            this.isEditingProp = false;
        },
    }
};
</script>