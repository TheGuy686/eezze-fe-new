<template>
<a-popover
    trigger="click"
    placement="right"
    v-model="visible"
>

    <a-button class="primary-border primary-text">

        {{ valueLbe }}

    </a-button>

    <template #content>

        <EFormContextMenu
            :highlightOnHasValue="true"
            :inlineOver="false"
            :name="tr('action-context')"
            src="PropLogicMenu"
            :additioalTopValues="previousAssignmentsMenu"
            :filter="actionContextMdl?.filterId"
            :value="actionContextMdl"
            @option-selected="handleMdlChange('action-context', $event)"
            v-if="!showOnlyFormatters"
        />

        <EFormSelect
            :highlightOnHasValue="true"
            :name="tr('number-operation-calculation')"
            :placeholder="tr('select-an-operation')"
            keyProp="id"
            valueProp="title"
            :options="opTypeNumber.options"
            :value="numberMdl"
            @option-selected="handleMdlChange('number-operation', $event.value, 'number')"
            v-if="!showOnlyFormatters"
        />

        <EFormSelect
            :highlightOnHasValue="true"
            :name="tr('format-string')"
            :placeholder="tr('select-a-format-string-operation')"
            keyProp="id"
            valueProp="title"
            :options="opTypeFormat.string.options"
            :value="formatStringMdl"
            @option-selected="handleMdlChange('formatter', $event.value, 'text')"
        />

        <EFormSelect
            :highlightOnHasValue="true"
            :name="tr('format-date')"
            :placeholder="tr('select-a-format-date-operation')"
            keyProp="id"
            valueProp="title"
            :options="opTypeFormat.date.options"
            :value="formatDateMdl"
            @option-selected="handleMdlChange('formatter', $event.value, 'text')"
        />

        <EFormSelect
            :highlightOnHasValue="true"
            :name="tr('primitive-assignment')"
            :placeholder="tr('select-a-primitive-value')"
            keyProp="key"
            valueProp="label"
            :options="primitiveReturnTypes"
            :value="assignPrimitiveMdl"
            @option-selected="handleMdlChange('assign-primitive', $event.value, $event.value)"
            v-if="!showOnlyFormatters"
        />

        <h3>{{ tr('other') }}</h3>

        <a-button 
            :type="value == 'custom' ? 'primary' : 'default'"
            @click="handleMdlChange('custom', 'custom', 'text')"
            v-if="!showOnlyFormatters"
        >

            {{ tr('custom') }}

        </a-button>

        <a-button
            w-100
            :type="value == 'number' ? 'primary' : 'default'"
            @click="handleMdlChange('formatter', 'number', 'number')"
            v-if="showOnlyFormatters"
        >

            {{ tr('format-number') }}

        </a-button>

        <a-button
            style="margin-top: 10px;"
            w-100
            :type="value == 'object' ? 'primary' : 'default'"
            @click="handleMdlChange('formatter', 'object', 'number')"
            v-if="showOnlyFormatters"
        >

            {{ tr('format-object') }}

        </a-button>

    </template>

</a-popover>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    props: {
        value: {
            type: Object,
            require: true,
        },
        previousAssignmentsMenu: {
            type: Object,
            require: true,
        },
        showOnlyFormatters: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        visible(to) {
            if (!to) {
                this.numberMdl = undefined;
                this.formatStringMdl = undefined;
                this.formatDateMdl = undefined;
                this.actionContextMdl = '';
                this.assignPrimitiveMdl = undefined;
                this.hasOpened = false;
            }
            else {
                this.setMdls();
                this.os(() => this.hasOpened = true, 150);
            }
        }  
    },
    computed: {
        ...mapState('cms/actions/bs-logic', {
            opTypeNumber: (state) => state?.numberOperations ?? {},
            opTypeFormat: (state) => state.format,
        }),
        ...mapGetters({
            logicReturnTypes: 'project/entity-presets/logicReturnTypes',
            primitiveReturnTypes: 'project/entity-presets/primitiveReturnTypes',
        }),
        formatNumberOptions() {
            try {
                return this.primitiveReturnTypes.filter((item) => {
                    console.log('ITEM: ', item);
                    return false;
                });
            }
            catch (err) { return [] }
        },
        hasValue() {
            if (typeof this.value == 'object') {
                return Object.keys(this.value).length > 0;
            }

            return this.value != null && this.value != undefined && this.value != '';
        },
        valueLbe() {
            const type = this.value?.type, subtype = this.value?.logic?.subtype;

            if (type == 'custom') return tr('custom');

            if (!this.value || this.value == '' || typeof type == 'undefined' || typeof subtype == 'undefined') {
                return tr('choose-logic');
            }

            if (!this.value?.logic?.subtype) return tr('choose-logic');

            let keyCombo = `${type}-${this.value?.logic?.subtype}`;

            if (type == 'formatter') {
                if (keyCombo.indexOf('formatter-string') >= 0) {
                    return tr('formatter-string', { maxLen: 14 });
                }

                return tr(keyCombo, { maxLen: 14 });
            }

            if (/^assign-primitive/.test(keyCombo) || /^number-/.test(keyCombo)) {
                return tr(keyCombo, { maxLen: 14 });
            }

            return tr(type, { maxLen: 14 });
        },
    },
    data() {
        return {
            visible: false,
            hasOpened: false,
            actionContextMdl: '',
            numberMdl: undefined,
            formatStringMdl: undefined,
            formatDateMdl: undefined,
            assignPrimitiveMdl: undefined,
        };
    },
    mounted() {
        this.setMdls();
    },
    methods: {
        setMdls() {
            switch (this.value?.type) {
                case 'number-operation':
                    this.numberMdl = this.value?.logic?.subtype;
                    this.formatStringMdl = undefined;
                    this.formatDateMdl = undefined;
                    this.actionContextMdl = '';
                    this.assignPrimitiveMdl = undefined;
                    break;

                case 'assign-primitive':
                    this.numberMdl = undefined;
                    this.formatStringMdl = undefined;
                    this.formatDateMdl = undefined;
                    this.actionContextMdl = '';
                    this.assignPrimitiveMdl = this.value?.logic?.subtype;
                    break;

                case 'custom':
                    this.numberMdl = undefined;
                    this.formatStringMdl = undefined;
                    this.formatDateMdl = undefined;
                    this.actionContextMdl = '';
                    this.assignPrimitiveMdl = undefined;
                    this.value.logic.subtype = '';

                    break;

                case 'formatter':
                    if (/^string/.test(this.value?.logic?.subtype)) {
                        this.numberMdl = undefined;
                        this.formatStringMdl = this.value?.logic?.subtype;
                        this.formatDateMdl = undefined;
                        this.actionContextMdl = '';
                        this.assignPrimitiveMdl = undefined;
                    }
                    else if (/^date/.test(this.value?.logic?.subtype)) {
                        this.numberMdl = undefined;
                        this.formatStringMdl = undefined;
                        this.formatDateMdl = this.value?.logic?.subtype;
                        this.actionContextMdl = '';
                        this.assignPrimitiveMdl = undefined;
                    }

                    break;

                default:
                    this.numberMdl = undefined;
                    this.formatStringMdl = undefined;
                    this.formatDateMdl = undefined;
                    this.assignPrimitiveMdl = '';
                    this.actionContextMdl = this.value?.logic?.subtype;
            }
        },
        handleMdlChange(group, type, returns) {
            if (!this.visible || !group || !type || group == '' || type == '') return;

            let counter = 0;

            if (group == this.value.type) counter++;
            if (type == this.value.logic.subtype) counter++;

            if (counter == 2) return;

            const arrayTypes = [ 'boolean', 'object' ];

            this.value.logic = {
                subtype: '',
                prop: this.value.logic?.prop,
                format: '',
                formula: '',
                source: '',
                example: '',
                raw: arrayTypes.includes(type) ? [] : '',
                opArgs: [],
                variables: []
            }

            switch (group) {
                case 'number-operation':
                    this.numberMdl = type;
                    this.formatStringMdl = undefined;
                    this.formatDateMdl = undefined;
                    this.actionContextMdl = '';
                    this.assignPrimitiveMdl = undefined;
                    this.value.type = group;
                    this.value.logic.subtype = type;

                    break;

                case 'assign-primitive':
                    this.numberMdl = undefined;
                    this.formatStringMdl = undefined;
                    this.formatDateMdl = undefined;
                    this.actionContextMdl = '';
                    this.assignPrimitiveMdl = type;
                    this.value.type = group;
                    this.value.logic.subtype = type;

                    if (type == 'date') {
                        this.value.logic.source = 'now';
                    }

                    break;

                case 'formatter':
                    if (/^string/.test(type)) {
                        this.formatStringMdl = type;
                        this.numberMdl = undefined;
                        this.formatDateMdl = undefined;
                        this.actionContextMdl = '';
                        this.assignPrimitiveMdl = undefined;
                        this.value.type = group;
                        this.value.logic.subtype = type;
                    }
                    else if (/^date/.test(type)) {
                        this.numberMdl = undefined;
                        this.formatStringMdl = undefined;
                        this.actionContextMdl = undefined;
                        this.assignPrimitiveMdl = undefined;
                        this.formatDateMdl = type;
                        this.value.type = group;
                        this.value.logic.subtype = type;
                    }
                    else if (type == 'number' || type == 'object') {
                        this.numberMdl = undefined;
                        this.formatStringMdl = undefined;
                        this.formatDateMdl = undefined;
                        this.actionContextMdl = '';
                        this.assignPrimitiveMdl = undefined;
                        this.value.logic.subtype = '';
                        this.value.type = group;
                        this.value.logic.subtype = type;
                    }

                    break;

                case 'custom':
                    this.numberMdl = undefined;
                    this.formatStringMdl = undefined;
                    this.formatDateMdl = undefined;
                    this.actionContextMdl = '';
                    this.assignPrimitiveMdl = undefined;
                    this.value.logic.subtype = '';
                    this.value.type = group;

                    break;

                default:
                    this.numberMdl = undefined;
                    this.formatStringMdl = undefined;
                    this.formatDateMdl = undefined;
                    this.assignPrimitiveMdl = '';
                    this.actionContextMdl = type;
                    this.value.type = group;
                    this.value.logic.subtype = type;
            }

            this.value.returns = returns;
            this.value.actions = [];

            this.$emit('mdl-changed');
        }
    }
}
</script>
