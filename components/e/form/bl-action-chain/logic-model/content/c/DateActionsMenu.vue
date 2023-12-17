<style lang="less" scoped>
.menu-root {
    .menu-btn {
        margin-left: 5px;
    }

    .args-content {
        width: 430px;

        .arg-row {
            width: 100%;
            display: flex;
            flex-direction: row;

            .left {
                width: 50%;
                display: flex;
                flex-direction: row;
                align-items: center;

                .arg-name { padding-right: 5px; }
            }

            .right {
                width: 50%;
                display: flex;
                flex-direction: row-reverse;
            }
        }
    }
}
</style>

<template>
<a-popover placement="right" overlayClassName="menu-root" trigger="click">

     <a-button type="primary" shape="circle" size="small">

        <GeneralIcon type="action-sm" />

     </a-button>
    
    <template #title>

        <span>{{ tr('date-actions') }}</span>

    </template>    

    <template #content>

        <EFormSelect
            eStyle="width: 250px;"
            :highlightOnHasValue="true"
            :name="tr('modify-date')"
            :placeholder="tr('select-a-modify-date-operation')"
            keyProp="id"
            valueProp="title"
            :options="modifyDateOperations.options"
            :value="modifyDateMdl"
            @input="handleMdlChange($event)"
            @option-selected="optionSelected"
        />

        <h3 non-sel>{{ tr('date-action-args') }}</h3>

        <div bl-bevel-cont>

            <div class="args-content" v-if="(Object.values(item?.logic?.opArgs ?? [])?.length ?? 0) > 0">

                <a-col v-if="filteredOption?.args?.length > 0" style="width: 100%">

                    <div class="arg-row" :key="arg.id" v-for="(arg, index) in filteredOption?.args">

                        <div class="left">
                            
                            <span class="arg-name" non-sel>
                                
                                {{ arg.name }}
                                
                            </span>

                            <a-tooltip placement="right">
        
                                <GeneralIcon clss="help-dot" type="solid-input-help-prompt" />

                                <template #title>

                                    <div v-html="arg.desc" non-sel />

                                </template>

                            </a-tooltip>

                        </div>

                        <div class="right">

                            <EFormInput
                                :name="arg.name"
                                :inlineOver="true"
                                :type="arg.type"
                                :value="argMdl(index).value"
                                @input="setMdl(index, $event)"
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

        <d :d="item" />

    </template>

</a-popover>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        item: {
            type: Object,
            require: true,
        },
    },
    computed: {
        ...mapState('cms/actions/bs-logic', ['modifyDateOperations']),
        filteredOpArgs() {
            if (this.modifyDateMdl == '') return {};
            if (typeof this.item?.logic?.opArgs === 'undefined') return {};

            return this.item?.logic?.opArgs;
        },
        opArgsList() { return Object.values(this.filteredOpArgs) },
        argMdl() {
            return function (index) {
                if (typeof this.item?.logic?.opArgs[index] == 'undefined') {
                    let argId = '';

                    if (typeof this.filteredOpArgs[index] != 'undefined') {
                        argId = this.filteredOpArgs[index]?.id;
                    }

                    this.item.logic.opArgs.push({
                        // @Ryan
                        id: argId,
                        value: '',
                    });
                }

                return this.item?.logic?.opArgs[index];
            }
        }
    },
    data() {
        return {
            modifyDateMdl: '',
            filteredOption: {},
        }
    },
    methods: {
        setMdl(index, value) {
            this.item.logic.opArgs[index].value = value;
        },
        optionSelected(payload) {
            this.modifyDateMdl = payload.value;
            this.filteredOption = payload.option;

            this.resetArgsValues();
        },
        handleMdlChange(type) {
            this.modifyDateMdl = type;
            this.item.logic.operation = type;
        },
        resetArgsValues() {
            this.item.logic.opArgs = [];

            if (typeof this.filteredOption['args'] == 'undefined') {
                console.log('There was an error getting the "this.filteredOption"');
                return;
            }

            for (let arg of this.filteredOption.args) {
                this.item.logic.opArgs.push({
                    id: arg.id,
                    value: '',
                });
            }
        }
    }
}
</script>
