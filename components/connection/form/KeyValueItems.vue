<template>
<a-form-model>

    <ConnectionFormKvServer v-if="entity?.type == 'server'" />

    <ConnectionFormKvAws v-else-if="entity?.type == 'aws'" />

    <ConnectionFormKvGpc v-else-if="entity?.type == 'gpc'" />

    <ConnectionFormKvAzure v-else-if="entity?.type == 'azure'" />

    <ConnectionFormKvManagedService v-else />

</a-form-model>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('project/connections', [ 'entity' ]),
    },
};
</script>
