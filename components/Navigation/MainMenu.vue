<template>
<div style="padding-left: 45px;" non-sel>

  	<a-menu
		id="main-menu"
		theme="light"
		mode="inline"
		:selected-keys="selectedKeys"
		:open-keys.sync="openKeys"
		@click="onClickMenu"
	>
		<component
			:is="hasChildren(route) ? 'a-sub-menu' : 'a-menu-item'"
			:disabled="route.disabled"
			:title="route.label"
			:key="'id-' + route.key"
			v-for="route in routes"
		>
			<a-menu-item
				:title="''"
				@mouseover="hovering = route.key"
				@mouseleave="os(() => hovering = '', 50)"
				v-if="!hasChildren(route)"
			>

				<GeneralIcon
					class="inline-block mr-2"
					:type="(isSelected(`id-${route.key}`) && route?.activeIcon) ? route?.activeIcon : route.icon"
					v-if="route.icon || route?.activeIcon"
				/>

				<span :style="{ color: hovering == route.key && !isSelected(`id-${route.key}`) ? '#012840' : (hovering == route.key ? 'white' : '') }" v-if="!siderCollapsed">

					{{ route.label }}

				</span>

			</a-menu-item>

			<a-menu-item-group v-if="hasChildren(route)">

				<a-menu-item
					:key="`/${route.key}/${child.key}`"
					:disabled="child.disabled"
					:title="child.label"
					v-for="child in route.children"
					@click="navigateToChild(`/${route.key}/${child.key}`)"
				>
					<GeneralIcon
						class="inline-block mr-2"
						:type="child?.activeIcon ? child?.activeIcon : child.icon"
					/>

					{{ child.label }}

				</a-menu-item>

			</a-menu-item-group>

		</component>

	</a-menu>

</div>
</template>

<script>
import routes from '@/assets/js/routes';

export default {
	props: {
		siderCollapsed: {
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			openKeys: [],
			hovering: '',
		}
	},

	computed: {
		routes() {
			return routes.ADMIN_USER_ROLE;
		},

		routesDict() {
			return this.keyify(this.routes, 'key');
		},

		isSelected() {
			return function(key) {
				return this.selectedKeys.includes(key);
			}
		},

		selectedKeys() {
			const routeName = this.getRealRouteName();

			if (routeName === 'index') return ['home'];

			// check matched with key
			const matched = this.routes.find((a) => {
				const matchSelf = a.key === routeName;

				const matchChild = a.children?.some((c) => c.key === routeName);

				return matchSelf || matchChild
			})

			// get child keys from matched
			let childKeys = '';
			if (matched) {
				const currentChild = matched.children?.find((c) => c.key === routeName);
				childKeys = currentChild?.key;
			}

			const list = matched ? [matched.key, childKeys] : [routeName];

			return list.filter((l) => !!l);
		},
	},

	watch: {
		$route: {
			handler() {
				// Check open keys
				this.checkOpenKeys()
			},
			// the callback will be called immediately after the start of the observation
			immediate: true,
		},
		siderCollapsed: {
			handler(val) {
				if (val) this.openKeys = []
			},
			// the callback will be called immediately after the start of the observation
			immediate: true,
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

		// check open menu submenu
		checkOpenKeys() {
			if (this.siderCollapsed) {
				this.openKeys = []
				return
			}

			const routeName = this.getRealRouteName()

			const matched = this.routes.find((a) => {
				const matchSelf = a.key === routeName
				const matchChild = a.children?.some((c) => c.key === routeName)
				return matchSelf || matchChild;
			})

			this.openKeys = matched ? [matched.key] : [];
		},

		// handle click menu
		onClickMenu({ key }) {
			const rte = this.routesDict[`${key}`.replace(/^id-/, '')];

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
			else this.$router.push({ name: key });
		},
	},
}
</script>
