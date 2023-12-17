
<template>
<div class="pr-2">
    <ActionHeader
        :action="selectedAction"
        :subAction="selectedSubAction"
        :details="details"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <div class="mt-3 pt-3">
        <p class="font-semibold text-black-1 text-lg">Source</p>

        <TablePaginated
            :data="actionData"
            :columns="actionColumns"
            :showRowCheckboxs="false"
            :showSearch=false
            :showActions=true
            :actions="[
                {
                    action: 'selectInput',
                    title: 'Select input',
                    type: 'clickable-text',
                },
                {
                    action: 'experiment',
                    icon: 'experiment'
                },
                {
                    action: 'delete',
                    icon: 'dustbin'
                }
            ]"
        />
    </div>

    <ActionReturnObject :title="''" :showReturnObject="false"/>

</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
    },

    data() {
        return {
            visible: false,
            selectedAction: "Business Logic",
            selectedSubAction: "List",
            details:"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            selectedKeys: [],
            openKeys: [],
            entity: {},
            fileTypeData: [
                {
                    key: 'test',
                    name: 'Test'
                },
                {
                    key: 'test1',
                    name: 'Test 1'
                }
            ],
            actionData: [
                {returnVariable:"Email",inputVariable:"Email"},
                {returnVariable:"Firstname",inputVariable:"Firstname"}
            ],
            actionColumns: [
                {
                    title: 'Variables',
                    dataIndex: 'returnVariable',
                    sorter: true,
                },
                {
                    title: 'Input',
                    dataIndex: 'inputVariable',
                    sorter: true,
                }
            ]
        }
    },

    watch:
    {
        visible(to, from) {
            if (!to) {
                this.$emit('modal-closed');
            }
        }
    },

    methods: {
        show() { this.visible = true },
        hide() { this.visible = false },

        handleOk(e) {
            this.$emit(
                'right-btn-clicked',
                () => setTimeout(
                    this.hide(),
                    1700
                )
            );
        },
        handleCancel(e) { this.hide() },

        selectAction(action, subAction) {
            this.selectedAction = action;
            this.selectedSubAction = subAction;
            return;
        },
    },
};
</script>