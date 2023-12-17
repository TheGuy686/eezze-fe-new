<style scoped>
.back-arrow {
	position: absolute;
	left: 8px;
	top: -45px;
	cursor: pointer;
}

.ant-modal-header {
	border-bottom: none !important;
	padding-left: 5px !important;
}

.ant-modal-body {
	padding-top: 1px !important;
}

.status-message {
	margin-right: 20px;
	color: #b68326;
	font-weight: 600;
}

.footer-message {
	margin-right: 20px;
	color: #828282;
	font-weight: 400;
}

.disabled {
	background-color: #d9d9d9 !important;
	color: rgba(0, 0, 0, 0.65) !important;
}

.right-btn {
	margin-left: 5px;
}
</style>

<template>
<a-modal
	ref="mdl"
	v-model="visible"
	style="margin-top: 30px"
	:destroy-on-close="true"
	:title="title"
	:width="width"
	:dialogStyle="compStyle"
	:body-style="{ 'position': 'relative' }"
	@cancel="() => {
		$emit('modal-closed');
		hide();
	}"
	@ok="$emit('modal-closed')"
>
	<GeneralIcon
		class="back-arrow"
		type="back"
		v-if="showBackBtn"
		@click="$emit('back-btn-clicked')"
	/>

	<slot></slot>

	<template v-if="showFooter" slot="footer">

		<e-row>

			<e-row w-50>

				<span
					class="status-message"
					v-html="statusMessage"
					v-if="isLoading && statusMessage != ''"
				/>

				<span
					class="footer-message"
					v-html="footerMessage"
					v-if="footerMessage != ''"
				/>

			</e-row>

			<e-row dir="reverse" w-50>

				<a-button
					size="large"
					:class="'right-btn ' + rightBtnClass + (shouldDisableRightBtn ? ' disabled' : '')"
					key="submit"
					:disabled="shouldDisableRightBtn"
					:loading="isLoading"
					@click="handleOk"
					v-if="!hideRightBtn"
				>
					{{ rightBtnText }}

				</a-button>

				<a-button 
					size="large"
					:class="'left-btn' + leftBtnClass"
					key="back"
					@click="handleCancel"
					v-if="!hideLeftBtn"
				>
					{{ leftBtnText }}

				</a-button>

			</e-row>

		</e-row>

	</template>

</a-modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
	props: {
		eStyle: String,
		top: {
			type: Number,
		},
		width: {
			type: Number | String,
			default: () => 350
		},
		title: {
			type: String,
			default: 'Model'
		},
		showBackBtn: {
			type: Boolean,
			default: false,
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
		leftBtnClass: {
			type: String,
			default: "bg-gray-5 text-gray-3"
		},
		rightBtnClass: {
			type: String,
			default: "bg-success text-white"
		},
		dialogStyle: Object,
		showFooter: {
			type: Boolean,
			default: true,
		},
		footer: {
			type: Object,
			default: () => {}
		},
		statusMessage: {
			type: String,
			default: '',
		},
		footerMessage: {
			type: String,
			default: '',
		},
		hideLeftBtn: Boolean,
		hideRightBtn: Boolean,
		shouldDisableRightBtn: {
			type: Boolean,
		},
		debug: Boolean,
	},
	computed: {
		...mapState('app', [ 'windowHeight' ]),

		compStyle() {
			try {
				let def = { 'border-radius': '25px' };

				if (typeof this?.dialogStyle === 'object') {
					def = {...def, ...this?.dialogStyle};
				}

				if (typeof this.top == 'number') {
					def['top'] = this.top + 'px';
				}
				else {
					def['top'] = `${(this.windowHeight * 0.05)}px`;
				}

				return def;
			}
			catch (err) {
				return {
					'border-radius': '25px'
				};
			}
		}
	},

	data() {return { visible: false }},

	watch: {
		visible(to) {
			if (!to) {
				this.$emit('modal-closed');
			}
		}
	},

	mounted() {
		if (this.debug) {
			setTimeout(() => {
				console.clear();
				console.log(this);
			}, 200);
		}
	},

	methods: {
		show() {this.visible = true},
		hide() {this.visible = false},

		handleOk(e) {
			if (this.hideLeftBtn) {
				if (typeof this.$listeners['right-btn-clicked'] == 'undefined') {
					this.hide()
				}
				else {
					this.$emit(
						'right-btn-clicked',
						() => setTimeout(
							this.hide(),
							1700
						)
					);
				}
			}
			else {
				this.$emit(
					'right-btn-clicked',
					() => setTimeout(
						this.hide(),
						1700
					)
				);
			}
		},
		handleCancel(e) {this.hide()},
	},
};
</script>