<style lang="less">
.divider {
    width: 100%;
    height: 1px;
    margin-bottom: 10px;
}
</style>

<template>
<div>

    <ActionLogicMdlInput
        clss="pl-2.5"
        :label="tr('condition-qu')"
        mdlKey="condition"
        src="ActionsContent"
        :hideInput="true"
        :emitChanges="true"
        v-model="entity.definition"
        @item-deleted="$emit('save-entity-changes', entity)"
        @show-bl-mdl="$refs['action-chain'].show()"
    />

    <div class="divider" />

    <button
        class="add-action text-xl text-center font-semibold inline-block"
        @click="addAction"
    >
        <GeneralIcon class="inline-block" :type="'add-blue'" />

        {{ tr('add-action') }}

    </button>

    <TablePaginated
        :data="actionChain"
        :columns="actionColumns"
        :showRowCheckboxs="false"
        :showSearch="false"
        :showActions="true"
        @action-edit-clicked="editLogicChain"
        @action-delete-confirmed="deleteItem"
    />

    <ActionCreateEditAction
        ref="mdl"
        :actionStep="currentActionStep"
        @modal-closed="
            editingLogicItemIndex = -1;
            currentActionStep = {};
        "
        @save-action-clicked="saveConfirmed()"
    />

    <EFormBlActionChain
        ref="action-chain"
        prop="condition"
        type="string"
        :filteredItem="editingLogicChain"
        @save-clicked="finishedEditingCb(editingLogicChain)"
    />

</div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import ActionModel from '~/models/ActionModel'

const flatted = require('flatted');

export default {
    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
    watch: {
        editingBlChainItem(to) {
            this.editingLogicChain = {...JSON.parse(JSON.stringify(to))};
        },
    },
    computed: {
        ...mapState('project/services', {
            editingService: (state) => state?.entity,
        }),
        ...mapState('app', [
            'editingBlChainItem',
            'finishedEditingCb',
        ]),

        actionChain() {
            try {
                return this?.editingService?.logic ?? [];
            }
            catch (err) {
                console.log('Logic Chain Error: ', err);
            }
        },
    },
    data() {
        return {
            actionColumns: [...ActionModel.getColumns(['key'])],
            editingLogicItemIndex: -1,
            currentActionStep: {},
            editingLogicChain: {},
            condTmr: null,
        }
    },
    beforeUnmount() {
        if (this.condTmr) clearInterval(this.condTmr);
    },
    mounted() {
        if (this.condTmr) clearInterval(this.condTmr);

        this.condTmr = setInterval(() => {
            if (typeof this.entity.definition.increment != 'number') {
                // @Ryan - Timer causing issues
                //this.$emit('save-entity-changes', this.entity);
            }
        }, 1500);
    },
    methods: {
        addAction() {
            this.editingLogicItemIndex = -1

            let clc = this?.entity?.logic ?? []

            this.currentActionStep = ActionModel.create({
                name: `${this.tr('action')} #${clc.length + 1}`,
                description: `${this.tr('action')} #${clc.length + 1} Description`,
                isNew: true,
            })

            this.$refs['mdl'].show()
        },
        editLogicChain(logicChain, index) {
            this.editingLogicItemIndex = index;

            this.currentActionStep = ActionModel.create({
                ...logicChain,
                isNew: false,
            });

            this.$refs['mdl'].show();
        },
        deleteItem(args) {
            if (Array.isArray(this.entity.logic)) {
                this.entity.logic.splice(args.index, 1);
                args.successCb();
            }
        },
        saveConfirmed() {
            if (this.editingLogicItemIndex == -1) {
                if (typeof this.entity.logic != 'object' && !Array.isArray(this.entity.logic)) {
                    Vue.set(this.entity, 'logic', []);
                }

                this.entity.logic.push(this.currentActionStep);
            }
            else {
                this.entity.logic[this.editingLogicItemIndex] = this.currentActionStep;
            }

            this.$emit('save-entity-changes', this.entity);
            setTimeout(() => this.$refs['mdl'].hide(), 200);
        },
    },
}
</script>
