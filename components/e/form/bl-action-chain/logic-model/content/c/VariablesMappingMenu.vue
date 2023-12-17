<style lang="less" scoped>
.menu-root {
    overflow: hidden;

    .side-variable-mapping-menu-overlay {
        position: absolute;
        left: -(141%);
        top: 0;
        bottom: 0;
        right: 100%;
        background-color: rgba(0, 0, 0 ,0.2);
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    .side-variable-mapping-menu {
        position: absolute;
        left: -350.5px;
        top: -1px;
        bottom: 0;
        width: 350px;
        height: 100.5%;
        background-color: white;
        padding-left: 0px;
        padding-right: 0px;

        .header {
            width: 100%;
            padding-left: 5px;
            padding-right: 5px;
            padding-top: 14px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e8e8e8;
        }
    }
}
</style>

<template>
<div class="menu-root visible">

    <div class="side-variable-mapping-menu-overlay" :style="visible ? 'display: block;' : 'display: none;'" @click="visible = false" />

    <div bev-cont class="side-variable-mapping-menu" :style="visible ? 'display: block;' : 'display: none;'">

        <EFormBlActionChainLogicModelContentCVariablesMapping
            :title="tr('variable-mappings')"
            :returnType="returnType"
            :item="item"
            mode="sm"
            :showHeader="true"
            :resetType="item?.type"
            :resetSubType="item?.logic?.subtype"
            :valuePreviewTile="valuePreviewTile"
            :valuePreview="valuePreview"
            :showDateFormatterMenu="showDateFormatterMenu"
            :previousAssignmentsMenu="previousAssignmentsMenu"
            @hovering-item-changed="$emit('hovering-item-changed', $event)"
        />

    </div>

</div>
</template>

<script>
const VALID_MODES = [ 'sm', 'md' ];

export default {
    props: {
        title: {
            type: String,
            require: true,
        },
        item: {
            require: true,
        },
        returnType: {
            type: String,
        },
        valuePreviewTile: String,
        valuePreview: String,
        showDateFormatterMenu: {
            type: Boolean,
            default: false,
        },
        previousAssignmentsMenu: {
            type: Object,
            require: true,
        },
    },
    computed: {
        mdl() {
            return Object.values(this.item?.logic?.variables ?? []);
        },
    },
    data() {
        return {  visible: false };
    },
    methods: {
        show() {this.visible = true},
        hide() {this.visible = false},
        toggle() {
            this.visible =! this.visible;
        }
    }
}
</script>
