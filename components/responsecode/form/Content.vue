<style scoped>
.form-div {
    height: 100%;
    width: 1px;
    background-color: #d9d9d9;
    margin-left: 10px;
}
</style>

<template>
    <a-form-model style="flex: 4; margin-top: -20px;" v-bind="formLayout" layout="vertical">

        <EFormInput
            name="Name"
            message="Please input a name"
            :value="entity.name"
            @input="setEntityProp({key: 'name', value: $event})" 
            class="mt-5" />

        <EFormSelect
            name="Enabled"
            placeholder="Select a type"
            keyProp="key"
            valueProp="name"
            :options="enabledTypes"
            :value="entity.enabled"
            @input="setEntityProp({key: 'enabled', value: $event})"
            class="mt-5"
        />

        <EFormInput 
            name="Description" 
            message="Please input a description"
            :value="entity.description"
            @input="setEntityProp({key: 'description', value: $event})" 
            class="mt-5" />

        <EFormInput 
            name="Code" 
            message="Please input a description"
            :value="entity.code"
            @input="setEntityProp({key: 'code', value: $event})" 
            class="mt-5 mb-5" />

    </a-form-model>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        key() {
            return 'role-' + String(self?.entity?.role).toLowerCase().replace(/_/g, '-');
        },
        
        ...mapState('project/general/forms', ['formLayout']),
        ...mapState('project/response-codes', ['entity']),
    },

    data() {
        return {
            enabledTypes: [
                {
                    key: '1',
                    name: "true"
                },
                {
                    key: '0',
                    name: "false"
                }
            ]
        }
    },

    methods: {
        ...mapMutations({
            setEntityProp: 'project/response-codes/setEntityProp',
        }),
    }
};
</script>
