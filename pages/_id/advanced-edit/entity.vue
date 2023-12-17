<style lang="less">
.pages-enities-root {
	.enitties-header-divider {
		margin-left: 15px;
		margin-right: 15px;
		border-left: 1px solid #e8e8e8;
	}

	.header-filters {
		flex-direction: row-reverse;
		position: absolute;
    	right: 0;
		top: 15px;
    	justify-content: center;
	}
}
</style>

<template>
<e-col class="pages-enities-root" jc="fe">

	<e-row style="margin-top: -25px;">

		<e-col jc="c" w-25>

			<a-page-header :title="tr('entity')" non-sel />

		</e-col>

		<e-row jc="fe" ai="c" w-75>

			<!-- <div class="pl-5 pr-5 pb-2">
	
				<EFormInput v-model="port" type="number" />
	
			</div>
	
			<a-button
				:style="`margin-top: ${4}px; margin-right: 5px;`"
				type="default"
				@click="$refs['erd-view'].refreshView()"
			>
	
				{{ tr('refresh-view') }}
	
			</a-button> -->
	
			<EFormSelect
				eStyle="margin-top: 7px; margin-right: 5px; width: 170px;"
				:name="tr('datasource')"
				:placeholder="tr('filter-a-datasource')"
				keyProp="id"
				valueProp="name"
				:showCreateAndSet="true"
				:options="filteredDss"
				:inlineOver="true"
				:selectFirstByDefault="true"
				:value="filterDatasource"
				@input="setDsFilter($event, 'select-input')"
				@create-and-set="createAndSet"
			/>
	
			<a-button
				:style="`margin-top: ${4}px; margin-right: 5px;`"
				:type="currentlyEditing ? 'primary' : 'default'"
				:disabled="entityViewIsLocked && !currentlyEditing"
				@click="entityViewIsLocked ? emitReleaseEntities(currentProject) : emitEditingEntities(currentProject)"
			>
				{{ editingBtnLabel }}
	
			</a-button>
	
			<a-button
				:style="`margin-top: ${4}px; margin-right: ${67}px`"
				type="primary"
				:loading="isDoingRequest"
				@click="$refs['erd-view'].saveModel()"
			>
				{{ tr('save') }}
	
			</a-button>

		</e-row>

	</e-row>

	<EntityPagesContentErView ref="erd-view" :devPort="port"  />

	<DatasourceCreateEditModal ref="mdl-ce-datasource" />

</e-col>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
const { FE_PORT_VEE } = require('@/env');

export default {
	layout: 'advanced-edit',
	props: {
		emitEntitySelectedEvents: {
			type: Boolean,
			default: false,
		}
	},
	watch: {
		datasources(to) {
			if (to.length == 0) return;
			if (this.filterDatasource != '' && this.filterDatasource != this.datasources?.[0].id) return;
			this.setDsFilter(this.filteredDss[0].id, 'watch-datasources');
		},
	},
	computed: {
		...mapState('project/data-sources', {
            datasources: (state) => state?.entities ?? [],
			filterDatasource: (state) => state?.filterDatasource,
			isDoingRequest: (state) => state?.isDoingRequest ?? false,
        }),
		...mapState('project/erd', {
			entities: (state) => state?.entities,
            isDoingEntityRequest: (state) => state?.isDoingEntityRequest ?? false,
			editingEntitySeshId: (state) => state.editingEntitySeshId,
        }),
		...mapGetters({
            filteredEntities: 'project/erd/filteredEntities',
			entityViewIsLocked: 'project/erd/entityViewIsLocked',
			currentlyEditing: 'project/erd/currentlyEditing',
		}),
		editingBtnLabel() {
			if (this.currentlyEditing) return tr('unlock');
			return tr(this.entityViewIsLocked ? 'locked-by-editor' : 'lock');
		},
		filteredDss() {
			return this.datasources.filter((ds) => this.dbTypeDss.includes(ds.type));
		}
	},
	data() {
		return {
			port: FE_PORT_VEE,
			inited: false,
			dbTypeDss: [ 
				'Mysql',
			],
		}
	},
	mounted() {
		this.os(() => this.setDefaultDs());
	},
	methods: {
		setDefaultDs() {
			const dss = this.filteredDss ?? [];

			if (dss.length > 0) {
				this.setDsFilter(dss[0].id, 'set-defaults');
				this.os(() => this.inited = true, 250);
			}
		},
		setDsFilter(value, src) {
			if (!this.inited && src != 'set-defaults') return;
			this.setDatasourceFilter(value);
		},
		createAndSet() {
			this.$refs['mdl-ce-datasource'].show(undefined, $event);
		},
		...mapMutations({
			setDatasourceFilter: 'project/data-sources/setDatasourceFilter',
			emitEditingEntities: 'app/emitEditingEntities',
			emitReleaseEntities: 'app/emitReleaseEntities',
		}),
	},
};
</script>