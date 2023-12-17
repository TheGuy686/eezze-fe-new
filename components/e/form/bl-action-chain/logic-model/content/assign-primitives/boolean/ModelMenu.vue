<style lang="less" scoped>
.icn-down-arrow {
    margin-left: 5px;
}

.mdl-menu-root {
    .item {
        
    }

    .item-disabled {
        color: rgba(0, 0, 0, 0.2);

        &:hover {
            cursor: not-allowed;
            background-color: transparent;
        }
    }
}
</style>

<template>
<a-dropdown>

    <a-button :class="hasValue ? 'primary-border' : ''" size="small">

        <span :class="hasValue ? 'primary-text' : ''">
            
            {{ value ? value?.value : tr('source') }}
            
        </span>

        <GeneralIcon class="icn-down-arrow" :type="hasValue ? 'down-arrow-blue-xxsm' : 'down-arrow-black-xxsm'" />

    </a-button>
                            
    <template #overlay>
        
        <a-menu class="mdl-menu-root" @click="handleMenuClick">

            <a-menu-item 
                :class="!isLastItem ? 'item-disabled' : 'item'" 
                :key="item.id"
                v-for="item in menu"
            >

                <a-tooltip placement="topRight" :title="tr('can-not-re-assign-previously-assigned-vars')" v-if="!isLastItem">

                    {{ tr(item.id) }}

                </a-tooltip>

                <span v-else>{{ tr(item.id) }}</span>

            </a-menu-item>
            
        </a-menu>

    </template>

</a-dropdown>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            require: true,
        },
        value: {
            type: Object,
            require: true,
        },
        isLastItem: {
            type: Boolean,
            require: true,
        }
    },
    computed: {
        hasValue() {
            return !!this.value;
        }
    },
    data() {
        return {
            menu: [
                {
                    id: 'add-variable',
                },
                {
                    id: 'add-number',
                },
                {
                    id: 'add-string',
                }
            ],
        }
    },
    methods: {
        handleMenuClick(e) {
            if (!this.isLastItem) return;

            this.$emit('input', { 
                id: this.item.id, 
                type: 'variable', 
                value: '$1'
            });

            switch (e.key) {
                case 'add-variable':
                    
                    break;

                case 'add-number':

                    break;

                case 'add-string':

                    break;
            }
        },
    }
}
</script>
