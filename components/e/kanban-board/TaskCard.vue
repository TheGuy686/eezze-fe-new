
<style lang="less" scoped>
.task-card-root {
	.avatar-div {
		width: 2px;
		height: 30px;
		border-right: solid 1px rgba(0, 0, 0, 0.1);
		margin-left: 8px;
		margin-right: 22px;
	}

	.eezze-badge {
		margin-right: -10px;
	}
	
	.session-avatar {
		&:hover { cursor: pointer; }
	}

	&:hover { cursor: pointer; }
}
</style>

<template>
<div
	class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white task-card-root"
	@click="$emit('card-clicked')"
>

    <div class="flex justify-between">

    	<p 
			class="text-gray-700 font-semibold font-sans tracking-wide text-sm" 
			style="padding-right: 28px;"
			v-if="!isEditing"
		>
			
			{{ task.title }}
		
		</p>

		<div class="pr-10" v-else>

			<EFormInput
				:name="tr('title')"
				:inlineOver="true"
				v-model="task.title"
			/>

		</div>

		<!-- <img
			class="w-6 h-6 rounded-full ml-3"
			src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
			alt="Avatar"
		> -->

		<div style="padding-left: 5px;">

			<e-avatar
				class="left-20 z-10 -ml-4 text-white font-large font-medium text-md uppercase session-avatar"
				:size="'default'"
				:imgSrc="profileImg({})"
				:color="assignedToColor"
				:initials="assignedToMember"
				v-if="assignedToMember"
			/>

		</div>

    </div>

    <div class="flex mt-4 justify-between items-center">

		<span class="text-sm text-gray-600">
			
			{{ trDate(task.date) }}
		
		</span>

		<!-- <badge :color="badgeColor" v-if="task.type">
			
			{{ tr(task.type) }}
		
		</badge> -->

		<a-tooltip :title="tr(task.type)" placement="right">
			
			<div class="eezze-badge">

				<a-tag :color="badgeColor" v-if="task.type">
				
					{{ typeAlias }}

				</a-tag>

			</div>
			
		</a-tooltip>

		<!-- <a-popover trigger="hover" placement="right">

			<template #content>

				<div :style="`font-size: 10px; color: ${badgeColor};`">

					<b>{{ tr(task.type) }}</b>
					
				</div>

			</template>

		</a-popover> -->

    </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Badge from './Badge.vue';

const NOTI_BADGE_MAPPINGS = {
	bug: 'red',
	'feature-request': 'purple',
	'new-feature': 'teal',
};

export default {
	components: { Badge },
	props: {
		isNew: Boolean,
		task: {
			type: Object,
			default: () => ({})
		},
		members: Object,
	},
	computed: {
		...mapGetters({
			memberColor: 'app/memberColor',
		}),
		badgeColor() {
			return NOTI_BADGE_MAPPINGS[this.task.type] || mappings.default;
		},
		typeAlias() {
			switch (this.task.type) {
				case 'bug': return 'BUG';
				case 'feature-request': return 'FR';
				case 'new-feature': return 'NF';
			}
		},
		assignedTo() {
			try {
				const at = this.task.assignedTo?.[0];
				const mem = this.members?.[at];

				if (typeof mem == 'object') return mem;

				return at;
			}
			catch (err) {}
		},
		assignedToMember() {
			if (typeof this.assignedTo == 'object') {
				return `${this.assignedTo.firstName} ${this.assignedTo.lastName}`;
			}

			return this.assignedTo;
		},
		assignedToColor() {
			let id;

			if (typeof this.assignedTo == 'object') {
				id = this.assignedTo.email;
			}
			else id = this.assignedToMember;

			return this.memberColor(id);
		},
	},
	data() {
		return {
			isEditing: false,
		}
	},
	methods: {
		trDate(date) {
			try {
				const dte = new Date(date);

				return dte.toDateString();
			}
			catch (err) {
				return date;
			}
		},
		edit() {
			this.isEditing = true;
		}
	}
};
</script>
  