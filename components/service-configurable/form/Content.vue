<style scoped>

</style>

<template>
<a-form-model>

    <EFormInput
        class="mt-5"
        :name="tr('name')"
        :message="tr('please-input-a-name')"
        inputCase="titleCase"
        :value="entity?.name"
        @input="setEntityProp({key: 'name', value: $event})"
    />

    <EFormInput
        class="mt-5"
        :name="tr('description')"
        :message="tr('please-input-a-description')"
        :value="entity?.description"
        @input="setEntityProp({key: 'description', value: $event})"
    />

</a-form-model>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('project/service-configurables', ['entity']),
    },

    methods: {
        ...mapMutations({
            setEntityProp: 'project/service-configurables/setEntityProp',
        }),
    }
};
</script>
