<style lang="less" scoped>
.root-list-item {
    margin-left: 5px;

    .left {
        width: calc(35% - 5px) !important;

        .ls-title {
            padding: 14px !important;

            .ls-title {
                margin-right: 10px;
            }
        }
    }

    .right {
        width: calc(65% - 5px) !important;
        margin-left: 5px;
        padding: 14px !important;
        padding-right: 10px !important;

        .view-logic-btn {
            margin-top: -7px;
            margin-bottom: 7px;
        }

        .action-item {
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }
}
</style>

<template>
<e-row class="pl-5 root-list-item">

    <e-col class="left">

        <e-row class="cont" ai="c" jc="sb" :center="false" bev-cont>

            <h3 class="ls-title">{{ tr('list-source')}}:</h3>

            <EFormContextMenu
                src="LogicModelContentListItem"
                :filter="item.logic.filterId"
                v-model="item.logic.raw"
            />

        </e-row>

    </e-col>

    <e-col ai="s" class="right" :center="false" bev-cont>

        <e-row jc="sb">

            <h3 non-sel>{{ tr('inner-logic-chain') }}</h3>

            <a-button class="view-logic-btn" type="primary" @click="$emit('item-selected')">

                {{ tr('view-logic') }}

            </a-button>

        </e-row>

        <template v-if="item?.actions.length > 0">

            <e-row 
                class="action-item"
                bev-cont
                jc="sb"
                :key="index"
                v-for="(act, index) in item?.actions"
            >

                <span non-sel>{{ tr(act.type) }}</span>

                <e-tag-drop-down
                    colorCol="color"
                    keyCol="key"
                    valueCol="label"
                    :maxLength="10"
                    :options="logicReturnTypes"
                    :locked="true"
                    :value="act.returns"
                />

            </e-row>

        </template>

        <span v-else>

            {{ tr('no-items-to-show') }}

        </span>

    </e-col>

</e-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        filterId: {
            type: String,
            require: true,
        },
        logicTypes: {
            type: Array,
            require: true,
        },
        item: {
            type: Object,
            require: true,
        },
    },
    computed: {
        ...mapGetters({
            logicReturnTypes: 'project/entity-presets/logicReturnTypes',
        }),
        isVisible() {
            return this.item.id == this.filterId && this.item.type == 'list-process';
        },
        actions() {
            try {
                return this.item?.logic?.actions ?? [];
            }
            catch (err) { return [] }
        }
    },
    data() {
        return {
            selectedKeys: [],
        }
    },
}
</script>