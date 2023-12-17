<style lang="less">
.full-modal {
    .ant-modal {
        max-width: 100%;
        top: 0;
        padding-bottom: 0;
        margin: 0;
    }

    .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh);
    }

    .ant-modal-body {
        flex: 1;
    }
}

.side {
    box-sizing: border-box;
    height: 100%;
    background: #FFF;
    border-right: 1px solid #E0E0E0;
    left: -20px;
    top: -20px;
}

.boxReturn {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 24px 20px 20px;
    gap: 16px;
    width: 100%;
    background: #FFF;
    border: 1px solid #E0E0E0;
    border-radius: 2px;
    flex: none;
    order: 1;
    flex-grow: 0;
}
</style>

<template>
<div class="pr-2">

    <ActionHeader
        :action="tr('database')"
        :subAction="tr('create-one')"
        :details="tr('create-a-new-record')"
        :actionStep="actionStep"
        @save-action-clicked="$emit('save-action-clicked')"
        @close="$emit('close')"
        @edit-basic-action-info="$emit('edit-basic-action-info')"
    />

    <ActionDatasourceEntity
        :showDepth="false"
        :actionStep="actionStep"
        :dsFilterType="filterKey"
        v-model="actionStep.schema"
    />

    <!-- <ActionLogicMdlInput
        clss="pl-2.5"
        :placeholder="tr('email-from-qu')"
        :addonBefore="tr('error-on-empty')"
        src="DB->CreateOne->emptyOn"
        type="boolean"
        mdlKey="errorOnEmpty"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl')"
    /> -->

    <e-row class="mt-3 p-1.5" bev-cont>

        <EFormCheckBox
            :inlineOver="true"
            inlineLabelStyle="margin-left: 8px;"
            name="fail-on-empty"
            :placeholder="tr('fail-on-empty-qu')"
            :trueValue="true"
            :defaultValue="false"
            :reverseLayout="true"
            v-model="actionStep.schema.failOnEmpty"
        />

    </e-row>

    <ActionMappingTable
        class="mt-4"
        :extendedTop="false"
        :title="tr('create-values')"
        srcKey="input"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl', ['state', 'stash'])"
    />

    <ActionReturnObject
        :actionStep="actionStep"
        @show-bl-mdl="$emit('show-bl-mdl', $event)"
    />

</div>
</template>

<script>
import { DB_TYPES } from '~/consts/BusLogic';

export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            filterKey: DB_TYPES,
        }
    },
    mounted() {
        // this.os(() => {
        //     console.clear();
        //     console.log('actionData: ', this.actionStep);
        // }, 3000);
    },
};
</script>