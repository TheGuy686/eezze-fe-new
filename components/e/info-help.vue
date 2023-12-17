<style lang="less" scoped>
.info-help-text {
    padding-top: 15px;
    color: rgba(0, 0, 0, 0.6);
    padding-right: 5px;
}

.help-dot {
    margin-top: 13px;
}
</style>

<template>
<e-row ai="c">

    <p class="info-help-text">{{ tr(trKey) }}</p>

    <GeneralIcon clss="help-dot" type="solid-input-help-prompt" />

</e-row>
</template>

<script>
export default {
    props: {
        trKey: String,
    }
}
</script>