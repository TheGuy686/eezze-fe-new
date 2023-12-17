<template>
    <div>
      <a-page-header title="Datasource Type" />
  
      <TablePaginated
        :data="entities"
        :columns="columns"
        :showNewButton="true"
        :loading="isDoingRequest"
        deleteTitle="Datasource Type"
        :isDoingDeleteRequest="isDoingDeleteRequest"
        @action-new-clicked="$refs['mdl'].show()"
        @action-edit-clicked="$refs['mdl'].show($event)"
        @action-delete-clicked="$store.commit('project/datasource-types/setDeleteEntity', $event)"
        @action-delete-confirmed="$store.dispatch('project/datasource-types/deleteEntity', $event)"
      />
  
      <DatasourcetypeCreateEditModal ref="mdl" />
  
    </div>
  </template>
  
  <script lang="ts">
  import RoleModel from '~/models/DatasourceTypeModel';
  
  import {mapState} from 'vuex';
  
  export default {
    name: 'Roles',
    middleware: 'auth',
  
    computed: {...mapState('project/datasource-types', [
          'entities', 
          'isDoingRequest',
          'isDoingDeleteRequest',
      ])},
  
      data() {return {columns: [...RoleModel.getColumns()]}},
  }
  </script>
  