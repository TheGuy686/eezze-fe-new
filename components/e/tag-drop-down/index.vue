<style lang="less" scoped>
.e-tag-drop-down-root {
    .cont {
        display: table-caption;

        .item {
            margin-top: 4px;
            margin-bottom: 4px;

            &:hover {
                cursor: pointer;
                color: white !important;
                background-color: var(--primary-blue) !important;
            }
        }
    }
}

.main-item {
    .arrow {
        margin-bottom: 8px;
        font-size: 20px;
    }
    
    &:hover {
        cursor: pointer;
    }
}
</style>

<template>
<a-popover
    :class="clss"
    overlayClassName="e-tag-drop-down-root" 
    :placement="placement" 
    :trigger="trigger" 
    v-model="visible"
    v-if="!locked"
>

    <a-tag class="main-item" :style="stle" :color="currentOption[colorCol]" non-sel>

        <e-row>

            {{ label }} 
        
            <e-col clss="arrow">

                ⌄

            </e-col> 

        </e-row>

    </a-tag>

    <template #title v-if="title">

        <span>{{ title }}</span>

    </template>

    <template #content>

        <div class="cont">

            <a-tag 
                :class="'item ' + itemClass" :style="stle"
                :color="op[colorCol]" non-sel
                :key="index"
                v-for="(op, index) in ops"
                @click="handleClick(op[keyCol])"
            >

                {{ op[valueCol] }}

            </a-tag>

        </div>

    </template>

</a-popover>
<a-tag :style="stle" :color="currentOption[colorCol]" non-sel v-else>

    {{ label }}

</a-tag>
</template>

<script>
export default {
    props: {
        locked: {
            type: Boolean,
            default: false,
        },
        stle: {
            type: String,
            default: '',
        },
        clss: {
            type: String,
            default: '',
        },
        itemClass: {
            type: String,
            default: '',
        },
        options: Array | Object,
        placement: {
            type: String,
            default: 'bottomLeft',
        },
        trigger: {
            type: String,
            default: 'click',
        },
        title: String,
        colorCol: {
            type: String,
            require: true,
        },
        keyCol: {
            type: String,
            require: true,
        },
        valueCol: {
            type: String,
            require: true,
        },
        maxLength: {
            type: Number,
        },
        value: {
            require: true,
        },
        placeholder: String,
    },
    computed: {
        ops() {
            return Object.values(this.options ?? []);
        },
        currentOption() {
            const key = this.keyCol;

            let option = {
                [key]: '',
                [this.colorCol]: 'gray',
                [this.valueCol]: (this.placeholder ? this.placeholder : this.tr('choose')),
            };

            try {
                for (let op of this.ops) {
                    if (op[key] != this.value) continue;
                    option = op;
                    break;
                }
            }
            catch (err) {}

            return option;
        },
        label() {
            const label = this.currentOption[this.valueCol];

            if (typeof this.maxLength == 'number') {
                return this.maxLen(label, this.maxLength);
            }

            return label;
        }
    },
    data() {
        return { visible: false }
    },
    methods: {
        handleClick(value) {
            this.$emit('pre-change', {to: value, from : `${this.value}` });
            this.$emit('input', value);
            this.visible = false;
        }
    }
}
</script>
