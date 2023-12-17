<style lang="less" scoped>
.linker-root {
    .del-btn {
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        right: -12.5px;
        top: -15px;
        opacity: 0;

        .icn {
            position: absolute;
            left: 2px;
            top: 2px;
        }

        &:hover {
            background-color: rgb(151, 3, 3);
            cursor: pointer;
        }
    }

    &:hover  {
        .del-btn {
            opacity: 1;
        }
    }
}
.active {
    background-color: #e6f7ff;
}
</style>

<template>
<e-row class="linker-root" :center="true">

    <a-dropdown>
    
        <a-button
            class="add-var-btn"
            type="primary"
            size="small"
        >

            {{ conditionItem?.operator ? conditionItem?.operator.toUpperCase() : tr('choose') }}

        </a-button>

        <template #overlay>

            <a-menu @click="handleMenuClick">

                <a-menu-item
                    :key="op.id"
                    :class="conditionItem?.operator == op.id ? 'active' : ''"
                    v-for="op in booleanLinkOperattions"
                >

                    {{ op.title }}

                </a-menu-item>
                
            </a-menu>

        </template>

    </a-dropdown>

    <div class="del-btn" @click="$emit('delete-item')">

        <GeneralIcon clss="icn" type="close-xsm-white" />

    </div>

</e-row>
</template>

<script>
import {mapState} from 'vuex';

export default {
    props: {
        conditionItem: {
            type: Object,
            require: true,
        },
    },
    computed: {
        ...mapState('cms/actions/bs-logic', [
            'booleanLinkOperattions'
        ]),
    },
    methods: {
        handleMenuClick(e) {
            this.conditionItem.operator = e.key;
        },
    },
}
</script>