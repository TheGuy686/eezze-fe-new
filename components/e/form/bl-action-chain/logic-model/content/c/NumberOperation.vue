<style lang="less" scoped>
.root-number-operation {
    width: 100%;

    .choice {
        padding: 14px !important;
        padding-bottom: 5px !important;
        width: 100%;
        margin-top: 5px;
    }

    .args {
        padding: 14px !important;
        padding-right: 10px !important; 
        width: 100%;
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .args-cont {
            height: auto; 
            padding-top: 5px; 
            padding-bottom: 10px; 
            padding-left: 10px; 
            width: 100%;
        
            .args-content {
                width: 100%;

                .arg-row {
                    margin-top: 5px;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    .left {
                        width: 28%;
                        display: flex;
                        flex-direction: row;
                        align-items: center;

                        .arg-name { padding-right: 5px; }
                    }

                    .middle {
                        width: 35%;
                        display: flex;
                        flex-direction: row;
                    }

                    .right {
                        width: 25%;
                        padding-left: 5px;
                        display: flex;
                        flex-direction: row-reverse;
                    }
                }
            }
        }
    }
}

.op-row {
    display: flex;
    flex-direction: row !important;
    margin-left: 5px;
    margin-right: 5px;
}

.op-col {
    display: flex;
    flex-direction: col !important;
}
</style>

<template>
<div :class="'root-number-operation ' + (isHorizontal ? 'op-row' : '')">

    <div class="choice" :style="(isHorizontal ? 'margin-right: 5px;' : '')" bev-cont>

        <EFormSelect
            ref="select"    
            eStyle="width: 100%;"
            :highlightOnHasValue="true"
            :name="tr('number-operation')"
            :placeholder="tr('select-an-operation')"
            keyProp="id"
            valueProp="title"
            :options="opTypeNumber.options"
            v-model="item.logic.subtype"
            @option-selected="resetVariablesAndArgs()"
        />

        <e-row :fillParent="true" :center="true" v-if="isHorizontal">

            <EFormBlActionChainLogicModelContentCSampleResult
                :title="tr('sample-formula')"
                :value="item"
                :overrideOnEmpty="false"
                :previewOverride="exampleResult"
            />

        </e-row>

    </div>

    <div class="args" :style="isHorizontal ? 'margin-right: 10px;' : ''" bev-cont>

        <a-row>

            <h3 non-sel>{{ tr('operation-args') }}</h3>

        </a-row>

        <div class="args-cont">

            <div class="args-content" v-if="currentChoiceArgs?.length ?? 0">

                <a-col v-if="currentChoiceArgs?.length > 0" style="width: 100%">

                    <div class="arg-row">

                        <div class="left">

                            <h3>{{ tr('name') }}</h3>

                        </div>

                        <div class="middle">

                            <h3>{{ tr('input') }}</h3>

                        </div>

                        <div class="right">

                            <h3>{{ tr('example') }}</h3>

                        </div>

                    </div>

                    <div class="arg-row" :key="arg.id" v-for="(arg, index) in currentChoiceArgs">

                        <div class="left">
                            
                            <span class="arg-name" non-sel>
                                
                                {{ maxLen(arg.name, 6) }}
                                
                            </span>

                            <a-tooltip placement="right">
        
                                <GeneralIcon clss="help-dot" type="solid-input-help-prompt" />

                                <template #title>

                                    <div v-html="arg.desc" non-sel />

                                </template>

                            </a-tooltip>

                        </div>

                        <div class="middle">

                            <EFormContextMenu
                                stle="width: 100%;"
                                name="Dev Test"
                                :additioalTopValues="previousAssignmentsMenu"
                                src="NumberOperation"
                                :filter="argMdl(index).filterId"
                                v-model="argMdl(index).value"
                            />

                        </div>

                        <div class="right">

                            <EFormInput
                                name="example"
                                type="number"
                                :inlineOver="true"
                                v-model="argMdl(index).example"
                            />

                        </div>

                    </div>

                </a-col>

                <a-col v-else>

                    {{ tr('no-args-to-show') }}

                </a-col>

            </div>

            <a-col class="no-items" a-center v-else>

                {{ tr('no-items-to-show') }}

            </a-col>

        </div>

    </div>

</div>
</template>

<script>
import { mapState } from 'vuex';
import { getRandomInt } from '~/classes/globals';

export default {
    props: {
        isHorizontal: {
            type: Boolean,
            default: false,
        },
        item: {
            type: Object,
            require: true,
        },
        previousAssignmentsMenu: {
            type: Object,
            default: () => {},
        },
    },
    watch: {
        exampleResult(to) {
            this.$emit('example-result-changed', to);
        }
    },
    computed: {
        ...mapState('cms/actions/bs-logic', {
            opTypeNumber: (state) => state?.numberOperations ?? {}
        }),
        currentSelectedItem() {
            const def = [];

            if (!this.loaded) return def;
            if (typeof this.$refs['select'] != 'object') return def; 
            if (typeof this.$refs['select'].currentSelectedItem == 'undefined') return def;

            return this.$refs['select'].currentSelectedItem;
        },
        currentChoiceArgs() {
            return this.currentSelectedItem?.option?.args;
        },
        argMdl() {
            return function (index) {
                try {
                    if (typeof this.item?.logic?.opArgs == 'undefined') {
                        console.clear();
                        console.log('Warning there is a logic opArgs not set. This is a problem and will cause issues');
                    }

                    if (typeof this.item?.logic?.opArgs[index] == 'undefined') {
                        this.item.logic.opArgs.push({
                            id: this.currentSelectedItem.id,
                            value: '',
                            example: getRandomInt()
                        });
                    }

                    return this.item?.logic?.opArgs[index];
                }
                catch (err) {
                    console.log('argMdl.error: ', err, ' : ', this.item);
                    return {};
                }
            }
        },
        exampleResult() {
            try {
                let formula = this.currentSelectedItem.option.operation;

                for (let i in this.item?.logic?.opArgs) {
                    const arg = this.item?.logic?.opArgs[i];

                    formula = formula.replace(`\$${Number(i) + 1}`, arg.example);
                }

                if (typeof formula == 'undefined') return tr('invalid-sample-preview');

                return `${formula} = ${eval(formula)}`;
            }
            catch (err) { return '' }
        }
    },
    data() {
        return { loaded: false };
    },
    mounted() {
        setTimeout(() => {
            this.loaded = true;
        
            setTimeout(() => this.$emit('example-result-changed', this.exampleResult), 100);

        }, 500);
    },
    methods: {
        resetVariablesAndArgs() {
            this.item.logic.variables = [];
            this.item.logic.opArgs = [];
        },
    }
}
</script>
