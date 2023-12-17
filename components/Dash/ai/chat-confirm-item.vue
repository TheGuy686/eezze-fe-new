<style lang="less" scoped>
.root-chat-item {

    .avatar-cont {
        width: 12% !important;
    }

    .extra-small {
        font-size: .665em;
        color: #bfccdf !important;
    }

    .ai {
        background: #f6f9fb;
        border-radius: 0.6rem;
        padding: 1rem 1.25rem;
        color: rgba(0, 0, 0, 0.6);
    }

    .receiver {
        background: #2787f5;
        border-radius: 0.6rem;
        color: #fff;
    }
}
</style>

<template>
<e-row :class="`root-chat-item ${index != 0 && message.showAvatar ? 'pt-5' : ''}`" :dir="`${ isAi ? 'row' : 'row-reverse' }`">

    <e-col class="avatar-cont" :center="true">

        <a-avatar
            :size="50"
            :style="`background-color: ${avatarColor}`"
            non-sel
            v-show="message.showAvatar"
            @click="events.emit('dev-print')"
        >
            <b>{{ initials }}</b>

        </a-avatar>

    </e-col>

    <e-row
        class="message" w-85
        jc="fs"
        ai="c"
        :dir="`${ isAi ? 'row' : 'row-reverse' }`"
    >
        <e-col :class="`p-2 ${ isAi ? 'ai' : 'receiver' } ${!message.showAvatar ? 'mt-1' : ''}`">

            <div v-html="messageIn"></div>

            <ul class="pt-2 pb-2">

                <template v-if="message?.data && Array.isArray(message?.data)">

                    <li :key="i" v-for="ii, i in message.data">

                        <e-row>

                            <e-row w-85>

                                <span class="pl-3" non-sel>-</span>

                                <span class="pl-3"><b v-html="trContextItem(ii.prompt)"></b></span>

                            </e-row>

                            <e-row jc="fe" w-15>

                                <a-button
                                    class="mt-1"
                                    size="small"
                                    type="danger"
                                    shape="circle"
                                    :disabled="!ii.confirmed"
                                    @click="unconfirmItem(i, ii)"
                                >
                                    ✗

                                </a-button>

                                <a-button
                                    class="mt-1 ml-1"
                                    size="small"
                                    type="primary"
                                    shape="circle"
                                    :disabled="ii.confirmed"
                                    @click="confirmItem(i)"
                                >
                                    ✓

                                </a-button>

                            </e-row>

                        </e-row>

                    </li>

                </template>

                <template v-else>

                    <li>

                        <span class="pl-3" non-sel>-</span>

                        <span class="pl-3">{{ tr('nothing-to-confirm') }}</span>

                    </li>

                </template>

            </ul>

        </e-col>

        <e-col w-10 :center="true">

            <span class="extra-small text-muted">08:45 PM</span>

        </e-col>

    </e-row>

</e-row>
</template>

<script>
import Vue from 'vue';

export default {
    props: {
        index: Number,
        message: Object,
        showAvatar: Boolean,
        pushNextAiMessage: Function,
        scrollToBottom: Function,
        showLoader: Boolean,
        isRawItem: Boolean,
        deleteItemFromDependencies: Function,
        addItemFromDependencies: Function,
        avatarColor: {
            type: String,
            default: '#87d068',
        },
    },
    computed: {
        initials() {
            return 'E-AI';
        },
        trContextItem() {
            return function (value) {
                try {

                    switch (this.message?.context ?? '') {
                        case 'roles': {
                            const matches = value.match(/create:[a-zA-Z0-9]+:([a-zA-Z0-9_-]+)/);

                            return matches[1];
                        }
                        case 'datasources': {
                            if (this.isRawItem) return value;

                            const matches = (value?.prompt ?? '').match(/create:[a-zA-Z0-9]+:([a-zA-Z0-9_-]+):([a-zA-Z0-9_-]+)/);

                            return `${this.serviceTag(matches?.[1])}->${matches?.[2]}`;
                        }
                    }
                }
                catch (err) {
                    console.clear();
                    console.log(value);
                    return 'trContextItem Error';
                }
            }
        }
    },
    data() {
        return {
            isAi: false,
            messageIn: '',
            fcomplete: false,
        };
    },
    async mounted() {
        this.isAi = typeof this.message?.userId == 'undefined';

        if (this.isAi && !this.message.completed) {
            await this.outputMessage();
        }
        else this.forceComplete(false);
    },
    methods: {
        forceComplete(forceBrVariant = false) {
            if (forceBrVariant) {
                this.messageIn = this.message.message.replace(/\n/g, '<br>');
            }
            else {
                this.messageIn = this.message.message;
            }
        },
        confirmItem(index) {
            this.addItemFromDependencies(this.message.data[index]);

            Vue.set(this.message.data[index], 'confirmed', true);
        },
        serviceTag(service) {
            switch (service) {
                case 'mysql':
                case 'rest-service':
                case 'ws-service':
                case 'file-storage':
                case 'smtp-mail-service':
                case 'rest-api-integration':
                case 'ws-api-integration':

                    return this.tr(service);

                default: return 'na';
            }
        },
        async outputMessage() {
            const msgIn = this.message.message;

            // const newlineTo = 500, defTo = 65;
            // const newlineTo = 65, defTo = 65;
            const newlineTo = process.env['AI_CHAT_TIMEOUT'] * 0.7, defTo = process.env['AI_CHAT_TIMEOUT'];

            // do the initial say function init the speech
            if (this.messageIn == '') {
                this.events.emit('say', msgIn.replace(/<\/?[^>]+(>|$)/g, ''));
            }

            // output the current question or response to the UI
            while (this.messageIn.length < msgIn.length) {
                if (this.fcomplete) break;

                const i = this.messageIn.length;

                const hasCars = (msgIn.length > 3 && i <= (msgIn.length - 2));

                await new Promise((res) => {
                    const char = msgIn[i];

                    this.messageIn += char;

                    let timeout = defTo;

                    // only perform this check if the input message is greater than
                    // the minimum set of chars to perform this check. And if there
                    // is enough chars left to perform this check
                    if (/[.!?]/.test(char)) {
                        // if has chars then perform the check
                        if (hasCars) {
                            const sentChunk = `${msgIn[i - 1]}${char}${msgIn[i + 1]} `;

                            // here we need to add in the check to test for
                            // cases like "A.I" in the middle of the sentence
                            if (!/[a-zA-Z0-9]{1}\.[a-zA-Z0-9]{1} /.test(sentChunk)) {
                                timeout = newlineTo;
                            }
                            // because we ignore this case then the output will be at
                            // the same rate as the rest of the sentence
                        }
                        else timeout = newlineTo;
                    }

                    setTimeout(() => res(), timeout);

                    this.scrollToBottom();
                });
            }

            setTimeout(() => {
                this.message.completed = true;

                // now call the next question if exists.
                // The reason this comes from the chat message is to make sure
                // that when we call the next message the conversation is followed
                // on from the conversation source.
                this.pushNextAiMessage(this.message.src);
            }, newlineTo);
        },
        unconfirmItem(index, item) {
            this.deleteItemFromDependencies(item);
            Vue.set(this.message.data[index], 'confirmed', false);
        },
    }
}
</script>