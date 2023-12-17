<style lang="less" scoped>
.collapsed {
    padding: 0.01px !important;
    display: none;
}

.open {
    padding: 0%;
}
</style>

<template>
<a-layout-sider
    :trigger="null"
    width="1"
    collapsedWidth="400"
    theme="light" 
    collapsible
    v-model="collapsed"
    v-click-outside-element="clickedOutside()"
>
    
    <div :class="filteredUserCollapsibled ? 'open' : 'collapsed'">

        <e-row class="pb-6 pt-10" :center="true">

            <e-img-avatar
                :size="120"
                dataKey="avatar"
                :initials="`${filteredUserProfile?.firstName} ${filteredUserProfile?.lastName}`"
                :imgUrl="`${endpoints.assets.avatars}/${filteredUserProfile.avatar}`"
                :uploadPath="endpoints.auth.uploadAvarar"
            />

        </e-row>

        <e-col clss="pl-10 pr-10">

            <e-row>

                <e-col w-50>

                    <h3>{{ tr('email') }}</h3>

                </e-col>

                <e-col w-50 jc="fe">

                    {{ filteredUserProfile.email }}

                </e-col>

            </e-row>

            <e-row>

                <e-col w-50>

                    <h3>{{ tr('username') }}</h3>

                </e-col>

                <e-col w-50 jc="fe">

                    {{ filteredUserProfile.username }}

                </e-col>

            </e-row>

            <e-row>

                <e-col w-50>

                    <h3>{{ tr('first-name') }}</h3>

                </e-col>

                <e-col w-50 jc="fe">

                    {{ filteredUserProfile.firstName }}

                </e-col>

            </e-row>

            <e-row>

                <e-col w-50>

                    <h3>{{ tr('last-name') }}</h3>

                </e-col>

                <e-col w-50 jc="fe">

                    {{ filteredUserProfile.lastName }}

                </e-col>

            </e-row>

        </e-col>

    </div>

</a-layout-sider>
</template>
    
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('app', ['filteredUserProfile', 'filteredUserCollapsibled' ]),
    },

    watch: {
        filteredUserCollapsibled(to) {
            this.collapsed = to;
        }
    },

    data: () => ({
        collapsed: false,
        userData: []
    }),

    mounted() {
        this.collapsed = this.filteredUserCollapsibled;
    },

    methods: {
        clickedOutside() {
            if (!this.collapsed) return;
            // this.collapsed = false;
        },
        ...mapMutations({
            setFilteredUserCollapsible: 'app/setFilteredUserCollapsible',
        }),
    }
};
</script>