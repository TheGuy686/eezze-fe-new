<style lang="less">
.context-menu-root {
    padding-top: 5px;

    .eezze-context-menu-popover-content-area {
        width: 300px;
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

.context-menu-body {
    width: 350px;
}

.context-menu-item {
    cursor: pointer;
    margin-left: -5px;
    margin-right: -5px;
    padding-left: 5px;
    padding-right: 5px;

    &:hover {
        .title {
            color: rgba(59, 130, 246, 1);
        }
    }
}
</style>

<template>
<div class="context-menu-root">

    <a-popover
        placement="rightTop" 
        trigger="click"
        overlayClassName="eezze-context-menu-popover-content-area"
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

            <div class="context-menu-body">

                <a-tooltip
                    placement="right"
                    :get-popup-container="getPopupContainer"
                    :title="filter ? tr('id-filter', { args: [ filter ] }) : ''"
                >
                    <div class="pb-1">{{ tr('value') }}: <b>{{ mdlVal }}</b></div>

                </a-tooltip>

                <e-row jc="sb" ai="c">

                    <e-col clss="pr-2">

                        <EFormInput
                            :name="tr('property-name')"
                            :placeholder="tr('property-name')"
                            :inlineOver="true"
                            :borderStatus="filter && filter != '' ? 'success' : ''"
                            :changableTypes="true"
                            :extendedTypes="true"
                            type="text"
                            v-model="search"
                            @type-changed=""
                        />

                    </e-col>

                    <a-button type="primary" @click="$emit('input', search); search = ''">

                        {{ tr('set') }}

                    </a-button>

                </e-row>

                <div class="divider"></div>

                <div style="max-height: 50vh; margin-right: -12px; padding-right: 12px;" e-scroll>

                    <a-list size="small" item-layout="horizontal" :data-source="filteredList">

                        <template #renderItem="item">

                            <a-list-item class="context-menu-item" non-sel @click="itemClicked(item)">

                                <a-list-item-meta>

                                    <template #title>

                                        <e-row jc="sb">

                                            <e-row ai="c">
                                                
                                                <a-tag
                                                    size="small" 
                                                    :color="item.isAction ? '#1677ff' : item.color"
                                                    v-if="isVarAssOrAct(item)"
                                                >

                                                    {{ item?.isAction? item.actTitle : miTypeLbe(item.src) }}
        
                                                </a-tag>

                                                <span v-if="isVarAssOrAct(item) && !item.isPrimitive">
                                                    
                                                    ->
                                                
                                                </span>

                                                <span class="title" v-if="!item.isPrimitive">
                                                    
                                                    {{ item.title }}
                                                
                                                </span>

                                            </e-row>
    
                                            <a-tooltip
                                                placement="left"
                                                :get-popup-container="getPopupContainer"
                                                :title="tr(miTypeLbeTTText(item.src))"
                                            >
                                                <e-col ai="fe" w-25>

                                                    <a-tag class="mb-1" :color="item.color" v-if="!isVarAssOrAct(item)">
                                                
                                                        {{ miTypeLbe(item.src) }}
    
                                                    </a-tag>
    
                                                    <a-tag :color="item.returnColor">
                                                    
                                                        {{ item.returns.toUpperCase() }}
    
                                                    </a-tag>

                                                </e-col>

                                            </a-tooltip>

                                        </e-row>

                                    </template>

                                </a-list-item-meta>

                            </a-list-item>
                            
                        </template>

                    </a-list>

                </div>

            </div>

        </template>

    </a-popover>

</div>
</template>

<script>
import MenuState from '~/classes/menu/MenuState';
import { mapGetters, mapState } from 'vuex';
import { tr } from '~/classes/globals';

export default {
    props: {
        debug: Boolean,
        disabled: Boolean,
        placeholder: String,
        name: String,
        filter: String | Number,
        src: {
            type: String,
            required: true,
        },
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
        required :{
            type: Boolean,
            default: false,
        },
        inlineOver: {
            type: Boolean,
            default: true
        },
        highlightOnHasValue: {
            type: Boolean,
            default: false,
        },
        maxLength: {
            type: Number,
            default: 7,
        },
    },
    computed: {
        ...mapGetters({
            dsEntitiesDict: 'project/data-sources/dsEntitiesDict',
            actionTypesDict: 'cms/actions/bs-logic/actionTypesDict',
        }),
        ...mapState('project', {
            editingService: (state) => state?.services?.entity,
        }),
        mdlVal() {
            if (!this.value || this.value == '')  return this.tr('select-or-input-a-value');

            return this.value;
        },
        btnLbe() {
            const lbe = this.tr('select-or-input-a-value');

            if (!this.value || this.value == '')  {
                if (typeof this.maxLength != 'undefined') {
                    return this.maxLen(lbe, this.maxLength);
                }
                else return lbe;
            }

            if (typeof this.maxLength != 'undefined') {
                return this.maxLen(this.value, this.maxLength);
            }

            return this.value;
        },
        hasValue() {
            if (typeof this.value == 'object') {
                return Object.keys(this.value).length > 0;
            }

            return this.value != null && this.value != undefined && this.value != '';
        },
        miTypeLbe() {
            return function (type) {
                if (type == 'action-input') return 'AI';
                else if (type == 'action-output') return 'AO';
                else if (type == 'state') return 'STATE';
                else if (type == 'stash') return 'STASH';
                else if (type == 'assignments') return 'ASSIGN';

                return 'PR';
            }
        },
        miTypeLbeTTText() {
            return function (type) {
                if (type == 'action-input') return 'action-input-help';
                else if (type == 'action-output') return 'action-out-help';

                return 'action-prop-help';
            }
        },
        isVarAssOrAct() {
            return function (item) {
                if (item.isAction) return true;
                else if (item.type == 'state') return true;
                else if (item.type == 'stash') return true;
                else if (item.type == 'assignments') return true;

                return false;
            }
        },
        menu() {
            // try {
            //     const menu = new MenuState(this.editingService, this.dsEntitiesDict);

            //     return menu.parFIlterMenu('', this.filter);
            // }
            // catch (err) { return {} }
            return {
                "eezze": [
                    {
                        "groupId": "eezze",
                        "id": "action-input",
                        "title": "action-input",
                        "children": {
                            "adsfasdf": {
                                "groupId": "eezze",
                                "id": "action-input-adsfasdf",
                                "type": "date",
                                "key": "",
                                "title": "adsfasdf",
                                "example": ""
                            }
                        }
                    },
                    {
                        "groupId": "eezze",
                        "id": "state",
                        "title": "state",
                        "children": {
                            "stateA1": {
                                "groupId": "eezze",
                                "id": "action-input-adsfasdf",
                                "type": "date",
                                "key": "",
                                "title": "stateA1",
                                "example": ""
                            },
                            "stateA2": {
                                "groupId": "eezze",
                                "id": "action-input-657",
                                "type": "date",
                                "key": "",
                                "title": "stateA2",
                                "example": ""
                            }
                        }
                    },
                    {
                        "groupId": "eezze",
                        "id": "stash",
                        "title": "stash",
                        "children": {
                            "stashC1": {
                                "groupId": "eezze",
                                "id": "action-input-123r",
                                "type": "date",
                                "key": "",
                                "title": "stashC1",
                                "example": ""
                            }
                        }
                    },
                    {
                        "groupId": "eezze",
                        "id": "assignments",
                        "title": "assignments",
                        "children": {
                            "assD1": {
                                "groupId": "eezze",
                                "id": "action-input-123rrer",
                                "type": "date",
                                "key": "",
                                "title": "assD1",
                                "example": ""
                            },
                            "assD2": {
                                "groupId": "eezze",
                                "id": "action-input-123rert",
                                "type": "date",
                                "key": "",
                                "title": "assD2",
                                "example": ""
                            }
                        }
                    },
                    {
                        "groupId": "eezze",
                        "id": "input",
                        "title": "input",
                        "children": {
                            "ryan": {
                                "groupId": "eezze",
                                "id": "1pWlQZqSWh",
                                "type": "text",
                                "key": "lc.prop('ryan')",
                                "title": "input->ryan",
                                "example": ""
                            }
                        }
                    },
                ],
                "actions": [
                    {
                        "groupId": "actions",
                        "id": "73",
                        "title": "Action #3",
                        "children": {
                            "result": {
                                "groupId": "actions",
                                "id": "result",
                                "title": "result",
                                "type": "object",
                                "children": {
                                    "mqUtfJSu0D": {
                                        "groupId": "actions",
                                        "id": "mqUtfJSu0D",
                                        "actionIndex": 0,
                                        "type": "text",
                                        "key": "adm.action(0).result",
                                        "title": "action-title"
                                    }
                                }
                            }
                        }
                    },
                    {
                        "groupId": "actions",
                        "id": "81",
                        "title": "Action #2",
                        "children": {
                            "result": {
                                "groupId": "actions",
                                "id": "result",
                                "title": "result",
                                "type": "text",
                                "children": {
                                    "UgS57jtZUM": {
                                        "groupId": "actions",
                                        "id": "UgS57jtZUM",
                                        "actionIndex": 1,
                                        "type": "text",
                                        "key": "adm.action(1).result",
                                        "title": "action-title"
                                    }
                                }
                            }
                        }
                    }
                ]
            };
        },
        getGetKeyPrefix() {
           return function (type) {
                switch (type) {
                    case 'action-input': return 'adm.input.prop(\'$1\')';
                    case 'state': return 'lc.state.prop(\'$1\')';
                    case 'stash': return 'lc.stash.prop(\'$1\')';
                    case 'assignments': return 'lc.prop(\'$1\')';
                }
           }
        },
        prList() {
            try {
                const out = [];

                // keys we care about
                const kwca = [ 
                    'action-input', 'state', 'stash', 'assignments',
                ];

                // loop over the menu group first
                for (const ge of Object.values(this.menu.eezze)) {
                    let isInput = false;

                    const keyPref = this.getGetKeyPrefix(ge.id);

                    // then we loop over each of the items in that group
                    for (const i of Object.values(ge.children)) {
                        let di, title;

                        if (kwca.includes(ge.id)) {
                            if (ge.id == 'action-input') isInput = true;
                            
                            di = this.typesDict[ge.id];
                        }
                        else {
                            if (typeof this.typesDict[ge.id] == 'undefined') {
                                this.typesDict[ge.id] = {
                                    type: 'prop-mapping',
                                    title: i.title,
                                    color: randDarkColor(),
                                };
                            }

                            di = this.typesDict[ge.id];
                        }

                        out.push({
                            type: di.type,
                            key: isInput ? `adm.input.prop('${i.title}')` : keyPref ? keyPref.replace('$1', i.title) : i.key,
                            src: ge.id,
                            title: i?.title,
                            color: di?.color,
                            returns: i.type,
                            returnColor: this.actionTypesDict?.[i.type]?.color ?? randDarkColor(),
                        });
                    }
                }

                // loop over the menu actions
                for (const ge of Object.values(this.menu.actions)) {
                    // Then we need to loop over each action and then add one entry per property for the return object / result
                    for (const act of Object.values(ge.children)) {
                        const di = this.typesDict['output'];
                        const vals = Object.values(act.children);

                        if (act.type == 'object') {
                            // here we need to loop over each property on the top level on the object and 
                            // then we need to add a menu entry for each of the props in the return object
                            for (const pr of vals) {
                                out.push({
                                    isAction: true,
                                    type: di.type,
                                    key: `${pr.key}['${pr.title}']`,
                                    src: 'action-output',
                                    actTitle: tr('action-output-title-op', { args: [ pr.actionIndex ] }),
                                    title: `['${pr.title}']`,
                                    color: di.color,
                                    returns: pr.type,
                                    returnColor: this.actionTypesDict?.[pr.type]?.color ?? randDarkColor(),
                                });
                            }
                        }
                        else {
                            if (vals.length > 0) {
                                // as all other types use the first logic item by default we need to retrieve the first item
                                out.push({
                                    isAction: true,
                                    isPrimitive: true,
                                    type: vals[0].type,
                                    key: vals[0].key,
                                    src: 'action-output',
                                    actTitle: tr('action-output-title-no', { args: [ vals[0].actionIndex ] }),
                                    title: `#${vals[0].actionIndex}`,
                                    color: di.color,
                                    returns: vals[0].type,
                                    returnColor: this.actionTypesDict?.[vals[0].type]?.color ?? randDarkColor(),
                                });
                            }
                        }
                    }
                }

                return out;
            }
            catch (err) {
                console.log('ERROR: ', err);
                return [];
            }
        },
        filteredList() {
            return this.prList;
            return this.prList.filter((i) => {
                true;
            });
        },
    },
    data() {
        return {
            isCollapsed: false,
            visible: false,
            search: '',
            typesDict: {
                'action-input': {
                    type: 'action-input',
                    title: tr('action-input'),
                    color: randDarkColor(),
                }, 
                state: {
                    type: 'state',
                    title: tr('state'),
                    color: randDarkColor(),
                }, 
                stash: {
                    type: 'stash',
                    title: tr('stash'),
                    color: randDarkColor(),
                }, 
                assignments: {
                    type: 'assignment',
                    title: tr('assignment'),
                    color: randDarkColor(),
                },
                output: {
                    type: 'output',
                    title: tr('output'),
                    color: randDarkColor(),
                }
            }
        };
    },
    methods: {
        visibleChange(state) {
            this.isCollapsed = state;
        },
        getPopupContainer(trigger) { return trigger.parentElement },
        itemClicked(item) {
            this.$emit('input', item.key);
        }
    }
}
</script>
