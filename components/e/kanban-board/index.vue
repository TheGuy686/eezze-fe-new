<style lang="less" scoped>
.kanbab-root {
	height: 78vh;
	padding-left: 20px;

	.column-cont {
		height: 78vh !important;
	}

	.kanbab-column {
		background-color: #F7F8F9;
		border-radius: 3px;
		box-shadow: 0px 1px 1px #091E4240, 0px 0px 1px #091E424F;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		min-height: 20%;
		max-height: 110%;
		position: relative;
		white-space: normal;
		width: 100%!important;
		margin-right: -5px;
		border: solid 1px rgba(0, 0, 0, 0.1);

		.cont {
			padding-right: 5px;
		}
	}

	.column-width {
		min-width: 240px;
		width: 320px;
	}

	.ghost-card {
		opacity: 0.5;
		background: #F7FAFC;
		border: 1px solid #4299e1;
	}

	.comments-mdl-root {}

	.comments-cont {
		max-height: 300px !important;
	}
}
</style>

<template>
<div class="kanbab-root">

	<div class="flex justify-center">

		<div class="flex overflow-x-scroll py-12 column-cont">

			<div
				class="bg-gray-100 rounded-lg px-3 py-3 column-width kanbab-column rounded mr-4"
				:key="`${column.key}-${index}`"
				v-for="column, index in mdl"
			>
				<e-row jc="sb">

					<p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
					
						{{ tr(kebabCase(column.key)) }}
					
					</p>

					<a-button
						style="margin-left: 4px;"
						type="primary"
						size="small" 
						shape="circle" 
						icon="plus"
						@click="isEdit = false; addTask(index)"
					/>

				</e-row>

				<div class="cont" :e-scroll="(column?.tasks ?? []).length > 5">

					<draggable
						:list="column.tasks"
						:animation="200"
						ghost-class="ghost-card"
						group="tasks"
						@change="moved()"
					>

						<task-card
							:key="task.id"
							:task="task"
							class="mt-3 cursor-move"
							:members="membersEmails"
							v-for="task, ind in column.tasks"
							@card-clicked="isEdit = true; editTask(index, task, ind)"
						/>

					</draggable>

				</div>

			</div>

		</div>

	</div>

	<EModal
        ref="mdl"
		:width="800"
		:isLoading="isDoingRequest"
        :title="tr(isEdit ? 'edit-task' : 'add-task')"
		@right-btn-clicked="addSaveTaskConfirmed(true)"
		@modal-closed="modalClosed()"
    >
		<e-row>

			<e-col w-50>

				<e-row>

					<e-row w-75>

						<EFormInput
							:name="tr('title')"
							v-model="entity.title"
						/>

					</e-row>

					<e-col w-25 jc="fe" ai="c">
						
						<e-tag-drop-down
							clss="ml-1 mb-1"
							colorCol="color"
							keyCol="id"
							valueCol="title"
							:maxLength="7"
							:options="priorityLevels"
							:placeholder="tr('priority')"
							v-model="entity.priority"
						/>

					</e-col>

				</e-row>

				<EFormTextArea
					:name="tr('description')"
					v-model="entity.description"
				/>

				<EFormCalendar
					:name="tr('due-date')"
					v-model="entity.dueDate"
				/>

				<EFormSelect
					w-100
					class="pr-2 mt-3"
					:name="tr('assign-to')"
					mode="tags"
					:placeholder="tr('input-emails')"
					keyProp="email"
					valueProp="handle"
					:options="Object.values(members)"
					v-model="entity.assignedTo"
				/>

				<EFormSelect
					class="pr-2 mt-3"
					:name="tr('type')"
					:placeholder="tr('choose-a-type')"
					keyProp="key"
					valueProp="title"
					:options="taskCategories"
					v-model="entity.type"
				/>

			</e-col>
			
			<e-col w-50 clss="pl-3 pr-3">

				<h3>{{ tr('comments') }}</h3>

				<e-row>

					<e-col w-75>

						<a-mentions
							rows="3"
							:placeholder="tr('write-a-comment')"
							v-model="commentPh"
							v-on:keypress.ctrl.enter="addNewComment()"
							@select="userMentioned($event.value)"
						>
							<a-mentions-option :key="m.id" :value="m.handle" v-for="m in members">
								
								{{ m.handle }}

							</a-mentions-option>

						</a-mentions>

					</e-col>

					<e-col :center="true" w-25>

						<a-button type="primary" @click="addNewComment()">

							{{ tr('submit') }}

						</a-button>

					</e-col>

				</e-row>

				<e-col clss="p-5 mt-2" style="max-height: 43vh" e-scroll v-if="(comments?.length ?? 0) > 0">

					<e-kanban-board-comment
						:key="i"
						:comment="c"
						:members="membersHandlers"
						v-for="c, i in comments"
						@handle-clicked="$emit('handle-clicked', $event)"
					/>

				</e-col>

				<e-col :center="true" v-else>

					<h3 class="pt-10">{{ tr('no-comments-to-show') }}</h3>

				</e-col>

			</e-col>

		</e-row>

    </EModal>

</div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

import draggable from 'vuedraggable';
import TaskCard from './TaskCard.vue';
import TaskBoardModel from '~/models/TaskBoardModel';

export default {
	components: { TaskCard, draggable },
	props: {
		value: {
			type: Object,
			required: true,
		},
		isDoingRequest: Boolean,
		members: {
			type: Object,
			default: () => {},
		},
	},
	computed: {
		...mapState('project/management/tasks', [
			'priorityLevels',
			'taskCategories'
		]),
		membersHandlers() {return this.keyify(this.members, 'handle')},
		membersEmails() {return this.keyify(this.members, 'email')},
		tasksFlattened() {
			try {
				return JSON.parse(JSON.stringify(this.mdl));
			}
			catch (err) {}
		},
		commentsPreview() {
			try {
				return {
					itteration: 0,
					comments: this.entity.comments,
				};
			}
			catch (err) {
				return { itteration: 0, comments: [] };
			}
		},
		comments() {
			return Object.values(this.commentsPreview?.comments ?? []);
		}
	},
	watch: {
		tasksFlattened() {
			if (this.justchanged) return;

			this.$emit('input', this.mdl);

			this.resetTmr = setTimeout(() => this.justchanged = false, 50);
		}
	},
	data() {
		return {
			justchanged: false,
			resetTmr: null,
			mdl: {},
			columnKey:  '',
			entity: {},
			isEdit: false,
			editingIndex: -1,
			justEmitted: false,
			emitTmr: null,
			itteration: 0,
			commentPh: '',
			mentions: [],
			mentionsOut: [],
		};
	},
	mounted() {
		this.setMdl();
	},
	methods: {
		userMentioned(value) {
			this.mentions.push(value);
		},

		modal() { return this.$refs['mdl'] },

		addNewComment() {
			if (!Array.isArray(this.entity?.comments)) {
				Vue.set(this.entity, 'comments', []);
			}

			this.entity.comments.push({
				date: new Date().toDateString(),
				user: this.$auth.$state.user.id,
				comment: this.commentPh,
				mentions: [...this.mentions],
			});

			for (let m of this.mentions) {
				const mem = this.membersHandlers?.[m];

				if (typeof mem) {
					this.mentionsOut.push({
						userId: mem.id,
						email: mem.email,
						comment: this.commentPh,
					});
				}
			}

			this.addSaveTaskConfirmed(false);

			this.itteration++;
			this.commentPh = '';
			this.mentions  = [];
		},

		setMdl() {
			this.mdl = this.cloneObj({
				backlog: this.cloneObj(this.value['backlog']),
				inProgress: this.cloneObj(this.value['inProgress']),
				inReview: this.cloneObj(this.value['inReview']),
				qAndA: this.cloneObj(this.value['qAndA']),
				done: this.cloneObj(this.value['done']),
			});
		},

		resetMdl() {
			this.mdl = this.cloneObj({
				backlog: this.cloneObj(this.mdl['backlog']),
				inProgress: this.cloneObj(this.mdl['inProgress']),
				inReview: this.cloneObj(this.mdl['inReview']),
				qAndA: this.cloneObj(this.mdl['qAndA']),
				done: this.cloneObj(this.mdl['done']),
			});
		},

		cloneObj(obj) {
			try {
				return JSON.parse(JSON.stringify({...obj}));
			}
			catch (err) { return obj }
		},
		addTask(key) {
			try {
				this.columnKey = key;
				this.entity = TaskBoardModel.newTask();

				this.$refs['mdl'].show();
			}
			catch (err) { console.log('Error: ', err) }
		},
		editTask(key, entity, index) {
			try {
				this.columnKey = key;
				this.editingIndex = index;

				this.entity = this.cloneObj(entity);

				this.$refs['mdl'].show();
			}
			catch (err) { console.log('Error: ', err) }
		},
		addSaveTaskConfirmed(shouldClose) {
			try {
				this.resetMdl();

				if (!this.isEdit) {
					if (!this.mdl[this.columnKey].key) {
						this.mdl[this.columnKey].key = this.columnKey;
					}

					if (!this.mdl[this.columnKey].tasks) {
						this.mdl[this.columnKey].tasks = [];
					}

					this.mdl[this.columnKey].tasks.push(this.cloneObj({...this.entity}));
				}
				else {
					this.mdl[this.columnKey].tasks[this.editingIndex] = this.cloneObj({...this.entity});
				}

				this.$emit('input', this.mdl);

				this.emitChange(shouldClose);
			}
			catch (err) { console.log('Error: ', err) }
		},
		moved() {
			this.$emit('input', this.mdl);
			this.emitChange();
		},
		emitChange(shouldClose = false) {
			if (this.justEmitted) return;

			this.$emit('save-board', {
				mentions: this.mentionsOut,
				shouldClose,
			});

			this.emitTmr = setTimeout(() => this.justEmitted = false, 200);
		},

		update() { this.setMdl() },

		modalClosed() {
			this.commentPh = '';
			this.mentions = [];
			this.mentionsOut = [];
		}
	}
};
</script>