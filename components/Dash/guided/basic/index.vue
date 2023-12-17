<template>
<div>

    <!-- <DashGuidedBasicQ1 v-if="current == 0" /> -->

    <DashGuidedBasicQ2
        :proj="value"
        v-if="current == 0"
    />

    <DashGuidedBasicQ3
        ref="q3"
        :proj="value"
        v-else-if="current == 1"
    />

    <DashGuidedBasicQ4
        :proj="value"
        v-else-if="current == 2"
    />

    <DashGuidedBasicQ5
        :proj="value"
        v-else-if="current == 3"
    />

    <DashGuidedBasicQ6
        :proj="value"
        v-else-if="current == 4"
    />

    <DashGuidedBasicQ7
        :proj="value"
        :toggleItemComingSoon="toggleItemComingSoon"
        v-else-if="current == 5"
    />

</div>
</template>

<script>
import Vue from 'vue';
import VaultModel from '~/models/VaultModel';

export default {
    props: {
        current: Number,
        toggleItemComingSoon: Function,
        value: Object,
    },
}
</script>