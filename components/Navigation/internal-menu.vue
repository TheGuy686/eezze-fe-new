<template>
<div style="padding-left: 45px;" non-sel>

	<a-menu
		style="width: 256px"
		mode="vertical"
		v-model:openKeys="openKeys"
		v-model:selectedKeys="selectedKeys"
	>
		<a-menu-item 
			:title="''"
			:key="route.key"
			@mouseover="() => {
				if (openKeys.includes(route.key)) return;
				hovering = route.key
			}"
			@mouseleave="os(() => hovering = '', 50)"
			v-for="route in routes"
		>
			<GeneralIcon
				class="inline-block mr-2"
				:type="(isSelected(route.key) && route?.activeIcon) ? route?.activeIcon : route.icon"
				v-if="route.icon || route?.activeIcon"
			/>

			<span :style="{ color: hovering == route.key && !isSelected(route.key) ? '#012840' : (hovering == route.key ? 'white' : '') }" v-if="!siderCollapsed">

				{{ route.label }}

			</span>

		</a-menu-item>
		
	</a-menu>

</div>
</template>

<script>
import routes from '@/assets/js/routes'

export default {
	props: {
		siderCollapsed: {
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			hovering: '',
			selectedKeys: [ 'modules' ],
			openKeys: [ 'modules' ],
		}
	},

	computed: {
		routes() {
			return routes.USER_INTERNAL_ROUTES;
		},

		routesDict() {
			return this.keyify(this.routes, 'key', (val) => `id-${val}`);
		},

		isSelected() {
			return function(key) {
				return this.selectedKeys.includes(key);
			}
		},
	},
	methods: {
		// check menu has children
		hasChildren({ children }) {
			return children && children.length > 0;
		},

		navigateToChild(childKey) {
			window.location = `${window.location.origin}${childKey}`;
		},

		// handle click menu
		onClickMenu({ key }) {
			const rte = this.routesDict[`${key}`.replace('id-', '')];

			if (typeof rte?.path == 'string') {
				if (typeof this.$route.params?.id != 'undefined') {
					const path = rte.path.replace(/_prId/, this.$route.params.id);

					// this is a horrible hack. Don't ask me why we have to do this
					if (this.$route.name == 'id-connection-id') {
						window.location = path;
					}
					else {
						this.$router.push(path);
					}
				}
				else {
					this.$router.push(rte.path);
				}
			}
			else if (rte?.isNew) {
				const wl = window.location;

				window.location = `${wl.protocol}//${wl.hostname}:2100/${rte.oKey}`;
			}
			else {
				this.$router.push({ name: key });
			}
		},
	},
}
</script>
	