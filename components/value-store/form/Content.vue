<style scoped>

</style>

<template>
<a-form-model>

    <EFormInput
        class="mt-5"
        :name="tr('key')"
        :message="tr('please-input-a-key')"
        inputCase="upperUnderscoreCase"
        :value="entity?.key"
        @input="setEntityProp({ key: 'key', value: $event })"
    />

    <EFormInput
        class="mt-5"
        :name="tr('value')"
        :message="tr('please-input-a-value')"
        :type="entity?.type"
        :changableTypes="true"
        :value="entity.value"
        @input="setEntityProp({ key: 'value', value: $event })"
        @type-changed="setEntityProp({ key: 'type', value: $event })"
    />

</a-form-model>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('project/value-store', [ 'entity' ]),
    },

    methods: {
        ...mapMutations({
            setEntityProp: 'project/value-store/setEntityProp',
        }),
    }
};
</script>