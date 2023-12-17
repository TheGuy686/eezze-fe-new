<style scoped>

</style>

<template>
<a-form-model>

    <EFormInput
        class="mt-5"
        :name="tr('title')"
        :message="tr('please-input-a-title')"
        :value="entity?.title"
        @input="setEntityProp({key: 'title', value: $event})"
    />

</a-form-model>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('cms/bl-action-types', ['entity']),
    },

    methods: {
        ...mapMutations({
            setEntityProp: 'cms/bl-action-types/setEntityProp',
        }),
    }
};
</script>
