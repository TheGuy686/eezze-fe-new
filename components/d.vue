<template>
<json-viewer
    :expand-depth="expandDepth"
    copyable
    :value="d"
/>
</template>

<script>
export default {
    props: {
        d: {
            require: true,
        },
        expandDepth: {
            type: Number,
            default: 10
        }
    }
}
</script>
