<style lang="less" scoped>
.service-group-type-root {
    .title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        margin-top: -10px;
    }
}
</style>

<template>
<div class="service-group-type-root">

    <h1 class="title">

        {{ tr('service-group-type') }}

    </h1>

    <GeneralBeveledGrid>

        <GeneralBeveledGridItem
            :id="item.key"
            :title="item.name"
            :value="[ entity?.type ]"
            @input="setEntityProp({key: 'type', value: $event[0]})"
            :key="index"
            v-for="(item, index) in serviceGroupTypes"
        />

    </GeneralBeveledGrid>

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('project/service-groups', [ 'entity' ]),
        ...mapState('cms/service-group-types', {
            serviceGroupTypes: (state) => state?.entities ?? [],
        }),
    },
    data() {
        return {
            selectedKeys: [ 'custom' ],
        }
    },
    methods: {
        ...mapMutations({
            setEntityProp: 'project/service-groups/setEntityProp',
        }),
    },
}
</script>
