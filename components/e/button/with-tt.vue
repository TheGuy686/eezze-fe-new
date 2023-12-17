<template>
<a-tooltip :placement="toolTipPlacement">

    <template slot="title" v-if="toolTipText != ''">
        
        {{ toolTipText }}

    </template>

    <a-button
        :class="eClass"
        :style="eStyle" 
        :size="size" 
        :type="type"
        :disabled="disabled"
        :loading="loading"
        @click="$emit('click')"
    >
        {{ btnText }}

    </a-button>

</a-tooltip>
</template>

<script lang="ts">
export default {
    props: {
        eStyle: {
            type: String,
            default: '',
        },
        eClass: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: 'small'
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'primary'
        },
        toolTipPlacement: {
            type: String,
            default: 'right',
        },
        toolTipText: {
            type: String,
            required: true,
        },
        btnText: {
            type: String,
            default: 'Button'
        },
    },
}
</script>