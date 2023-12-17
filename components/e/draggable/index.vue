<style lang="less" scoped>
.toDraggableArea {
	padding-top: 10px;
	margin-left: 2px;

	&:hover { cursor: pointer; }
}

.dragArea {
	border-top: 1px solid rgba(0,0,0,0.2);
	margin-left: 10px;

	.item-footer {
		padding-top: 5px;
	}

	&:hover { cursor: pointer; }
}

.row-item {
	padding: 7px;
	padding-left: 15px;

	.middle {
		align-items: end;
	}

	.right {
		align-items: end;

		.add-btn {
			width: 15px;
			height: 15px;
			background-color: var(--success-green);
			border-radius: 50%;
			position: relative;
			margin-bottom: 3px;

			.icn {
				position: absolute;
				left: -1.5px;
				top: -1.5px;
			}

			&:hover {
				cursor: pointer;
			}
		}

		.del-btn {
			width: 15px;
			height: 15px;
			background-color: red;
			border-radius: 50%;
			position: relative;

			.icn {
				position: absolute;
				left: 2px;
				top: 2px;
			}

			&:hover {
				background-color: rgb(151, 3, 3);
				cursor: pointer;
			}
		}
	}
}

</style>

<template>
<draggable 
	:class="(isFirstLayer ? 'toDraggableArea' : 'dragArea')"
	tag="a-col"
	:list="data"
	:group="{ name: 'g1' }"
	:move="emitHistoryChange"
	@moved="$emit('moved')"
	@added="$emit('added')"
	@removed="$emit('removed')"
>
	<template v-if="data.length > 0">

		<a-col v-for="(el, index) in data" :key="el.name">

			<div class="row-item" c-row>

				<a-col :span="12">

					<EFormInput
						name=""
						:placeholder="tr('prop-name')"
						eStyle="width: 100px;"
						:inlineOver="true"
						inputCase="camelCase"
						v-model="el.key"
						@input="emitHistoryChange"
					/>

				</a-col>

				<a-col class="middle" :span="11">

					<EFormContextMenu
						:placeholder="tr('property-value')"
						:additioalTopValues="previousAssignmentsMenu"
						:filter="el.filterId"
						src="EDraggable"
						v-model="el.value"
						@input="emitHistoryChange(el)"
						v-if="el.data.length == 0"
					/>

				</a-col>

				<a-col class="right" :span="2">

					<div class="add-btn" @click="addItem(el, index)">

						<GeneralIcon clss="icn" type="plus-white" />

					</div>

					<div class="del-btn" @click="deleteItem(index)">

						<GeneralIcon clss="icn" type="close-xsm-white" />

					</div>

				</a-col>

			</div>

			<EDraggable 
				:data="el.data" 
				:isFirstLayer="false" :depth="depth + 1"
				:previousAssignmentsMenu="previousAssignmentsMenu"
				@list-history-change="$emit('list-history-change')"
				@moved="emitHistoryChange"
				@added="emitHistoryChange"
				@removed="emitHistoryChange"
			/>

		</a-col>

	</template>

	<template v-else>

		<a-col a-center v-if="isFirstLayer">

			<h3 non-sel>{{ tr('no-items-to-show') }}</h3>

		</a-col>

	</template>

</draggable>
</template>

<script>
import draggable from 'vuedraggable';

export default {
	props: {
		isFirstLayer: {
			type: Boolean,
			default: true,
			require: true,
		},
		depth: {
			type: Number,
			default: 0,
		},
		data: {
			required: true,
			type: Array
		},
		previousAssignmentsMenu: {
            type: Object,
            default: () => {}
        },
	},
	components: {
		draggable
	},
	data() {
		return {
			hasInterceptedFirstLayer: false,
			debounceTmr: null,
		}
	},
	methods: {
		deleteItem(index) {
            this.data.splice(index, 1);
			this.emitHistoryChange();
        },
		addItem(el, index) {
			if (typeof index != 'undefined') {
				if (this.data[index].returns != 'object') {
					this.data[index].returns = 'object';
					this.data[index].value = '';
				}
			}

			(typeof el?.data != 'undefined' ? el.data : this.data).push({
				key: '',
				value: '',
				returns: 'text',
				data: []
			});

			this.emitHistoryChange();
		},
		emitHistoryChange(el) {
			if (this.debounceTmr) clearTimeout(this.debounceTmr);

			if (typeof el == 'object') {
				el.returns = 'text';
			}

			this.setDebounceTmr();
		},
		setDebounceTmr() {
			this.debounceTmr = setTimeout(() => {
				this.$emit('list-history-change');
			}, 300);
		},
	}
};
</script>