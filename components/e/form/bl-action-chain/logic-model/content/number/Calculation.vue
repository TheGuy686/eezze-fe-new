<style lang="less" scoped>
.calculation-root {
    .cal-column {
        display: flex;
        flex-direction: column;
        padding-top: 5px;
    }

    .cal-row {
        display: flex;
        flex-direction: row;
        padding-top: 5px;
    }

    .choice {
        padding: 14px !important;
        padding-bottom: 5px !important;
        width: cal(100% - 10px);
    }
}
</style>

<template>
<div class="calculation-root">

    <div :class="isHorizontalLayout ? 'cal-column' : 'cal-row'">

        <e-col :fillParent="true">

            <div class="choice" :style="!isHorizontalLayout ? 'margin-right: 10px; margin-left: 5px;' : ''" bev-cont>

                <EFormSelect
                    ref="select"    
                    eStyle="width: 100%;"
                    :highlightOnHasValue="true"
                    :name="tr('number-operation') + ' : ' + isVisible"
                    :placeholder="tr('select-an-operation')"
                    keyProp="id"
                    valueProp="title"
                    :options="opTypeNumber.options"
                    v-model="item.logic.subtype"
                    @option-selected="resetVariablesAndArgs"
                />

            </div>

            <EFormBlActionChainLogicModelContentCVariablesMapping
                ref="variable-mappings"
                :title="tr('formula-variable-values')"
                returnType="number"
                mode="md"
                :resetType="item?.type"
                :resetSubType="item?.logic?.subtype"
                :item="item"
                :valuePreviewTile="tr('formula')"
                :valuePreview="item?.logic?.formula"
                @hovering-item-changed="itemHovered($event)"
                @mdl-cleared="$refs['calulator'].clearCalulator(false)"
                v-if="!isHorizontalLayout"
            />

        </e-col>

        <ECalculator
            ref="calulator"
            style="margin-bottom: 5px;"
            :span="isHorizontalLayout ? 24 : 12"
            :previewStyle="isHorizontalLayout ? 'height: 100px !important;' : ''"
            :resetType="item?.type"
            :resetSubType="item?.logic?.subtype"
            :id="item.id"
            :isVisible="isVisible"
            :hoveringItem="hoveringItemP"
            @about-to-add-var="$emit('about-to-add-var')"
            v-model="item.logic"
            @calculator-cleared="calulatorCleared"
        />

    </div>

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        filterId: {
            type: String,
            require: true,
        },
        item: {
            type: Object,
            require: true,
        },
        logicTypes: {
            type: Array,
            require: true,
        },
        isHorizontalLayout: {
            type: Boolean,
        },
        hoveringItem: String | Number,
        previousAssignmentsMenu: {
            type: Object,
            default: () => {},
        },
    },
    watch: {
        item(to) {
            this.$refs['calulator'].reset(to);
        },
    },
    computed: {
        ...mapState('cms/actions/bs-logic', {
            opTypeNumber: (state) => state?.numberOperations ?? {}
        }),
        isVisible() {
            return this.item?.id == this.filterId && this.item?.type == 'number-operation-calculation';
        },
        hoveringItemP() {
            if (typeof this.hoveringItem != 'undefined') return this.hoveringItem;

            return this.hoveringItemI;
        }
    },
    data() {
        return {
            selectedKeys: [],
            hoveringItemI: '',
        }
    },
    methods: {
        itemHovered(id) {
            if (typeof this.hoveringItem == 'string') {
                this.$emit('hovering-item-changed', id);
                return;
            }

            this.hoveringItemI = id;
        },
        calulatorCleared() {
            if (this.isHorizontalLayout) return;

            try {
                this.$refs['variable-mappings'].clearMdl(false);
            }
            catch (err) {
                console.log('Error: ', err);
            }
        },
        resetVariablesAndArgs() {
            if (this.item?.logic?.subtype == 'calculation') return;

            this.item.logic.variables = [];
            this.item.logic.opArgs = [];
        },
    }
}
</script>