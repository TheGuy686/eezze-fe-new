<template>
<div>

    <section class="px-40 mt-20">

		<h1 class="text-2xl font-bold">
			
			{{ tr('my-projects') }}
		
		</h1>

		<e-row>

			<DashBox
				icon="plus"
				:name="tr('new-project')"
				@click="$refs['mdl'].show(undefined, undefined, true)"
			/>

			<DashBox
				:name="p.projectName"
				:image="imgPath(p)"
				:isProject="true"
				:key="index"
				v-for="(p, index) in projects"
				@click="projectSelected(p)"
			/>

		</e-row>

    </section>

    <section class="px-40 mt-20">

		<h1 class="text-2xl font-bold">{{ tr('popular-profiles') }}</h1>

		<h3>{{ tr('social-media') }}</h3>

		<e-row>

			<DashBox
				:name="p.name"
				:image="p.icon"
				:key="index"
				v-for="(p, index) in popularProfiles"
				@click="events.emit('open-store', p.name)"
			/>

		</e-row>

    </section>

	<DashProjectCreateEditModal ref="mdl" />

</div>
</template>

<script>
import { assets } from '~/consts/Endpoints';

export default {
	middleware: 'auth',

	layout: 'dashboard',

	computed: {
		imgPath() {
			return function (project) {
				return `${assets.logos}/${project?.logo}?rand=${generateRandomString(20)}`;
			}
		}
	},

	data() {
		return {
			popularProfiles: [
				{
					id: 1,
					name: 'Facebook',
					icon: 'facebook.png',
				},
				{
					id: 2,
					name: 'Instagram',
					icon: 'instagram.png',
				},
				{
					id: 3,
					name: 'Twitter',
					icon: 'twitter.png',
				},
				{
					id: 4,
					name: 'Tik Tok',
					icon: 'tiktok.png',
				},
				{
					id: 5,
					name: 'Snapchat',
					icon: 'snapchat.png',
				},
				{
					id: 6,
					name: 'Reditt',
					icon: 'reddit.png',
				},
			]
		}
	},
	methods: {
		projectSelected(project) {
			this.setProject(project);
        	this.$router.push({ path: `/${project.id}/home` });
		}
	}
}
</script>