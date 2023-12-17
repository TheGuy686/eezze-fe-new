<style lang="less" scoped>
.tab-row {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
}
</style>

<template>
<a-tabs v-model="activeKey" tab-position="left" animated>

	<a-tab-pane :key="i" v-for="s, i in sections" v-if="!s.showKey || mdl(s.showKey).length > 0">

		<template #tab>

			<div class="tab-row">

				{{ tr(kebabCase(s.key)) }} {{ getTabLabel(s, i) }}

				<GeneralIcon
					class="ml-2"
					:type="activeKey == i ? s.activeIcon : s.icon"
				/>

			</div>

		</template>

		<ServiceGroupSummaryCServiceGroup
			ref="sg-summary"
			:serviceConfigs="mdl('serviceConfigs')"
			v-show="s.key == 'serviceGroup'"
		/>

		<ServiceGroupSummaryCConnections
			:connections="mdl('connections')"
			v-if="s.key == 'connections' && mdl('connections').length > 0"
		/>

		<ServiceGroupSummaryCServices
			:services="services"
			v-else-if="s.key == 'services'"
		/>

		<ServiceGroupSummaryCDatasources
			:datasources="mdl('datasources')"
			v-else-if="s.key == 'datasources' && mdl('datasources').length > 0"
		/>

		<ServiceGroupSummaryCServiceConfigs
			:serviceConfigs="mdl('serviceConfigs')"
			v-else-if="s.key == 'serviceConfigs' && mdl('serviceConfigs').length > 0"
		/>

		<ServiceGroupSummaryCRoles
			:roles="roles"
			v-else-if="s.key == 'roles' && mdl('roles').length > 0"
		/>

		<ServiceGroupSummaryCVault
			:vaults="mdl('vaults')"
			v-else-if="s.key == 'vaults' && mdl('vaults').length > 0"
		/>

		<ServiceGroupSummaryCValues
			:values="mdl('values')"
			v-else-if="s.key == 'values' && mdl('values').length > 0"
		/>

	</a-tab-pane>

</a-tabs>
</template>

<script>
import ServiceGroupSummaryCServiceConfigs from './c/service-configs';
import ServiceGroupSummaryCServiceGroup from './c/service-group';

export default {
	components: {
		ServiceGroupSummaryCServiceConfigs,
		ServiceGroupSummaryCServiceGroup,
	},
	props: {
		sg: Object,
		scope: String,
		services: Array,
		roles: Array,
	},
	computed: {
		mdl() {
			return function (key) { return this.sg?.[key] ?? [] }
		},
	},
	data() {
		return {
			sections: [
				{
					key: 'serviceGroup',
					title: 'service-group',
					icon: 'service',
					activeIcon: 'service-sld-lb',
				},
				{
					key: 'connections',
					title: 'connections',
					icon: 'server',
					activeIcon: 'server-sld-lb',
					showKey: 'connections',
				},
				{
					key: 'datasources',
					title: 'datasources',
					icon: 'datasource',
					activeIcon: 'datasource-sld-lb',
					showKey: 'datasources',
				},
				{
					key: 'serviceConfigs',
					title: 'service-configs',
					icon: 'paperclip',
					activeIcon: 'paperclip-sld-lb',
					showKey: 'serviceConfigs',
				},
				{
					key: 'services',
					title: 'services',
					icon: 'service',
					activeIcon: 'service-sld-lb',
				},
				{
					key: 'roles',
					title: 'roles',
					icon: 'role',
					activeIcon: 'role-sld-lb',
					showKey: 'roles',
				},
				{
					key: 'values',
					title: 'values',
					icon: 'vault',
					activeIcon: 'vault-sld-lb',
					showKey: 'values',
				},
				{
					key: 'vaults',
					title: 'credential-vaults',
					icon: 'vault',
					activeIcon: 'vault-sld-lb',
					showKey: 'vaults',
				},
			],
			activeKey: 0,
		};
	},
	mounted() {
		this.$store.dispatch('cms/sg-tags/getEntities');
	},
	methods: {
		getTabLabel(item, index) {
			const countIndexes = [ 3, 4];

			if (index == 0) return '';

			if (countIndexes.includes(index)) {
				return `(${(this.sg?.serviceGroup?.services ?? []).length})`;
			}

			return Array.isArray(this.sg?.[item?.key]) ? `(${this.sg?.[item?.key].length})` : `(${this.sg?.[item?.key]?.keyValues?.length})`;
		},
	},
}
</script>