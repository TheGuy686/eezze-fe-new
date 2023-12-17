<style scoped>

</style>

<template>
<a-form-model>

    <EFormInput
        class="mt-5"
        :name="tr('name')"
        :message="tr('please-input-a-name')"
        :value="name"
        @input="setEntityProp({key: 'name', value: $event})"
    />

</a-form-model>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('cms/linters', ['entity']),
    },

    methods: {
        ...mapMutations({
            setEntityProp: 'cms/linters/setEntityProp',
        }),
    }
};
</script>
