<style scoped>
.form-div {
    height: 100%;
    width: 1px;
    background-color: #d9d9d9;
    margin-left: 10px;
}
</style>

<template>
<a-form-model style="flex: 4; margin-top: -20px;" layout="vertical">

    <EFormInput
        :name="tr('name')"
        :message="tr('please-input-a-name')"
        inputCase="titleCase"
        :value="entity.name"
        @input="setEntityProp({key: 'name', value: $event})"
        class="mt-5"
    />

    <EFormInput
        class="mt-5 mb-20"
        :name="tr('description')"
        :message="tr('please-input-a-description')"
        :value="entity.description"
        @input="setEntityProp({key: 'description', value: $event})"
    />

</a-form-model>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('project/service-groups', ['entity']),
    },
    methods: {
        ...mapMutations({
            setEntityProp: 'project/service-groups/setEntityProp',
        }),
    }
};
</script>
