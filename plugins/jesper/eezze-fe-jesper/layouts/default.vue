<style>
.row {
	display: flex;
	flex-direction: row;
}

.col {
	display: flex;
	flex-direction: column;
}

.left-menu {
	max-width: 250px;
	padding: 20px;
	justify-content: center;
	align-items: center;
}

.right-content {
	justify-content: center;
}
</style>

<template>
<client-only placeholder="Loading...">

	<div class="row">

		<!-- <div class="col left-menu">

			<NaviMenu />

		</div> -->

		<div class="col right-content">

			<Nuxt />

		</div>

	</div>

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
			this.$auth.logout("local");
			this.$router.push({ name: "login" });
		},
	}
}
</script>