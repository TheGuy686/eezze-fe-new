<style lang="less" scoped>
.add-var-btn {
    margin-top: 5px;
}
</style>

<template>
<a-dropdown>

    <a-button 
        class="add-var-btn" 
        type="primary" 
        shape="circle" 
        size="small" 
    >

        <GeneralIcon type="plus-white" />

    </a-button>

    <template #overlay>
        
        <a-menu @click="handleMenuClick">

            <a-menu-item :key="item.id" v-for="item in menu">

                {{ tr(item.id) }}

            </a-menu-item>
            
        </a-menu>

    </template>

</a-dropdown>
</template>

<script>
export default {
    props: {
        isLinker: {
            type: Boolean,
            default: false,
        },
        list: {
            type: Array,
            require: true,
        },
    },
    computed: {
        menu() {
            return this.isLinker && this.list.length > 0 ? this.linkerMenu : this.conditionsMenu;
        }
    },
    data() {
        return {
            conditionsMenu: [
                { id: 'add-condition' },
                { id: 'add-condition-group' },
            ],
            linkerMenu: [
                { id: 'add-and' },
                { id: 'add-or' },
                { id: 'add-xor' },
            ],
        }
    },
    methods: {
        handleMenuClick(e) {
            switch (e.key) {
                case 'add-condition':
                    this.list.push({
                        type: 'condition',
                        operator: '',
                        opArgs: []
                    });

                    break;

                case 'add-condition-group':
                    this.list.push({
                        type: 'condition-group',
                        opArgs: [],
                        group: [],
                    });

                    break;

                case 'add-and':
                    this.list.push({
                        type: 'linker',
                        operator: 'and',
                        opArgs: [],
                    });
                    break;

                case 'add-or':
                    this.list.push({
                        type: 'linker',
                        operator: 'or',
                        opArgs: [],
                    });
                    break;

                case 'add-xor':
                    this.list.push({
                        type: 'linker',
                        operator: 'xor',
                        opArgs: [],
                    });
                    break;

                default: this.list.push({
                    type: 'linker',
                    operator: '',
                    opArgs: [],
                });
            }
        },
    }
}
</script>
