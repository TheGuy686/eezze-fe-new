<style lang="less" scoped>
.return-type-cont {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    height: 40px;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    span { margin-right: 10px; }
}
</style>

<template>
<div class="return-type-cont" non-sel>

    <span>{{ label }}:</span>

    <span>{{ value }}</span>

</div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            require: true,
        },
        value: {
            type: String,
            require: true,
        },
    },
}
</script>
