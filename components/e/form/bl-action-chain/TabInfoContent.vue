<style lang="less" scoped>

</style>

<template>
<a-col>

    <EFormInput
        :name="tr('name')"
        :message="tr('input-an-action-name')"
        class="mt-5" 
        v-model="currentAction.name"
    />

    <EFormSelect 
        :name="tr('action-type')" 
        :placeholder="tr('select-a-type')"
        keyProp="id"
        valueProp="name"
        :options="actionTypes"
        class="mt-5"
        v-model="currentAction.type"
    />

</a-col>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        prop: {
            type: String,
            require: true,
        },
        type: {
            type: String,
            require: true,
        },
        currentAction: {
            type: Object,
            require: true,
        },
    },
    computed: {
        ...mapState('cms/actions/bs-logic', ['actionTypes']),
    },
}
</script>
