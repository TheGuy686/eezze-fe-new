<template>
<v-navigation-drawer
    absolute
    temporary
    right
    floating
    fixed
    v-model="drawer"
>
    <v-list-item>

        <v-list-item-content>

            <v-list-item-title @click="getNotifications()">

                {{ tr('notification') }}

            </v-list-item-title>

        </v-list-item-content>

    </v-list-item>

    <v-divider></v-divider>

    <v-list>
        <v-list-item
            v-for="n in notifications"
            :key="n.id"
            link
        >
            <v-list-item-icon>

            <v-icon>mdi-account</v-icon>

            </v-list-item-icon>

            <v-list-item-content>

                <v-list-item-title>{{ n.title }}</v-list-item-title>

                <v-list-item-subtitle>{{ formatComment(n?.text ?? '') }}</v-list-item-subtitle>

            </v-list-item-content>

        </v-list-item>

    </v-list>

</v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('app', ['notifications' ]),
    },
    data: () => ({
        drawer: false,
    }),
    mounted() {
        this.$root.$on('toggle-notifi-drawer', () => {
            this.drawer =! this.drawer;
        });
    },
    methods: {
        getNotifications() {
            this.$store.dispatch('app/getNotifications');
        },
        formatComment(comment) {
            let cmt = this.urlify(`${comment}`);

            return this.replaceEmails(this.replaceHandles(cmt));
        },
        replaceHandles(text) {
            const handleRegex = /(?<![a-zA-Z0-9])@([a-zA-Z0-9_]+)(?!\.[a-zA-Z]{2,6})(?![a-zA-Z])/gi;

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
    }
}
</script>
