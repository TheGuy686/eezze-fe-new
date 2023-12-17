<template>
<div :style="`${(type == 'vertical' ? 'height' : 'width')}: ${Number(size)}px`"></div>
</template>

<script>
const TYPES = [ 'horizontal', 'vertical'];

export default {
    props: {
        type: {
            type: String,
            default: 'vertical',
            validator: (value) => TYPES.includes(value)
        },
        size: {
            type: Number | String,
            default: 10,
        }
    }
}
</script>
