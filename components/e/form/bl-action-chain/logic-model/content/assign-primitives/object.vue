<style lang="less" scoped>
.assign-object-root {
    position: relative;
    padding-top: 15px;

    .btns-section {
        .undo-btn {}

        .redo-btn {
            margin-left: 5px;
        }

        .preview-btn {
            margin-left: 10px;
        }
    }
}
</style>

<template>
<div class="assign-object-root">

    <div class="btns-section" row-r>

        <a-popover placement="rightTop">

            <a-button
                class="add-var-btn preview-btn"
                shape="circle"
                size="small"
                type="primary"
            >

                <GeneralIcon type="eye-white" />

            </a-button>

            <template #title>

                <h3>{{ tr('object-preview') }}</h3>

            </template>

            <template #content>

                <json-viewer
                    :expand-depth="10"
                    copyable
                    :value="jsObectOutput"
                />

            </template>

        </a-popover>

        <a-tooltip placement="top">
        
            <a-button 
                class="add-var-btn redo-btn"
                shape="circle"
                size="small"
                type="primary" 
                :disabled="!hasRedoHistory"
                @click="redo"
            >

                <GeneralIcon type="redo-white" />

            </a-button>

            <template #title>

                {{ tr('redo-previous-action') }}

            </template>

        </a-tooltip>

        <a-tooltip placement="top">
        
            <a-button
                class="add-var-btn undo-btn"
                shape="circle"
                size="small"
                type="danger" 
                :disabled="!hasUndoHistory"
                @click="undo"
            >

                <GeneralIcon type="undo-white" />

            </a-button>

            <template #title>

                {{ tr('undo-previous-action') }}

            </template>

        </a-tooltip>

    </div>

    <EDraggable
        ref="dl-obj"
        :data="data"
        :previousAssignmentsMenu="previousAssignmentsMenu"
        @list-history-change="listHistoryChange"
    />

</div>
</template>

<script>
import { getRandomInt } from '~/classes/globals';
import { generateRandomString } from '~/classes/libs/string';

export default {
    props: {
        item: {
            type: Object,
            require: true,
        },
        previousAssignmentsMenu: {
            type: Object,
            require: true,
        },
    },
    computed: {
        hasUndoHistory() { return this.undoHistory.length > 1 },
        hasRedoHistory() { return this.redoHistory.length > 0 },

        jsObectOutput() {
            return this.flattenObject();
        },
        data() {
            if (typeof this.item.logic != 'object') this.item.logic = {};
            if (!Array.isArray(this.item?.logic?.raw)) {
                this.item.logic.raw = [];
            }
            return this.item.logic.raw;
        }
    },
    data() {
        return {
            undoHistory: [],
            redoHistory: [],
            changeJustHappened: false,
        }
    },
    mounted() { 
        // this gets us the origional state to go back to
        this.undoHistory.push(JSON.parse(JSON.stringify(this.item?.logic?.raw ?? [])));
    },
    methods: {
        addItem() {
            this.$refs['dl-obj'].addItem();
        },
        listHistoryChange() {
            this.undoHistory.push(JSON.parse(JSON.stringify(this.item?.logic?.raw ?? [])));
            this.changeJustHappened = true;

            if (this.redoHistory.length > 0) this.redoHistory = [];
        },
        undo() {
            if (this.changeJustHappened) {
                this.undoHistory.pop();
                this.changeJustHappened = false;
            }

            this.redoHistory.push(JSON.parse(JSON.stringify(this.item?.logic?.raw ?? [])));

            const lst = this.undoHistory.pop();

            if (lst != undefined) this.item.logic.raw = lst;
        },
        redo() {
            this.undoHistory.push(JSON.parse(JSON.stringify(this.item?.logic?.raw ?? [])));

            const lst = this.redoHistory.pop();

            if (lst != undefined) this.item.logic.raw = lst;
        },
        getRandomValueForType(type) {
            switch (type) {
                case 'number': return getRandomInt(10);
                case 'boolean': return false;
                case 'object': return {message: this.tr('en-example')};
                case 'list': return [ {message: this.tr('en-example')} ];
                default: return generateRandomString(5);
            }
        },
        flattenObject(list) {
            const out = {};

            for (let el of (list ?? this.item?.logic?.raw ?? [])) {
                if (el.returns == 'object') {
                    out[el.key] = this.flattenObject(el.data);
                }
                else if (el.returns == 'list') {

                }
                else {
                    out[el.key] = this.getRandomValueForType(el.returns);
                }
            }

            return out;
        }
    }
}
</script>
