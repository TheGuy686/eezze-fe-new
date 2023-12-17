<template>
<div>

    <a-page-header :title="tr('datasources')" non-sel />
    
    <TablePaginated
      :showRowCheckboxs="false"
      :data="entities"
      :actions="actions"
      :columns="columns"
      :showNewButton="true"
      :loading="isDoingRequest"
      :showTableBorder="true"
      :isDoingDeleteRequest="isDoingDeleteRequest"
      :deleteTitle="tr('datasource')"
      @action-view-clicked="(ds) => {
        $router.push({ 
          path: `/${$route.params.id}/connection/${ds?.metadata?.configuration ?? ds?.metadata?.connection ?? -1}`
        })
      }"
      @action-new-clicked="$refs['mdl'].show()"
      @action-edit-clicked="$refs['mdl'].show($event)"
      @action-delete-clicked="$store.commit('project/data-sources/setDeleteEntity', $event)"
      @action-delete-confirmed="$store.dispatch('project/data-sources/deleteEntity', {...$event, projectId: $route.params.id})"
    >
      <template slot="header-buttons">

        <a-button @click="$refs['ds-presets-drawer'].show()">
          
          	{{ tr('presets') }}
          
        </a-button>

      </template>

    </TablePaginated>

    <DatasourceCreateEditModal ref="mdl" />

    <DatasourcePresetsDrawer ref="ds-presets-drawer" />

</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import DatasourceModel from '~/models/DatasourceModel';

export default {
  beforeMount() {
    const pms = { ...this.$route.query };

    if (typeof pms['showEezzeLoggerTut'] == 'string') {
      this.showEezzeLoggerTut = pms['showEezzeLoggerTut'] == 'true';

      delete pms.showEezzeLoggerTut;
  
      this.$router.replace({ query: pms });
    }
  },

  computed: {
    ...mapState('project/data-sources', [
      'entities', 
      'isDoingRequest',
      'isDoingDeleteRequest'
    ])
  },

  data() {
    return {
      columns: DatasourceModel.getColumns(),
      actions: [
				{
					action: 'view',
					icon: 'eye'
				},
				{
					action: 'edit',
					icon: 'edit'
				},
				{
					action: 'delete',
					icon: 'dustbin'
				}
			],
      showEezzeLoggerTut: false,
    }
  },

  mounted() {
    if (this.showEezzeLoggerTut) {
      this.$eventBus.$emit('show-create-logger-datasource');
    }
  },

  methods: {
    ...mapMutations({ 
      setEntityProp: 'project/data-sources/setEntityProp',
    }),
  }
}
</script>
