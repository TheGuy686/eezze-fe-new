<style lang="less" scoped>
.clickable-menu-item {
    width: 100%;
    padding: 10px 12px;
    display: flex;
    flex-direction: row;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);

    .title-left {
        width: 50%;

        span {
            color: black;
            font-weight: 800;
        }

        .type-tag {
            margin-left: 10px;
        }
    }

    .icon-right {
        width: 50%;
        flex-direction: row-reverse !important;
    }

    .help-dot {
        margin-right: 4px;
    }

    &:hover {
        cursor: pointer;
    }
}

.collapsible-cont {
    overflow: hidden;
    height: auto;
    -moz-transition: height .5s;
    -ms-transition: height .5s;
    -o-transition: height .5s;
    -webkit-transition: height .5s;
    transition: height .5s;

    .add-prop-section {
        padding-top: 10px;
        flex-direction: row-reverse !important;
    }
}

.no-items-cont {
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow: hidden;

    .no-items-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>

<template>
<a-col>

    <div 
        :class="'clickable-menu-item '" 
        :style="`padding-left: ${12 * (depth + 1)}px !important; ${isLastIndex && !expanded ? 'border-bottom: none !important;' : ''}`"
        non-sel
        @click="groupdExpanded(id)"
    >

        <a-row class="title-left">

            <span :style="depth > 0 ? 'font-weight: 600 !important;' : ''">
                
                <span :class="(mainHasValue ? 'title' : '')">{{ tr(title) }}</span>

                <span v-show="false">{{ counter }}</span>

                <a-tag class="type-tag" :color="keyTypes[type]?.color" v-if="type">

                    {{ keyTypes[type]?.label ?? '' }}

                </a-tag>
                
            </span>

        </a-row>

        <a-row class="icon-right">

            <GeneralIcon type="down-arrow" v-if="!expanded" />
            <GeneralIcon type="up-arrow" v-else />

            <a-tooltip placement="right" v-if="helpText">
        
                <GeneralIcon clss="help-dot" type="solid-input-help-prompt" />

                <template #title>

                    <div v-html="tr(helpText)" />

                </template>

            </a-tooltip>

        </a-row>

    </div>

    <a-col class="collapsible-cont" :style="expanded ? 'height: auto' : 'height: 0px;'" v-if="options.length > 0">

        <template v-for="(item, index) in options">

            <EFormInpContextMenuNonClickableItem
                :selectedKeys="selectedKeys"
                :item="item"
                :id="item.id"
                :title="item.title"
                :key="index"
                :depth="depth"
                :vMdlValue="vMdlValue"
                :mdlTree="mdlTree"
                :type="type"
                :index="index"
                :counter="counter"
                :masterItemId="masterItemId"
                :actionInput="actionInput"
                :disableInputIfNotKeys="disableInputIfNotKeys ?? item.disableInputIfNotKeys"
                @item-selected-init="$emit('item-selected-init', $event)"
                @item-selected="$emit('item-selected', $event)"
                @item-mdl-changed="$emit('item-mdl-changed', {
                    groupId: item.id,
                    value: $event
                })"
                @itterate="$emit('itterate')"
                v-if="typeof item?.children == 'undefined'"
            />

            <EFormInpContextMenuClickableItem
                :ref="`section-${item.id}`"
                :selectedKeys="selectedKeys"
                :parentId="id"
                :groupId="item.id"
                :item="item"
                :id="item.id"
                :title="item.title"
                :key="item.id"
                :options="Object.values(item.children)"
                :depth="depth + 1"
                :vMdlValue="vMdlValue"
                :type="item.type"
                :mdlTree="mdlTree"
                :index="index"
                :counter="counter"
                :disableInputIfNotKeys="disableInputIfNotKeys ?? item.disableInputIfNotKeys"
                :helpText="item?.helpText"
                :masterItemId="masterItemId"
                :actionInput="actionInput"
                @item-selected-init="$emit('item-selected-init', $event)"
                @group-selected="groupdExpanded($event)"
                @item-selected="$emit('item-selected', $event)"
                @child-item-just-added="$emit('child-item-just-added')"
                @itterate="$emit('itterate')"
                @item-mdl-changed="$emit('item-mdl-changed', {
                    masterItemId: masterItemId,
                    groupId: item.id,
                    value: $event
                })"
                v-else
            />

            <a-row 
                :key="item.id + 'add-row-btn'" 
                class="add-prop-section" 
                v-if="item.type == 'dynamice-list' && itemExpanded(item.id)"
            >

                <a-button type="primary" ghost @click="addDynamicListItem(item)">

                    {{ tr('add-property') }}

                </a-button>

            </a-row>

        </template>

    </a-col>

    <div class="no-items-cont collapsible-cont" :style="expanded ? 'auto' : 'display: none; height: 0px;'" v-if="options.length == 0">

        <div class="no-items-text" non-sel v-if="options.length == 0">
            
            {{ noItemsText }}
            
        </div>

    </div>

</a-col>
</template>

<script>
import {mapState} from 'vuex';
import { generateRandomString } from '~/classes/libs/string';

export default {
    props: {
        item: Object,
        actionInput: {
            type: Array,
            required: true,
        },
        title: {
            type: String,
            require: true,
        },
        groupId: {
            type: String,
        },
        type: {
            type: String,
        },
        masterItemId: {
            type: String,
            require: true,
        },
        id: {
            type: String,
            require: true,
        },
        selectedKeys: {
            type: Array,
            require: true,
        },
        options: {
            type: Array,
            default: () => [],
        },
        depth: {
            type: Number,
            default: 0,
        },
        noItemsText: {
            type: String,
            default: 'No options to show'
        },
        isLastIndex: {
            type: Boolean,
            default: false,
        },
        vMdlValue: {
            type: String,
            require: true,
        },
        mdlTree: {
            type: Array,
            require: true,
        },
        index: {
            type: Number,
            require: true,
        },
        disableInputIfNotKeys: {
            type: Array,
        },
        counter: {
            type: Number,
            require: true,
        },
        helpText: {
            type: String,
        },
        parentId: {
            type: String,
            require: true,
        }
    },
    computed: {
        mainHasValue() {return this.mdlTree.includes(this.id)},
        expanded() {return this.selectedKeys.includes(this.id)},
        ...mapState('project/entity-presets', {
            keyTypes: (state) => state?.keyTypes ?? [],
        }),
        itemExpanded() {
            return (id) => {
                if (!this.hasLoaded) return false;
                if (typeof this.$refs[`section-${id}`] == 'undefined') return false;

                try {
                    return this.$refs[`section-${id}`][0].expanded;
                }
                catch (err) {return false}
            }
        }
    },
    data() {
        return {
            hasLoaded: false,
        }
    },
    mounted() {
        this.hasLoaded = true;
    },
    methods: {
        groupdExpanded(id) {this.$emit('group-selected', id)},

        addDynamicListItem(item) {
            const randId =  generateRandomString(10);

            // item.children[randId] = {
            //     groupId: item.groupId,
            //     id: randId,
            //     isDynamicItem: true,
            //     dlKey: `${item.key}`,
            //     key: `${item.key}`,
            //     title: ''
            // };

            this.actionInput.push({
                groupId: item.groupId,
                id: randId,
                isDynamicItem: true,
                dlKey: `${item.key}`,
                key: `${item.key}`,
                title: ''
            });

            this.$emit('child-item-just-added');
        },
    }
}
</script>
