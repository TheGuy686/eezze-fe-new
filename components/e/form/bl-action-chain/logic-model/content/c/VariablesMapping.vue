<style lang="less" scoped>
.variable-mappings-root {
    padding: 10px;
    max-height: 97%;

    .header {
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        flex-direction: row;

        .rl {
            width: 50%;
            display: flex;
            flex-direction: row;
        }

        .rr {
            width: 50%;
            display: flex;
            flex-direction: row-reverse;
        }
    }

    @max-var-height: 45vh;

    .vars-cont {
        max-height: @max-var-height !important;

        .variables-list {
            .item {
                .left {
                    width: 12%;
                }

                .middle {
                    width: 37%;
                    display: flex;
                    flex-direction: row;
                }

                .right {
                    width: 41%;
                    display: flex;
                    flex-direction: row;
                    align-items: flex-end;
                }
            }
        }
    }

    .no-items-to-show {
        margin-top: 10px;
        min-height: 250px; 
    }
    
    .sm {
        .vars-cont {
            max-height: @max-var-height !important;

            .variables-list {
                .right-col{
                    padding-left: 29px;
                }

                .item {
                    .left {
                        width: 3% !important;
                    }

                    .middle {
                        width: 2% !important;
                        display: flex;
                        flex-direction: row;
                    }

                    .right {
                        width: 27% !important;
                        display: flex;
                        flex-direction: row;
                        align-items: flex-end;
                    }
                }
            }
        }

        .no-items-to-show { min-height: 200px; }
    }

    .md {
        .vars-cont {
            max-height: @max-var-height !important;

            .variables-list {
                .item {
                    .left {
                        width: 5% !important;
                    }

                    .middle {
                        width: 30% !important;
                        display: flex;
                        flex-direction: row;
                    }

                    .right {
                        width: 25% !important;
                        display: flex;
                        flex-direction: row;
                        align-items: flex-end;
                    }
                }
            }
        }

        .no-items-to-show { min-height: 200px; }
    }

    .l {
        .header {
            width: 100% !important;
            padding-top: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e8e8e8;
            display: flex;
            flex-direction: row;

            .rl {
                width: 50%;
                display: flex;
                flex-direction: row;
            }

            .rr {
                width: 50%;
                display: flex;
                flex-direction: row-reverse;
            }
        }
        
        .right-col{
            padding-left: 29px;
            text-align: end;
        }

        .item {
            .left {
                width: 10% !important;
            }

            .middle {
                width: 30% !important;
                display: flex;
                flex-direction: row;
            }

            .date-format-column {
                width: 23% !important;
                display: flex;
                flex-direction: row;
                text-align: center;
                justify-content: center;
                padding-left: 6px;
            }

            .right {
                width: 30% !important;
                display: flex;
                flex-direction: row;
                align-items: flex-end;
            }
        }
        
        .no-items-to-show { min-height: 200px; }
    }

    .date-formatter {
        .vars-cont {
            max-height: @max-var-height !important;

            .variables-list {
                .right-col{ padding-left: 29px; }

                .item {
                    .left {
                        width: 3% !important;
                    }

                    .middle {
                        width: 40% !important;
                        display: flex;
                        flex-direction: row;
                    }

                    .date-format-column {
                        width: 19% !important;
                        display: flex;
                        flex-direction: row;
                        padding-left: 6px;
                    }

                    .right {
                        width: 23% !important;
                        display: flex;
                        flex-direction: row;
                        align-items: flex-end;
                    }
                }
            }
        }

        .no-items-to-show { min-height: 200px; }
    }
}

.dev-btn {
    position: absolute;
    top: 12px;
    right: 15px;
    z-index: 1000;
}
</style>

<template>
<a-col 
    class="variable-mappings-root"
    :style="fillParent ? 'width: 100%;' : ''" 
    :span="mode == 'sm' ? 24 : 12"
>

    <div class="header" v-if="showHeader">

        <div class="rl">

            <h3>{{ title }}</h3>

        </div>

        <div class="rr">

            <a-button @click="clearMdl">

                {{ tr('clear') }}

            </a-button>

        </div>

    </div>

    <div :class="'vars-cont ' + (showDateFormatterMenu && mode != 'l' ? 'date-formatter' : mode)" e-scroll>

        <a-list class="variables-list" bordered size="small" :data-source="mdl" v-if="mdl.length > 0">

            <template #header>

                <a-row :fillParent="true" class="header">
                    
                    <a-col :span="leftColSpan">

                        {{ tr('pos') }}

                    </a-col>

                    <a-col align="middle" :span="middleColSpan">

                        {{ tr('mapped-value') }}

                    </a-col>

                    <a-col align="middle" :span="dateFormatterSpan" v-if="showDateFormatterMenu">

                        {{ tr('format-date') }}

                    </a-col>

                    <a-col class="right-col" :span="rightColSpan">

                        {{ tr('example') }}

                    </a-col>

                </a-row>

            </template>

            <template #renderItem="item">

                <a-list-item
                    class="item"
                    @mouseenter="$emit('hovering-item-changed', item.pos)"
                    @mouseleave="$emit('hovering-item-changed', -1)"
                >

                    <div class="left">

                        <span :style="`color: ${item.color};`">{{ item.pos }}</span>

                    </div>

                    <div class="middle">

                        <EFormContextMenu
                            :additioalTopValues="previousAssignmentsMenu"
                            src="VariablesMapping"
                            :filter="item.filterId"
                            v-model="item.value"
                            @input="item.format = {}"
                        />

                    </div>

                    <div class="date-format-column" v-if="showDateFormatterMenu">

                        <EFormBlActionChainLogicModelContentCDateFormatterMenu
                            v-model="item.format"
                            @set-example="item.example = $event"
                            @input="item.value = ''"
                        />

                    </div>

                    <div class="right">

                        <EFormInput 
                            name="example"
                            :placeholder="tr('example')"
                            :inlineOver="true"
                            v-model="item.example"
                        />

                    </div>

                </a-list-item>

            </template>

        </a-list>

        <e-col :fillParent="true" non-sel e-bordered v-else>

            <e-row :fillParent="true">
                
                <a-col :span="leftColSpan">

                    {{ tr('pos') }}

                </a-col>

                <a-col align="middle" :span="middleColSpan">

                    {{ tr('mapped-value') }}

                </a-col>

                <a-col align="middle" :span="dateFormatterSpan" v-if="showDateFormatterMenu">

                    {{ tr('format-date') }}

                </a-col>

                <a-col :span="rightColSpan" class="right-col">

                    {{ tr('example') }}

                </a-col>

            </e-row>

            <e-row clss="no-items-to-show" :center="true" :fillParent="true">

                {{ tr('no-items-to-show') }}

            </e-row>

        </e-col>

    </div>

    <EFormBlActionChainLogicModelContentCValuePreview
        :label="valuePreviewTile"
        :value="valuePreview"
        v-if="valuePreview != undefined"
    />

    <EFormBlActionChainLogicModelContentCReturnType
        :type="returnType"
        :item="item"
        :isEditable="isEditable"
        v-if="returnType"
    />

</a-col>
</template>

<script>
const VALID_MODES = [ 'sm', 'md', 'l' ];

export default {
    props: {
        title: {
            type: String,
            require: true,
        },
        isEditable: Boolean,
        item: {
            require: true,
        },
        returnType: String,
        mode: {
            type: String,
            default: 'md',
            validator: (value) => VALID_MODES.includes(value)
        },
        resetType: {
            type: String,
            require: true,
        },
        resetSubType: {
            type: String,
            require: true,
        },
        valuePreviewTile: String,
        valuePreview: String,
        showHeader: {
            type: Boolean,
            default: false,
        },
        showDateFormatterMenu: {
            type: Boolean,
            default: false,
        },
        previousAssignmentsMenu: {
            type: Object,
            require: true,
        },
        clearRawOnClear: {
            type: Boolean,
            default: true,
        },
        fillParent: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        mdl() {
            return Object.values(this.item?.logic?.variables ?? []);
        },
        leftColSpan() {
            if (this.mode == 'l') return 3;

            if (this.showDateFormatterMenu) return 3;

            if (this.mode == 'sm') return 6;

            return 2;
        },
        middleColSpan() {
            if (this.mode == 'l') return 7;

            if (this.showDateFormatterMenu) return 7.2;

            return 9;
        },
        dateFormatterSpan() {
            if (this.mode == 'l') return 8;

            return 6;
        },
        rightColSpan() {
            if (this.mode == 'l') return 6;

            if (this.showDateFormatterMenu) return 7.5;

            if (this.mode == 'sm') return 8;

            return 12;
        },
    },
    data() {
        return {
            visible: false,
        }
    },
    methods: {
        show() {this.visible = true},
        hide() {this.visible = false},
        clearMdl(emitEvent = true) {
            const prop = this.item?.logic?.prop ?? '';

            let rawVal = '', rawFormula = '';

            if (!this.clearRawOnClear) {
                rawVal = this.item?.logic?.raw;
                rawFormula = this.item?.logic?.formula;
            }

            this.item.logic = { 
                prop: prop,
                raw: rawVal,
                // RYAN
                format: '',
                formula: rawFormula,
                type: this.resetType,
                subtype: this.resetSubType,
                opArgs: [],
                variables: [],
            };

            if (emitEvent) this.$emit('mdl-cleared');
        }
    }
}
</script>
