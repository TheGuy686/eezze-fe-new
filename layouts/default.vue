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

	<div>

		<a-layout id="layout-default" class="min-h-screen">

			<layout-left-menu />

			<a-layout class="relative" :style="'margin-left: ' + (mainMenuCollpsed ? '100px' : '250px')">

				<layout-header
					ref="layout-header"
					:projects="projects"
					:collapsed="mainMenuCollpsed"
					@account-settings-clicked="accountSettingsCollapsed = $event"
				/>

				<a-layout-content class="p-5 m-0.5 bg" style="position: relative;">

					<layout-modes
						:top="isLessPaddingMode ? 5 : undefined"
						:right="isLessPaddingMode ? 5 : undefined"
					/>

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

		<DatasourceNewLoggerTutorial ref="tut-create-logger" />

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
		this.stopSendingMouseEvents();
	},
	middleware({ store, redirect, route }) {
		// If the user is not authenticated
		if (!store.$auth.$state.loggedIn) return redirect('/login');

		if (typeof route?.params?.id == 'undefined' || route?.params?.id  == '_prId') {
			return redirect('/');
		}
	},
	watch: {
		hasSessions(to) {
			this[to ? 'sendMouseEvents' : 'stopSendingMouseEvents']();
		}
	},
	computed: {
		...mapState('app', [ 'devBarCollpsed', 'mainMenuCollpsed' ]),

		isLessPaddingMode() {
			const routes = [ 'id-entity' ];

			return routes.includes(this.$route.name);
		}
	},
	data() {
		return {
			accountSettingsCollapsed: false,
			ttsSynth: null,
			tmrSetProjectId: null,
		};
	},
	head() { return { ...this.getHead() }},
	beforeDestroy() {
		this.$eventBus.$off('show-create-logger-datasource', this.showTutorial);
	},
	
	mounted() {
		this.$store.commit('app/setSeshionId', this.generateRandomString(30));
		this.$store.dispatch('app/getStoreMenu');

		window.addEventListener('resize', this.onResize);

		// setTimeout(() => this.setListenToSpeech(), 2000);

		// this.$nextTick(() => {
		//   window.addEventListener('resize', this.onResize);
		// })

		this.$eventBus.$on('show-create-logger-datasource', this.showTutorial);

		this.events.off('open-store');
		this.events.on('open-store', (search) => this.$refs['mdl-store'].show(search));

		try {
			this.$store.dispatch('project/proj/getEntities');

			this.os(() => this.populateProjectData(this.$route.params.id), 200);
		}
		catch (error) { console.error('mounting error', error) }

		this.initCheckLoginStateTmr();

		this.events.off('refresh-projects');
		this.events.off('member-handle-clicked');

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

		// here we set a tmr that just keeps resetting the current project id on an interval to get rid of this annoying projectId issue
		if (this.tmrSetProjectId) clearInterval(this.tmrSetProjectId);

		this.tmrSetProjectId = setInterval(() => this.resetProject(), 1000);

		this.events.off('member-handle-clicked');

		this.events.on('member-handle-clicked', (text) => this.say(text));
	},

	methods: {
		showTutorial() {
			this.os(() => {

				this.$refs['tut-create-logger'].start();

			}, 200);
		},
		onResize() {
			this.setWindowHeight(document.body.clientHeight);
			this.setWindowWidth(document.body.clientWidth);
		},
		setListenToSpeech() {
			console.clear();

			// Set the time limit for inactivity in milliseconds
			const INACTIVITY_TIMEOUT = 5000; // 5 seconds

			// Create a new instance of the SpeechRecognition object
			const recognition = new webkitSpeechRecognition();

			// Set the recognition settings
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.lang = 'en-US';

			const answerCalls = [
				'hey,*.?lila',
				'hello,*.?lila',
				'.*?lila.*?you.*?there.*?',
				'lila',
			];

			// Initialize the transcript variable
			let transcript = '';

			// Reset the transcript if there's no new input after a certain period of time
			let inactivityTimer;
			function resetTranscript() {
				transcript = '';
				console.log('Transcript reset');
			}

			recognition.onend = () => {
				// Restart the recognition process
				recognition.start();

				// Reset the inactivity timer
				clearTimeout(inactivityTimer);
				inactivityTimer = setTimeout(resetTranscript, INACTIVITY_TIMEOUT);
			};

			let isHavingAConversation = false;

			// Handle the results of the recognition
			recognition.onresult = (event) => {
				const res = Array.from(event.results)
					.map((result) => result[0].transcript)
					.join('').toLocaleLowerCase();
console.log('res: ', res);
				if (!isHavingAConversation) {
					for (const greetReg of answerCalls) {

						if (!new RegExp(greetReg).test(res)) continue;

						isHavingAConversation = true;

						this.say('Hey Boss. How can I help you today?');

						break;
					}
				}

				transcript = `${res}`;
				// console.log(transcript);

				// Reset the inactivity timer
				clearTimeout(inactivityTimer);
				inactivityTimer = setTimeout(resetTranscript, INACTIVITY_TIMEOUT);
			};

			console.log('Should be listening:');

			// Start the recognition
			recognition.start();

			this.say('Ready to start listening');
		},
		say(text) {
			// Create a new instance of SpeechSynthesisUtterance
			const utterance = new SpeechSynthesisUtterance();

			// Set the text to be spoken
			utterance.text = text;

			// Use the default voice
			utterance.voice = speechSynthesis.getVoices()[1];

			console.log(`Should have said "${text}"`);

			// Speak the text
			speechSynthesis.speak(utterance);
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