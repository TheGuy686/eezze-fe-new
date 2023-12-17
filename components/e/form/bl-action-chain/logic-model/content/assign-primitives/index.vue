<style lang="less" scoped>

</style>

<template>
<div>

    <EFormBlActionChainLogicModelContentAssignPrimitivesText
        :item="item"
        :previousAssignmentsMenu="previousAssignmentsMenu"
        v-if="item?.logic?.subtype == 'text'"
    />

    <EFormBlActionChainLogicModelContentAssignPrimitivesNumber
        :item="item"
        :previousAssignmentsMenu="previousAssignmentsMenu"
        :hoveringItem="hoveringItem"
        @about-to-add-var="$emit('about-to-add-var')"
        v-else-if="item?.logic?.subtype == 'number'"
    />

    <EFormBlActionChainLogicModelContentAssignPrimitivesBoolean
        :item="item"
        :previousAssignmentsMenu="previousAssignmentsMenu"
        v-else-if="item?.logic?.subtype == 'boolean'"
    />

    <EFormBlActionChainLogicModelContentAssignPrimitivesDate
        :item="item"
        :previousAssignmentsMenu="previousAssignmentsMenu"
        v-else-if="item?.logic?.subtype == 'date'"
    />

    <EFormBlActionChainLogicModelContentAssignPrimitivesObject
        ref="assign-object"
        :item="item"
        :previousAssignmentsMenu="previousAssignmentsMenu"
        v-else-if="item?.logic?.subtype == 'object'"
    />

    <EFormBlActionChainLogicModelContentAssignPrimitivesList
        :item="item"
        :previousAssignmentsMenu="previousAssignmentsMenu"
        @example-result-changed="$emit('example-result-changed', $event)"
        v-else-if="item?.logic?.subtype == 'list'"
    />

    <a-col a-center v-else>{{ tr('invalid-primitive-type') }}</a-col>

</div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            require: true,
        },
        hoveringItem: {
            type: String | Number,
        },
        previousAssignmentsMenu: {
            type: Object,
            require: true,
        },
    },
    computed: {
    },
    methods: {
        addClicked() {
            this.$refs['assign-object'].addItem();
        }
    }
}
</script>
