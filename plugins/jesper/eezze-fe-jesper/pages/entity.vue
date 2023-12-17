<template>
<div>

    <!-- Entities <b>"{{ message }}"</b> RYAN -->

    <visual-entity-editor />

</div>
</template>

<script>
import VisualEntityEditor from '@/plugins/visual-entity-editor';

export default {
    components: { VisualEntityEditor },
    computed: {

    },

    data() {
        return {
            message: 'Hello Jesper'
        }
    },

    mounted() {
    }
}
</script>
