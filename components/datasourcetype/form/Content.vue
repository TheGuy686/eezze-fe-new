<style scoped>
.form-div {
    height: 100%;
    width: 1px;
    background-color: #d9d9d9;
    margin-left: 10px;
}
</style>

<template>
<a-form-model style="flex: 4; margin-top: -20px;">

    <EFormInput
        class="mt-5"
        :name="tr('name')"
        :message="tr('please-input-a-name')"
        :value="entity.name"
        @input="setEntityProp({key: 'name', value: $event})"
    />

    <EFormSelect
        class="mt-7"
        :name="tr('type')"
        :placeholder="tr('select-a-type')"
        keyProp="key"
        valueProp="name"
        :options="enabledTypes"
        :value="entity.enabled"
        @input="setEntityProp({key: 'enabled', value: $event})"
    />

    <EFormInput
        name=""
        class="mt-5 mb-20"
        :message="tr('please-input-a-description')"
        :value="entity.type"
        @input="setEntityProp({key: 'type', value: $event})"
    />

</a-form-model>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        key() {
            return 'role-' + String(self?.entity?.role).toLowerCase().replace(/_/g, '-');
        },
        ...mapState('project/datasource-types', ['entity']),
    },

    data() {
        return {
            enabledTypes: [
                {
                    key: 'true',
                    name: "true"
                },
                {
                    key: 'false',
                    name: "false"
                }
            ]
        }
    },

    methods: {
        ...mapMutations({
            setEntityProp: 'project/datasource-types/setEntityProp',
        }),
    }
};
</script>
