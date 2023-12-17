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
  transition: margin .35s, height .35s;

  &:hover {
    cursor: pointer;
  }
}

.logo-large {
  padding: 5px;
  margin: auto;
  height: 64px !important;
  transition: margin .35s, height .35s;

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

  <div>

    <a-layout id="layout-default" class="min-h-screen">

      <layout-left-menu src="user-store" />

      <a-layout class="relative" :style="'margin-left: ' + (mainMenuCollpsed ? '100px' : '250px')">

        <layout-header 
          ref="layout-header"
          :projects="projects"
		  :collapsed="mainMenuCollpsed"
		  :hideProjects="true"
          @account-settings-clicked="accountSettingsCollapsed = $event"
        />

        <a-layout-content class="p-5 m-0.5 bg">

          <Nuxt />

          <a-button class="menu-button" type="link" @click="toggleMainMenuCollpsed()">

            <GeneralIcon :type="mainMenuCollpsed ? 'sidemenu-switcher-closed' : 'sidemenu-switcher-closed'" />

          </a-button>

        </a-layout-content>

        <ELayoutProjectDevEnvSlider :collapsed="devBarCollpsed" />

        <NotificationNot :collapsed="$refs['layout-header']?.notificationCollapsed" />

        <UserProfile />

      </a-layout>

    </a-layout>

    <ELayoutAccountSettingsSlider v-model="accountSettingsCollapsed" />

    <ELayoutSessionCursors />

	<ServiceGroupAppStore ref="mdl-store" />

  </div>

</client-only>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
	// here we need to set the token in the store for the factories to access it
	beforeCreate() {
		global.AUTH_TOKEN = this.$auth.strategy.token.get();
	},
	beforeDestroy() { 
		window.removeEventListener('resize', this.onResize); 
	},
	middleware({ store, redirect, route }) {
		// If the user is not authenticated
		if (!store.$auth.$state.loggedIn) return redirect('/login');

		// if (typeof route?.params?.id == 'undefined') {
		// 	return redirect('/');
		// }
	},
	watch: {
		hasSessions(to) {
			this[to ? 'sendMouseEvents' : 'stopSendingMouseEvents']();
		}
	},
	computed: {
		...mapState('app', [ 'devBarCollpsed', 'mainMenuCollpsed' ]),
	},
	data() {
		return {
			accountSettingsCollapsed: false,
			tmrSetProjectId: null,
		};
	},
	head() { return { ...this.getHead() }},
	mounted() {
		this.$store.commit('app/setSeshionId', this.generateRandomString(30));
		this.$store.dispatch('app/getStoreMenu');
		
    	window.addEventListener('resize', this.onResize);

		try {
			this.$store.dispatch('project/proj/getEntities');
		}
		catch (error) { console.error('mounting error', error) }

		this.initCheckLoginStateTmr();

		this.events.off('refresh-projects');
		this.events.off('member-handle-clicked');

		this.events.off('open-store');
		this.events.on('open-store', (search) => this.$refs['mdl-store'].show(search));

		this.events.on('refresh-projects', async () => {
			await this.$store.dispatch('project/proj/getEntities');
		});

		this.events.on('member-handle-clicked', (handle) => {
			let mem = {};

			for (let m of Object.values(this.allMembers)) {
				if (m.handle != handle) continue;
				mem = m;
				break;
			}

			this.$notification.info({
				placement: 'topRight',
				message: tr('member-info'),
				rtl: true,
				description: function(h) {
					return h('div', [
						`${mem.firstName} ${mem.lastName} (${mem?.username})\n`,
						h(
							'a',
							{
								attrs: { href: `mailto:${mem.email}` }
							},
							[ `${tr('send-email')}` ]
						)
					]);
				},
				duration: 8,
			});
		});

		setTimeout(() => this.setCursorMovementEvent(), 400);
    	setTimeout(() => this.hasSessions ? this.sendMouseEvents() : undefined, 500);

		this.tmrSetProjectId = setInterval(() => this.resetProject(), 1000);
	},
  
	methods: {
		onResize() {
			this.setWindowHeight(document.body.clientHeight);
			this.setWindowWidth(document.body.clientWidth);
		},
		...mapMutations({
			setWindowHeight: 'app/setWindowHeight',
			setWindowWidth: 'app/setWindowWidth',
			stopSendingMouseEvents: 'app/stopSendingMouseEvents',
			sendMouseEvents: 'app/sendMouseEvents',
			toggleMainMenuCollpsed: 'app/toggleMainMenuCollpsed',
		}),
	}
}
</script>