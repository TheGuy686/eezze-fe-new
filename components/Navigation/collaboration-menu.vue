<style lang="less">
.collab-mi {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-right: 18px;
}
</style>

<template>
<div style="padding-left: 45px;" non-sel>

	<a-menu
		mode="inline"
		style="width: 256px"
		:inline-collapsed="mainMenuCollpsed"
		v-model:openKeys="openKeys"
      	v-model:selectedKeys="selectedKeys"
	>
		<a-sub-menu
			:style="`background-color: ${collabIsSelected ? '#012840' : 'white'};`"
			key="collaboration"
			@mouseover="() => hovering = 'collaboration'"
			@mouseleave="os(() => hovering = '', 50)"
		>
			<template #title>
				
				<div class="collab-mi" @click="idCollapsed =! idCollapsed">

					<div>

						<GeneralIcon
							class="inline-block mr-2"
							:type="collabIsSelected ? 'service-sld-w' : 'service'"
						/>

						<span :style="{ color: !collabIsSelected ? '#012840' : 'white' }" v-if="!mainMenuCollpsed">

							{{ tr('docs-api') }}

						</span>

					</div>

					<GeneralIcon
						class="inline-block mr-2"
						:type="idCollapsed ? 'up-arrow-w' : 'down-arrow-w'"
					/>

				</div>
		
			</template>

			<a-menu-item
				:key="ds.id"
				v-for="ds in dss"
				@click="events.emit('docs-api-ds-changed', ds)"
			>
				<a-tooltip placement="right">

					<span class="pr-3">{{ maxLen(ds.name, 18) }}</span>

					<template #title>

						<span>{{ ds.name }}</span>

					</template>

				</a-tooltip>
			
			</a-menu-item>

		</a-sub-menu>

		<!-- <a-menu-item key="1">

			<span v-if="!mainMenuCollpsed">Option 1</span>

		</a-menu-item> -->

  </a-menu>

</div>
</template>

<script>
import { mapState } from 'vuex';

const validTypes = [
	'eezze-logger',
	'rest-service',
	'ws-service'
];

export default {
	computed: {
		...mapState('app', [ 'mainMenuCollpsed' ]),
		...mapState('project/data-sources', {
			dss: (state) => state.entities.filter(ds => validTypes.includes(ds.type)),
		}),
		collabIsSelected() {
			const childKeys = this.dss.map((ds) => ds.id);
			return childKeys.includes(this.selectedKeys[0]);
		},
		isSelected() {
			return function(key) {
				return this.selectedKeys.includes(key);
			};
		},
	},
	data() {
		return {
			loaded: false,
			hovering: '',
			openKeys: [ 'collaboration' ],
			selectedKeys:[],
			checkTmr: null,
			counter: 0,
			idCollapsed: false,
		};
	},
	mounted() {
		this.checkDefaultTmr();
	},
	methods: {
		checkDefaultTmr() {
			this.os(() => this.setDefault(), 300);

			this.checkTmr = setInterval(() => {
				if (this.counter > 8) {
					this.setDefault();

					clearInterval(this.checkTmr);
				}
				else if (this.counter > 6) {
					this.setDefault();
					this.counter++;
				}
				else {
					this.counter++;
				}

			}, 200);
		},
		setDefault() {
			const self = this;

			console.log('RYAN: ', this.dss.length);

			if (this.dss.length > 0) {
				this.os(() => {
					self.selectedKeys = [ self.dss[0].id ];
					
					self.os(() => {
						self.events.emit('docs-api-ds-changed', self.dss[0]);
					}, 200);

				}, 300);
			}
		}
	}
}
</script>
