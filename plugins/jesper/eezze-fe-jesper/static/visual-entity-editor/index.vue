<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
@import url('https://fonts.gstatic.com');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
@import url('./dist/css/main.css');
</style>

<!-- <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel='stylesheet' href='dist/css/main.css' type='text/css' media='all' /> -->

<template>
<div>
	<!-- <canvas ref="canvas" id="canvas" width="100%" height="100%"></canvas>
	<div ref="content" id="content"></div>
	<div ref="grid-bg" id="grid-bg"></div> -->

	<iframe src="/plugins/visual-entity-editor/demo.html/" width="100%" height="300" style="border:none;"></iframe>

</div>
</template>

<script src="dist/js/global.js"></script>
<script>
import interact from './assets/js/vendors/interact.min.js';

// document.getElementById = function (id) {
// console.log('Getting to here');
// 	return orig(id);
// }

// global.jQuery = require('jquery');
// var $ = global.jQuery;
// window.$ = $;

// window.jQuery = global.jQuery;
// global.interact = interact;

// import G from './dist/js/global';
// import VisualEntityEditor from './VisualEntityEditor';

export default {
	name: 'visual-entity-editor',
	beforeCreate() {
		// $.getJSON("demo.json", (entities) => {
		// 	VisualEntityEditor.loadJsonEntities(entities);
		// });

		// const self = this;

		// const glb = G(global.jQuery);

		// console.log('interact: ', glb);


		// $(VisualEntityEditor.events).on('change', (event, eventData) => {
		// 	console.log(eventData);

		// 	for (const [index, entity] of Object.entries(VisualEntityEditor.entities)) {
		// 		console.log(entity);
		// 	}

		// 	self.data = VisualEntityEditor.entities;

		// 	self.$emit('input', self.data);
			
		// });
	},
	data() {
		return {
			editor: null,
			data: [
				{
					"type": "dbTable",
					"id": 1,
					"name": "User",
					"position": { "x": 600, "y": 350 },
					"modules": [
						{
							"type": "dbColumn",
							"id": 2,
							"name": "ID",
							"key_primary": true,
							"output": { 
								"6": { 
									"entity_id": 6,
									"data": {
										"type": "n:1"
									}
								} 
							}
						},
						{
							"type": "dbColumn",
							"id": 3,
							"name": "Username"
						},
						{
							"type": "dbColumn",
							"id": 4,
							"name": "Password"
						}
					]
				},
				{
					"type": "dbTable",
					"id": 5,
					"name": "Order",
					"position": { "x": 850, "y": 350 },
					"modules": [
						{
							"type": "dbColumn",
							"id": 6,
							"name": "ID",
							"input": { 
								"2": { 
									"entity_id": 2,
									"data": {
										"type": "n:1"
									}
								} 
							}
						},
						{
							"type": "dbColumn",
							"id": 7,
							"name": "Product"
						},
						{
							"type": "dbColumn",
							"id": 8,
							"name": "Amount"
						}
					]
				},
				{
					"type": "dbTable",
					"id": 9,
					"name": "Product",
					"position": { "x": 1100, "y": 350 },
					"modules": [
						{
							"type": "dbColumn",
							"id": 10,
							"name": "ID"
						},
						{
							"type": "dbColumn",
							"id": 11,
							"name": "Name"
						},
						{
							"type": "dbColumn",
							"id": 12,
							"name": "Price"
						}
					]
				}
			],
		}
	},
	async mounted() {
		// this.editor = new VisualEntityEditor(this.$refs['canvas'], this.$refs['content'], interact);
		// this.editor = VisualEntityEditor;

		// global.VisualEntityEditor = this.editor;

		// setTimeout(() => {
		// 	this.setJsonFromData();
		// }, 200);
	},
	methods: {
		setJsonFromData() {
			//this.editor.loadJsonEntities(this.data);
		}
	}
}
</script>