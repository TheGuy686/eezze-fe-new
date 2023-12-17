<style lang="less">
.context-menu-root {
    padding-top: 5px;

    .ezze-context-menu-popover-content-area {
        .ant-popover-inner-content {
            max-height: 80vh;
            overflow: scroll;
            overflow-x: hidden;

            /* width */
            &::-webkit-scrollbar {
                width: 5px;
            }

            /* Track */
            &::-webkit-scrollbar-track {
                box-shadow: inset 0 0 5px grey;
                border-radius: 10px;
            }

            /* Handle */
            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
            }
        }

        .menu-body-scroll {
            max-height: 60vh;
            margin-right: -12px;
            padding-right: 12px;

            .context-menu-body {
                width: 350px;
            }
        }
    }
}

.select-input {
    margin-bottom: 5px !important;
    color: rgba(0, 0, 0, 0.25) !important;
}

.select-input-has-value {
    margin-bottom: 5px !important;
    color: rgba(0, 0, 0, 0.65) !important;
}
</style>

<template>
<div class="context-menu-root">

    <a-popover
        placement="rightTop" 
        trigger="click"
        overlayClassName="ezze-context-menu-popover-content-area"
        v-model="visible" 
        @visibleChange="visibleChange"
    >
        <a-col :style="stle">

            <h3 v-if="!inlineOver">

                {{ name + (required ? ' *' : '') }}

            </h3>

            <a-button 
                type="secondary"
                :disabled="disabled"
                :class="(!hasValue ? 'select-input ' : 'select-input-has-value ') + (highlightOnHasValue && hasValue ? 'primary-border' : '')"
            >
                
                {{ btnLbe }}
                
            </a-button>

        </a-col>

        <template #content>

            <div style="max-height: 50vh; margin-right: -12px; padding-right: 12px;" e-scroll>

                <div class="context-menu-body">

                    <EFormInpContextMenuClickableItem
                        :mdlTree="itemKeyTree"
                        :selectedKeys="selectedKeys"
                        :options="eezzeVars"
                        masterItemId="eezze"
                        id="eezze"
                        :title="tr('eezze')"
                        :vMdlValue="value"
                        :counter="counter"
                        :actionInput="actionInput"
                        @item-selected-init="chosenItem = $event"
                        @group-selected="groupSelected($event)"
                        @item-mdl-changed="groupIdTrail = ''"
                        @item-selected="$emit('input', $event.key)"
                        @itterate="counter++"
                        @child-item-just-added="counter++"
                    />

                </div>

            </div>

        </template>

    </a-popover>

</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { tr } from '~/classes/globals';

export default {
    props: {
        disabled: Boolean,
        actionInput: {
            type: Array,
            default: () => []
        },
        actionChain: {
            type: Array,
            default: () => []
        },
        stle: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            require: true,
        },
        inlineOver: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            require: true,
        },
        required :{
            type: Boolean,
            default: false,
        },
        highlightOnHasValue: {
            type: Boolean,
            default: false,
        },
        placeholder: String,
        maxLength: {
            type: Number,
            default: 7,
        },
    },
    computed: {
        hasValue() {
            if (typeof this.value == 'object') {
                return Object.keys(this.value).length > 0;
            }

            return this.value != null && this.value != undefined && this.value != '';
        },

        // we need to do this to make sure that we have all the keys
        // in the array through the parent tree. This will enable us 
        // to be able to set the initial value of the v-model and then
        // make sure that the right items etc are selected 
        itemKeyTree() {
            let out = [];

            this.getTreeMdl(this.eezzeVars, out, this.value);

            // this gives us out default values
            if (out.length == 0) out = ['eezze', 'request'];

            return out;
        },

        eezzeVars() {
            return [...Object.values(this.eezzeVarsMdl)];
        },

        flatMdl() {
            try {
                return {
                    itteration: this.counter,
                    mdl: this.flattenMdl(this.eezzeVars),
                };
            }
            catch (err) {return {}}
        },

        currentSelectionP() {
            try {
                return {
                    itteration: this.itteration,
                    selection: this.flatMdl?.mdl?.[this.value],
                };
            }
            catch (err) {
                return {
                    itteration: this.itteration,
                    selection: {}
                }
            }
        },

        currentSelection() {return this.currentSelectionP.selection},

        btnLbe() {
            const fm = this.flatMdl.mdl;
            const val = this.value && fm[this.value] ? fm[this.value].title : this.value;
            let lbe = val ? val : (this.placeholder ? this.placeholder : tr('select-input'));

            try {
                const matches = (val ?? '').match(/(.*)\.([a-zA-Z0-9]+)$/);

                if (matches && this.dynamicGroups.includes(matches[1])) {
                    lbe = matches[2];
                }

                if (typeof this.maxLength != 'undefined') {
                    return this.maxLen(lbe, this.maxLength);
                }

                return lbe;
            }
            catch (err) {
                if (typeof this.maxLength != 'undefined') {
                    return this.maxLen(lbe, this.maxLength);
                }
            }
        },

        aiFilter() {
            return function (key) {
                return this.actionInput.filter((iv) => iv.dlKey == key);
            }
        },

        reqHeaders() {
            return {
                groupId: 'eezze',
                id: 'headers',
                title: tr('headers'),
                type: 'dynamice-list',
                key: 'adm.request.requestHeaders',
                children: this.aiFilter('adm.request.requestHeaders'),
            };
        },

        reqCookies() {
            return {
                groupId: 'eezze',
                id: 'cookies',
                title: tr('cookies'),
                type: 'dynamice-list',
                key: 'adm.request.cookies',
                children: {...this.aiFilter('adm.request.cookies')},
            };
        },

        // reqSession() {
        //     return {
        //         groupId: 'eezze',
        //         id: 'session',
        //         title: tr('session'),
        //         type: 'dynamice-list',
        //         key: 'adm.request.session',
        //         children: {...this.aiFilter('adm.request.session')},
        //     };
        // },

        reqUrlParams() {
            return {
                groupId: 'eezze',
                id: 'url-params',
                type: 'dynamice-list',
                key: 'adm.request.urlParams',
                title: tr('url-params'),
                helpText: tr('request-url-params-help-text'),
                children: {...this.aiFilter('adm.request.urlParams')},
            };
        },

        reqBody() {
            return {
                id: 'body',
                title: tr('request-body'),
                type: 'dynamice-list',
                key: 'adm.request.requestBody',
                helpText: tr('request-body-help-text'),
                children: {...this.aiFilter('adm.request.requestBody')},
            };
        },

        eezzeVarsMdl() {
            return {
                request: {
                    groupId: 'eezze',
                    id: 'request',
                    title: tr('request'),
                    helpText: 'request-help-text',
                    children: {
                        'accessed-from-browser': {
                            groupId: 'eezze',
                            id: 'accessed-from-browser',
                            type: 'boolean',
                            key: 'adm.request.accessedFromBrowser',
                            title: tr('accessed-from-browser'),
                            example: true,
                        },
                        host: {
                            groupId: 'eezze',
                            id: 'host',
                            key: 'adm.request.host',
                            type: 'text',
                            title: tr('host'),
                            example: 'a-site.io',
                        },
                        'ip-address': {
                            groupId: 'eezze',
                            id: 'ip-address',
                            key: 'adm.request.requestIp',
                            type: 'text',
                            title: tr('ip-address'),
                            example: '192.168.52.125',
                        },
                        'full-path': {
                            groupId: 'eezze',
                            id: 'full-path',
                            key: 'adm.request.urlPath',
                            type: 'text',
                            title: tr('full-path'),
                            example: '/url/to/page',
                        },
                        'full-url': {
                            groupId: 'eezze',
                            id: 'full-url',
                            key: 'adm.request.fullUrl',
                            type: 'text',
                            title: tr('full-url'),
                            example: 'http://a-site.io/url/to/page',
                        },
                        method: {
                            groupId: 'eezze',
                            id: 'method',
                            key: 'adm.request.method',
                            type: 'text',
                            title: tr('method'),
                            example: 'GET',
                        },
                        headers: this.reqHeaders,
                        cookies: this.reqCookies,
                        // session: this.reqSession,
                        'url-params': this.reqUrlParams,
                        body: this.reqBody,
                    }
                }
            }
        },
    },

    data() {
        return {
            dynamicGroups: [
                'adm.request.requestHeaders',
                'adm.request.cookies',
                'adm.request.session',
                'adm.request.urlParams',
                'adm.request.requestBody',
            ],
            visible: false,
            isCollapsed: false,
            selectedKeys: [],
            counter: 0,
            groupIdTrail: '',
            chosenItem: {},
            inputVarsMdl: {},
        };
    },
    mounted() {
        this.selectedKeys = this.itemKeyTree;
    },
    methods: {
        getTreeMdl(mdl, out, value, parent) {
            for (let item of Object.values(mdl)) {
                if (typeof item?.children === 'object') {
                    const found = this.getTreeMdl(item.children, out, value, item);

                    if (found) {
                        if (typeof parent == 'object' && !out.includes(parent.id)) {
                            out.push(parent.id);
                        }

                        out.push(item.id);
                    }
                }
                else {
                    if (item.key === value) {
                        out.push(item.groupId);

                        return true;
                    }
                }
            }
        },
        visibleChange(state) {
            this.isCollapsed = state;
        },
        groupSelected(id) {
            let index = this.selectedKeys.indexOf(id);

            // insert the selected key 
            if (index == -1) this.selectedKeys.push(id);
            // or delete it if it already exists
            else this.selectedKeys.splice(index);
        },
        flattenMdl(mdl, out = {}) {
            for (let c of mdl) {
                if (typeof c?.children == 'object') {
                    const children = Object.values(c.children);
                    this.flattenMdl(children, out);
                    continue;
                }
                if (typeof c?.key == 'undefined') continue;

                out[c.key] = c;
            }

            return out;
        },
    }
}
</script>
