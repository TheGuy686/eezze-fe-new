<template>
<div>

    Service Configurables <b>"{{ message }}"</b>

</div>
</template>

<script>
export default {
    data() {
        return {
            message: 'Jasper is a wussy'
        }
    },

    mounted() {
        console.log('One min:', this.$auth);
    }
}
</script>
