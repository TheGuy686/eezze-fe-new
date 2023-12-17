<template>
<e-col>

    <span class="info">{{ tr('transfer-info-1') }}</span>

    <a-alert
        class="warn-alert"
        :description="tr('transfer-warn')"
        type="warning"
        show-icon
    />

    <span class="title">{{ tr('transfer-steps-title') }}</span>

    <span class="info">{{ tr('transfer-steps-1') }}</span>
    <span class="info">{{ tr('transfer-steps-2') }}</span>
    <span class="info">{{ tr('transfer-steps-3') }}</span>

</e-col>
</template>

<script lang="ts">
import { mapMutations, mapState } from 'vuex';

export default {
    computed: {
        ...mapState('project/proj' , [ 'entity' ]),
    },

    data() {
        return {

        }
    },

	methods: {

	}
};
</script>