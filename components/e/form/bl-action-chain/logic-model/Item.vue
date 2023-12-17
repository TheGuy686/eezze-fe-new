<style lang="less" scoped>
.item-root {
    margin-top: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 60px;
    border-radius: 5px;
    padding-top: 30px;
    padding-bottom: 30px;

    .right-btn-section {
        position: absolute;
        right: -8px;
        top: calc(50% - 17px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .active-dot {
            width: 10px;
            height: 10px;
            background-color: rgba(0,0,0,0.1);
            border-radius: 50%;
            opacity: 1;
            margin-bottom: 5px;
        }

        .round-plus-btn {
            width: 17px;
            height: 17px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
            border-radius: 50%;
            border: solid 1px rgba(0, 0, 0, 0.2);

            &:hover {
                background-color: #40a9ff;
                color: white;
            }
        }
    }

    &:hover {
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.4);

        .right-btn-section .active-dot { 
            background-color: #3F88C5;
            opacity: 1; 
        }
    }
}

.logic-action-item-active {
    border: 1px solid rgba(0, 0, 0, 0.4);

    .right-btn-section .active-dot { 
        background-color: #3F88C5; 
        opacity: 1; 
    }
}

.logic-action-item-invalid {
    border: 1px solid rgb(148, 12, 12);

    &:hover {
        border: 1px solid rgb(148, 12, 12);
    }
}
</style>

<template>
<a-col 
    :class="'item-root ' + (!returnTypeIsValid ? 'logic-action-item-invalid' : '') + (isSelected ? ' logic-action-item-active' : '')" 
    a-center
    non-sel
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
    @click="!btnHovered ? $emit('item-selected') : undefined"
>

    {{ item?.type ? itemType(item).title : tr('choose-a-type') }}

    <div class="right-btn-section" :style="!itemType(item)?.isMuliLevel ? 'top: calc(50% - 6px) !important;' : ''">

        <div class="active-dot"></div>

        <div 
            class="round-plus-btn"
            @mouseover="btnHovered = true"
            @mouseleave="btnHovered = false"
            v-if="itemType(item)?.isMuliLevel"
            @click="$emit('logic-chain-opened', item.id)"
        >
            <GeneralIcon type="plus-white" clss="plus-icon" v-if="btnHovered" />

            <GeneralIcon type="plus" clss="plus-icon" v-else />

        </div>

    </div>

</a-col>
</template>

<script>
export default {
    props: {
        isSelected: {
            type: Boolean,
            require: true,
        },
        item: {
            type: Object,
            require: true,
        },
        logicTypes: {
            type: Object,
            requrie: true,
        },
        previousItemType: {
            type: String,
            require: true,
        },
        index: {
            type: Number,
            require: true,
        },
        errorsChanged: {
            type: Function,
            require: true,
        }
    },

    watch: {
        returnTypeIsValid(to) {
            if (!to) {
                this.errorsChanged(this.errors);
            }
            else {
                this.errorsChanged(this.errors ?? []);
            }
        }
    },

    computed: {
        itemType() {
            return function (item) {
                const def = { id: 'na', title: tr('na'), isMuliLevel: false };

                if (typeof item?.type == 'undefined') return def;
                if (typeof this.logicTypes[item.type] == 'undefined') return def;

                return this.logicTypes[item.type];
            }
        },
        returnTypeIsValid() {
            try {
                if (this.item?.returns == 'void') return true;
                if (this.previousItemType == 'void' || this.previousItemType == '') return true;

                return this.previousItemType == this.item.returns;
            }
            catch (err) {return false}
        },
        errors() {
            const errors = [];

            if (!this.returnTypeIsValid)  {
                errors.push(`${this.index}. ${this.logicTypes[this.item.type].title}: Return type is not valid`);
            }

            return errors;
        }
    },

    data() {
        return {
            hovered: false,
            btnHovered: false,
        }
    },

    mounted() {
        this.errorsChanged(this.errors);
    },
}
</script>
