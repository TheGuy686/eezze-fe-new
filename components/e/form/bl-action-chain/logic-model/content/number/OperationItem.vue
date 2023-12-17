<template>
<EFormBlActionChainLogicModelContentNumberCalculation
    ref="current-selection"
    :item="item" 
    :logicTypes="logicTypes"
    :filterId="filterId"
    v-if="fullKey == 'number-operation-calculation'"
/>
<e-col v-else-if="item?.type == 'number-operation'">

    <EFormBlActionChainLogicModelContentCNumberOperation
        :isHorizontal="true"
        :item="item"
        @example-result-changed="exampleResultOverride = $event"
    />

</e-col>
</template>

<script>
export default {
    props: {
        filterId: {
            type: String,
            require: true,
        },
        logicTypes: {
            type: Array,

            require: true,
        },
        item: {
            type: Object,
            require: true,
        },
    },
    computed: {
        fullKey() {
            try {
                return `${this.item?.type}-${this.item?.logic?.subtype}`;
            }
            catch (err) { return 'na' }
        }
    },
    data() {
        return {
            exampleResultOverride: '',
            hoveringItem: '',
        }
    }
}
</script>