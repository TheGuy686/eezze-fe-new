<style lang="less" scoped>
._grid-cont {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>

<template>
<div :class="'_grid-cont ' + (clss ? clss : '')" :stle="'grid-cont ' + (stle ? stle : '')">

    <slot></slot>

</div>
</template>

<script>
export default {
    name: 'bevel-grid-container',
    props: {
        clss: String,
        stle: String,
        value: String,
    },
}
</script>