<template>
<div>

    <a-steps direction="vertical" status="error" size="small" :current="1" v-model="current">

        <a-step title="Login" description="This is a description." />

        <a-step status="finish" title="Verification" description="This is a description." />

        <a-step status="error" title="Pay" description="This is a description." />

        <a-step status="process" title="Done" description="This is a description." />

    </a-steps>

</div>
</template>

<script>
export default {
    data() {
        return {
            current: 0,
        }
    }
}
</script>