<style lang="less" scoped>
.root-list-operation {
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
</style>

<template>
<div class="root-list-operation">

    <div class="choice" bev-cont>

        <EFormSelect
            ref="select"    
            eStyle="width: 100%;"
            :highlightOnHasValue="true"
            :name="tr('list-operation')"
            :placeholder="tr('select-an-operation')"
            keyProp="id"
            valueProp="title"
            :options="listOperations"
            v-model="item.logic.raw"
        />

    </div>

    <div class="args" bev-cont>

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
                                name=""
                                :filter="item?.filterId"
                                :additioalTopValues="previousAssignmentsMenu"
                                v-model="argMdl(index, arg).value"
                            />

                        </div>

                        <div class="right">

                            <EFormInput
                                name="example"
                                :type="arg?.type ? arg.type : 'text'"
                                :inlineOver="true"
                                v-model="argMdl(index, arg).example"
                                v-if="hasExample(arg)"
                            />

                            <h3 v-else>{{ tr('na') }}</h3>

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

    RYAN

</div>
</template>

<script>
import { mapState } from 'vuex';
import { getRandomInt } from '~/classes/globals';
import { generateRandomString } from '~/classes/libs/string';

export default {
    props: {
        item: {
            type: Object,
            require: true,
        },
        previousAssignmentsMenu: {
            type: Object,
            require: true,
        },
    },
    watch: {
        exampleResult(to) {
            this.$emit('example-result-changed', to);
        }
    },
    computed: {
        ...mapState('cms/actions/bs-logic', ['listOperations' ]),
        currentSelectedItem() {
            try {
                const def = [];

                if (!this.loaded) return def;
                if (typeof this.$refs['select'] != 'object') return def; 
                if (typeof this.$refs['select'].currentSelectedItem == 'undefined') return def;

                return this.$refs['select'].currentSelectedItem;
            }
            catch (err) { return {} }
        },
        allcurrentChoiceArgs() {
            return this.currentSelectedItem?.option?.args ?? [];
        },
        currentChoiceArgs() {
            return (this.allcurrentChoiceArgs ?? []).filter((item) => {
                if (typeof item['isVisible'] == 'boolean' && !item.isVisible) return false;
                return true;
            });
        },
        hasExample() {
            return function(arg) {
                return typeof arg?.hasExample == 'undefined' || arg?.hasExample;
            }
        },
        argMdl() {
            return function (index, arg) {
                if (typeof this.item?.logic?.opArgs[index] == 'undefined') {

                    let tpe, example;

                    if (typeof arg?.type != 'undefined') {
                        tpe = arg?.type;
                    }
                    else if (arg?.type == 'list') tpe = [];
                    else tpe = 'text';

                    if (typeof arg?.defaultExample != 'undefined') {
                        example = arg?.defaultExample;
                    }
                    else {
                        example = tpe == 'text' ? generateRandomString(5) : getRandomInt(1, 100);
                    }

                    this.item.logic.opArgs.push({
                        id: this.currentSelectedItem.id,
                        value: '',
                        example,
                    });
                }

                return this.item?.logic?.opArgs[index];
            }
        },
        exampleResult() {
            try {
                const name = this.item?.logic?.prop, args = this.item?.logic?.opArgs;

                const curChoice = this.currentSelectedItem?.option;

                if (typeof curChoice == 'undefined') return '';

                if (typeof curChoice?.defaultExample == 'string') {
                    return curChoice?.defaultExample;
                }

                let formula = curChoice.operation;
                
                const optional = [];

                for (let i in this.allcurrentChoiceArgs) {
                    const argDef = this.allcurrentChoiceArgs[i];
                    const arg = this.item?.logic?.opArgs[i];

                    if (!argDef?.required) {
                        optional.push('...[ {name: "Dummy Info"}]');
                    }
                    else if (!argDef?.isVisible && argDef?.id == 'assign-name') {
                        formula = formula.replace(`%${Number(i) + 1}`, name);
                    }
                    else if (argDef?.type == 'list') {
                        formula = formula.replace(`%${Number(i) + 1}`, '[ {name: "Dummy Info"}]<br/>');
                    }
                    else {
                        formula = formula.replace(`%${Number(i) + 1}<br/>`, arg?.example);
                    }
                }

                formula = formula.replace('%optional', optional.join(', <br/>'));

                return formula;
            }
            catch (err) { console.log('Error: ', err); return '' }
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
}
</script>
