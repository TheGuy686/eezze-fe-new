<style lang="less" scoped>
.assign-values-root {
    .main-cont {
        display: flex;
        flex-direction: row;

        .left {
            width: 58%;
            display: flex;

            .list {
                width: 100%;

                .list-header {
                    display: flex;

                    .left {
                        width: 33.33%;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }

                    .middle {
                        width: 33.33%;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }

                    .right {
                        width: 33.33%;
                        display: flex;
                        flex-direction: row-reverse;

                        .add-var-btn { margin-left: 5px; }

                        .clear-mdl-btn { margin-right: 5px; }
                    }
                }

                .list-content{
                    width: 100%;

                    .list-item {
                        width: 100%;
                        display: flex !important;

                        .left {
                            width: 33.33%;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            padding-right: 5px;
                        }

                        .middle {
                            width: 33.33%;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                        }

                        .right {
                            width: 33.33%;
                            display: flex;
                            flex-direction: row-reverse;

                            .next-icon-btn {
                                margin-left: 5px;
                                margin-right: -10px;
                                margin-top: 7px;
                                height: 7px;

                                &:hover {
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            }
        }

        .right {
            width: 42%;
            display: flex;
            margin-left: 5px;
            padding-right: 0px;
            position: relative;

            .header {
                width: 100%;
                padding-top: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e8e8e8;

                .prop-title { margin-left: 10px; }

                .right {
                    width: 50% !important;
                    display: flex;
                    flex-direction: row-reverse;
                    padding-right: 15px;
                    align-items: center;
                }
            }

            .cont {
                padding-right: 15px;
                height: 51vh;
                width: 100%;
            }
        }
    }
}
</style>

<template>
<div class="assign-values-root">

    <div class="main-cont">

        <div class="left" bev-cont>

            <a-list class="list" :data-source="this.item?.actions ?? []">

                <template #header>

                    <div class="list-header">

                        <div class="left" non-sel>

                            {{ tr('prop-name') }}

                        </div>

                        <div class="middle" non-sel>

                            {{ tr('type') }}

                        </div>

                        <div class="right" non-sel>

                            <a-button class="add-var-btn" type="primary" shape="circle" size="small" @click="addVal">

                                <GeneralIcon type="plus-white" />

                            </a-button>

                            {{ tr('value') }}

                        </div>

                    </div>

                </template>

                <template #renderItem="item">

                    <a-list-item class="list-content">

                        <div class="list-item">

                            <div class="left">

                                <EFormInput 
                                    :name="tr('prop')"
                                    :message="tr('please-input-a-name')"
                                    inputCase="camelCase"
                                    :inlineOver="true"
                                    :hasError="propKeyDups.includes(item.logic.prop)"
                                    :errorMessage="propKeyDups.includes(item.logic.prop) ? tr('name-already-taken') : ''"
                                    v-model="item.logic.prop"
                                />

                            </div>

                            <div class="middle">

                                <e-tag-drop-down
                                    stle="margin-left: 8px;"
                                    colorCol="color"
                                    keyCol="key"
                                    valueCol="label"
                                    :locked="shouldFixType(itemTypeKey(item), item.type)"
                                    :options="logicReturnTypes"
                                    v-model="item.returns"
                                />

                            </div>

                            <div class="right">

                                <GeneralIcon 
                                    class="next-icon-btn" 
                                    :type="filterLogicItemId == item.id ? 'minus-black' : 'right-arrow-sm'"
                                    @click="filterLogicItemId = item.id"
                                    v-if="!shouldShowToggleVisibleItemContent(item.type)"
                                />

                                <EFormBlActionChainLogicModelContentCPropLogicMenu
                                    :previousAssignmentsMenu="previousAssignmentsMenu"
                                    :value="item"
                                    @mdl-changed="filterLogicItemId = item.id"
                                />

                            </div>

                        </div>

                    </a-list-item>

                </template>

            </a-list>

        </div>

        <div bev-cont class="right">

            <div class="header" non-sel>

                <a-row>

                    <a-row w-50>

                        <a-button 
                            :type="$refs['var-mappings-menu']?.visible ? 'default' : 'primary'" 
                            size="small"
                            shape="circle" 
                            :disabled="!hasVariablesMenu" 
                            @click="$refs['var-mappings-menu'].toggle()"
                        >

                            <GeneralIcon :type="$refs['var-mappings-menu']?.visible ? 'close-sm' : 'spot-list-menu-white'" size="small" />

                        </a-button>


                        <h2 class="prop-title">{{ tr('prop-logic') }}</h2>

                    </a-row>

                    <div class="right">

                        <a-button 
                            class="add-var-btn" 
                            type="primary" 
                            shape="circle" 
                            size="small" 
                            @click="$refs[currentLogicItemTypeKey == 'custom' ? 'custom' : 'assign-prim-item'].addClicked()"
                            v-if="shouldShowRightAddBtn"
                        >

                            <GeneralIcon type="plus-white" />

                        </a-button>

                        <a-button 
                            class="clear-mdl-btn" 
                            style="margin-right: 5px;"
                            size="small" 
                            @click="$refs['custom'].clearCode()"
                            v-if="shouldShowClearMdl"
                        >

                            {{ tr('clear-code') }}

                        </a-button>

                    </div>

                </a-row>

            </div>

            <div class="cont" :e-scroll="filterLogicItemId != ''">

                <template v-if="filterLogicItemId != ''">

                    <EFormBlActionChainLogicModelContentNumberCalculation
                        :item="filteredLogicItem"
                        :isHorizontalLayout="true"
                        :logicTypes="logicTypes"
                        :filterId="filterLogicItemId"
                        :previousAssignmentsMenu="previousAssignmentsMenu"
                        :hoveringItem="hoveringCalcItem"
                        @hovering-item-changed="itemHovered($event)"
                        @about-to-add-var="$refs['var-mappings-menu'].show()"
                        v-if="`${filteredLogicItem?.type}-${filteredLogicItem?.logic?.subtype}` == 'number-operation-calculation'"
                    />

                    <EFormBlActionChainLogicModelContentCNumberOperation
                        ref="number-operation"
                        :item="filteredLogicItem"
                        :previousAssignmentsMenu="previousAssignmentsMenu"
                        @example-result-changed="exampleResultOverride = $event"
                        v-else-if="filteredLogicItem?.type == 'number-operation'"
                    />

                    <EFormBlActionChainLogicModelContentCStringInterperlate
                        :item="filteredLogicItem"
                        :previousAssignmentsMenu="previousAssignmentsMenu"
                        :hideSampleOutput="true"
                        @about-to-add-var="$refs['var-mappings-menu'].show()"
                        v-else-if="`${filteredLogicItem?.type}-${filteredLogicItem?.logic?.subtype}` == 'formatter-string-interpolate'"
                    />

                    <EFormBlActionChainLogicModelContentCDateFormatter
                        :item="filteredLogicItem"
                        :previousAssignmentsMenu="previousAssignmentsMenu"
                        :hoveringItem="hoveringCalcItem"
                        @about-to-add-var="$refs['var-mappings-menu'].show()"
                        v-else-if="`${filteredLogicItem?.type}-${filteredLogicItem?.logic?.subtype}` == 'formatter-date-interpolate'"
                    />

                    <EFormBlActionChainLogicModelContentAssignPrimitives
                        ref="assign-prim-item"
                        :hoveringItem="hoveringCalcItem"
                        :previousAssignmentsMenu="previousAssignmentsMenu"
                        :item="filteredLogicItem"
                        @example-result-changed="exampleResultOverride = $event"
                        @about-to-add-var="$refs['var-mappings-menu'].show()"
                        v-else-if="`${filteredLogicItem?.type}` == 'assign-primitive'"
                    />

                    <EFormBlActionChainLogicModelContentCCustomCode
                        ref="custom"
                        :condense="true"
                        :item="filteredLogicItem"
                        :showNewBtn="false"
                        @about-to-add-var="$refs['var-mappings-menu'].show()"
                        v-else-if="`${filteredLogicItem?.type}` == 'custom'"
                    />

                    <EFormBlActionChainLogicModelContentCSampleResult
                        :title="sampleOutputTitle"
                        :hoveringItem="hoveringCalcItem"
                        :value="filteredLogicItem"
                        :overrideOnEmpty="hasOverrideOnEmpty"
                        :previewOverride="sampleOverrideMdl"
                        v-if="shouldShowSampleResult"
                    />

                </template>

                <a-col style="height: 200px;" a-center d-flex v-else>

                    {{ tr('select-logic-item-to-edit') }}

                </a-col>
                
                <!-- <ESpace :size="200" /> -->

            </div>

            <EFormBlActionChainLogicModelContentCVariablesMappingMenu
                ref="var-mappings-menu"
                :title="tr('variable-mappings')"
                :isHorizontalLayout="true"
                :item="filteredLogicItem"
                :showDateFormatterMenu="showDateFormatterMenu"
                :previousAssignmentsMenu="previousAssignmentsMenu"
                @hovering-item-changed="hoveringCalcItem = $event"
            />

        </div>

    </div>

</div>
</template>

<script>
import BlLogicChain from '~/models/BlLogicChain';
import { mapState, mapGetters } from 'vuex';

export default {
    props: {
        filterId: {
            type: String,
            require: true,
        },
        logicTypes: {
            type: Array,
            require: true,
        },
        item: {
            type: Object,
            require: true,
        }
    },
    computed: {
        ...mapState('project/entity-presets', [ 'keyTypes' ]),
        ...mapGetters({
            logicReturnTypes: 'project/entity-presets/logicReturnTypes',
        }),
        actions() {
            return this.item?.actions ?? [];
        },
        filteredLogicItem() {
            try {
                return this.actions.filter((i) => i.id == this.filterLogicItemId)[0];
            }
            catch (err) { return {} }
        },
        currentLogicItemTypeKey() {
            const item = this.filteredLogicItem;

            if (typeof item == 'undefined') return '';

            if (item.type == 'number-operation') {
                return `${item?.type}-${item?.logic?.subtype}`;
            }

            if (typeof item?.logic?.subtype != 'undefined') {
                return `${item?.type}${item?.logic?.subtype ? `-${item?.logic?.subtype}` : ''}`;
            }

            return item?.type;
        },
        shouldShowSampleResult() {
            const key = this.currentLogicItemTypeKey;

            const notAllowed = [
                'formatter-date-interpolate',
                'assign-primitive-number',
                'custom',
            ];

            if (notAllowed.includes(key)) return false;

            const assignPrimsExceptions = [
                'assign-primitive-number',
                'assign-primitive-list',
                'assign-primitive-date',
            ];

            if (assignPrimsExceptions.includes(key)) return true;

            return !/^assign-primitive/.test(key);
        },
        hasOverrideOnEmpty() {
            const key = this.currentLogicItemTypeKey;
            const keys = [ 'assign-primitive-boolean' ];

            return keys.includes(key);
        },
        hasVariablesMenu() {
            const key = this.currentLogicItemTypeKey;

            const validTypes = [
                'number-operation-calculation',
                'formatter-string-interpolate',
                'formatter-date-interpolate',
                'custom'
            ];

            const ignoreExceptions = [
                'assign-primitive-object',
                'assign-primitive-boolean',
                'assign-primitive-text'
            ];

            return (validTypes.includes(key) || /^assign-primitive/.test(key)) &&
                    !ignoreExceptions.includes(key);
        },
        showDateFormatterMenu()  {
            const validTypes = [
                'formatter-date-interpolate',
                'assign-primitive-date',
            ];

            return validTypes.includes(this.currentLogicItemTypeKey);
        },
        isVisible() {
            return this.item.id == this.filterId && this.item.type == 'assign-values';
        },
        previousAssignments() {
            try {
                if (!this.loaded) return [];

                const out = [], actions = this.item?.actions ?? [];

                for (let act of actions) {
                    if (act.id == this.filterLogicItemId) return out;

                    out.push(act);
                }

                return [];
            }
            catch (err) { return [] }
        },
        previousAssignmentsMenu() {
            const out = {};

            if (typeof this.previousAssignments == 'undefined' || this.previousAssignments.length == 0) return out;
            
            return this.getMenuChildren(this.previousAssignments, 'var-assignments');
        },
        allCurrentTakenPropNames() {
            const out = [];

            for (let ast of this.previousAssignments) {
                const prop = ast?.logic?.prop;

                if (typeof prop == 'undefined') {
                    console.log(`There was an error getting key name for: `, ast);
                    continue;
                }

                out.push(prop);
            }

            return out;
        },
        propKeyDups() {
            return this.findDuplicates(this.allCurrentTakenPropNames);
        },
        itemTypeKey() {
            return function (item) {
                if (typeof item == 'undefined') return '';

                let key = '';

                if (item.type == 'number-operation') {
                    key = `${item?.type}-${item?.logic?.subtype}`;
                }

                key = `${item?.type}-${item?.logic?.subtype}`;

                return key;
            }
        },
        shouldShowToggleVisibleItemContent() {
            return function (type) {
                const hideTypes = [ 'action-context' ];

                return hideTypes.includes(type);
            }
        },
        shouldShowClearMdl() {
            const key = this.currentLogicItemTypeKey;

            const showTypes = [
                'custom'
            ];

            return showTypes.includes(key);
        },
        shouldShowRightAddBtn() {
            const key = this.currentLogicItemTypeKey;

            const showTypes = [ 
                'assign-primitive-object',
                'custom'
            ];

            return showTypes.includes(key);
        },
        shouldFixType() {
            const fixedTypes = [
                'formatter-string-interpolate',
                'formatter-date-interpolate',
            ];

            const fixedMainTypes = [ 'assign-primitive' ];

            return function (key, type) {
                if (type == 'number-operation') return true;

                return fixedTypes.includes(key) || fixedMainTypes.includes(type);
            }
        },
        sampleOutputTitle() {
            const to = this.filteredLogicItem,
                  key = `${to?.type}-${to?.logic?.subtype}`;

            const dataTypes = [
                'assign-primitive-date'
            ];

            if (dataTypes.includes(key)) {
                return this.tr('sample-date');
            }

            return this.tr('sample-formula');
        },
        sampleOverrideMdl() {
            const to = this.filteredLogicItem,
                  key = `${to?.type}-${to?.logic?.subtype}`; 

            const fullTypes = [
                'assign-primitive-number',
                'assign-primitive-date',
                'formatter-string-interpolate',
                'number-operation-calculation',
            ];

            if (fullTypes.includes(key)) return;

            return this.exampleResultOverride;
        },
    },
    watch: {
        filteredLogicItem() {
            this.exampleResultOverride = '';
        },
        hasVariablesMenu(to) {
            if (to) {
                //this.$refs['var-mappings-menu'].show();
            }
            else {
                //this.$refs['var-mappings-menu'].hide();
            }
        },
    },
    data() {
        return {
            type: 'number',
            logicMenuTypeVisible: false,
            selectedKeys: [],
            // @Ryan
            filterLogicItemId: '2-2-5',
            hoveringCalcItem: '',
            loaded: false,
            exampleResultOverride: '',
        }
    },
    mounted() {
        setTimeout(() => this.loaded = true, 400);
    },
    methods: {
        setDefaultLogicItem() {
            try {
                if (typeof this.actions.length == 0) return;
                this.filterLogicItemId = this.actions[0].id;
            }
            catch (err) {}
        },
        getObjectMenu(elM, rootGroupId) {
            try {
                let id, prop;

                if (typeof elM['key'] != 'undefined') {
                    id = elM['key'];
                    prop = elM['key'];
                }
                else {
                    id = elM['id'];
                    prop = elM?.logic?.prop;
                }

                const out = {
                    groupId: rootGroupId,
                    id: id,
                    title: prop,
                    children: {},
                };

                let data;

                if (typeof elM?.logic?.raw == 'object') {
                    data = elM?.logic?.raw;
                }
                else if (typeof elM?.data == 'object') {
                    data = elM?.data;
                }
                else {
                    console.warn(`getObjectMenu.Error: "elM?.logic?.raw" was not an array or an object`);
                    console.log('GOT: ', typeof elM?.logic?.raw, ' : ', elM);
                    return;
                }

                for (let el of data) {
                    const type = el?.returns;

                    if (typeof type === 'undefined') {
                        console.warn(`Key "${k}" didn't contain a type`);
                        console.warn('Got: ', el);
                        continue;
                    }

                    if (type == 'object') {
                        out['children'][el.key] = this.getObjectMenu(el, rootGroupId);
                    }
                    else if (type == 'list') {

                    }
                    else {
                        out['children'][el.key] = {
                            groupId: rootGroupId,
                            id: el.key,
                            title: tr(el.key),
                        }
                    }
                }

                return out;
            }
            catch (err) {
                console.log('getObjectMenu,Error: ', err, elM);
                return {};
            }
        },
        getMenuChildren(root, rootGroupId) {
            const out = {
                groupId: rootGroupId,
                id: rootGroupId,
                title: rootGroupId,
                helpText: `${rootGroupId}-help`,
                children: {},
            };       

            for (let k in root) {
                const el = root[k];
                const type = el?.returns;

                if (typeof type === 'undefined') {
                    console.warn(`Key "${k}" didn't contain a type`);
                    console.warn('Got: ', el);
                    continue;
                }

                if (type == 'object') {
                    out['children'][el.id] = this.getObjectMenu(el, rootGroupId);
                }
                else if (type == 'list') {

                }
                else {
                    out['children'][el.id] = {
                        groupId: rootGroupId,
                        id: el.id,
                        title: el.logic?.prop,
                    }
                }
            }

            return { [rootGroupId]: out };
        },
        addVal() {
            this.item.actions.push({
                id: BlLogicChain.getRandId(),
                filterId: BlLogicChain.getRandId(),
                type: '',
                logic: {
                    prop: '',
                    raw: '',
                    variables: [],
                },
                returns:  'text',
                actions: [],
            });
        },
        l(refs) {
            console.log('REFS: ', refs, ' : ', this.$refs);
        }
    }
}
</script>