<style>

</style>

<template>
<client-only placeholder="Loading...">

	<Nuxt />

</client-only>
</template>

<script>
export default {
	name: 'default-layout',
	// middleware: [ 'auth' ],
	// middleware({ $auth, redirect }) {
	// 	if (!$auth.$state.loggedIn) {
	// 		const wl = window.location;

	// 		// return redirect(`${wl.protocol}//${wl.hostname}:2000/login`);
	// 	}
	// },
	data() {
		return {

		};
	},
	mounted() {
		
	},
	methods: {
		logout() {
			this.$auth.logout('local');
			this.$router.push({ name: 'login' });
		},
	}
}
</script>