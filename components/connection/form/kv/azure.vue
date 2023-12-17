<style lang="less" scoped>

</style>

<template>
<e-row>

    Azure

    {{ entity }}

</e-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {

    },
    computed: {
        ...mapState('project/connections', [ 'entity' ]),
    },
    methods: {
        ...mapMutations({
            setEntityProp: 'project/connections/setEntityProp',
        }),
    }
}
</script>
