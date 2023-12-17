<style lang="less">
.root-chat-item {
    
    .avatar-cont { width: 12% !important; }

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
<e-row
    :class="`root-chat-item ${index != 0 && message.showAvatar ? 'pt-5' : ''}`"
    dir="row"
    ai="fs"
>
    <e-col class="avatar-cont" :center="true">

        <a-avatar   
            :size="50"
            :style="`background-color: ${avatarColor}`"
            non-sel
            v-show="message.showAvatar"
            @click="events.emit('dev-print')"
        >
            <b>E-AI</b>

        </a-avatar>

    </e-col>

    <e-row
        class="message" w-85
        jc="fs"
        ai="c"
        dir="row"
    >
        <e-row>

            <e-col w-75>

                <div :class="`p-2 ai ${!message.showAvatar ? 'mt-1' : ''}`">

                    <div v-html="messageIn" />

                </div>

                <h2 v-if="showLoader">{{ tr('please-wait') }}</h2>

            </e-col>

            <e-row jc="fe" w-25>

                <a-button
                    class="mt-1 mr-1"
                    size="small"
                    :type="message?._answer == 'manual' ? 'primary' : 'default'"
                    @click="message.manual()"
                >
                    {{ tr('ai') }}

                </a-button>

                <a-button
                    class="mt-1"
                    size="small"
                    :type="message?._answer == 'store' ? 'primary' : 'default'"
                    @click="message.store()"
                >
                    {{ tr('store') }}

                </a-button>

            </e-row>

        </e-row>

        <e-col w-10 :center="true">

            <span class="extra-small text-muted">08:45 PM</span>

        </e-col>

    </e-row>

</e-row>
</template>

<script>
export default {
    props: {
        index: Number,
        message: Object,
        showAvatar: Boolean,
        pushNextAiMessage: Function,
        scrollToBottom: Function,
        showLoader: Boolean,
        avatarColor: {
            type: String,
            default: '#87d068',
        },
    },
    data() {
        return {
            messageIn: '',
            fcomplete: false,
        };
    },
    async mounted() {
        if (!this.message.completed) {
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

            this.pushNextAiMessage(this.message.src);

            this.scrollToBottom();

            setTimeout(() => {
                this.scrollToBottom();
            }, 150);
            setTimeout(() => {
                this.scrollToBottom();
            }, 350);
            setTimeout(() => {
                this.scrollToBottom();
            }, 450);
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
                if (this.message && !this.message.blockContinualConversation) {
                    this.pushNextAiMessage(this.message.src);
                }
            }, newlineTo);
        },
    }
}
</script>