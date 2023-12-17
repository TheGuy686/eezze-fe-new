<style lang="less" scoped>
.modes-root {
	z-index: 10;
	position: absolute;
	display: flex;
	flex-direction: row;
	background-color: white;
	padding-left: 5px !important;
	padding-right: 5px !important;

	.mode-btn {
		padding: 3px;
		padding-bottom: 5px;
		border-radius: 5px;
		border: solid 1px rgba(0, 0, 0, 0);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 2px;
		margin-bottom: 2px;

		&:hover {
			border: solid 1px #012840 !important;
		}
	}

	.mode-active {
		background-color: #012840 !important;
		cursor: no-drop;
	}
}
</style>

<template>
<div bev-cont class="modes-root" :style="`top: ${top}px; right: ${right}px;`">

	<div :class="`mode-btn ${isActive('advanced') ? 'mode-active' : ''} mr-1`" @click="modeClicked('advanced')">

		<GeneralIcon :type="`mode-advanced-${isActive('advanced') ? 'w' : 'db'}`" />

	</div>

	<div :class="`mode-btn ${isActive('tables') ? 'mode-active' : ''}`" @click="modeClicked('tables')">

		<GeneralIcon :type="`mode-tables-${isActive('tables') ? 'w' : 'db'}`" />

	</div>

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	props: {
		top: {
			type: Number,
			default: 12,
		},
		right: {
			type: Number,
			default: 20,
		},
	},
	watch: {
		viewMode(to) {
			if (to == 'advanced') {
				this.$router.push(`/${this.currentProject}/advanced-edit`);
			}
			else {
				this.$router.push(`/${this.currentProject}/home`);
			}
		},
	},
	computed: {
		...mapState('app', [ 'viewMode' ]),

		isActive() {
			return function(key) {
				return this.viewMode == key;
			}
		}
	},
    data() {
        return {

        };
    },
	mounted() {
		if (/advanced-edit/.test(this.$route.path)) {
			this.modeClicked('advanced');
		}
	},
	methods: {
		modeClicked(mode) {
			if (this.viewMode == mode) return;

			this.setViewMode(mode);
		},

		...mapMutations({
			setViewMode: 'app/setViewMode',
		}),
	}
}
</script>