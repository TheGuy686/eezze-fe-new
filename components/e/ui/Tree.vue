<template>
<div>
    <a-tree
        v-model="checkedKeys"
        checkable
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        @expand="onExpand"
        @select="onSelect"
    />
</div>
</template>

<script lang="ts">
let self: any;

export default {
    beforeCreate(){self = this},
    data() {
        return {
            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
            treeData: [
                {
                    title: '0-0',
                    key: '0-0',
                    children: [
                        {
                            title: '0-0-0',
                            key: '0-0-0',
                            children: [
                                { title: '0-0-0-0', key: '0-0-0-0' },
                                { title: '0-0-0-1', key: '0-0-0-1' },
                                { title: '0-0-0-2', key: '0-0-0-2' },
                            ],
                        },
                        {
                            title: '0-0-1',
                            key: '0-0-1',
                            children: [
                            { title: '0-0-1-0', key: '0-0-1-0' },
                            { title: '0-0-1-1', key: '0-0-1-1' },
                            { title: '0-0-1-2', key: '0-0-1-2' },
                            ],
                        },
                        {
                            title: '0-0-2',
                            key: '0-0-2',
                        },
                    ],
                },
                {
                    title: '0-1',
                    key: '0-1',
                    children: [
                        { title: '0-1-0-0', key: '0-1-0-0' },
                        { title: '0-1-0-1', key: '0-1-0-1' },
                        { title: '0-1-0-2', key: '0-1-0-2' },
                    ],
                },
                {
                    title: '0-2',
                    key: '0-2',
                },
            ],
        };
    },
    watch: {
        checkedKeys(val: any) {
            console.log('onCheck', val);
        },
    },
    methods: {
        onExpand(expandedKeys: any) {
            console.log('onExpand', expandedKeys);
            // if not set autoExpandParent to false, if children expanded, parent can not collapse.
            // or, you can remove all expanded children keys.
            self.expandedKeys = expandedKeys;
            self.autoExpandParent = false;
        },
        onCheck(checkedKeys: any) {
            console.log('onCheck', checkedKeys);
            self.checkedKeys = checkedKeys;
        },
        onSelect(selectedKeys: any, info: any) {
            console.log('onSelect', info);
            self.selectedKeys = selectedKeys;
        },
    },
};
</script>