<template>
<div>

    <a-page-header :title="tr('tasks')"/>

    <!-- <span @click="emitEditingProject(1)">Click me</span> -->

    <TasksBoard />

</div>
</template>

<script lang="ts">
import { mapState, mapMutations } from 'vuex';

export default {
    layout: 'management',
    computed: {...mapState('project/roles', [
        'entities',
        'isDoingRequest',
        'isDoingDeleteRequest',
    ])},
    methods: {
        ...mapMutations({
            emitEditingProject: 'app/emitEditingProject',
        }),
    }
}
</script>
