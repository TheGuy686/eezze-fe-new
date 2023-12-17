<template>
<a-form-model>

    <EFormInput
        class="mt-5"
        addonBefore="ROLE_"
        :name="tr('role')"
        :message="tr('please-input-a-name')"
        v-cases.upperUnderscoreCase
        :value="role"
        @input="setEntityProp({ key: 'role', value: 'ROLE_' + $event })"
    />

    <EFormInput
        class="mt-5"
        :name="tr('description')"
        :message="tr('please-input-a-description')"
        :value="entity?.description"
        @input="setEntityProp({ key: 'description', value: $event })"
    />

</a-form-model>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('project/roles', [ 'entity' ]),
        role() {
            return (this?.entity?.role ?? '')
                .replace(/^ROLE/, '')
                .replace(/^_ROLE/, '')
                .replace(/^_/, '')
                .toUpperCase()
                .trim()
                .replace(/ /g, '_');
        },
    },

    methods: {
        ...mapMutations({
            setEntityProp: 'project/roles/setEntityProp',
        }),
        setRole(value) {
            this.setEntityProp({ key: 'role', value: `ROLE_${value}` });
        },
    }
};
</script>