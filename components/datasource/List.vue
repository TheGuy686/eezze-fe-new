<style lang="less" scoped>

.items-cont {
	overflow-x: hidden;
    overflow-y: hidden;
}

</style>	

<template>
<div>
	<div ref="entity-items-cont" class="items-cont" :style="itemContStyle" v-if="hasItems">

		<DatasourceItem
			:item="item"
			:index="i"
			:key="i"
			v-for="(item, i) in entity.keyValueItems"
			@add-item-clicked="addEmptyEntityKeyValue"
			@delete-item-clicked="deleteEntityItem({
				index: i,
				completedCb: () => {
					$notification.success(
						{
							placement: 'topRight',
							message: 'Delete Success',
							description: 'Item was successfully deleted',
						}
					);
				}
			})"
		/>

	</div>

	<a-row a-center v-else>

		<a-button type="primary" @click="addEmptyEntityKeyValue">
			
			Add<a-icon type="plus" />
			
		</a-button>

	</a-row>
</div>
</template>

<script>

import {mapState, mapMutations} from 'vuex';

export default {
    computed: {
		hasItems() {
			return typeof this.entity.keyValueItems == 'object' && Object.keys(this.entity.keyValueItems).length > 0;
		},
        itemContStyle() {
			let itemHeight = 40;
			let totHeight = itemHeight * countArrayLevels(this.entity.keyValueItems);

			let screenHeightPercent = (typeof screen != 'undefined' ? screen['height'] : 800) * 0.4;

			let style = `height: ${totHeight}px;`;

			if (totHeight > screenHeightPercent) {
				style += `max-height: ${screenHeightPercent}px; overflow-y: visible;`;
			}

			return style;
		},
		...mapState('project/data-sources', ['entity']),
    },
    methods: {
		...mapMutations({
			setEntryItemKeyValue: 'project/data-sources/setEntryItemKeyValue',
			deleteEntryItemKeyValue: 'project/data-sources/deleteEntryItemKeyValue',
			addEmptyEntityKeyValue: 'project/data-sources/addEmptyEntityKeyValue',
		}),
    }
};
</script>