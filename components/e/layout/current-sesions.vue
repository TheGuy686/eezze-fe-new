<style lang="less" scoped>
.avatar-div {
    width: 2px;
    height: 30px;
    border-right: solid 1px rgba(0, 0, 0, 0.1);
    margin-left: 5px;
    margin-right: 22px;
}

.session-avatar {
    width: 32px;
    height: 32px;
    border-radius: 20px;

    .img {
        height: 32px;
    }

    &:hover { cursor: pointer; }
}
</style>

<template>
<a-row class="relative ml-auto float-right mr-5">

    <template v-for="u in tSeshs">

        <template v-if="u.email != $auth.user.email">

            <a-avatar
                class="left-15 z-10 -ml-4 text-white font-large font-medium text-md uppercase session-avatar"
                :style="'border: solid white 1.5px; background-color: ' + memberColor(u.email)"
                :key="u.connectionId"
                @click="sessionClicked(u)"
                v-if="!profileImg(u)"
            >
                <span non-sel>

                    {{ nameInitials(`${u.firstName} ${u.lastName}`) }}

                </span>

            </a-avatar>

            <e-avatar
                :size="30"
                :isEditable="true"
                :color="memberColor(u.email)"
                :imgSrc="profileImg(u)"
                renderMode="default"
                @click="sessionClicked(u)"
                v-else
            />

        </template>

    </template>

    <div class="avatar-div"></div>

    <template v-for="u in gSeshs">

        <template v-if="u.email != $auth.user.email">

            <a-avatar
                class="session-avatar"
                :style="'border: solid white 1.5px; background-color: ' + memberColor(u.email)"
                :key="u.connectionId"
                @click="sessionClicked(u)"
                v-if="!profileImg(u)"
            >
                <span non-sel>

                    {{ nameInitials(`${u.firstName} ${u.lastName}`) }}

                </span>

            </a-avatar>

            <e-avatar
                :size="30"
                :isEditable="true"
                :color="memberColor(u.email)"
                :imgSrc="profileImg(u)"
                renderMode="default"
                @click="sessionClicked(u)"
                v-else
            />

        </template>

    </template>

</a-row>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('app', ['filteredUserProfile', 'filteredUserCollapsibled' ]),

        ...mapGetters({
			memberColor: 'app/memberColor',
		}),

        tSeshs() {
            return this.teamSessions().sessions;
        },

        gSeshs() {
            return this.guestSessions().sessions;
        },
    },
    methods: {
        sessionClicked(session) {
            const isSameUser = this.filteredUserProfile?.id == session?.id;

            this.setFilteredUser(session);

            if (isSameUser) {
                this.setFilteredUserCollapsible();
            }
            else if (!this.filteredUserCollapsibled) {
                this.setFilteredUserCollapsible();
            }
        },
        ...mapMutations({
            setFilteredUserCollapsible: 'app/setFilteredUserCollapsible',
            setFilteredUser: 'app/setFilteredUser',
        }),
    }
}
</script>
