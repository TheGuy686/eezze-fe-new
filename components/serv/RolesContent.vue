<template>
<div>

    <TablePaginated
        :data="roles"
        :columns="roleColumns"
        :showRowCheckboxs="true"
        :showSearch="false"
        :showActions="false"
        :showTableBorder="false"
        :checkedBoxes="entity?.definition?.roles"
        @on-select-changed="roleSelected"
    />

</div> 
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import RoleModel from '~/models/RoleModel';

export default {
    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('project/roles', {
            roles: (state) => state?.entities ?? [],
        }),
    },
    data() {
        return {
            roleColumns: [...RoleModel.getColumns(['key'])],
        }
    },
    methods: {
        roleSelected(selection) {
            const ent = {...this.entity},
                  roles = Object.values(selection.selectedRowKeys);

            ent.definition = {
                ...(ent?.definition ?? {}),
                roles,
            };

            Vue.set(this?.entity?.definition, 'roles', Object.values(selection.selectedRowKeys));

            this.$emit('save-entity-changes', ent);
        },
    }
}
</script>
