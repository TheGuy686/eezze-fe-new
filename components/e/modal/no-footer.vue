<template>
<a-modal
	ref="mdl"
	v-model="visible"
	style="margin-top: 30px;"
	:destroy-on-close="true"
	:title="title"
	:width="width"
	:dialog-style="dialogStyle"
	:body-style="{'position': 'relative'}"
	:footer="null"
	@cancel="() => {
		$emit('modal-closed');
		hide();
	}"
	@ok="$emit('modal-closed')"
>
	<slot></slot>

</a-modal>
</template>

<script>
export default {
	props: {
		width: {
			type: [Number, String],
			default: () => 200
		},
		title: {
			type: String,
			default: 'Model'
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		leftBtnText: {
			type: String,
			default: 'Close'
		},
		rightBtnText: {
			type: String,
			default: 'Submit'
		},
		dialogStyle: {
			type: Object,
			default: () => {},
		},
		showFooter: {
			type: Boolean,
			default: true,
		},
		footer: {
			type: [Object],
			default: () => {}
		}
	},

	data() {return {visible: false}},

	watch:
	{
		visible(to, from) {
			if (!to) 
			{
				this.$emit('modal-closed');
			}
		}
	},

	methods: {
		show() {this.visible = true},
		hide() {this.visible = false},

		handleOk(e) {
			this.$emit(
				'right-btn-clicked',
				() => setTimeout(
					this.hide(),
					1700
				)
			);
		},
		handleCancel(e) {this.hide()},
	},
};
</script>