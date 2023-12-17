<style lang="less" scoped>
.collapsed {
    padding: 0.01px !important;
    display: none;
}

.open {
    padding: 0%;

    .title-setion {
        padding: 5px;
    }

    .title-div {
        border-color: rgba(0,0,0,0.1);
    }

    .font-light {
        color: rgba(0, 0, 0, 0.7) !important;
        font-weight: 550 !important;
    }

    .font-heavy {
        color: rgba(0, 0, 0, 0.9) !important;
        font-weight: 800 !important;
    }
}
</style>

<template>
<a-layout-sider v-model="collapsed" :trigger="null" width="1" collapsedWidth="400" theme="light" collapsible>

    <div style="max-height: 93vh;" :class="collapsed ? 'open' : 'collapsed'" e-scroll>

        <e-row clss="title-setion mb-2">

            <e-col w-30>

                <p class="pl-5 pt-5 font-bold text-black-1" @click="getNotifications()">

                    {{ tr('notifications') }}

                </p>

            </e-col>

            <e-row dir="r" ai="c" w-70>

                <a-button
                    class="ml-2"
                    type="primary"
                    size="small"
                    :loading="isMarkingAllNotificationsAsRead"
                    @click="$store.dispatch('app/markAllNotificationsAsRead')"
                >
                
                    {{ tr('mark-all-as-read') }}

                </a-button>

                <a-button
                    type="danger"
                    size="small"
                    :loading="isDeleteingAllNotifications"
                    @click="$store.dispatch('app/deleteAllNotifications')"
                >
                
                    {{ tr('delete-all') }}

                </a-button>

            </e-row>

        </e-row>

        <hr class="title-div" />

        <div v-if="nots.length > 0">

            <div
                class="p-0 pt-2 hover:bg-blue-1"
                :key="index"
                v-for="(not, index) in nots"
            >

                <div class="px-5 py-2">

                    <p class="inline">
                        
                        <span :class="not.status == 'pending' ? 'font-heavy' : 'font-light'">
                            
                            {{ not.title }}
                        
                        </span>
                    
                    </p>

                    <p class="inline float-right">
                        
                        {{ getTime(not.createdAt) }}
                    
                    </p>

                    <div
                        class="pt-1"
                        v-html="formatComment(not.message)"
                        @click.prevent="handleLineClick"
                    />

                </div>

            </div>

        </div>

        <a-col a-center class="pt-20" v-else>

            {{ tr('no-items-to-show') }}

        </a-col>

    </div>

</a-layout-sider>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        collapsed: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapState('app', [
            'notifications', 
            'isDeleteingAllNotifications',
            'isMarkingAllNotificationsAsRead',
        ]),

        nots() {
            return Object.values(this.notifications);
        },
    },

    mounted() {
        this.getNotifications();
    },

    methods: {
        handleLineClick(e) {
            try {
                const t = e.target.getAttribute('e-type');
                const v = e.target.getAttribute('e-val');

                switch (t) {
                    case 'link': 
                        window.open(v, '_blank');

                        break;

                    case 'handle':
                        events.emit('member-handle-clicked', v);

                        break;

                    case 'email':
                        window.location.href = `mailto:${v}`;

                        break;
                }
            }
            catch (err) {}
        },
        formatComment(comment) {
            let cmt = this.urlify(`${comment}`);

            return this.replaceEmails(this.replaceHandles(cmt));
        },
        replaceHandles(text) {
            const handleRegex = /(?<![a-zA-Z0-9])@([a-zA-Z0-9_]+)(?!\.[a-zA-Z]{2,6})(?![a-zA-Z])/gi;

            const self = this;

            return text.replace(handleRegex, function(match, handle) {
                return `<a href="#" e-type="handle" e-val="${handle}">@${handle}</a>`;
            });
        },
        replaceEmails(text) {
            const emailRegex = /(?<![a-zA-Z0-9])(([a-zA-Z0-9\-_\.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)(?![a-zA-Z0-9])/gim;

            return text.replace(emailRegex, function(match) {
                return `<a href="mailto:${match}" e-type="email" e-val="${match}">${match}</a>`;
            });
        },
        getNotifications() {
            try {
                let self = this;

                self.$store.dispatch('app/getNotifications');
            }
            catch (error) {
                console.error('error', error);
            }
        },
        getTime(time) {
            try {
                const now = new Date(time);

                const diffTime = Math.abs((new Date()) - now);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays > 1) {
                    if (diffDays == 2) {
                        return "Yesterday"
                    }
                    else return now.toLocaleDateString('en-us', { month: "short", day: "numeric" });
                }

                const hrs = Math.ceil(diffTime / (1000 * 60 * 60));
                if (hrs > 1) {
                    return hrs + ' hr';
                }

                const min = Math.ceil(diffTime / (1000 * 60));
                if (min > 1) {
                    return hrs + ' min';
                }

            }
            catch (error) {
                console.log('error', error);
            }
        }
    }
};
</script>