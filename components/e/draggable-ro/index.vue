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
	padding-right: 35px;

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
	group="property"
	:move="emitHistoryChange"
	@moved="$emit('moved')"
	@added="$emit('added')"
	@removed="$emit('removed')"
>
	<template v-if="data.length > 0">

		<a-col :key="elm.id" v-for="(elm, index) in data">

			<div class="row-item" c-row>

				<a-col :span="12">

					<EFormInput
						name=""
						:placeholder="tr('prop-name')"
						eStyle="width: 100px;"
						:inlineOver="true"
						inputCase="camelCase"
						v-model="elm.property"
						@input="emitHistoryChange"
					/>

				</a-col>

				<a-col class="middle" :span="12">

					<ActionLogicMdlInputKey
						clss="pl-2.5"
						:src="src"
						icon="file-db"
						:useInnerModal="useInnerModal"
						:nonStoreMdl="nonStoreMdl"
						:placeholder="tr('enter-file-name') + '...'"
						mdlKey="raw"
						:disabled="!elm.property || elm.mproperty == ''"
						:setOnlyKeyValue="true"
						v-model="elm.raw"
						@input="emitHistoryChange"
						@change="emitHistoryChange"
						@set-vuex-mdl="$emit('set-vuex-mdl', $event); emitHistoryChange();"
						v-if="elm.actions.length == 0 || (elm.actions.length > 0 && shouldHideInnerLayer(elm.actions[0]))"
					/>

					<!-- <ActionLogicMdlInput
						clss="pl-2.5"
						:placeholder="tr('enter-file-name') + '...'"
						src="DraggableRo->rootFolder"
						:innerLogicChain="true"
						:disabled="!elm.property || elm.mproperty == ''"
						mdlKey="raw"
						:value="elm"
						@input="emitHistoryChange"
						v-if="elm.actions.length == 0 || (elm.actions.length > 0 && shouldHideInnerLayer(elm.actions[0]))"
					/> -->

				</a-col>

				<a-col class="right" :span="1">

					<div class="add-btn" @click="addItem(
						elm,
						index,
						elm?.actions.length > 0 ? elm?.actions[0] : {}
					)">

						<GeneralIcon clss="icn" type="plus-white" />

					</div>

					<div class="del-btn" @click="deleteItem(index)">

						<GeneralIcon clss="icn" type="close-xsm-white" />

					</div>

				</a-col>

			</div>

			<EDraggableRo
				:data="elm.actions.length > 0 && shouldHideInnerLayer(elm.actions[0]) ? [] : elm.actions"
				:src="`${src}-child-depth-${depth + 1}`"
				:isFirstLayer="false"
				:nonStoreMdl="nonStoreMdl" 
				:depth="depth + 1"
				:useInnerModal="useInnerModal"
				:previousAssignmentsMenu="previousAssignmentsMenu"
				@list-history-change="$emit('list-history-change')"
				@moved="emitHistoryChange"
				@added="emitHistoryChange"
				@removed="emitHistoryChange"
				@changed="$emit('changed', data)"
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
import BlLogicChain from '~/models/BlLogicChain';
import draggable from 'vuedraggable';

export default {
	components: { draggable },
	props: {
		src: String,
		nonStoreMdl: Boolean,
		useInnerModal: Boolean,
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
	computed: {
		valMdl() {
			return {
				itteration: 0,
			}
		},
		elValue() {
			return function (i) {
				const raw = i?.raw;

				if (i.baseType == 'context-menu' || i.baseType == 'static') {
					if (typeof raw == 'object') return '';
				}

				return BlLogicChain.create(raw);
			}
		},
		shouldHideInnerLayer() {
			return function (el) {

				switch (el?.type) {
					case 'custom': return true;
				}

				return false;
			}
		}
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
		addItem(el, index, zeroIndexItem) {
			if (typeof index != 'undefined') {
				if (this.data[index].returns != 'object') {
					this.data[index].returns = 'object';
					this.data[index].value = '';
				}
			}

			const ni = BlLogicChain.create(generateRandomString(10)),
			      shouldResetArray = typeof zeroIndexItem === 'object' & this.shouldHideInnerLayer(zeroIndexItem);

			if (typeof el?.actions != 'undefined') {
				if (shouldResetArray) el?.actions.splice(0, el?.actions.length);

				el.type = 'object';

				el.actions.push(ni);
			}
			else {
				if (shouldResetArray) el?.actions.splice(0, el?.actions.length);

				this.data.push(ni);
			}

			this.emitHistoryChange();
		},
		emitHistoryChange(el) {
			this.$emit('changed', el);

			if (this.debounceTmr) clearTimeout(this.debounceTmr);

			if (typeof el == 'object') {
				el.type = 'text';
			}

			this.setDebounceTmr();
		},
		setDebounceTmr() {
			this.debounceTmr = setTimeout(() => {
				this.$emit('list-history-change');
			}, 300);
		},
		getModel(elm) {
			return elm;
		}
	}
};
</script>