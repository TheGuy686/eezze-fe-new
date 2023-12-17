<style lang="less" scoped>
.round-header-btn {
	width: 30px;
	height: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 50%;

	&:hover { cursor: pointer; }
}

.round-btn-bg {
	background-color: #012840;
}

.header-right {
	display: flex;
	align-items: center;
}

.top-header {
	z-index: 50;
}
</style>

<template>
<div>
<!-- Header -->
<a-layout-header class="px-4 fixed flex items-center top-0 bg-white shadow navi-header top-header" :style="'width: ' + (collapsed ? 'calc(100% - 100px);' : (fullScreenWidth ? 'calc(100% - 200px)' : 'calc(100% - 230px)'))">

	<!-- Project Details -->
	<a-dropdown :value="currentProject" v-if="$auth.loggedIn && !hideProjects">

		<a-button type="link" class="flex items-center text-right">

			<e-row ai="c">

				<e-img-avatar
					:size="34"
					dataKey="logo"
					:initials="currentProjectName"
					:imgUrl="projectLogoUrl"
					:uploadable="false"
					v-if="currentProjectName"
				/>

				<span class="pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis leading-tight  text-black-1 font-medium capitalize">

					{{ currentProjectName || tr('select-a-project') }}

				</span>

				<GeneralIcon class="ml-2" :type="'CaretDown'" />

			</e-row>

		</a-button>

		<a-menu slot="overlay" class="mt-3">

			<a-menu-item 
				class="text-sm p-3"
				:key="project?.projectId"
				v-for="project in projects"
				@click="projectChanged(project)"
			>

				<GeneralIcon class="inline-block ml-2 mr-3 align-middle" type="Avatar" />

				<p class="inline align-middle capitalize">
					
					{{ project?.projectName }}
				
				</p>

			</a-menu-item>

			<a-menu-item
				key="createproject"
				class="text-sm p-3"
				@click="$refs['mdl'].show(undefined, undefined, true)"
			>

				<GeneralIcon class="inline-block ml-2 mr-3 align-middle" type="sign-out" />

				<a class="inline align-middle capitalize">

					{{ tr('create-project') }}

				</a>

			</a-menu-item>

		</a-menu>

	</a-dropdown>

	<!-- W: <b>{{ cwp }}</b>% - H: <b>{{ chp }}</b>% RYAN -->

	<e-row jc="fe" clss="pr-2">

		<div>

			<ELayoutCurrentSesions />

		</div>

		<div>

			<a-dropdown v-if="$auth.loggedIn">

				<a-button type="link" class="flex items-center text-left">
	
					<e-avatar
						class="text-white font-large font-medium text-md uppercase"
						:size="30"
						:color="memberColor($auth?.user?.email)"
						:imgSrc="profileImg($auth?.user)"
						:initials="$auth.user.firstName + ' ' + $auth.user.lastName"
					/>
					
					<span
						class="ml-2 whitespace-nowrap overflow-ellipsis text-black-1 font-medium leading-tight capitalize"
					>
						{{ $auth.user.username }}
	
					</span>
	
					<GeneralIcon class="ml-2" :type="'CaretDown'" />
	
				</a-button>
	
				<a-menu slot="overlay" class="mt-3">
	
					<a-menu-item key="account" class="text-sm p-2">
	
						<GeneralIcon class="inline-block ml-2 mr-3 align-middle" :type="'account-setting'" />
	
						<div class="inline align-middle capitalize" @click="$emit('account-settings-clicked', true)">
	
						{{ tr('account-settings') }}
	
						</div>
	
					</a-menu-item>
	
					<a-menu-divider />
	
					<a-menu-item key="logout" class="text-sm p-2">
	
						<GeneralIcon class="inline-block ml-2 mr-3 align-middle" :type="'sign-out'" />
	
						<a class="inline align-middle capitalize" href="javascript:;" @click="logout">
	
						{{ tr('sign-out') }}
	
						</a>
	
					</a-menu-item>
	
				</a-menu>
	
			</a-dropdown>

		</div>

		<div class="header-right">

			<a-badge :count="newNotifications.length">

				<div 
					:class="'round-header-btn mr-1 ' + (notificationCollapsed || notificationIsHovered? ' round-btn-bg' : '')"
					@mouseover="notificationIsHovered = true"
					@mouseleave="notificationIsHovered = false"
					@click.prevent="notificationCollapsed =! notificationCollapsed"
				>

					<GeneralIcon :type="notificationCollapsed || notificationIsHovered ? 'notification-w' : 'notification'" />
				
				</div>

			</a-badge>

			<a-badge :count="0">

				<div
					:class="'round-header-btn' + (devBarCollpsed || devIsHovered ? ' round-btn-bg' : '')"
					@mouseover="devIsHovered = true"
					@mouseleave="devIsHovered = false"
					@click.prevent="toggleDevBar()"
					v-if="hasDevMode"
				>

					<GeneralIcon :type="devBarCollpsed || devIsHovered ? 'bug-w' : 'bug-db'" />

				</div>

			</a-badge>

			<a-button
				class="ml-2 mr-2"
				type="primary"
				:loading="isDeployingProject"
				@click="$store.dispatch('project/proj/deployProject', { 
					projectId: currentProject,
					successCb: () => {
						os(
							() => {
								$notification.success(
									{
										placement: 'topRight',
										message: tr('operation-successful'),
										description: tr('project-was-successfully-deployed'),
									}
								);
							},
							300
						);
					}
				})"
				v-if="!hideProjects"
			>

				{{ tr(isDeployingProject ? 'please-wait' : 'publish-project') }}

			</a-button>

		</div>

	</e-row>

	<DashProjectCreateEditModal ref="mdl" />

</a-layout-header>

<EDrawer 
	ref="send-feedback"
	:width="500"
	:title="tr('send-feedback')"
>
	<e-col>

		<p>

			{{ tr('send-feedback-info') }}

		</p>

		<EFormInput
			class="mt-5"
			:name="tr('subject')"
			:message="tr('please-input-a-subject')"
			v-model="feedbackSubject"
		/>

		<EFormTextArea
			class="mt-5"
			inputStyle="min-height: 210px;"
			:rows="10"
			:name="tr('message')"
			:message="tr('please-input-a-message')"
			v-model="feedbackMessage"
		/>

		<e-row dir="reverse">

			<a-button
				class="mt-5"
				type="primary"
				:loading="isSendingFeedback"
				:disabled="!feedbackIsValid"
				@click="$store.dispatch('app/sendFeedback', {
					subject: feedbackSubject,
					message: feedbackMessage,
					successCb: () => {
						os(
							() => {
								$notification.success(
									{
										placement: 'topRight',
										message: tr('operation-successful'),
									}
								);

								feedbackSubject = '';
								feedbackMessage = '';
							},
							300
						);
					}
				})"
			>
				{{ tr(isSendingFeedback ? 'loading' : 'submit') }}

			</a-button>

		</e-row>

	</e-col>

</EDrawer>

</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { generateRandomString } from '~/classes/StringMethods';
import { assets } from '../../consts/Endpoints';

export default {
	props: {
		fullScreenWidth: Boolean,
		hasDevMode: {
			type: Boolean,
			default: true,
		},
		collapsed: Boolean,
		hasProject: {
			type: Boolean,
			default: true,
		},
		hideProjects: {
			type: Boolean,
			default: false,
		}
	},
	computed: {
		...mapState('project/proj', [ 'isDeployingProject' ]),
		...mapState('app', [ 
			'windowHeight',
			'windowWidth',
			'mouseX',
      		'mouseY',
			'notifications',
			'devBarCollpsed',
			'isSendingFeedback',
		]),

		prLogo() {
			return this.currrentProjectObj?.logo ?? '';
		},
		
		projectLogoUrl() {
            if (!this.prLogo || this.prLogo == '') return '';
            return `${assets.logos}/${this.prLogo}?rand=${generateRandomString(20)}`;
        },

		...mapGetters({
			memberColor: 'app/memberColor',
		}),

		feedbackIsValid() {
			return this.feedbackSubject != '' && this.feedbackMessage != '';
		},

        nots() {
            return Object.values(this.notifications);
        },

		newNotifications() {
			return this.nots.filter((not) => not.status == 'pending');
		},

		// cwp() {
		// 	return Number(parseFloat((this.mouseX / this.windowWidth) * 100).toFixed(2));
		// },
		// chp() {
		// 	return Number(parseFloat((this.mouseY / this.windowHeight) * 100).toFixed(2));
		// }
	},
	watch: {
		projects() {
			if (!this.inited) return;

			this.setProject(this.getCurrentProject(this.$route.params.id));
		},
	},
    data() {
        return {
			inited: false,
            notificationCollapsed: false,
			notificationIsHovered: false,
			devIsHovered: false,

			feedbackSubject: '',
			feedbackMessage: '',
			previousPrLogo: '',
        };
    },
	mounted() {
		this.inited = true;

		this.events.off('notification-clicked');
		this.events.on('notification-clicked', () => {
			this.notificationCollapsed = true;
		});

		this.events.off('send-feedback');
		this.events.on('send-feedback', () => {
			this.$refs['send-feedback'].open();
		});
	},
	methods: {
		...mapMutations({
			setDevBarCollapsed: 'app/setDevBarCollapsed'
		}),
		toggleDevBar() {
			if (this.notificationCollapsed) {
				this.hideNotifications();
			}
			this.setDevBarCollapsed();
		},
		hideNotifications() {
			this.notificationCollapsed = false;
		},
		projectChanged(project) {
			if (this.$route.path == '/') {
				this.$router.push(`/${project.id}/home`);
			}
			else {
				this.$router.push(this.$route.path.replace(/^\/[0-9]+\/(.*)/, `/${project.id}/$1`));
			}

			this.setProject(project);
			this.emitEditingProject(self.currentProject);
			
			this.populateProjectData(project.id);
		},
	}
}
</script>