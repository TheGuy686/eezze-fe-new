
<style lang="less" scoped>

.search-header
{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: 10px;
}

</style>

<template>
<div>

	<div class="search-header">

		<a-select
			style="width: 130px"
			placeholder="Per Page"
			v-model.number="pagination.pageSize"
			@change="handleSelectChange"
		>
			<a-select-option v-for="amount in perPage" :key="amount" :value="amount">

				{{ amount }}

			</a-select-option>

		</a-select>

		<div>

			<a-input-search placeholder="Search" style="width: 200px" v-model="search" v-if="showSearch" />

			<a-button type="primary" @click="$emit('action-new-clicked')" v-if="showNewButton">

				New

			</a-button>

		</div>

	</div>

	<a-table
		ref="tbl"
		:columns="columns"
		:row-key="record => record.id"
		:data-source="data"
		:pagination="pagination"
		:loading="loading"
		:row-selection="rowSelection"
		@change="handleTableChange"
	>
		<template slot="actions" v-if="actions">
		
			<a-radio-button
				value="small"
				:key="act.action" 
				v-for="act in actions"
				@click="actionClicked(act)"
			>

				<a-icon :type="act.icon" theme="filled"	/>

			</a-radio-button>

		</template>

	</a-table>

</div>
</template>

<script lang="ts">

const reqwest = require('reqwest');

const handleDevResponse = function (res: any) {
	try {
		let data = JSON.parse(res.body);
		
		return {
			pagination: {
				total: 20,
			},
			data,
		};
	}
	catch(err: any) {
		console.log('There was an error getting your data from the request: ', err.message)
	}
}

let reqSelf: any;

export default {
	beforeCreate() {
		reqSelf = this;
	},

	props: 
	{
		route: {
			type: String,
			required: true,
		},
		urlParams: {
			type: Object,
			default: () => {}
		},
		showRowCheckboxs:
		{
			type: Boolean,
			default: () => (true)
		},
		columns: {
			type: Array,
			default: () => [],
		},
		showSearch: {
			type: Boolean,
			default: () => (true)
		},
		showNewButton: {
			type: Boolean,
			default: () => (true)
		},
		actions: {
			type: Array,
			default: () => [
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
		},
		perPage: {
			type: Array,
			default: () => ([
				10,
				50,
				100
			])
		},
		rowIdCol: {
			type: String,
			default: 'id'
		}
	},

	computed:
	{
		rowSelection() {
			if (!reqSelf.showRowCheckboxs) return;

			return {
				onChange: (selectedRowKeys: any, selectedRows: any) => {
					console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

					reqSelf.$emit('check-all-changed', {selectedRowKeys, selectedRows});
				},
				getCheckboxProps: (record: any) => ({
					props: {
						//disabled: record.name === 'Disabled User', // Column connection not to be checked
						name: record[reqSelf.rowIdCol],
					},
				}),
			};
		},
	},

	data() 
	{
		return {
			search: '',
			data: [],
			pagination: {
				pageSize: reqSelf.perPage[0],
				total: 0,
				current: 0,
			},
			lastFilters: {},
			lastSorter: {},
			loading: false,
		};
	},

	beforeMount() {
		if (reqSelf.actions && reqSelf.actions.length > 0) 
		{
			reqSelf.columns.push(
				{ 
					title: 'Action', 
					dataIndex: '', 
					key: 'action',
					align: 'right',
					fixed: 'right',
					scopedSlots: 
					{ 
						customRender: 'actions'
					} 
				},
			);
		}
	},

	mounted() {reqSelf.fetch()},

	methods: {
		handleSelectChange() {
			reqSelf.handleTableChange(
				reqSelf.pagination,
				reqSelf.lastFilters,
				reqSelf.lastSorter,
			);
		},

		handleTableChange(pagination: any, filters: any, sorter: any) {
			const pager = { ...reqSelf.pagination };
			pager.current = pagination.current;
			
			reqSelf.pagination = pager;

			reqSelf.lastFilters = filters;
			reqSelf.lastSorter = sorter;

			reqSelf.fetch({
				results: pagination.pageSize,
				page: pagination.current,
				sortField: sorter.field,
				sortOrder: sorter.order,
				...filters,
			});
		},

		fetch(params = {}) {
			reqSelf.loading = true;

			reqwest({
				url: reqSelf.route,
				method: 'get',
				data: {
					results: 10,
					...params,
					...reqSelf.urlParams,
					search: reqSelf.search,
				},
				type: 'json',
			}).then((data: any) => {
				try {
					data = handleDevResponse(data);

					const pagination = { ...reqSelf.pagination };

					if (!data.pagination || !data.pagination.total)
					{
						console.error('The pagination variables was not set in the reponse.');
						console.log('Got response: ', data);
					}
					else
					{
						pagination.total = data.pagination.total;
					}

					reqSelf.loading = false;
					reqSelf.data = data.data;
					reqSelf.pagination = pagination;
				}
				catch (err: any) {
					console.log('Request data retrieval failed: ', err.message)
				}
			});
		},

		actionClicked(action: any, row: any) {
			switch (action.action)
			{
				case 'delete':

					reqSelf.showDeleteConfirm();

				default: 
					let actionLbe = `action-${action.action}-clicked`;

					reqSelf.$emit(actionLbe, row);
			}
		},

		showDeleteConfirm() 
		{
			reqSelf.$confirm({
				title: 'Delete Confirmation',
				content: 'Are you sure you would like to delete entry?',
				okText: 'Confirm',
				okType:'danger',
				cancelText: 'Close',
				onOk() {
					console.log('OK');
				},
				onCancel() {
					console.log('Cancel');
				},
			});
		}
	},
};
</script>