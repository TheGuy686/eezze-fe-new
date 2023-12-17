<template>
<a-tooltip :placement="toolTipPosition" v-if="helpText">

    <template #title>

        <span>{{ helpText }}</span>
        
    </template>

    <h3>{{ text }}</h3>

</a-tooltip>
<h3 v-else>{{ text }}</h3>
</template>

<script>
export default {
    props: {
        text: String,
        helpText: String,
        toolTipPosition: {
            type: String,
            default: 'right'
        }
    }
}
</script>