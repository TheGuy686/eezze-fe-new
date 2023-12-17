
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
		:columns="columsP"
		:row-key="record => record.id"
		:data-source="data"
		:pagination="pagination"
		:loading="isLoading"
		:row-selection="rowSelection"
		@change="handleTableChange"
	>
		<slot></slot>
			
		<template :slot="key" slot-scope="value, record, index" v-for="key in formatterKeys">

			<div :key="key" v-html="getFormatter(key, value, record, index)(value, record, index)"></div>

		</template>

		<template slot="actions" slot-scope="value, record, index" v-if="actions">
		
			<a-radio-button
				value="small"
				:key="act.action" 
				v-for="act in actions"
				@click="actionClicked(act, record, index)"
			>

				<a-icon :type="act.icon" theme="filled"	/>

			</a-radio-button>

		</template>

	</a-table>

</div>
</template>

<script lang="ts">
const reqwest = require('reqwest');

function objToString(obj: any)
{
	var stack = '';

	for (var property in obj)
	{
		if (obj.hasOwnProperty(property))
		{
			if (typeof obj[property] == "object")
			{
				stack = stack + objToString(obj[property]);
			}
			else
			{
				stack = stack + obj[property] + ' ';
			}
		}
	}

	return String(stack);
}

const handleDevResponse = function (res: any) {
	let data;

	if (typeof res.body == 'string') {
		data = JSON.parse(res.body);
	}
	else {
		data = res.data;
	}

	return {
		pagination: {
			total: 20,
		},
		data,
	};
}

let storeReqSelf: any;

export default {
	beforeCreate() {
		storeReqSelf = this;
	},

	props: {
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
		storeDataKey: {
			type: String,
			default: 'entities',
		},
		setStoreDataMutationKey: {
			type: String,
			default: 'setEntities'
		},
		storeKey: {
			type: String,
		},
		setIsLoadingStateMutation: {
			type: String,
			default: 'setDoingRequestState',
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
					icon: 'delete'
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

	computed: {
		formatterKeys() {
			let out: string[] = [];

			storeReqSelf.columns.forEach(
				(col: any) => {
					if (col['dataIndex'] == 'actions' || typeof col['format'] != 'function') return;

					out.push(col['dataIndex']);
				}
			);

			return out;
		},
		columsP() {
			let out: any = [];

			if (!storeReqSelf._columns) return [];

			storeReqSelf._columns.forEach(
				(col: any) => {
					if (typeof col['format'] != 'function')  {
						out.push(col);
						return;
					}

					let c: any = {...col};

					delete c['format'];

					out.push(
						{
							...c,
							scopedSlots: { customRender: col['dataIndex'] },
						}
					);
				}
			);

			return out;
		},
		state() {
			let targetState = storeReqSelf.$store.state;

			storeReqSelf.storeKey.split('/').forEach((bit: any) => targetState = targetState[bit]);

			return targetState;
		},
		isLoading() {
			if (typeof storeReqSelf.state['isDoingRequest'] == 'undefined') {
				return false;
			}

			return storeReqSelf.state['isDoingRequest'];
		},
		data() {
			if (typeof storeReqSelf.state[storeReqSelf.storeDataKey] == 'undefined') {
				console.error('To use the TablePaginatedStoreRequest component you need to have a storeDataKey defined that exists.');
				return [];
			}

			return storeReqSelf.state[storeReqSelf.storeDataKey];
		},
		rowSelection() {
			let self: any = this;

			if (!self.showRowCheckboxs) return;

			return {
				onChange: (selectedRowKeys: any, selectedRows: any) => {
					console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

					self.$emit('check-all-changed', {selectedRowKeys, selectedRows});
				},
				getCheckboxProps: (record: any) => ({
					props: {
						//disabled: record.name === 'Disabled User', // Column connection not to be checked
						name: record[self.rowIdCol],
					},
				}),
			};
		},
	},

	data() {
		return {
			search: '',
			pagination: {
				pageSize: storeReqSelf.perPage[0],
				total: 0,
				current: 0,
			},
			lastFilters: {},
			lastSorter: {},
			mutations: {},
			_columns: [],
			formatters: {},
		};
	},

	beforeMount() {
		let self: any = this;

		self.setFormatters();

		self._columns = [...self.columns];

		if (self.actions && self.actions.length > 0) 
		{
			self._columns.push(
				{ 
					title: 'Action', 
					dataIndex: 'actions', 
					key: 'action',
					align: 'right',
					fixed: 'right',
					scopedSlots: {customRender: 'actions'} 
				},
			);
		}
	},

	mounted() {
		let self: any = this;

		self.fetch();
	},

	methods: {
		getFormatter(key: any, value: any, record: any, index: number) {
			let self: any = this;

			if (typeof self.formatters[key] == 'undefined') return () => (value);

			return self.formatters[key];
		},
		
		setFormatters() {
			let self: any = this;

			self.columns.forEach(
				(col: any) => {
					if (col['dataIndex'] == 'actions' || typeof col['format'] != 'function') return;

					self.formatters[col['dataIndex']] = col['format'];
				}
			);
		},

		handleSelectChange() {
			let self: any = this;

			self.handleTableChange(
				self.pagination,
				self.lastFilters,
				self.lastSorter,
			);
		},

		handleTableChange(pagination: any, filters: any, sorter: any) {
			let self: any = this;

			const pager = { ...self.pagination };
			pager.current = pagination.current;
			self.pagination = pager;

			self.lastFilters = filters;
			self.lastSorter = sorter;

			self.fetch({
				results: pagination.pageSize,
				page: pagination.current,
				sortField: sorter.field,
				sortOrder: sorter.order,
				...filters,
			});
		},

		fetch(params = {}) {
			let self: any = this;

			self.$store.commit(`${self.storeKey}/${self.setIsLoadingStateMutation}`, true);

			reqwest({
				url: self.route,
				method: 'get',
				data: {
					results: 10,
					...params,
					...self.urlParams,
					search: self.search,
				},
				type: 'json',
			}).then((data: any) => {
				data = handleDevResponse(data);

				const pagination = {...self.pagination};

				if (!data.pagination || !data.pagination.total) {
					console.error('The pagination variables was not set in the reponse.');
					console.log('Got response: ', data);
				}
				else {
					pagination.total = data.pagination.total;
				}

				self.$store.commit(`${self.storeKey}/${self.setStoreDataMutationKey}`, data.data);

				self.pagination = pagination;

				setTimeout(() => self.$store.commit(`${self.storeKey}/${self.setIsLoadingStateMutation}`, false), 300);
			});
		},

		actionClicked(action: any, row: any) {
			let self: any = this;

			switch (action.action)
			{
				case 'delete':

					self.showDeleteConfirm();

				default: 
					let actionLbe = `action-${action.action}-clicked`;

					self.$emit(actionLbe, row);
			}
		},

		showDeleteConfirm() 
		{
			let self: any = this;

			self.$confirm({
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
		},
	},
};
</script>