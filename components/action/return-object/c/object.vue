<style lang="less">
.return-obect-c-object-root {
    .item-cont { padding-right: 10px; }
}
</style>

<template>
<e-col clss="return-obect-c-object-root">

    <div class="p-5 p10">

        <EDraggableRo
            ref="dl-obj"
            src="returnObject"
            :data="data"
            :nonStoreMdl="false"
            :useInnerModal="false"
            @list-history-change="listHistoryChange"
            @show-bl-mdl="openBlPopup($event)"
            @changed="changed($event)"
        />

    </div>

</e-col>
</template>

<script>
import Vue from 'vue';

export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        }
    },
    watch: {
        data() {
            console.log('Your data changed to ');
            this.$emit('changed');
        }
    },
    computed: {
        data() {
            if (typeof this.actionStep.output != 'object') this.actionStep.output = [];

            return this.actionStep.output;
        },
        jsObectOutput() {
            const jo = this.flattenObject();

            return jo;
        },
        hasUndoHistory() { return this.undoHistory.length > 1 },
        hasRedoHistory() { return this.redoHistory.length > 0 },
    },
    data() {
        return {
            undoHistory: [],
            redoHistory: [],
            changeJustHappened: false,
            blMdl: {},
            blSaveCb: undefined,
        }
    },
    mounted() {
        this.undoHistory.push(JSON.parse(JSON.stringify(this.actionStep.output ?? [])));
    },
    methods: {
        getObjectOutput() {return this.jsObectOutput},
        addItem() {
            this.$refs['dl-obj'].addItem();
        },
        openBlPopup(payload) {
            this.blMdl = payload?.logicChainItem;
            this.blSaveCb = payload?.finishedCb;
            this.$refs['action-chain'].show();
        },
        listHistoryChange() {
            this.undoHistory.push(JSON.parse(JSON.stringify(this.actionStep.output ?? [])));
            this.changeJustHappened = true;

            if (this.redoHistory.length > 0) this.redoHistory = [];
        },
        undo() {
            if (this.changeJustHappened) {
                this.undoHistory.pop();
                this.changeJustHappened = false;
            }

            this.redoHistory.push(JSON.parse(JSON.stringify(this.actionStep.output ?? [])));

            const lst = this.undoHistory.pop();

            if (lst != undefined) this.actionStep.output = lst;
        },
        redo() {
            this.undoHistory.push(JSON.parse(JSON.stringify(this.actionStep.output ?? [])));

            const lst = this.redoHistory.pop();

            if (lst != undefined) this.actionStep.output = lst;
        },
        getRandomValueForType(type, el) {
            if (el.baseType == 'primitive') {
                if (el.raw && el.raw != '') return el.raw;

                if (typeof el?.example != 'undefined' && el?.example != '') return el?.example;
            }

            switch (type) {
                case 'number': {
                    return getRandomInt(10);
                }
                case 'boolean': {
                    return false;
                }
                case 'object': {
                    return {message: this.tr('en-example')};
                }
                case 'list': {
                    return [ {message: this.tr('en-example')} ];
                }
                default: {
                    return generateRandomString(5);
                }
            }
        },
        flattenObject(list) {
            const out = {};

            for (let el of (list ?? this.data?? [])) {


                if (el.type == 'object') {
                    out[el.property] = this.flattenObject(el.actions);
                }
                else if (el.type == 'list') {

                }
                else {
                    out[el.property] = this.getRandomValueForType(el.type, el);
                }
            }

            return out;
        },
        changed(data) {
            this.$emit('changed', data);
        },
    }
}
</script>