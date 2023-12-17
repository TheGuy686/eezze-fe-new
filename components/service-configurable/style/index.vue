<template>
<e-col class="pt-5">

    <h1 non-sel>{{ tr(editingStyle?.key ?? '') }}</h1>

    <ServiceConfigurableStyleGeneral
        ref="general-styles"
        :currentStyleTab="currentStyleTab"
        :editingStyle="editingStyle"
        @style-changed="$emit('style-changed', $event)"
    />

</e-col>
</template>

<script>
export default {
    props: {
        currentStyleTab: String,
        editingStyle: {
            type: Object,
            required: true,
        }
    },
    methods: {
        setInitValues() {
            const w = this.$refs['general-styles'];

            setTimeout(() => w.setInitValues(), 500);

            setTimeout(() => w.setInitValues(), 1000);

            setTimeout(() => w.setInitValues(), 1500);

            setTimeout(() => w.setInitValues(), 1800);
        }
    }
}
</script>
