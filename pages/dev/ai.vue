<style>
#components-a-tooltip-demo-color .ant-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>

<template>
<e-col style="background-color: rgba(0, 0, 0, 0.5); height: 100vh;" ai="c">

	<a-card title="Card title" style="width: 1200px;" class="mt-10">

		<DashAi ref="ai-assist" />

	</a-card>

</e-col>
</template>

<script>
export default {
	// middleware: 'auth',
	layout: 'plain',

  	data() {  
		return {
		}
	},

  	methods: {
		async populateDataTble1() {
			const res = await this.$axios.get('https://catfact.ninja/fact')

		
		},
  	}
}
</script>
