<template>
    <div>
      <a-page-header title="Response Code" />
  
      <TablePaginated
        :data="entities"
        :columns="columns"
        :showNewButton="true"
        :loading="isDoingRequest"
        :isDoingDeleteRequest="isDoingDeleteRequest"
        deleteTitle="Response Code"
        @action-new-clicked="$refs['mdl'].show()"
        @action-edit-clicked="$refs['mdl'].show($event)"
        @action-delete-clicked="$store.commit('project/response-codes/setDeleteEntity', $event)"
        @action-delete-confirmed="$store.dispatch('project/response-codes/deleteEntity', $event)"
      />
  
      <ResponsecodeCreateEditModal ref="mdl" />
  
    </div>
  </template>
  
  <script lang="ts">
  import RoleModel from '~/models/ResponseCodeModel';
  
  import {mapState} from 'vuex';
  
  export default {
    name: 'Roles',
    middleware: 'auth',
  
    computed: {...mapState('project/response-codes', [
          'entities', 
          'isDoingRequest',
          'isDoingDeleteRequest',
      ])},
  
      data() {return {columns: [...RoleModel.getColumns()]}},
  }
  </script>
  