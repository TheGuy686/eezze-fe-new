<style lang="less" scoped>

</style>

<template>
<div class="pl-5">

    Set Stash Values item

</div>
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
        isVisible() {
            return this.item.id == this.filterId && this.item.type == 'set-stash-values';
        }
    },
    data() {
        return {
            selectedKeys: [],
        }
    }
}
</script>