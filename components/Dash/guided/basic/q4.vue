<template>
<div>

    <h2 v-html="tr('cp-basic-q5')" />

    <EFormTextArea
        inputStyle="min-height: 150px;"
        eClass="ml-10 mr-10 mt-5 mb-5"
        :row="12"
        :placeholder="tr('the-who-will-use-help')"
        v-model="proj.roles"
    />

</div>
</template>

<script>
export default {
    props: {
        proj: Object,
    },
}
</script>