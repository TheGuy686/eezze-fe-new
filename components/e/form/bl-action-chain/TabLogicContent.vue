<style lang="less" scoped>
.inner-action-chain-root {
    .add-action {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 16px 8px;
        width: 100%;
        height: 56px;
        border: 1px solid #3F88C5;
        border-radius: 8px;
        flex: none;
        order: 0;
        flex-grow: 0;
        color: #3F88C5;
    }
}
</style>

<template>
<div>

    <div class="inner-action-chain-root">

        <button class="add-action text-xl text-center font-semibold inline-block" @click="addActionItem()">

            <GeneralIcon class="inline-block" :type="'add-blue'" />

            {{ tr('add-action') }}

        </button>

        <div>

            <TablePaginated
                :data="currentAction.actions"
                :columns="actionColumns"
                :showRowCheckboxs="false"
                :showSearch="false"
                @action-edit-clicked="editActionItem"
                @action-delete-confirmed="deleteLogicItem"
            />

        </div>

    </div>

    <EFormBlActionChainLogicModel
        ref="mdl-logic"
        :errors="errors"
        :errorsChanged="errorsChanged"
        :currentAction="currentAction"
        :currentLogicChain="currentLogicChainItem"
        :isEditing="newItem == null"
        :editingIndex="editingIndex"
        :hiddenSections="hiddenSections"
        @modal-closed="resetObjects()"
        @model-changed="$emit('model-changed', $event)"
    />

</div>
</template>

<script>
import ActionModel from '~/models/ActionModel';
import BlLogicChain from '~/models/BlLogicChain';

export default {
    props: {
        prop: {
            type: String,
            require: true,
        },
        type: {
            type: String,
            require: true,
        },
        currentAction: {
            type: Object,
            require: true,
        },
        errors: {
            type: Array,
            require: true,
        },
        errorsChanged: {
            type: Function,
            require: true,
        },
        hiddenSections: {
            type: Array,
            required: true,
        },
    },
    computed: {
        currentLogicChainItem() {
            if (this.newItem !== null) return this.newItem;
            if (this.editingIndex == -1) return {};
            return this.editingItem;
        },
        editingItem() {
            if (this.editingIndex == -1) return {};
            return this.currentAction.actions[this.editingIndex]
        },
    },
    data() {
        return {
            newItem: null,
            editingIndex: -1,
            actionColumns: [...ActionModel.getColumns(['description'])],
        }
    },
    methods: {
        addActionItem() {
            this.newItem = {
                id: BlLogicChain.getRandId(),
                filterId: BlLogicChain.getRandId(),
                property: this.prop,
                name: `Action ${this.currentAction.actions.length + 1}`,
                type: this.type,
                actions: [],
            };
            this.$refs['mdl-logic'].show();
        },
        editActionItem(item, index) {
            this.editingIndex = Number(index);
            this.$refs['mdl-logic'].show();
        },
        deleteLogicItem(args) {
            this.currentAction.actions.splice(args.index, 1);
            args.successCb();
        },
        resetObjects() {
            this.os(() => {
                this.newItem = null;
                this.editingIndex = -1;
            }, 400);
        }
    },
}
</script>
