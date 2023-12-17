<style lang="less" scoped>
.menu-root {
    height: 100%;
    width: 200px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    position: absolute;
    border-right: solid 1px rgba(0, 0, 0, 0.1);
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    transition: left 1s;
    -moz-transition: left 1s; 
    -webkit-transition: left 1s; 
    -o-transition: left 1s;
    background-color: white;
    animation: left 0.5s forwards;
    animation-delay: 2s;

    .menu-content-cont {
        position: relative;
        height: 100%;

        .div-hr {
            margin-top: 41px;
            margin-right: 10px;
            width: calc(100% - 10px);
            border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
        }

        .chain-btn-header-section {
            display: flex;
            flex-direction: row;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            padding-right: 10px;

            .back-btn-section {
                cursor: pointer;

                .back-btn {
                    margin-top: 10px;
                    margin-right: 5px;
                }
            }

            .add-action {
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 10px 4px;
                height: 36px;
                border: 1px solid #3F88C5;
                border-radius: 8px;
                flex: none;
                order: 0;
                flex-grow: 0;
                color: #3F88C5;

                span { font-size: 14px; }
            }

            .btn-disabled { 
                cursor: not-allowed;
                border-color: rgba(0, 0, 0, 0.2);
                color: rgba(0, 0, 0, 0.2);
            }
        }

        .scroll-content { padding-right: 10px; }
    }

    .no-items { height: 100%; }
}
</style>

<template>
<a-col class="menu-root" :style="menuStyle">

    <a-col class="menu-content-cont">

        <div class="chain-btn-header-section">

            <div class="back-btn-section" @click="$emit('back')" v-if="index != 0">

                <GeneralIcon 
                    class="inline-block" 
                    type="back" 
                    clss="back-btn"
                />

            </div>

            <button 
                :class="'add-action text-xl text-center font-semibold inline-block ' + (shouldDisableNewBtn ? 'btn-disabled' : '')"
                :style="index == 0 ? 'width: 100%;' : 'width: 91%;'"
                :disabled="shouldDisableNewBtn"
                non-sel
                @click="addLogicItem"
            >

                <GeneralIcon class="inline-block" :type="shouldDisableNewBtn ? 'add-gray' : 'add-blue'" />

                <span>{{ tr('add-action') }}</span>

            </button>

        </div>

        <div class="div-hr"></div>

        <a-col class="no-items" a-center v-if="(value?.actions?.length ?? 0) == 0">

            {{ tr('add-business-logic-action') }}

        </a-col>

        <template v-else>
            
            <a-col class="scroll-content" id="chain-mdl-scroll-content" e-scroll>

                <EFormBlActionChainLogicModelItem
                    :item="item"
                    :isSelected="item.id === filteredUiActionsMdl.id"
                    :logicTypes="logicTypes"
                    :key="`${index}-${item.id}`"
                    :index="index"
                    :previousItemType="previousItemType(index)"
                    :errorsChanged="errorsChanged"
                    v-for="(item, index) in actions"
                    @item-selected="$emit('item-selected', item)"
                    @logic-chain-opened="$emit('logic-chain-opened', $event)"
                />

            </a-col>

        </template>

    </a-col>

</a-col>
</template>

<script>
import BlLogicChain from '~/models/BlLogicChain';

export default {
    props: {
        mainActionId: {
            type: String,
            require: true,
        },
        logicTypes: {
            type: Object,
            requrie: true,
        },
        value: {
            type: Object,
            default: () => {}
        },
        index: {
            type: Number,
            require: true,
        },
        filteredUiActionsMdl: {
            type: Object,
            require: true,
        },
        errorsChanged: {
            type: Function,
            require: true,
        }
    },
    watch: {
        currentSelectedIndex(to) {
            this.$emit('current-index-changed', { parentId: this.value?.id, index: to });
        }
    },
    computed: {
        actions() {return this.value?.actions ?? []},
        currentSelectedIndex() {
            for (let i in this.actions) {
                if (this.actions[i].id != this.filteredUiActionsMdl.id) continue;
                return i;
            }
        },
        shouldDisableNewBtn() {
            if (!this.value?.actions) return false;
            if (this.value.actions.length == 0) return false;
            return this.value.actions[this.value.actions.length - 1].type == 'new';
        },
        menuStyle() {
            if (this.index > 0) {
                return this.visible ? 'left: 0;' : 'right: -190px;';
            }
            return this.visible ? 'left: 0;' : 'left: -180px;';
        },
        previousItemType() {
            return function (index) {
                if (index == 0) return '';

                return this.value.actions[index - 1].returns;
            }
        },
    },
    data() {
        return {
            visible: false,
        }
    },
    mounted() {
        if (this.index == 0) this.visible = true;

        this.os(() => {
            try {
                const actions = this.value?.actions ?? [];

                if (actions.length > 0) {
                    this.$emit('item-selected', actions[0]);
                }
            }
            catch (err) {}
        }, 10);
    },
    methods: {
        show() {this.visible = true},
        hide() {this.visible = false},
        addLogicItem() {
            this.value.actions.push({
                id: BlLogicChain.getRandId(),
                filterId: BlLogicChain.getRandId(),
                type: 'new',
                name: tr('logic-item-default', {args: [ this.value.actions.length ]}),
                logic: {
                    raw: '',
                    formula: '',
                    source: '',
                    prop: '',
                    type: '',
                    subtype: '',
                    variables: [],
                    opArgs: [],
                },
                returns:  'text',
                actions: [],
            });

            setTimeout(() => {
                this.$emit('item-selected', { 
                    id: this.value.actions[this.value.actions.length - 1].id
                });

                let objDiv = document.getElementById('chain-mdl-scroll-content');
                objDiv.scrollTop = objDiv.scrollHeight + 200;
            }, 200);
        },
    }
}
</script>