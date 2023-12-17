<template>

  <nuxt-link :to="{ name: 'index' }">

    <button type="primary"> Back Home </button>

  </nuxt-link>

</template>

<script>
export default {
	props: {
		error: {
			type: Object,
			default: () => ({}),
		},
	},

	head() {
		return {
			title: this.error.statusCode,
		}
	},
}
</script>
