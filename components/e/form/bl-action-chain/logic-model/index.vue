<style lang="less" scoped>
.root {
    position: relative;
    overflow: hidden !important;
    min-height: 500px;

    .error-cont {
        padding-left: 5px;
        margin-bottom: 5px;

        .ant-alert {
            margin-bottom: 5px;
        }
    }

    .grid-cont-main {
        padding-left: 200px;
        height: 60vh;
        max-height: 70%;

        .title {
            padding-bottom: 20px;
            padding-left: 20px;
            font-weight: 800;
        }
    }
}
</style>

<template>
<EModal
    ref="mdl"
    :width="1050"
    :title="tr((isEditing ? 'edit' : 'add') + '-logic-action')"
    :shouldDisableRightBtn="filteredItemIsNew || shouldDisableDeleteBtn"
    :rightBtnText="tr(isEditing ? 'save' : 'add')"
    @modal-closed="$emit('modal-closed')"
    @right-btn-clicked="addUpdateNewLogicChain()"
>
<div class="root">

    <a-col class="grid-cont-main">

        <a-row>

            <a-col :flex="2">

                <p class="inline pl-5 font-semibold text-xl text-black-1">

                    {{ tr((filteredUiActionsMdl?.type ?? '')) }} #{{ filteredUiActionsMdl.id }}

                </p>

            </a-col>

            <a-row :flex="2" justify="end">

                <a-button class="primary-border primary-text" :disabled="shouldDisableNextBtn" @click="newItemNext">

                    {{ tr('next') }}

                </a-button>

            </a-row>

        </a-row>

        <!-- <a-col class="error-cont">

            <a-alert type="error" :message="err" :key="index" v-for="(err, index) in errors" />

        </a-col> -->

        <template v-if="hasFilteredAction">

            <EFormBlActionChainLogicModelContentNewItem
                ref="current-selection"
                :item="{}"
                :logicTypes="logicTypes"
                :filterId="currentFilteredAction"
                :hiddenSections="hiddenSections"
                v-if="filteredItemIsNew"
                @logic-type-selected="logicTypeSelected"
            />

            <EFormBlActionChainLogicModelContentNumberOperationItem
                ref="current-selection"
                :item="filteredUiActionsMdl"
                :logicTypes="logicTypes"
                :filterId="currentFilteredAction"
                v-else-if="filteredUiActionsMdl.type == 'number-operation'"
            />

            <EFormBlActionChainLogicModelContentAssignValuesItem
                ref="current-selection"
                :item="filteredUiActionsMdl"
                :logicTypes="logicTypes"
                :filterId="currentFilteredAction"
                v-else-if="filteredUiActionsMdl.type == 'assign-values'"
            />

            <EFormBlActionChainLogicModelContentFormatItem
                ref="current-selection"
                :item="filteredUiActionsMdl"
                :logicTypes="logicTypes"
                :filterId="currentFilteredAction"
                v-else-if="filteredUiActionsMdl.type == 'formatter'"
            />

            <EFormBlActionChainLogicModelContentListItem
                ref="current-selection"
                :item="filteredUiActionsMdl"
                :logicTypes="logicTypes"
                :filterId="currentFilteredAction"
                @item-selected="showListLogicItem"
                v-else-if="filteredUiActionsMdl.type == 'list-process'"
            />

            <EFormBlActionChainLogicModelContentAssignValuesItem
                ref="current-selection"
                :item="filteredUiActionsMdl"
                :logicTypes="logicTypes"
                :filterId="currentFilteredAction"
                v-else-if="filteredUiActionsMdl.type == 'set-state-values'"
            />

            <EFormBlActionChainLogicModelContentAssignValuesItem
                ref="current-selection"
                :item="filteredUiActionsMdl"
                :logicTypes="logicTypes"
                :filterId="currentFilteredAction"
                v-else-if="filteredUiActionsMdl.type == 'set-stash-values'"
            />

            <EFormBlActionChainLogicModelContentCustomItem
                ref="current-selection"
                :item="filteredUiActionsMdl"
                :logicTypes="logicTypes"
                :filterId="currentFilteredAction"
                v-else-if="filteredUiActionsMdl.type == 'custom'"
            />

        </template>

        <a-col style="padding-top: 100px;" a-center v-else>

            {{ tr('please-select-a-logic-action-item-to-proceed') }}

        </a-col>

    </a-col>

    <template>

        <div :key="id" v-for="(id, index) in chainStackIds">

            <ChainMenu
                :logicTypes="logicTypesDict"
                :filteredUiActionsMdl="filteredUiActionsMdl"
                :value="menuIndexMdl(index)"
                :index="index"
                :mainActionId="menuIndexMdl(index).id"
                :errorsChanged="errorsChanged"
                @logic-chain-opened="loginChainItemSelected($event, index, 'logic-chain-opened')"
                @item-selected="itemSelected($event)"
                @back="back(index)"
            />

        </div>

    </template>

</div>

</EModal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import BlLogicChain from '~/models/BlLogicChain';
import ChainMenu from './ChainMenu';

export default {
    components: { ChainMenu },

    props: {
        errors: {
            type: Array,
            require: true,
        },
        errorsChanged: {
            type: Function,
            require: true,
        },
        isEditing: {
            type: Boolean,
            require: true,
        },
        editingIndex: {
            type: Number,
        },
        currentAction: {
            type: Object,
            require: true,
        },
        currentLogicChain: {
            type: Object,
            require: true,
        },
        hiddenSections: {
            type: Array,
            required: true,
        },
    },

    beforeUnmount() {
        if (this.tmrCounter) clearInterval(this.tmrCounter);
    },

    computed: {
        refValue() {
            return {counter: this.counter, src: this.currentAction}
        },

        ...mapState('cms/actions/bs-logic', {
            logicTypes: (state) => state?.entities ?? [],
        }),
        ...mapGetters({
            logicTypesDict: 'cms/actions/bs-logic/logicTypesDict',
        }),
        actions() {return this?.currentLogicChain?.actions ?? []},
        filteredLogicItem() {
            return this.actions.filter((item) => item.id === this.currentFilteredAction)[0] ?? {};
        },
        displayLogicItem() {
            if (Object.keys(this.filteredLogicItem).length == 0) return this.defLogicItem;

            return this.filteredLogicItem;
        },
        filteredUiActionsMdl() {
            const actions = this?.currentUiContentMdl?.actions ?? [];

            return actions.filter((item, index) => {
                if (item.id === this.currentFilteredAction) {
                    this.currentLogicItemIndex = index;
                    return true;
                }

                return false;
            })[0] ?? {}
        },
        filteredTreeMdls() {
            try {
                const out = [];

                let mdl = this.currentLogicChain, counter = 0;

                for (let id of this.chainStackIds) {
                    // this is because there is no need to filter on the first id as this should always
                    // be the currently selected logic chain for the current "displayLogicItem" id.
                    // and only after this do we need to drill futher down into the actions logic tree
                    if (counter == 0) {
                        counter++;
                        out.push(this.currentLogicChain);
                        continue;
                    }

                    const actionItem = mdl.actions.filter((item) => item.id == id)[0];

                    out.push(actionItem);

                    mdl = actionItem;
                }

                return out;
            }
            catch (err) {
                console.log(`filteredTreeMdls.error: ${err.message}`);
                return [];
            }
        },
        menuIndexMdl () {
            return function(index) {
                const mdl = this.filteredTreeMdls[index];

                return {
                    ...mdl,
                    defaultLogicItem: this.displayLogicItem,
                };
            };
        },
        hasFilteredAction() {
            return this.currentLogicChain && Object.keys(this.currentLogicChain).length > 0;
        },
        defLogicItem() {
            if (this.actions.length == 0) return {};

            return this.actions[0];
        },
        filteredItemIsNew() {return this.filteredUiActionsMdl.type == 'new'},
        currentUiContentMdl() {return this.menuIndexMdl(this.selectedMdlIndex)},
        currentLogicActionIsNew() {
            return this?.filteredUiActionsMdl?.type == 'new';
        },
        currentLogicActionCanBeDeleted() {
            return this?.filteredUiActionsMdl?.type != 'new';
        },
        shouldDisableNextBtn() {
            if (!this.currentLogicActionIsNew) return true;
            if (this.currentLogicActionIsNew && this.selectedType == '') return true;

            return false;
        },
        shouldDisableDeleteBtn() {
            if (this.currentLogicActionIsNew) return true;
            if (!this.currentLogicActionCanBeDeleted) return true;

            return false;
        },
        changeDetector() {
            return JSON.stringify(this.currentAction);
        }
    },

    watch: {
        displayLogicItem(to) {
            // this will only allow us to set the "chainStackIds" array on the initial load
            if (this.chainStackIds.length > 0) return;
            this.chainStackIds = [ to.id ];
        },
        changeDetector(to) {
            this.$emit('model-changed', JSON.parse(to));
        }
    },

    data() {
        return {
            counter: 0,
            tmrCounter: null,

            currentFilteredAction: null,
            filteredActionChain: '',
            filteredLogicActionId: '',
            chainStackIds: [],
            breadcrumbs: [],
            selectedType: '',
            selectedMdlIndex: 0,
            currentLogicItemIndex: -1,
        }
    },

    mounted() {
        // @Ryan - Select default main item
        //setTimeout(() => this.itemSelected({ id: '2-2-4' }), 500);

        this.tmrCounter = setInterval(() => this.counter++, 2000);
    },

    methods: {
        show() {this.$refs['mdl'].show()},
        hide() {this.$refs['mdl'].hide()},
        itemSelected(item) {
            this.currentFilteredAction = item.id;
            this.breadcrumbs[this.selectedMdlIndex] = item.id;

            try {
                setTimeout(() => {
                    const uiItem = this.$refs['current-selection'];

                    if (typeof uiItem?.setDefaultLogicItem == 'function') {
                        uiItem?.setDefaultLogicItem();
                    }
                }, 5);
            }
            catch (err) {}
        },
        showListLogicItem() {
            this.loginChainItemSelected(
                this.filteredUiActionsMdl.id,
                this.selectedMdlIndex,
                'showListLogicItem'
            );
        },
        loginChainItemSelected(id, index, src = '') {
            this.currentFilteredAction = id;
            this.breadcrumbs[this.selectedMdlIndex] = id;

            if (!this.chainStackIds.includes(id)) {
                this.chainStackIds.push(id);
            }

            this.selectedMdlIndex = index + 1;

            this.filteredLogicActionId = id;
        },
        back(index) {
            this.selectedMdlIndex = index - 1;
            this.currentFilteredAction = this.breadcrumbs[this.selectedMdlIndex];
            this.chainStackIds.pop();
        },
        logicTypeSelected(type) { this.selectedType = type },
        newItemNext() {
            // here we just set the type of the latest new item to the given type
            try {
                this.filteredUiActionsMdl.type = this.selectedType;
            }
            catch (err) {console.log('newItemNext.error: ', err)}
        },
        addUpdateNewLogicChain() {
            //const newI = BlLogicChain.create(this.currentAction);

            const iin = {
                ...JSON.parse(JSON.stringify(this.currentLogicChain))
            };

            if (typeof iin['filterId'] != 'string') {
                console.log('There is a potential problem here. There was no filter id found in this item: ', iin);
            }

            if (!this.isEditing) {
                this.currentAction.actions.push(iin);
            }

            this.$refs['mdl'].hide();
        }
    },
}
</script>