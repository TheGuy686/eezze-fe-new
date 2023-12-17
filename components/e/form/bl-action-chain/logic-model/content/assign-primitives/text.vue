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

            <a-col a-center>

                {{ tr('text-value') }}

            </a-col>

            <a-col>

                <EFormInput
                    name="static-string-value"
                    :inlineOver="true"
                    v-model="item.logic.raw"
                />

            </a-col>

        </a-row>

    </div>

    <div class="root-assign-prim-text" bev-cont>

        <a-col>

            <h3 class="title">{{ tr('assign-text-value') }}</h3>

            <p>

                {{ tr('assign-text-value-desc') }}

            </p>

        </a-col>

    </div>

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
    }
}
</script>
