<style lang="less" scoped>
.tabs-cont {
    padding-right: 5px;
}

.dev-btn {
    position: absolute;
    top: -55px;
    right: 45px;
}
</style>

<template>
<EModal
    ref="mdl"
    :width="1000"
    :title="tr('property-bl-chain', {args: [currentAction?.property]})"
    @modal-closed="modelClosed()"
    @right-btn-clicked="confirmSave()"
>
    <a-tabs class="tabs-cont" v-model="activeKey">

        <a-tab-pane key="action-info" :tab="tr('action-information')">

            <EFormBlActionChainTabInfoContent
                ref="action-info-tab"
                :prop="prop" 
                :type="type" 
                :currentAction="currentAction"
            />

        </a-tab-pane>

        <a-tab-pane key="action-chain-logic" :tab="tr('action-logic')" :disabled="!canAddLogic">

            <EFormBlActionChainTabLogicContent
                :prop="prop"
                :type="type"
                :currentAction="currentAction"
                :errors="errors"
                :errorsChanged="errorsChanged"
                :hiddenSections="hiddenSections"
                @model-changed="$emit('model-changed', $event)"
            />

        </a-tab-pane>

    </a-tabs>

</EModal>
</template>

<script>
import { ref } from 'vue';
import BlLogicModel from '~/models/BlLogicChain';

export default {
    props: {
        prop: {
            type: String,
            require: true,
        },
        type: {
            type: String,
            require: true,
        },
        filterId: String,
        filteredItem: Object,
    },

    beforeUnmount() {
        if (this.counterTmr) clearInterval(this.counterTmr);
    },

    computed: {
        currentAction() {
            if (typeof this.filteredItem == 'object' && Object.keys(this.filteredItem).length > 0) {
                return this.filteredItem;
            }

            return this.newItem ?? {};
        },

        logicMdl() { return this.currentAction?.actions ?? [] },

        canAddLogic() {
            return this?.currentAction?.name != '' && this?.currentAction?.type != '';
        },
    },

    data() {
        return {
            counter: 0,
            counterTmr: null,

            errors: [],
            // activeKey: ref('action-info'),
            activeKey: ref('action-chain-logic'),
            newItem: null,
            hiddenSections: [],
            forcedHiddenSections: [
                'state',
                'stash',
                'assign-values',
                'list',
                // 'number-operation',
                'formatter',
            ],
        }
    },

    mounted() {
        this.counterTmr = setInterval(() => this.counter++, 2000);
    },

    methods: {
        getNewItemDefault() {
            return {
                id: `action-${this.logicMdl.length}`,
                property: this.prop,
                name: 'New Item Default',
                desc: 'New Item Default Desc',
                type: this.type + '',
                actions: [],
            };
        },
        show(hiddenSections) {
            if (Array.isArray(hiddenSections) && hiddenSections.length > 0) {
                this.hiddenSections = hiddenSections;
            }

            for (const t of this.forcedHiddenSections) {
                if (this.hiddenSections.includes(t)) continue;
                this.hiddenSections.push(t);
            }

            if (typeof this.filteredItem != 'object' || Object.keys(this.filteredItem).length == 0) {
                this.newItem = this.getNewItemDefault();
            }

            this.$refs['mdl'].show();
        },
        hide() {this.$refs['mdl'].hide()},
        errorsChanged(errors) {
            for (let error of errors) {
                const index = this.errors.indexOf(error);

                if (index == -1) {
                    this.errors.push(error);
                }
                else this.errors.shift(index);
            }
        },
        confirmSave() {
            this.$emit('save-clicked', {...this.newItem});
            this.$emit('save-current', BlLogicModel.create({...this.currentAction}));

            this.hide();
        },
        modelClosed() {
            try {
                this.hiddenSections = [];
                this.newItem = null;
            }
            catch (err) {
                console.log('There was an error reseting the defaults: ', this.$refs['action-info-tab']);
            }
        }
    },
}
</script>
