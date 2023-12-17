<style lang="less">
.home-root {
	margin-left: -1.25rem;
	margin-right: -1.25rem;
	margin-top: -1.25rem;
	width: auto !important;
	position: relative;

	.top-section {
		padding-top: 30px !important;
		background-color: white;
		border-bottom: 1px solid #E0E0E0;

		.project-title {
			font-weight: 700;
			font-size: 18px;
			line-height: 25px;
			margin-bottom: 5px;
		}

		.subheader {
			color: #828282;
		}

		.edit-basic-infot-icon { cursor: pointer; }

		.home-tabs {
			margin-top: 20px;

			.tab {
				padding: 10px 5px;
				margin-right: 20px;

				&:hover { cursor: pointer; }
			}

			.tab-active {
				border-bottom: 1px solid #3F88C5 !important;

				h3 {
					color: #3F88C5 !important;
				}
			}
		}
	}

	.tabs-content {
		.tab-cont-item {
			padding-top: 20px;
		}
	}
}

.team-member-user-info {
	.team-member-initials {
		width: 60px;
		height: 60px;
		background-color: red;
		border-radius: 50%;
		display: flex;
		margin-right: 15px;

		.initials {
			color: white;
			font-weight: 700;
			font-size: 22px;
		}
	}

	.user-info {
		padding-top: 8px;
		justify-content: center;

		.full-name {
			font-style: normal;
			font-weight: 600;
			font-size: 16px;
			line-height: 22px;
		}

		.email {
			color: #828282;
		}
	}
}

.info-section {
    border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
    margin-bottom: 15px;
}

.section-title {
	font-style: normal;
	font-weight: 550;
	font-size: 16px;
	line-height: 19px;
	color: #828282;
}

.setting-title {
	font-weight: 500;
	font-size: 18px;
	color: #000000;
	margin-bottom: 2px;
}

.setting-details {
	font-weight: 400;
	font-size: 15px;
	padding-bottom: 20px;
	margin-bottom: 6px;
	color: #4F4F4F;
}

.clickable-text {
	color: #3F88C5;
	text-decoration: underline;
	font-size: 16px;

	&:hover { cursor: pointer; }
}

.invite-members-btn {
	position: absolute;
	top: 16px;
	right: -22px;
}
</style>

<template>
<e-col class="home-root">

	<e-col class="top-section pl-10 pr-10">

		<e-row>

			<e-row ai="c" w-75>

				<h1 class="project-title">{{ currentProjItem?.projectName ?? '' }}</h1>

				<GeneralIcon
					class="inline-block mr-2 ml-3 edit-basic-infot-icon"
					:type="'edit-grey'"
					@click="$refs['mdl'].show(project)"
				/>

			</e-row>

			<e-row w-25 dir="reverse">

				<a-dropdown-button v-if="false">

					<template #overlay>

						<a-menu>

							<a-menu-item key="1">

								<UserOutlined />

								1st menu item

							</a-menu-item>

							<a-menu-item key="2">

								<UserOutlined />

								2nd menu item

							</a-menu-item>

							<a-menu-item key="3">

								<UserOutlined />

								3rd item

							</a-menu-item>

						</a-menu>

					</template>

				</a-dropdown-button>

			</e-row>

			<div style="position: relative;">

				<a-button class="invite-members-btn" @click="$refs['mdl-invite-members'].show()">

					{{ tr('invite-members') }}

				</a-button>

			</div>	

		</e-row>

		<h3 class="subheader">

			{{ currentProjItem?.details }}

		</h3>

		<e-row class="home-tabs">

			<div
				:class="currentTab == index ? 'tab tab-active' : 'tab'"
				:key="index"
				v-for="(tab, index) in tabs"
				@click="tabClicked(index)"
			>

				<h3 non-sel>{{ tab.title }}</h3>

			</div>

		</e-row>

	</e-col>

	<div class="tabs-content">

		<a-carousel ref="tabs-content">

			<HomeTabsSummary :project= "project" />

			<HomeTabsTeam :project= "project" />

			<HomeTabsConnectedApps :project= "project" />

			<!-- <HomeTabsBilling :project= "project" /> -->

			<HomeTabsSettings
				:project= "project"
				@edit-project="$refs['mdl'].show(project)"
			/>

		</a-carousel>

	</div>

	<DashProjectCreateEditModal ref="mdl" />

	<HomeInviteMembersModal
		ref="mdl-invite-members"
		:project= "project"
	/>

</e-col>
</template>

<script>
import { mapState } from 'vuex';
import ProjectModel from '~/models/ProjectModel';

export default {
	middleware: 'auth',

	computed: {
		project() {
			try {
				return ProjectModel.create(this?.currentProjItem ?? {});
			}
			catch (err) {
				console.log('Home Project error: ', err);
				return {};
			}
		},
		...mapState('project/proj', [ 'currentProjItem', 'entities' ])
	},

	data() {
		return {
			currentTab: 0,
			tabs: [
				{
					key: 'summary',
					title: this.tr('summary')
				},
				{
					key: 'teams',
					title: this.tr('teams')
				},

				{
					key: 'connected-apps',
					title: this.tr('connected-apps')
				},

				// {
				// 	key: 'billing',
				// 	title: this.tr('billing')
				// },

				{
					key: 'settings',
					title: this.tr('settings')
				},
			],
		}
	},

	methods: {
		tabClicked(index) {
			this.currentTab = index;
			this.$refs['tabs-content'].goTo(index);
		},
	}
}
</script>