<style lang="less" scoped>
.management-tabs-root {
    position: relative;
    .absolute-bg {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 40px;
        border-left: solid 1px rgba(0, 0, 0, 0.1);
        border-right: solid 1px rgba(0, 0, 0, 0.1);
        border-bottom: solid 1px rgba(0, 0, 0, 0.1);
        border-radius: 0 0 4px 4px;
    }
}
</style>

<template>
<div class="management-tabs-root">

    <div class="bg-white absolute-bg" />

    <a-tabs
        type="editable-card"
        v-model="activeKey"
        non-sel
        @edit="$refs['mdl-team'].show()"
        @change="tabChanged"
        v-if="hasTeams"
    >
        <a-tab-pane
            :key="team.id"
            :tab="team.name"
            :closable="false"
            v-for="team in tms"
        >
            <e-kanban-board
                :ref="`kb-board-${team.id}`"
                :members="allMembers"
                :isDoingRequest="isDoingRequest"
                :value="boardMdl(team.id, team.board.board)?.board"
                @input="boards[team.id] = $event; updateBoard($event)"
                @save-board="saveBoard($event)"
            />

        </a-tab-pane>

    </a-tabs>

    <div v-else>

        <h2>{{ tr('please-add-some-teams-to-continue') }}</h2>

    </div>

    <TeamCreateEditModal ref="mdl-team" />

</div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
import { tr } from '~/classes/globals';

export default {
    watch: {
        teams(to) {
            if (!this.inited) return;

            for (let t of to) {
                const b = JSON.parse(JSON.stringify(t.board));

                Vue.set(this.boards, t.id, b.board);

                const refs = this.$refs?.[`kb-board-${t.id}`] ?? [];

                for (const r of refs) setTimeout(() => r.update(), 50);
            }

            this.increment++;
        } 
    },
    computed: {
        ...mapState('project/management/tasks', [
            'entity',
            'isDoingRequest',
            'isEdit'
        ]),
        ...mapGetters({
            teams: 'project/management/tasks/currentProjectTeams',
        }),
        boardMdl() {
            return function (id, board) {
                if (typeof this.boards[id] == 'undefined') {
                    this.boards[id] = JSON.parse(JSON.stringify(board));
                }

                return {
                    increment: this.increment,
                    board: this.boards[id],
                };
            }
        },
        tms() {
            const teams = this?.teams ?? [];
            return teams.reverse();
        },
        hasTeams() { return this?.tms.length > 0 },
        currentTeam() {
            try {
                const filtered = this.tms.filter((t) => t.id == this.activeKey);

                return filtered?.[0] ?? {};
            }
            catch (err) {
                console.log('there was an issue getting your teams: ', err);
            }
        },
        boardId() { return this.currentTeam?.board?.id ?? -1 },
    },
    data() {
        return { 
            activeKey: 1,
            boards: {},
            inited: false,
            increment: 0,
        };
    },
    mounted() {
        this.setDefaultActiveKey();

        this.os(() => {
            this.setIsEdit(true);
            this.inited = true;
        }, 400);
    },
    methods: {
        setDefaultActiveKey() {
            if (!this.hasTeams) return;

            this.activeKey = this.tms[0].id;

            const pl = {
                ...this.currentTeam.board,
                id: this.boardId,
                teamId: this.activeKey,
            };

            this.setNewEditEntity(JSON.parse(JSON.stringify(pl)));

            this.initProject(this.tms[0]?.id);
        },
        tabChanged() {
            const pl = {
                ...this.currentTeam.board,
                id: this.boardId,
                teamId: this.activeKey,
            };
            this.setNewEditEntity(JSON.parse(JSON.stringify(pl)));
        },
        initProject() {
            this.setEntityProp({ key: 'id', value: this.boardId });
            this.setEntityProp({ key: 'teamId', value: this.entity.teamId });
            this.setEntityProp({ key: 'board', value: this.entity.board });
        },
        updateBoard(board) {
            this.setEntityProp({ key: 'id', value: this.boardId });
            this.setEntityProp({ key: 'teamId', value: this.activeKey });
            this.setEntityProp({ key: 'board', value: JSON.parse(JSON.stringify(board)) });
        },
        saveBoard(board) {
            const self = this;

            if (self.isDoingRequest) return;

            const lue = self.$auth.user.email;

            this.$store.dispatch(
                'project/management/tasks/createEditEntity',
                {
                    hideModal: () => {
                        try {
                            if (board.shouldClose) {
                                self.$refs[`kb-board-${self.activeKey}`][0].modal().hide();
                            }

                            for (let m of board.mentions) {
                                if (m.member == lue) continue;

                                self.$store.dispatch('app/sendUserNotification', {
                                    userId: m.userId,
                                    type: 'task-board',
                                    title: tr('task-board-mention'),
                                    message: m.comment,
                                });
                            }
                        }
                        catch (err) {
                            console.log('Error saving board: ', err);
                        }
                    },
                    projectId: self.currentProject,
                }
            );
        },
        ...mapMutations({
            setNewEditEntity: 'project/management/tasks/setNewEditEntity',
            setEntityProp: 'project/management/tasks/setEntityProp',
            setIsEdit: 'project/management/tasks/setIsEdit',
        }),
    }
}
</script>