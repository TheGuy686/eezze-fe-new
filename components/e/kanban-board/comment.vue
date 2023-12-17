<style lang="less">
.handle-lbe {
    cursor: pointer;
}
</style>

<template>
<e-row clss="pt-2 pb-2">

    <e-col w-10>

        <!-- :color="user.avatarColor" -->

        <e-avatar
            :size="20"
            :isEditable="true"
            :color="memberColor(user.email)"
            :initials="`${user.firstName} ${user.lastName}`"
            @click="events.emit('member-handle-clicked', user.handle)"
        />

    </e-col>

    <e-col jc="c" ai="fs" w-90>

        <span>
            
            <span class="handle-lbe" @click="events.emit('member-handle-clicked', user.handle)">
                
                <b>{{ user.handle }}</b>
            
            </span> - {{ comment?.date }}</span>

        <div v-html="commentP" @click.prevent="handleLineClick" />

    </e-col>

</e-row>
</template>

<script>
import { mapGetters } from 'vuex';
import { randDarkColor } from '~/classes/globals';

export default {
    props: {
        comment: {
            type: Object,
            required: true,
        },
        members: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        ...mapGetters({
			memberColor: 'app/memberColor',
		}),
        user() {
            try {
                const mems = Object.values(this.members);

                const filtered = mems.filter((m) => m.id == this.comment.user);

                return filtered?.[0] ?? mems[0];
            }
            catch (err) {
                return {};
            }
        },
        commentP() {
            let cmt = this.urlify(`${this.comment.comment}`);

            return this.replaceEmails(this.replaceHandles(cmt));
        }
    },
    methods: {
        getMember(handle) {
            return this.members?.[handle] ?? {
                handle: handle,
                avatarColor: randDarkColor()
            };
        },
        handleLineClick(e) {
            try {
                const t = e.target.getAttribute('e-type');
                const v = e.target.getAttribute('e-val');

                switch (t) {
                    case 'link': 
                        window.open(v, '_blank');

                        break;

                    case 'handle':
                        this.$emit('handle-clicked', v);
                        
                        events.emit('member-handle-clicked', v);

                        break;

                    case 'email':
                        window.location.href = `mailto:${v}`;

                        break;
                }
            }
            catch (err) {}
        },
        replaceHandles(text) {
            const handleRegex = /(?<![a-zA-Z0-9])@([a-zA-Z0-9_]+)(?!\.[a-zA-Z]{2,6})(?![a-zA-Z])/gi;

            const self = this;

            return text.replace(handleRegex, function(match, handle) {
                const member = self.getMember(handle);
                return `<a href="#" style="color: ${member.avatarColor};" e-type="handle" e-val="${handle}">@${handle}</a>`;
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