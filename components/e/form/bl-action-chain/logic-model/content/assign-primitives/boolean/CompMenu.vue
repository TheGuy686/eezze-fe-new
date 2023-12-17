<style lang="less" scoped>
.comp-menu-root {
    width: 380px; 

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
                        width: 25%;
                        display: flex;
                        flex-direction: row;
                        align-items: center;

                        .arg-name { padding-right: 5px; }
                    }

                    .second {
                        width: 20%;
                        display: flex;
                        flex-direction: row;
                    }

                    .third {
                        width: 25%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
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

        .result { margin-left: 5px; }
    }
}
</style>

<template>
<a-popover trigger="click" placement="bottomLeft">

    <a-button size="small">

        {{ currentOption?.title ? maxLen(currentOption?.title, 13) : tr('choose') }}

    </a-button>

    <template #title>

        <span>{{ tr('condition-operator') }}</span>

    </template>

    <template #content>

        <div class="comp-menu-root">

            <div class="choice" bev-cont>

                <EFormSelect
                    ref="select"    
                    eStyle="width: 100%;"
                    :highlightOnHasValue="true"
                    :name="tr('operator')"
                    :placeholder="tr('select-an-operator')"
                    keyProp="id"
                    valueProp="title"
                    :options="booleanOperattions"
                    v-model="value.operator"
                    @current-option-changed="currentSelectedItem = $event.option"
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

                                    <h3 non-sel>{{ tr('name') }}</h3>

                                </div>

                                <div class="second">

                                    <h3 non-sel>{{ tr('input') }}</h3>

                                </div>

                                <div class="third">

                                    <h3 non-sel>{{ tr('type') }}</h3>

                                </div>

                                <div class="right">

                                    <h3 non-sel>{{ tr('example') }}</h3>

                                </div>

                            </div>

                            <div 
                                class="arg-row" 
                                :key="arg.id" 
                                v-for="(arg, index) in currentChoiceArgs"
                                @mouseenter="hoveringItem = index"
                                @mouseleave="hoveringItem = -1"
                            >

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

                                <div class="second">

                                    <EFormContextMenu
                                        stle="width: 100%;"
                                        name=""
                                        :additioalTopValues="previousAssignmentsMenu"
                                        :filter="argMdl(index).filterId"
                                        v-model="argMdl(index).value"
                                    />

                                </div>

                                <div class="third">

                                    <e-tag-drop-down
                                        stle="margin-left: 8px;"
                                        colorCol="color"
                                        keyCol="key"
                                        valueCol="label"
                                        :maxLength="10"
                                        :options="boolReturnTypes"
                                        :locked="typeof arg?.type != 'undefined'"
                                        v-model="argMdl(index).type"
                                        @pre-change="(args) => {
                                            // we only need to run this incase that 
                                            if (args.from == 'boolean') {
                                                switch (value) {
                                                    case 'number': argMdl(index).example = '';
                                                    case 'text': argMdl(index).example = ''; break;
                                                    case 'boolean': argMdl(index).example = false; break;
                                                    default: argMdl(index).example = '';
                                                }
                                            }
                                        }"
                                    />

                                </div>

                                <div class="right">

                                    <EFormInput
                                        name="example"
                                        :type="argMdl(index).type ? argMdl(index).type : 'text'"
                                        :inlineOver="true"
                                        v-model="argMdl(index).example"
                                        v-if="inputTypes.includes(argMdl(index).type)"
                                    />

                                    <e-row :center="true" v-else>

                                        <EUiCheckBox
                                            name=""
                                            :inlineOver="true"
                                            :trueValue="true"
                                            v-model="argMdl(index).example"
                                        />

                                        {{ argMdl(index).example ? 'true' : 'false' }}

                                    </e-row>

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

            <e-row class="args" bev-cont>

                <span v-html="exampleResult?.preview + ' ='"></span> 
                
                <a-tag class="result" :color="exampleResult?.result ? '#008000' : '#f50'" non-sel>
                    
                    {{ exampleResult?.result.toString().toUpperCase() }}
                    
                </a-tag>

            </e-row>

        </div>

    </template>

</a-popover>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    props: {
        value: {
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
        ...mapState('cms/actions/bs-logic', [ 'booleanOperattions', 'booleanLinkOperattions' ]),
        ...mapGetters({
            logicReturnTypes: 'project/entity-presets/logicReturnTypes',
        }),
        boolReturnTypes() {
            const ignoreTypes = [ 'object', 'date', 'list' ];
            return this.logicReturnTypes.filter((item) => !ignoreTypes.includes(item.key));
        },
        boolReturnTypesDict() {return this.keyify(this.boolReturnTypes, 'key')},
        opDict() {
            return this.keyify([
                ...this.booleanOperattions,
                ...this.booleanLinkOperattions,
            ], 'id');
        },
        currentOption() {
            if (!this.value?.operator || this.value?.operator == '') return {};
            return this.booleanOperattions.filter((item) => item.id == this.value.operator)[0];
        },
        currentChoiceArgs() {
            return this.currentSelectedItem?.args;
        },
        argMdl() {
            return function (index) {
                if (typeof this.value?.opArgs[index] == 'undefined') {
                    const type = this.currentChoiceArgs[index]?.type;

                    this.value.opArgs.push({
                        id: this.currentSelectedItem.id,
                        type: type ? type : 'text',
                        value: '',
                        example: ''
                    });
                }

                return this.value?.opArgs[index];
            }
        },
        exampleResult() {
            let raw = '', pretty = '', preview = '', result = false;

            if (!this.loaded || typeof this.value != 'object' || typeof this.value?.opArgs != 'object') {
                return { operation: '', raw, pretty, result };
            }

            try {
                const args = this.value.opArgs;

                const op = (args.length > 2 ? '( ' : '') + this.opDict[this.value.operator].operation + (args.length > 2 ? ' )' : '');

                raw = op;
                pretty = op.replace(/Number\(%([0-9]+)\)/g, '%$1');
                preview = op.replace(/Number\(%([0-9]+)\)/g, '%$1');

                for (const i in args) {
                    const arg = args[i];
                    const pos = Number(i) + 1;

                    let example, typeItem = { color: 'orange' };

                    switch (arg.type) {
                        case 'text': 
                            example = `'${String(arg.example)}'`;
                            typeItem = this.boolReturnTypesDict[arg.type];
                            break;

                        case 'number': 
                            example = Number(arg.example);
                            typeItem = this.boolReturnTypesDict[arg.type];
                            break;

                        case 'boolean': 
                            example = Boolean(!!arg.example);
                            typeItem = this.boolReturnTypesDict[arg.type];
                            break;

                        default: 
                            example = arg.example;
                            typeItem = this.boolReturnTypesDict['text'];
                    }

                    if (this.hoveringItem == Number(i)) {
                        preview = preview.replaceAll(
                            `%${pos}`, 
                            `<span style="background-color: ${typeItem.color}; color: white;">
                                ${example}
                            </span>`
                        );
                    }
                    else {
                        preview = preview.replaceAll(`%${pos}`, example);
                    }

                    pretty = pretty.replaceAll(`%${pos}`, `<span style="color: ${typeItem.color}; font-weight: bold;">
                        ${example}
                    </span>`);
                    raw = raw.replaceAll(`%${pos}`, example);
                }

                result = eval(raw);

                return { operation: op, raw, pretty, preview, result };
            }
            catch (err) {
                return { operation: '', raw, pretty, preview, result };
            }
        }
    },
    data() {
        return {
            loaded: false,
            hoveringItem: -1,
            currentSelectedItem: {},
            inputTypes: [ 'text', 'number' ],
        };
    },
    mounted() {
        this.os(() => this.loaded = true, 300);
    },
}
</script>
