<style lang="less" scoped>
.eezze-tbl {
	padding: 1px;

	.action-icon {
		&:hover {
			cursor: pointer;
		}
	}

	.clickable-text-action {
		color: #3F88C5;
		font-weight: 900;

		&:hover {
			cursor: pointer;
		}
	}
}
</style>

<template>
<div :style="stle" :class="clss">

	<a-row class="float-right -mt-10 mb-5">
		<slot name="before-add-btn" />

		<a-button size="large" style="margin-left: 5px;" class="bg-success text-white" @click="$emit('action-new-clicked')" v-if="showNewButton">

			{{ addBtnText }}

		</a-button>

	</a-row>

	<div>

		<a-input-search
			style="height: 40px !important; border-radius: 10px !important;"
			:placeholder="tr('search')"
			v-model="search"
			v-if="showSearch"
		/>

	</div>

	<!-- <div >

	<a-select
		style="width: 130px"
		placeholder="Per Page"
		v-model.number="pagination.pageSize"
	>
		<a-select-option v-for="amount in perPage" :key="amount" :value="amount">

			{{ amount }}

		</a-select-option>

	</a-select>

	<div>

		<a-button @click="downloadContentAsFile" v-if="exportAsName != ''">

			{{ exportAsName }}

		</a-button>

		<slot name="header-buttons"></slot>

	</div>

	// this was on the <a-table> tag below
	rowClassName="text-black-1 font-normal"

</div>  -->

	<div :class="'mt-5 rounded-lg eezze-tbl ' + (showTableBorder ? 'border border-gray-3' : '')" style="background-color: white;">

		<a-table
			ref="tbl"
			:columns="columsP"
			:row-key="record => getRowId(record)"
			:data-source="dataP"
			:pagination="pagiObj"
			:loading="loading"
			class="eezze-tbl"
			:rowSelection="checkboxConfig"
		>
			<slot></slot>

			<template :slot="key" slot-scope="value, record, index" v-for="key in formatterKeys">

				<div :key="key" v-html="getFormatter(key, value, record, index)(value, record, index, context)"></div>

			</template>

			<template slot="actions" slot-scope="value, record, index" v-if="actions && showActions">

				<div class="inline-block ml-8 action-icon" :key="act.action" v-for="act in actions" @click="actionClicked(act, record, index)">

					<span class="clickable-text-action" v-if="act.type == 'clickable-text'">

						{{ act.title }}

					</span>

					<e-col v-else-if="act.type == 'context-menu'">

						<EFormContextMenu
							name=""
							src="paginated-table"
							:debug="true"
							:filter="record?.filterId"
							:value="contextMenuMdl(record, index)"
							@input="setContextMdlValue(record, $event, index)"
						/>

					</e-col>

					<a-popover placement="left" v-else-if="act.type == 'object-preview'">

						<a-button
							shape="circle"
							size="small"
							type="primary"
						>

							<GeneralIcon type="eye-white" />

						</a-button>

						<template #title>

							<h3>{{ tr('object-preview') }}</h3>

						</template>

						<template #content>

							<d :d="record" />

						</template>

					</a-popover>

					<template v-else>

						<template v-if="typeof act?.highlight == 'function'">

							<GeneralIcon
								class="inline-block"
								:type="act.highlight(record, index) ? act.iconHighlight : act.icon"
							/>

						</template>

						<template v-else>

							<GeneralIcon class="inline-block" :type="act.icon" />

						</template>

					</template>

				</div>

			</template>

		</a-table>

	</div>

	<EModal
		ref="mdl-delete"
		:width="400"
		title=""
		:rightBtnText="mainDeleteConfirmBtnText ? mainDeleteConfirmBtnText : tr('delete-confirm-btn')"
		:leftBtnText="tr('delete-dismiss-btn')"
		leftBtnClass="text-black-2"
		rightBtnClass="bg-error text-white"
		:isLoading="isDoingDeleteRequest"
		ver-center
		@right-btn-clicked="$emit('action-delete-confirmed', {
			index: deleteIndex,
			successCb: () => {
				$refs['mdl-delete'].hide();

				os(
					() => {
						$notification.success({
							placement: 'topRight',
							message: tr('delete-success'),
							description: tr('entity-delete-success'),
						});
					},
					300
				);
			}
		})">

		<div class="pt-5">

			<GeneralIcon class="inline-block ml-2 mr-3 align-middle" :type="'close-circle'" />

			<p class="inline align-middle capitalize text-lg font-semibold text-black-1">

				{{ mainDeleteTitle ? mainDeleteTitle : tr('delete-title', {args: [ deleteTitle ]}) }}

			</p>

		</div>

		<a-row ver-center class="pt-5 px-3">

			{{ mainDeleteConfirmMessage ? mainDeleteConfirmMessage : tr('delete-confirmation-message', { args: [deleteTitle] }) }}

		</a-row>

	</EModal>

</div>
</template>

<script lang="ts">
import { pj, downloadContentAsFile, objToString, tr } from '~/classes/globals';

export default {
	props: {
		clss: {
			type: String,
			default: '',
		},
		stle: {
			type: String,
			default: '',
		},
		showSearch: {
			type: Boolean,
			default: true
		},
		data: {
			// type: Array,
			default: () => ([]),
		},
		showRowCheckboxs: {
			type: Boolean,
			default: () => true
		},
		showTableBorder: {
			type: Boolean,
			default: () => true
		},
		columns: {
			type: Array,
			default: () => [],
		},
		showNewButton: {
			type: Boolean,
			default: false
		},
		addBtnText: {
			type: String,
			default: tr('add')
		},
		disablePagination: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false,
		},
		isDoingDeleteRequest: {
			type: Boolean,
			default: false,
		},
		showActions: {
			type: Boolean,
			default: true,
		},
		actions: {
			type: Array,
			default: () => [
				// {
				// 	action: 'view',
				// 	icon: 'eye'
				// },
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
		reverseDirectionKey: {
			type: String,
		},
		exportAsName: {
			type: String,
			default: 'Export as JSON'
		},
		exportAsContentType: {
			type: String,
			default: 'JSON'
		},
		perPage: {
			type: Array,
			default: () => ([
				10,
				50,
				100
			])
		},
		searchColumns: {
			type: Array,
		},
		searchColumnFormatter: {
			type: Function
		},
		mainDeleteTitle: String,
		mainDeleteConfirmMessage: String,
		mainDeleteConfirmBtnText: String,
		deleteTitle:{
			type: String,
			default: tr('item')
		},
		checkedBoxes: {
			type: Array,
		},
		includeObjectPreview: {
			type: Boolean,
			default: true,
		}
	},

	computed: {
		context() {
			return (this as any).$parent;
		},
		pagiObj() {
			if ((this as any).disablePagination) return false;

			return { 
				defaultPageSize: 10, 
				showSizeChanger: true, 
				pageSizeOptions: ['10', '20', '30']
			};
		},
		contextMenuMdl() {
			return function (row: any) {
				if (typeof row.raw == 'object') row.raw = '';
				return row?.raw ?? '';
			}
		},
		checkboxConfig() {
			let self: any = this;

			if (!self?.showRowCheckboxs) return undefined;

			return {
				selectedRowKeys: self?.selectedRowKeys,
				onChange: self?.onSelectChange,
				hideDefaultSelections: true,
				selections: false,
			};
		},
		dataP() {
			let self: any = this;

			if (typeof self.data !== 'object' && !Array.isArray(self.data)) {
				console.warn(`Paginated table data needs to be an object or array but got "${typeof self.data}"`);
				return [];
			}

			let data = JSON.parse(JSON.stringify(Object.values(self.data)));

			// if (tableSelf.reverseDirectionKey != 'undefined') {

			// 	let data = JSON.parse(JSON.stringify(tableSelf.data));

			// 	data.sort(
			// 		(a: any, b: any) => {
			// 			try {
			// 				return parseFloat(a[tableSelf.reverseDirectionKey]) - parseFloat(b[tableSelf.reverseDirectionKey]);
			// 			}
			// 			catch (e) {

			// 			}

			// 			return 0;
			// 		}
			// 	);

			// 	return tableSelf.searchData(data.reverse());
			// }

			return self.searchData(data);
		},
		columsP() {
			let out: any = [], self: any = this;

			if (!self._columns) return [];

			self._columns.forEach(
				(col: any) => {
					if (typeof col['format'] != 'function') {
						out.push(col);
						return;
					}

					let c: any = { ...col };

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
		formatterKeys() {
			let out: string[] = [], self: any = this;

			self.columns.forEach(
				(col: any) => {
					if (col['dataIndex'] == 'actions' || typeof col['format'] != 'function') return;

					out.push(col['dataIndex']);
				}
			);

			return out;
		},
	},

	watch: {
		checkedBoxes(to: any) {
			let self: any = this;

			if (Array.isArray(to) && to != self.selectedRowKeys) {
				self.selectedRowKeys = [...to];
			}
		}
	},

	data() {
		return {
			search: '',
			_columns: [],
			pagination: {
				pageSize: 10,
				current: 1,
				data: [ {} ],
			},
			deleteIndex: -1,
			selectedRows: [],
      		selectedRowKeys: [],
			lastFilters: {},
			lastSorter: {},
			formatters: {},
		};
	},

	beforeMount() {
		let self: any = this;

		self._columns = [];

		self.pagination.pageSize =- self.perPage[0];

		self.setFormatters();

		if (self.includeObjectPreview) {
			self.actions.unshift({
				action: 'object-preview',
				type: 'object-preview',
			});
		}

		self._columns = [...self._columns, ...self.columns];

		if (Array.isArray(self.checkedBoxes)) {
			self.selectedRowKeys = [...self.checkedBoxes];
		}

		if (self.actions && self.actions.length > 0) {
			self._columns.push(
				{
					title: '',
					dataIndex: 'actions',
					key: 'action',
					align: 'right',
					fixed: 'right',
					scopedSlots: { customRender: 'actions' }
				},
			);
		}
	},

	methods: {
		setContextMdlValue(row: any, value: any, index: number) {
			const self: any = this;

			self.data[index].baseType = 'context-mapping';
			self.data[index].actions = [];
			self.data[index].raw = value;
		},

		getRowId(item: any) { return item?.id },

		handleTableChange() {},

		onSelectChange(selectedRowKeys: any, selectedRows: any) {
			let self: any = this;

			self.selectedRowKeys = selectedRowKeys;
			self.selectedRows = selectedRows;

			self.$emit('on-select-changed', {
				selectedRowKeys: self.selectedRowKeys,
				selectedRows: self.selectedRows,
			});
		},

		getFormatter(key: any, value: any, record: any, index: number) {
			let self: any = this;

			if (typeof self.formatters[key] == 'undefined') return () => (value);

			return self.formatters[key];
		},

		setFormatters() {
			let self: any = this;

			self.columns.forEach(
				(col: any) => {
					if (col['dataIndex'] == 'checkbox' || col['dataIndex'] == 'actions' || typeof col['format'] != 'function') return;

					self.formatters[col['dataIndex']] = col['format'];
				}
			);
		},

		searchData(data: Array<Object>) {
			let self: any = this;

			try {
				let search = String(self.search).toLowerCase();

				let matches: Array<Object> = [];

				let key, propVal;

				Object.values(data).forEach((obj: any) => {
					if (typeof obj == 'object') {
						let column: any;
						let searchItem: any = {};

						if (typeof self.searchColumns === 'object' && self.searchColumns.length > 0) {
							for (key in self.searchColumns) {
								column = self.searchColumns[key];

								if (column in obj) searchItem[column] = obj[column];
							}

							if (typeof self.searchColumnFormatter === 'function') {
								propVal = objToString(self.searchColumnFormatter(searchItem)).toLowerCase();
							}
							else {
								propVal = objToString(searchItem).toLowerCase();
							}
						}
						else {
							if (typeof self.searchColumnFormatter === 'function') {
								propVal = objToString(self.searchColumnFormatter(searchItem)).toLowerCase();
							}
							else {
								propVal = objToString(obj).toLowerCase();
							}
						}

						if (propVal && (propVal.indexOf(search) >= 0)) {
							matches.push(obj);
						}
					}
				}
				);

				return matches;
			}
			catch (e: any) {
				console.log('Paginated table error: ', e.message)
				return [];
			}
		},

		actionClicked(action: any, row: any, index: number) {
			let self: any = this;

			self.$emit(`action-${action.action}-clicked`, row, index);

			if (action.action == 'delete') {
				self.deleteIndex = index;
				return self.$refs['mdl-delete'].show();
			}
		},

		downloadContentAsFile() {
			let self: any = this;

			if (self.exportAsContentType == 'JSON') {
				downloadContentAsFile('data.json', pj(self.dataP));
			}
		},

		hideDeleteModal() {
			let self: any = this;
			self.$refs['mdl-delete'].hide();
		}
	},
};
</script>