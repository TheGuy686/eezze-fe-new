<style lang="less" scoped>
.menu-item {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 12px;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);

    .cb-cont {
        .row-cb-select {
            margin-right: 8px;
            margin-top: 7px;
        }
    }

    &:hover {cursor: pointer;}
}

.item-has-value {
    color: white !important;
    border-bottom: 1px white solid !important;
    background-color: var(--primary-blue);
}

</style>

<template>
<div v-if="typeof type == 'undefined' || (type != 'dynamice-list' && type != 'array' && type != 'list' && index > 0)">

    <div :class="'menu-item ' + (mdlTree.includes(item?.key) ? 'item-has-value' : '')" @click="itemClicked()">

        <div class="cb-cont" :style="`padding-left: ${padding}px !important`">

            <EFormCheckBox
                :inlineOver="true"
                inlineLabelStyle="padding-left: 20px;"
                :name="title"
                :trueValue="true"
                :defaultValue="false"
                v-model="checked"
            />

        </div>

    </div>

</div>
<div v-else-if="type == 'dynamice-list'">

    <div :class="'menu-item ' + (mdlTree.includes(item?.key) ? 'item-has-value' : '')">

        <div class="cb-cont" :style="`padding-left: ${(depth == 0 ? 20 : 16) * (depth + 1)}px !important`">

            <a-row>

                <EFormCheckBox
                    clss="row-cb-select"
                    :inlineOver="true"
                    inlineLabelStyle="padding-left: 20px;"
                    :name="title"
                    :trueValue="true"
                    :defaultValue="false"
                    :hideLabel="true"
                    v-model="checked"
                    :disabled="inputValue == ''"
                />

                <EFormInput
                    :inlineOver="true"
                    :name="title"
                    v-model="inputValue"
                    inputCase="camelCase"
                    :placeholder="tr('enter-a-property-name')"
                    @input="$emit('itterate')"
                />

            </a-row>

        </div>

    </div>
</div>
<div v-else>

    <div class="menu-item" v-if="index == 0 && type == 'list'">

        <div class="cb-cont" :style="`padding-left: ${(depth == 0 ? 20 : 16) * (depth)}px !important`">

            <EFormInput
                :inlineOver="true"
                :name="title"
                v-model="listKey"
                :placeholder="tr('row-key-or-index')"
                :disabled="shouldDisableInput"
                :helpText="tr('row-key-or-index-help')"
            />

        </div>

    </div>

    <div :class="'menu-item ' + (mdlTree.includes(id) ? 'item-has-value' : '')" @click="itemClicked()">

        <div class="cb-cont" :style="`padding-left: ${padding}px !important`">

            <EFormCheckBox
                :inlineOver="true"
                inlineLabelStyle="padding-left: 20px;"
                :name="title"
                :trueValue="true"
                :defaultValue="false"
                v-model="checked"
            />

        </div>

    </div>

</div>

</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
        type: {
            type: String,
        },
        id: {
            type: String,
            require: true,
        },
        selectedKeys: {
            type: Array,
            require: true,
        },
        depth: {
            type: Number,
            defauolt: 0,
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
        masterItemId: {
            type: String,
            require: true,
        },
        counter: {
            type: Number,
            require: true,
        },
        dlRootId: String,
        actionInput: {
            type: Array,
            required: true,
        },
    },
    watch: {
        checked(to, from) {
            // we need to have this to make sure we don't get a value change event loop
            if (this.justMounted || (this.item.key != to && from != '')) return;

            this.$emit('item-selected', {
                key: this.iKey,
                title: this.title,
            });

            this.$emit('itterate');
        },
        inputValue(to) {
            this.item.title = to;
        },
        iKey(to) {
            this.item.key = to;

            if (this.checked) {
                this.$emit('item-selected', {
                    key: this.iKey,
                    title: this.title,
                });

                this.$emit('itterate');
            }
        },
        vMdlValue(to) {
            if (this.item.key != to) this.checked = false;
        },
    },
    computed: {
        iKey() {
            if (this?.item?.isDynamicItem) {
                return `${this.item.dlKey}.${this.item?.title}`;
            }
            
            return this.item?.key;
        },
        padding() {
            return (this.depth == 0 ? 20 : 16) * (this.depth + 1);
        },
        shouldDisableInput() {
            if (!Array.isArray(this.disableInputIfNotKeys) || this.disableInputIfNotKeys.length == 0) return false;

            return this.disableInputIfNotKeys.includes(this.vMdlValue);
        }
    },
    data() {
        return {
            checked: false,
            justMounted: true,
            listKey: '',
            inputValue: '',
        }
    },
    
    beforeMount() {
        if ((this.item?.key && this.vMdlValue) && (this.item?.key == this.vMdlValue)) {
            this.checked = true;

            this.$emit('item-selected-init', {
                key: this.item.key,
                title: this.title,
            });
        }
    },
    mounted() {
        setTimeout(() => {
            if ((this.item?.key && this.vMdlValue) && (this.item?.key == this.vMdlValue)) {
                this.checked = true;

                this.$emit('item-selected-init', {
                    key: this.item.key,
                    title: this.title,
                });
            }

            if (this.type == 'dynamice-list') {
                this.inputValue = this.title;
            }

            setTimeout(() => this.justMounted = false, 300);
        }, 100);
    },
    methods: {
        itemClicked() {this.checked = !this.checked}
    }
}
</script>
