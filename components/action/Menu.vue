<template>
<a-col class="side pt-10" :span="6" non-sel>

    <div e-scroll style="max-height: 90vh">

        <div class="max-h-screen bg-white">

            <div class='ml-5 mr-5'>

                <p class='inline font-bold text-lg text-black-1' @click="dev()">

                    {{ tr('action-categories') }}

                </p>

            </div>

            <a-menu
                id="main-menu"
                theme="light"
                mode="inline"
                :open-keys.sync="openCategories"
                v-model="openKeys"
            >
                <component
                    :is="'a-sub-menu'"
                    :key='act.id'
                    :title="tr(act.id)"
                    v-for="act in actionCategories"
                >
                    <a-menu-item
                        :key="`${act.id}_${child.id}`"
                        :style="child.style"
                        class="active-item"
                        v-for="child in act.children"
                        @click='selectAction(act.id, child.id)'
                    >

                        <p class="font-semibold ml-5">

                            {{ tr(child.id) }}

                        </p>

                    </a-menu-item>

                </component>

            </a-menu>

        </div>

        <!-- @ ACTION- RYAN: -->

        <!-- <d :d="actionStep" /> -->

    </div>

</a-col>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        value: Object,
        actionStep: Object,
    },
    computed: {
        ...mapState('project/actions', [ 'actionCategories' ]),
        ...mapState('project/services', [ 'entity' ]),
    },
    data() {
        return {
            openCategories: [ 'database' ],
            openKeys: [ 'database_get-one-and-update' ],
        };
    },
    beforeMount() {
        const asSchema = this.actionStep?.schema?._action;

        if (typeof asSchema == 'object' && Object.keys(asSchema).length > 0) {
            this.openCategories = [ asSchema.category ];

            this.openKeys = [ `${asSchema.category}_${asSchema.action}` ];

            this.$emit('input', {
                selectedAction: asSchema.category,
                selectedSubAction: asSchema.action,
            });
        }
        else if (typeof this.value == 'object' && Object.keys(this.value).length > 0) {
            this.openCategories = [ this.value.selectedAction ];

            this.openKeys = [
                `${this.value.selectedAction}_${this.value.selectedSubAction}`
            ];
        }
        else {
            this.$emit('input', {
                selectedAction: this.openCategories[0],
                selectedSubAction: 'get-one-and-update',
            });
        }
    },
    methods: {
        selectAction(action, subAction) {
            this.$emit('input', {
                selectedAction: action,
                selectedSubAction: subAction,
            });
        },
        dev() {
            console.clear();
            console.log('Service: ', JSON.stringify(this.entity?.logic[0]?.schema, null, 4));
        }
    }
}
</script>
