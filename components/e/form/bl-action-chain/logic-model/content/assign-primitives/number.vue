<style lang="less" scoped>
.root-assign-prim-text {
    margin-top: 5px; 

    .cont {
        padding: 5px;
    }

    .title {
        margin-top: 8px;    
    }
}
</style>

<template>
<div>
    <div class="root-assign-prim-text" bev-cont>

        <a-row class="cont">

            <EFormBlActionChainLogicModelContentCStringInterperlate
                :item="item"
                returnType="number"
                @about-to-add-var="$emit('about-to-add-var')"
            />

        </a-row>

    </div>

    <div class="root-assign-prim-text" bev-cont>

        <a-col>

            <h3 class="title">{{ tr('assign-number-value') }}</h3>

            <p>

                {{ tr('assign-number-value-desc') }}

            </p>

        </a-col>

    </div>

    <EFormBlActionChainLogicModelContentCSampleResult
        :title="tr('sample-formula')"
        :hoveringItem="hoveringItem"
        :value="item"
    />

</div>
</template>

<script>
export default {
    props: {
        item: {
            require: true,
        },
        previousAssignmentsMenu: {
            type: Object,
            require: true,
        },
        hoveringItem: {
            type: Number | String,
            require: true,
        },
    }
}
</script>
