<style lang="less">
.navi-header {
  z-index: 10;
}

.menu-button {
  position: absolute;
  top: 40%;
  left: -17px;
  filter: drop-shadow(2px 1px 1px lightgrey);
}

.shadow {
  filter: drop-shadow(1px 1px 1px lightgrey) !important;
}

.sidenav-border-top {
  border-top: 1px solid lightgray;
}

.logo-box {
  height: 60px !important;
}

.logo {
  padding: 5px;
  margin: 12px 12px 12px 42px;
  height: 40px !important;

  &:hover {
    cursor: pointer;
  }
}

.logo-large {
  padding: 5px;
  margin: auto;
  height: 64px !important;

  &:hover {
    cursor: pointer;
  }
}

.dot {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
}

.bg {
  background: #F9F9F9;
}
</style>

<template>
<client-only placeholder="Loading...">

	<a-layout id="layout-dashboard" class="min-h-screen">

		<a-layout-sider
			style="background-color: #F9F9F9;"
			class="fixed shadow left-0 top-0 h-screen overflow-x-hidden overflow-y-auto"
			:collapsible="false"
			:width="collapsed ? 60 : 200"
			:trigger="null"
			theme="light"
			v-model="collapsed"
		>
			<div class="bg-white shadow">

				<img
				:class="collapsed ? 'logo' :'logo-large'"
				src="../assets/icons/logo.png"
				@click="$router.push({ path: '/' })"
				/>

			</div>

		</a-layout-sider>

		<a-layout class="relative">

			<layout-header 
				ref="layout-header"
				:fullScreenWidth="true"
				:hasDevMode="false"
				:hideProjects="true"
				:projects="projects"
				@account-settings-clicked="accountSettingsCollapsed = $event"
			/>

			<a-layout-content class="p-5 m-0.5 bg"><Nuxt /></a-layout-content>

			<NotificationNot :collapsed="$refs['layout-header']?.notificationCollapsed" />

			<UserProfile />

		</a-layout>

		<ELayoutAccountSettingsSlider v-model="accountSettingsCollapsed" />

		<ServiceGroupAppStore ref="mdl-store" />

	</a-layout>

</client-only>
</template>

<script>
export default {
  // here we need to set the token in the store for the factories to access it
  beforeCreate() {
    global.AUTH_TOKEN = this.$auth.strategy.token.get();
  },
  middleware({ store, redirect, from }) {
    // If the user is not authenticated
    if (!store.$auth.$state.loggedIn) {
      return redirect('/login');
    }
  },
  data() {
    return {
      collapsed: false,
      accountSettingsCollapsed: false,
    };
  },
  head() { return { ...this.getHead() }},
  mounted() {
		try {
      		this.$store.commit('app/setSeshionId', this.generateRandomString(30));
			this.$store.dispatch('app/getStoreMenu');
			this.$store.dispatch('project/proj/getEntities');

			this.events.off('open-store');
			this.events.on('open-store', (search) => this.$refs['mdl-store'].show(search));

			this.os(() => this.populateProjectData(this.$route.params.id), 200);
		}
		catch (error) { console.error('mounting error', error) }

		this.initCheckLoginStateTmr();
	},
}
</script>