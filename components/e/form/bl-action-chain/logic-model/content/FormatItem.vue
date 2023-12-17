<style lang="less" scoped>
.formatter-root {
    .formatter-row {
        display: flex;
        flex-direction: row;
        padding-top: 5px;
    }

    .choice {
        padding: 14px !important;
        padding-bottom: 10px !important;
        width: calc(100% - 22px) !important;
        margin-right: 5px; 
        margin-left: 10px;

        .title {
            margin-right: 12px;
        }
    }

    .formatter-cont {
        .header {
            padding-left: 14px;
            padding-right: 14px;
            border-bottom: solid 1px rgba(0, 0, 0, 0.2);

            .title {
                padding-top: 10px;
                padding-bottom: 10px;
            }

            .round-plus-btn {
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #40a9ff;
                border-radius: 50%;
                cursor: pointer;
                border: solid 1px #40a9ff;
                margin-left: 10px;

                &:hover {
                    
                    background-color: white;
                    color: #40a9ff;
                }
            }
        }

        .no-items {
            min-height: 200px;
        }
    }
}
</style>

<template>
<div class="formatter-root">

    <div class="formatter-row">

        <e-col>

            <e-row 
                clss="choice"
                ai="c"
                jc="sb"
                :fillParent="true"
                bev-cont
            >

                <h3 class="title">{{ tr('select-formatter') }}:</h3>

                <EFormBlActionChainLogicModelContentCPropLogicMenu
                    :previousAssignmentsMenu="{}"
                    :value="item"
                    :showOnlyFormatters="true"
                    @mdl-changed="clearMdl()"
                />

            </e-row>

            <EFormBlActionChainLogicModelContentCVariablesMapping
                mode="l"
                :title="tr('formula-variable-values')"
                :returnType="formatterType"
                :resetSubType="item?.logic?.subtype"
                :item="item"
                :showDateFormatterMenu="key == 'formatter-date-interpolate'"
                @hovering-item-changed="itemHovered($event)"
                v-if="!isHorizontalLayout"
            />

        </e-col>

        <e-col class="formatter-cont">

            <e-row class="header" :center="false" ai="c" jc="sb" bev-cont>

                <h3 class="title" w-50>{{ tr(title) }}</h3>

                <e-row w-50 dir="reverse" ai="c">

                    <div 
                        class="round-plus-btn"
                        @mouseover="btnHovered = true"
                        @mouseleave="btnHovered = false"
                        @click="$refs['obj-ref'].addItem()"
                        v-if="key == 'formatter-object'"
                    >
                        <GeneralIcon type="plus-blue" clss="plus-icon" v-if="btnHovered" />
                        <GeneralIcon type="plus-white" clss="plus-icon" v-else />

                    </div>

                    <a-button @click="clearMdl()">

                        {{ tr('clear') }}

                    </a-button>

                </e-row>

            </e-row>

            <e-col
                :stle="key == 'formatter-object' ? 'width: 96% !important;' : ''"
                :fillParent="key != 'formatter-object'"
                v-if="isValidFormatter"
            >
                <EFormBlActionChainLogicModelContentAssignPrimitivesNumber
                    :item="item"
                    :previousAssignmentsMenu="{}"
                    :hoveringItem="hoveringItemI"
                    v-if="key == 'formatter-number'"
                />

                <EFormBlActionChainLogicModelContentCStringInterperlate
                    :item="item"
                    :doOutputPreview="true"
                    :hoveringItem="hoveringItemI"
                    :previousAssignmentsMenu="{}"
                    v-else-if="key == 'formatter-string-interpolate'"
                />

                <EFormBlActionChainLogicModelContentCDateFormatter
                    :item="item"
                    :previousAssignmentsMenu="{}"
                    :hoveringItem="hoveringItemI"
                    v-else-if="key == 'formatter-date-interpolate'"
                />

                <EFormBlActionChainLogicModelContentAssignPrimitivesObject
                    ref="obj-ref"
                    :item="item"
                    :previousAssignmentsMenu="{}"
                    v-else-if="key == 'formatter-object'"
                />

            </e-col>

            <e-col class="no-items" :center="true" v-else>

                {{ tr('no-items-to-show') }}

            </e-col>

        </e-col>

    </div>

</div>
</template>

<script>
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
    computed: {
        isVisible() {
            return this.item?.id == this.filterId && this.item?.type == 'number-operation-calculation';
        },
        hoveringItemP() {
            if (typeof this.hoveringItem != 'undefined') return this.hoveringItem;

            return this.hoveringItemI;
        },
        type() {
            return this.item?.type;
        },
        subtype() {
            return this.item?.logic?.subtype;
        },
        key() {
            return `${this.type}-${this.subtype}`;
        },
        formatterType() {
            switch (this.subtype) {
                case 'string-interpolate': return 'text';
                case 'date-interpolate': return 'date';
                case 'object': return 'object';
                case 'number': return 'number';  
                default: return 'text';
            }
        },
        title() {
            switch (this.subtype) {
                case 'string-interpolate': return tr('format-text');
                case 'date-interpolate': return tr('format-date');
                case 'object': return tr('format-object');
                default: return tr('select-a-formatter');
            }
        },
        isValidFormatter() {
            const validTypes = [
                'string-interpolate',
                'date-interpolate',
                'number',
                'object'
            ];

            return validTypes.includes(this.subtype);
        }
    },
    data() {
        return {
            selectedKeys: [],
            hoveringItemI: '',
            btnHovered: false,
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
        clearMdl() {
            this.item.logic = {
                subtype: this.item.logic.subtype,
                raw: '',
                formula: '',
                // RYAN
                format: '',
                source: '',
                prop: '',
                formula: '',
                variables: [],
                opArgs: [],
            };
        },
    }
}
</script>