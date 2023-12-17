<template>
<a-result
  :status="`${error.statusCode}`"
  :title="`${error.statusCode}`"
  :sub-title="error.message"
>
    <template #extra>

        <nuxt-link :to="{ name: 'index' }">

        	<a-button type="primary"> Back Home </a-button>

        </nuxt-link>

    </template>

</a-result>
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
	mounted() {
		this.$store.commit('app/setSeshionId', this.generateRandomString(30));
	}
}
</script>
