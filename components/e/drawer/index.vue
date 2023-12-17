<style lang="less" scoped>

.authenticators-create-edit-entity-tab-root {
    flex: 4; 
    margin-top: -20px;
    padding-bottom: 20px;

    .or-cont {
        padding-top: 40px;
        padding-bottom: 40px;
        justify-content: center;
        align-items: center;

        .or-div {
            width: 40%;
            height: 1px;
            background-color: #e8e8e8;
            margin-left: 20px;
            margin-right: 20px;
        }

        .span-or {
            font-size: 14px;
        }
    }
}
</style>

<template>
<a-drawer
    :title="title"
    :placement="placement"
    :closable="true"
    :visible="visible"
    :width="width"
    :height="height"
    :wrapStyle="wrapStyle"
    :drawerStyle="drawerStyle"
    :headerStyle="headerStyle"
    :bodyStyle="bodyStyle"
    @close="close"
>
    <slot />
</a-drawer>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Basic Drawer'
        },
        placement: {
            type: String,
            default: 'right'
        },
        wrapStyle: {
            type: Object,
        },
        drawerStyle: {
            type: Object,
        },
        headerStyle: {
            type: Object,
        },
        bodyStyle: {
            type: Object,
        },
        getContainer: {
            type: Boolean,
            default: true,
        },
        height: {},
        width: {},
    },
    data() {
        return {visible: false};
    },
    methods: {
        toggle() {this.visible =! this.visible},
        open() {this.visible = true},
        close() {
            this.$emit('closed');
            this.visible = false;
        },
    }
};
</script>
