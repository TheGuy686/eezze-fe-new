<style lang="less" scoped>
.focus-control {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 1px;
	height: 1px;
	margin: 0px;
	padding: 0px;
}
.ai-chat-root {
    min-height: 74vh;
    overflow: hidden;

	.background-overlay {
		background-color: rgba(0, 0, 0, 0.15);
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 1;
		border-radius: 10px;
		animation: colorAnimation 1s infinite alternate;
	}

    .outter-chat-cont {
        .chat-cont {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            width: 100%;
            height: 65vh;
            min-height: 65vh;
            margin-bottom: 5px;
        }

		.prompt-btn {
			position: absolute;
			right: 0;
			top: 0;
			z-index: 2;
		}

        .welcome-cont {
            width: 100%;
            min-height: 60vh;
        }
    }

    .text-input {
        width: 98.5% !important;
        bottom: 0;
        left: 5px;
        right: 5px;
        position: absolute;
        padding: 0.5rem;
        border: rgba(0, 0, 0, 0.2) solid 1px;
        border-radius: 2.25rem;
        background-color: rgba(235,241,247, 1);

        .input {
            display: block;
            width: 100%;
            padding: 0.59375rem 1.125rem;
            font-size: .9375rem;
            font-weight: 400;
            line-height: 1.6;
            color: rgba(0, 0, 0, 0.6);
            background-color: #ebf1f7;
            background-clip: padding-box;
            border: 2px solid #ebf1f7;

            &:focus { outline: none; }
        }
    }
}
</style>

<template>
<div>

	<input
		ref="prompt-focus"
		class="focus-control"
		@keyup.enter="promptsVisible = false; $refs['chat-input'].focus()"
	/>

    <e-row class="ai-chat-root">

		<div
			class="background-overlay"
			v-if="promptsVisible"
		/>

        <e-col class="mr-3 p-4 outter-chat-cont" ai="fs" bev-cont w-75>

            <e-col class="welcome-cont p-4" :center="true" v-if="!started">

                <a-button type="primary" @click="letsGetStarted()">

                    {{ tr('lets-get-started') }}

                </a-button>

            </e-col>

            <div
                id="chat-cont"
                ref="chat-cont"
                class="chat-cont p-4"
                w-100
                e-scroll
                v-scroll="onScroll"
                v-else
            >
                <template v-for="m, i in conversation">

                    <DashAiChatConfirmItem
                        ref="chat-item"
                        :key="i"
                        :index="i"
                        :message="m"
                        :showLoader="isDoingRequest && i == conversation.length - 1"
                        :avatarColor="typeof m.userId == 'number' ? userAvatarColor : undefined"
                        :isAi="typeof m.userId == 'number'"
                        :pushNextAiMessage="pushNextAiMessage"
                        :scrollToBottom="scrollToBottom"
                        :deleteItemFromDependencies="deleteItemFromDependencies"
                        :addItemFromDependencies="addItemFromDependencies"
                        :isRawItem="m?.isRawItem"
                        v-if="m.isConfirmAction"
                    />

                    <DashAiChatItemStoreQuery
                        ref="chat-item"
                        :key="i"
                        :index="i"
                        :message="m"
                        :showLoader="isDoingRequest && i == conversation.length - 1"
                        :avatarColor="typeof m.userId == 'number' ? userAvatarColor : undefined"
                        :isAi="typeof m.userId == 'number'"
                        :pushNextAiMessage="pushNextAiMessage"
                        :scrollToBottom="scrollToBottom"
                        :deleteItemFromDependencies="deleteItemFromDependencies"
                        v-else-if="m.isStoreQueryItem"
                    />

                    <DashAiChatItemYesNo
                        ref="chat-item"
                        :key="i"
                        :index="i"
                        :message="m"
                        :showLoader="isDoingRequest && i == conversation.length - 1"
                        :avatarColor="typeof m.userId == 'number' ? userAvatarColor : undefined"
                        :isAi="typeof m.userId == 'number'"
                        :pushNextAiMessage="pushNextAiMessage"
                        :scrollToBottom="scrollToBottom"
                        :deleteItemFromDependencies="deleteItemFromDependencies"
                        v-else-if="m.isYesNoQu"
                    />

                    <DashAiChatItem
                        ref="chat-item"
                        :key="i"
                        :index="i"
                        :message="m"
                        :showLoader="isDoingRequest && i == conversation.length - 1"
                        :avatarColor="typeof m.userId == 'number' ? userAvatarColor : undefined"
                        :isAi="typeof m.userId == 'number'"
                        :pushNextAiMessage="pushNextAiMessage"
                        :scrollToBottom="scrollToBottom"
                        v-else
                    />

                </template>

            </div>

			<div class="prompt-btn">

				<a-popover
					ref="prompt-popover"
					trigger="click"
					placement="leftTop"
					:title="tr('info')"
					v-model="promptsVisible"
					v-if="started"
				>
					<a-button
						ref="prompt-popout-btn"
						class="mr-2 mt-1"
						style="padding-top: 3px; padding-left: 1px;"
						type="primary"
						shape="circle"
						size="small"
					>
						<GeneralIcon
							clss="help-dot"
							type="solid-input-help-prompt-w"
						/>

					</a-button>

					<template #content>

						<div style="width: 400px;">

							<a-list bordered size="small" :data-source="promptsList">

								<template #header>

									<h2>{{ tr('chat-prompts') }}</h2>

								</template>

								<template #renderItem="item">

									<a-list-item>{{ item }}</a-list-item>

								</template>

							</a-list>

							<a-list bordered size="small" :data-source="currentContextPrompts">

								<template #header>

									<h2>{{ tr(`${context}-prompts`) }}</h2>

								</template>

								<template #renderItem="item">

									<a-list-item v-html="item"></a-list-item>

								</template>

							</a-list>

						</div>

					</template>

				</a-popover>

			</div>

            <e-row class="text-input mb-2 pl-5 pr-2 pt-1 pb-1">

                <e-col w-95>

                    <textarea
						ref="chat-input"
                        class="input form-control px-0"
                        :placeholder="tr('type-your-message')"
                        rows="1"
                        data-emoji-input=""
                        data-autosize="true"
                        :style="taStyle"
                        w-100
                        v-model="messageIn"
                        @keydown="handleKeypress($event)"
                        @input="updateCursorPosition"
                    ></textarea>

                    <DashAiAutoComplete
                        ref="auto-complete"
                        :x="cursorPosition.cursorX"
                        :y="cursorPosition.cursorY"
                        :value="messageIn"
                        :overrideMinKeyLen="acMinOverride  "
                        :options="autoCompleteOptions"
                    />

                </e-col>

                <e-col :center="true" c="fe" ai="fe" w-5>

                    <a-button
                        type="primary"
                        shape="circle"
                        size="large"
                        :disabled="isDoingRequest || (!aiIsSpeaking && messageIn == '')"
                        @click="aiIsSpeaking ? skip() : addResponse()"
                    >
                        <GeneralIcon :type="aiIsSpeaking ? 'skip-w' : 'send-plane'" />

                    </a-button>

                </e-col>

            </e-row>

        </e-col>

        <e-col ai="c" w-25>

            <e-col class="p-4" jc="c" ai="fs" f-1 bev-cont>

                <h2 class="m-0">

					{{ tr('current-topic', { args: [ this.context ] }) }}

				</h2>

            </e-col>

            <e-col class="p-4" ai="fs" f-16 h-80 bev-cont>

                <DashAiProjectDependencies
                    ref="proj-deps"
                    :context="context"
                    @add-questions="(qus) => {
                        questions = qus;
                        pushNextAiMessage('questions');
                    }"
                    @add-confirmations="addDssConfirms($event)"
                />

            </e-col>

        </e-col>

        <dash-ai-store-drawer
            ref="drawer-store"
            :visible="storeDrawerVisible"
            @close="storeDrawerVisible = false; forceChatInputFocus()"
        />

    </e-row>

</div>
</template>

<script>
import { mapState, mapGetters }from 'vuex';
import { tr, generateRandomString } from '~/classes/globals';
import { project } from '~/consts/Endpoints';

import Vue from 'vue';

export default {
    props: {
        toggleItemComingSoon: Function,
        showSummary: Boolean,
    },
    computed: {
        ...mapState('project/proj', ['steps']),
        ...mapState('app', [ 'windowHeight' ]),
        ...mapGetters({
			memberColor: 'app/memberColor',
		}),

        context() {  return this.contexts[this.contextIndex] },
        acMinOverride() {
            return 0;
        },
        autoCompleteOptions() {
            if (this.lastItemIsStoreItem) {
                return [
                    'store',
                    'you',
                ];
            }

            if (this.nextQuestionIsConfirmAllData) {
                return [ 'confirm' ];
            }

            return [
                'create:con:',
                'create:ds:',
                'create:cv:',
                'create:vs:',
                'create:roles:',
                'create:sc:',
                'create:sg:',
                'create:ser:',
            ];
        },
        userAvatarColor() {
            return this.memberColor(this.$auth.$state?.user?.email)
        },
        taHeight() {
            let height = 45;

            const lines = this.messageIn.split('\n');

            if (lines.length > 1) height = height * (lines.length * 0.7);

            return height;
        },
        taStyle() {
            let def = `overflow: hidden; overflow-wrap: break-word; resize: none;`;

            return `${def} min-height: 47px; max-height: 250px; height: ${this.taHeight}px;`;
        },
		currentContextPrompts() {
			try {
				return this.contextPrompts?.[this.context];
			}
			catch (err) { return [] }
		},
        lastConvItem() {
            try {
                return this.conversation[this.conversation.length - 1];
            }
            catch (err) {
                return false;
            }
        },
        lastItemIsStoreItem() {
            return !!this.lastConvItem?.isStoreQueryItem;
        },
        userId() {
            return this.$auth.$state.user?.id ?? '-1';
        },
    },
    data() {
        const questionsDict = {
            project: [
                {
                    src: 'questions',
                    message: tr('aig-welcome'),
                },
                {
                    src: 'questions',
                    message: tr('aig-project-prompt1'),
                },
            ],
            roles: [
                {
                    src: 'questions',
                    message: tr('aig-roles-prompt0'),
                },
                {
                    src: 'questions',
                    message: tr('aig-roles-prompt1'),
                },
                {
                    src: 'questions',
                    message: tr('aig-roles-prompt2'),
                },
                {
                    src: 'questions',
                    message: tr('aig-roles-prompt3'),
                },
                {
                    src: 'questions',
                    message: tr('aig-roles-prompt4'),
                },
                {
                    src: 'questions',
                    message: tr('aig-roles-prompt5'),
                },
                {
                    src: 'questions',
                    message: tr('aig-roles-prompt6'),
                },
                {
                    src: 'questions',
                    message: tr('aig-roles-prompt7'),
                },
                {
                    src: 'questions',
                    message: tr('aig-roles-prompt8'),
                },
            ],
            datasources: [
                {
                    src: 'questions',
                    message: tr('aig-datasources-prompt1'),
                },
                {
                    src: 'questions',
                    message: tr('aig-datasources-prompt2'),
                },
            ],
        };

        return {
            mounted: false,

            storeDrawerVisible: false,

            cursorPosition: {
                cursorX: 0,
                cursorY: 0,
                lineIndex: 0,
            },

            lastAddedQuestion: '',

            contextIndex: 0,
            contexts: [
                'roles',
                'datasources',
                'service-groups',
            ],
            started: false,
            isDoingRequest: false,
            stopProcessing: true,
            lastMsgWasAi: false,
            lastMsgWasUser: false,
            aiIsSpeaking: false,
			promptsVisible: false,
            userConfirmed: false,
            nextQuestionIsConfirmAllData: false,
            confirmContextChange: false,
            currentChatItemIndex: 0,
            didScroll: false,
            didAutoScroll: false,
            autoScrollTmr: null,
            didScrollTmr: null,
            messageIn: '',
            questions: [
                ...questionsDict.project,
                ...questionsDict.roles,
            ],
            questionsDict: questionsDict,
            aiMessageQue: [],
            conversation: [],
            confirmations: [],
            input: '',
            promptMessageTypes: [
                'h',
                'help',
				'p',
				'prompts',
                'confirm',
                'yes',
            ],
            agreements: [
                'of-course',
                'sure-thing',
                'absolutely',
				'no-problem',
                'no-problem-at-all',
                'certainly',
                'if-you-pay-me-first',
            ],
			promptsList: [
				tr('ctrl-prompt'),
				tr('prompt-prompt'),
				tr('help-prompt'),
			],
			contextPrompts: {
				roles: [
					tr('role-prompt-1'),
					tr('role-prompt-2'),
					tr('role-prompt-nlp-1'),
					tr('role-prompt-nlp-2'),
					tr('role-prompt-nlp-3'),
				],
			},
        };
    },
    mounted() {
        this.updateCursorPosition();

        // this.startDev();

        setInterval(() => {
            this.scrollToBottom();
        }, 500);
    },
    methods: {
        handleKeypress(e) {
            const ac = this.$refs['auto-complete'];
            const acIsVis = ac.isVisible;

            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();

                this.addResponse();

                setTimeout(() => this.scrollToBottom(), 500)
            }
            else if (e.key === 'Enter' && acIsVis) {
                e.preventDefault();

                this.messageIn += ac.getSelection();
                ac.hide();
            }
            else if (e.key === 'ArrowUp') {
                e.preventDefault();

                ac.cycleUp();
            }
            else if (e.key === 'ArrowDown') {
                e.preventDefault();

                ac.cycleDown();
            }
            else if (e.key === 'Tab') {
                e.preventDefault();

                if (!acIsVis) {
                    ac.show();
                }
                else {
                    this.messageIn += ac.getSelection();
                }
            }
            else if (e.key === 'Escape' && acIsVis) {
                e.preventDefault();

                ac.hide();
            }
        },
        updateCursorPosition() {
            const textarea = this.$refs['chat-input'];
            const cursorIndex = textarea.selectionStart;

            const amountOfSpaces = textarea.value.trim().split(' ').length - 1;
            // const amountOfNls = textarea.value.trim().split('\n').length;

            // Get the text content before the cursor
            const textBeforeCursor = textarea.value.substring(0, cursorIndex).replace(/ /g, 'i');

            // Get the line index of the cursor
            const lineIndex = (textBeforeCursor.match(/\n/g) || []).length;

            // Create a hidden div to mimic the textarea's content styles
            const dummyDiv = document.createElement('div');
            dummyDiv.style.position = 'absolute';
            dummyDiv.style.top = '-9999px';
            dummyDiv.style.left = '0';
            dummyDiv.style.width = textarea.clientWidth + 'px';
            dummyDiv.textContent = textBeforeCursor;
            dummyDiv.style.fontSize = window.getComputedStyle(textarea).fontSize;
            dummyDiv.style.fontFamily = window.getComputedStyle(textarea).fontFamily;

            const maxHeight = Number(window.getComputedStyle(textarea).maxHeight.replace(/[a-zA-Z]+/, '')) * 0.9;
            const lineHeight = Number(window.getComputedStyle(textarea).lineHeight.replace(/[a-zA-Z]+/, ''));

            dummyDiv.style.lineHeight = window.getComputedStyle(textarea).lineHeight;

            document.body.appendChild(dummyDiv);

            // Calculate the X and Y position of the cursor
            const span = document.createElement('span');
            span.id = 'cursor-pos-ta';
            span.textContent = textBeforeCursor.substring(textBeforeCursor.lastIndexOf('\n'));
            dummyDiv.appendChild(span);
            const rect = span.getBoundingClientRect();

            const x = rect.width;
            // const y = rect.height;

            // Remove the dummy div
            document.body.removeChild(dummyDiv);

            const spaceOffsetFactor = 0.45;
            const heightOffsetFactor = lineHeight;

            let newY = (heightOffsetFactor * lineIndex);

            if (newY > maxHeight) newY = maxHeight;

            let xIn = x + (spaceOffsetFactor * amountOfSpaces);

            // here we need to add an extra line to the y as the width of the
            // text has exceeded the width of the textarea on one line but the
            // Y needs to on one more new line to break and go to where the cursor is
            if (x >= textarea.clientWidth - (textarea.clientWidth * 0.0185)) {
                newY = (heightOffsetFactor * (lineIndex + 1));
                // this should give the new line the remainder x space
                xIn = x - (textarea.clientWidth - 62);
            }

            // Update cursor position including line index
            this.cursorPosition = {
                cursorX: xIn,
                cursorY: newY,
                lineIndex,
                cursorIndex,
            };
        },

        startDev() {
            if (this.mounted) return;

            // similate button press
            setTimeout(() => {
                this.letsGetStarted();
            }, 100);

            // skip the fisrt message
            setTimeout(() => {
                this.skip();
            }, 120);

            setTimeout(() => {
                this.messageIn = 'lajksdfj';
                this.addResponse();

                // then skip next set of bs
                setTimeout(() => {
                    this.skip();
                }, 120);
            }, 1140)

            // simmilate next step
            setTimeout(() => {
                this.messageIn = 'confirm';

                setTimeout(() => {
                    this.addResponse();
                }, 120);

            }, 2700);

            this.mounted = true;
        },

        letsGetStarted() {
            this.started = true;
            this.events.emit('member-handle-clicked', tr('hi-there'));

            if (this.conversation.length == 0) {
                setTimeout(() => {
                    this.commenceQuestions();
                    this.focusChatInput();
                }, 400);
            }
        },
        commenceQuestions() {
            setTimeout(() => {
                this.pushNextAiMessage('questions');
            }, 200);
        },
        skip() {
            this.events.emit('stop-speaking');

            this.lastMsgWasAi = true;
            this.lastMsgWasUser = false;
            this.aiIsSpeaking = false;

            try {
                this.$refs['chat-item'][this.currentChatItemIndex].forceComplete();
            }
            catch (err) {}

            while (this.questions.length > 0) {
                this.pushNextAiMessage('questions', true);
            }
        },
        onScroll() {
            if (this.didScrollTmr) {
                setTimeout(this.didScrollTmr);
            }

            this.didScroll = true;

            this.didScrollTmr = setTimeout(() => {
                this.didScroll = false;
            }, 10000);
        },
		addResponse(forceComplete = false) {
            this.input = `${this.messageIn.trim()}`;

            // this is when I started to process the answers
            // according to the inner item process event que
            if (this.lastItemIsStoreItem) {
                // don't need to do anything if the message is empty
                if (this.messageIn == '') return;

                switch (this.input) {
                    case 'you': return this.lastConvItem.manual();
                    case 'store': return this.lastConvItem.store();
                }

                return;
            }

			if (this.aiIsSpeaking) {
                this.skip();
                return;
            }

            if (this.messageIn == '') return;

            this.aiIsSpeaking = false;

			const sanInput = this.input.trim().replace(/[^a-zA-Z0-9]/g, '').replace(/\n/g, '');

			const isPrompt = this.promptMessageTypes.includes(sanInput);

			// if the user is prompting for anything then there is no need to speak from here
			// let the corresponding take care of the functionality.
			if (!isPrompt) this.askAi();

			this.conversation.push({
				showAvatar: !this.lastMsgWasUser,
				userId: this.userId,
				userFullName: `${this.$auth.$state.user.firstName} ${this.$auth.$state.user.lastName}`,
				message: this.input,
				completed: forceComplete,
			});

			this.lastMsgWasAi = false;
			this.lastMsgWasUser = true;

			this.messageIn = '';

			this.scrollToBottom(!this.aiIsSpeaking);

			if (isPrompt) {
				switch (sanInput) {
					case 'h': return this.help();
					case 'help': return this.help();
					case 'prompts': return this.prompts();
					case 'p': return this.prompts();
                    case 'confirm': return this.confirmAllData();
                    case 'yes': return this.confirmAction();
				}
			}
		},
        addDssConfirms(qus) {
            for (const q of qus) {
                this.confirmations.push(q);
            }

            this.confirmations.push({
                src: 'confirmations',
                message: tr(`confirm-summary-prompt`).replace(/\\t/g, ''),
            });

            this.nextQuestionIsConfirmAllData = true;

            this.pushNextAiMessage('confirmations');
        },
        async confirmAllData() {
            if (!this.nextQuestionIsConfirmAllData) return;

            this.nextQuestionIsConfirmAllData = false;

            for (let i of this.conversation[this.conversation.length - 3].data) {
                Vue.set(i, 'confirmed', true);

                this.$refs['proj-deps'].confirmProjectTag(
                    i.prompt.replace('<b>', '').replace('</b>', '')
                );

                switch (this.context) {
                    case 'roles':
                        this.$refs['proj-deps'].addRole(i.prompt);
                        break;

                    case 'datasources':
                        this.$refs['proj-deps'].addDs(i.prompt.prompt);
                        break;
                }
            }

            switch (this.context) {
                case 'roles': {
                    this.confirmContextChange = true;

                    this.questions.push({
                        src: 'questions',
                        forceComplete: true,
                        context: `${this.context}`,
                        message: tr(`move-to-next-topic-confirm`),
                    });

                    break;
                }
                case 'datasources': {
                    await this.$refs['proj-deps'].getDepsFromTags();

                    const questions = this.$refs['proj-deps'].projectTagDeps;

                    const self = this;

                    // loop over each of the matches and build up the confirm call stack
                    // before moving on to the store modules if they exist
                    if (Array.isArray(questions?.matches))  {
                        const newlineTo = process.env['AI_CHAT_TIMEOUT'] * 0.7;

                        for (const m of questions?.matches) {
                            // then we need to loop over each question within this object
                            // as on item could possibly have more than one question about
                            // this processed tag item.
                            for (const mq of m.questions) {
                                this.questions.push({
                                    id: generateRandomString(5),
                                    isStoreQueryItem: true,
                                    blockContinualConversation: true,
                                    src: 'questions',
                                    context: `${this.context}`,
                                    message: tr(mq.qu, { args: [mq.tag] }),
                                    tag: mq.tag,
                                    answers: mq.answers,
                                    _answer: '',
                                    manual: function () {
                                        this._answer = 'manual';
                                        self.$refs['proj-deps'].pushConfirmedTagAction(mq);

                                        self.messageIn = '';

                                        setTimeout(() => {
                                            if (self.questions.length == 0) {
                                                self.questions.push({
                                                    src: 'questions',
                                                    forceComplete: true,
                                                    context: `${this.context}`,
                                                    message: tr(`move-to-next-topic-confirm`),
                                                });
                                            }

                                            self.pushNextAiMessage('questions');
                                        }, newlineTo);
                                    },
                                    store: function () {
                                        self.storeDrawerVisible = true;
                                        self.$refs['drawer-store'].openStore(
                                            mq.tag,
                                            this.finalizeStore.bind(this),
                                        );
                                        self.messageIn = '';
                                    },
                                    finalizeStore: function(mod) {
                                        this._answer = 'store';

                                        self.storeDrawerVisible = false;

                                        self.$refs['proj-deps'].addModule(mod);

                                        self.os(() => self.storeDrawerVisible = false, 210);

                                        setTimeout(() => {
                                            if (self.questions.length == 0) {
                                                self.questions.push({
                                                    src: 'questions',
                                                    forceComplete: true,
                                                    context: `${this.context}`,
                                                    message: tr(`move-to-next-topic-confirm`),
                                                });
                                            }

                                            self.pushNextAiMessage('questions');

                                            self.os(() => {
                                                self.scrollToBottom(true);
                                            }, 100);

                                        }, newlineTo);
                                    },
                                    answer: () => {
                                        if (this.messageIn == 'you') {
                                            this.manual();
                                        }
                                        else if (this.messageIn == 'store') {
                                            this.store();
                                        }
                                    },
                                });
                            }
                        }
                    }

                    this.nextQuestionIsConfirmAllData = true;

                    break;
                }
            }

            this.pushNextAiMessage('questions');
        },
		prompts() {
			setTimeout(() => {
				this.promptsVisible = true;
				this.focusChatInput;
			}, 300);
		},
        help() {
			// then lets transform the input message to an understandable message in the chat
			this.input = this.tr(`teach-me-about-${this.context}`);

			// Generate a random index within the array's length
			const randomIndex = Math.floor(Math.random() * this.agreements.length);

			this.aiMessageQue.push({
				src: 'aiMessageQue',
				message: tr(this.agreements[randomIndex]),
			});
            this.aiMessageQue.push({
                src: 'aiMessageQue',
				message: tr(`teach-about-${this.context}`),
			});
            this.aiMessageQue.push({
                src: 'aiMessageQue',
                message: tr(`describe-${this.context}`),
            });

			this.pushNextAiMessage('aiMessageQue');
        },
        focusChatInput() {
            setTimeout(() => {
                this.$refs['prompt-focus'].focus();
            }, 100);
        },
        forceChatInputFocus() {
            const textarea = this.$refs['chat-input'];

            textarea.focus();

            const event = new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                which: 13,
                keyCode: 13,
                bubbles: true,
            });

            textarea.dispatchEvent(event);
        },
        confirmAction() {
            if (this.confirmContextChange) {
                this.changeContext();
            }
        },
        changeContext() {
            this.contextIndex++;

            this.setNextContextQuestions();
        },
        setNextContextQuestions() {
            this.questions = [...this.questionsDict?.[this.context] ?? []];

            this.pushNextAiMessage('questions');
        },
        scrollToBottom(scrollOverride = false) {
            if (this.didScroll && !scrollOverride) return;

            try {
                if (this.autoScrollTmr) {
                    clearTimeout(this.autoScrollTmr);
                }

                this.didAutoScroll = true;

                this.autoScrollTmr = setTimeout(() => {
                    this.didAutoScroll = false;
                }, 200);

                // Access the element using $refs
                let container = this.$refs['chat-cont'];

                // Scroll to the bottom
                container.scrollTop = container.scrollHeight;

                setTimeout(() => {
                    container.scrollTop = container.scrollHeight * 1.1;
                }, 10);

                setTimeout(() => {
                    container.scrollTop = container.scrollHeight * 1.1;
                }, 50);

                setTimeout(() => {
                    container.scrollTop = container.scrollHeight * 1.1;
                }, 100);
            }
            catch (err) {}
        },
        async askAi() {
            let res;

            this.isDoingRequest = true;

            let totmr;

            // const totmr = setTimeout(() => {
            //     this.isDoingRequest = false;

            //     this.$notification.error(this.tr('request-timeout'), { timer: 2 });
            // }, 6000);

            try {
                res = await this.$axios.post(project.askAi, {
                    context: this.context,
                    prompt: this.input,
                })

                if (res.status > 199 && res.status < 300) {
                    this.processSuccessfulAiResponse(res.data);

                    if (totmr) clearTimeout(totmr);
                }

                this.isDoingRequest = false;
            }
            catch (e) {
                if (e?.response?.data?.error) {
					this.$notification.error(
						JSON.stringify(e?.response?.data?.error, null, 4),
						{ timer: 2 }
					);
				}

				this.isDoingRequest = false;
            }
        },
        processSuccessfulAiResponse(data = []) {
            switch (this.context) {
                case 'roles': {
                    this.processSuccessAiResponseDataArr(data);
                    break;
                }
                case 'datasources': {
                    this.processSuccessAiResponseDatasources(data);
                    break;
                }
            }
        },
        processSuccessAiResponseDatasources(data) {
            this.$refs['proj-deps'].setDssConfirmPrompts(data.datasources);
            this.$refs['proj-deps'].setDsTags(data.keywords);
        },
        processSuccessAiResponseDataArr(data) {
            this.confirmations.push({
                src: 'confirmations',
                context: `${this.context}`,
                isConfirmAction: true,
                forceComplete: true,
				message: tr(`confirm-create-${this.context}`),
                data: data.map(i => ({
                    key: i,
                    confirmed: false,
                    prompt: i,
                })),
            });

            this.confirmations.push({
                src: 'confirmations',
                forceComplete: true,
				message: tr(`confirm-summary-prompt`),
            });

            this.nextQuestionIsConfirmAllData = true;

            this.pushNextAiMessage('confirmations');
        },
        pushNextAiMessage(src, forceComplete = false) {
            if ((this[src]?.length ?? 0) == 0) {
                this.aiIsSpeaking = false;
                return;
            }

            const chatItem = this[src].shift();

            chatItem.completed = forceComplete;
			chatItem.src = src;

            // only show the avatar at the beginning of the chat
            if (!this.lastMsgWasAi) {
                chatItem.showAvatar = true;
                this.lastMsgWasAi = true;
                this.lastMsgWasUser = false;
                this.aiIsSpeaking = true;
            }
            else {
                chatItem.showAvatar = false;
            }

            this.conversation.push(chatItem);

            this.currentChatItemIndex = this.conversation.length - 1;

            this.scrollToBottom();
        },
        deleteItemFromDependencies(item) {
            this.$refs['proj-deps'].deleteItemFromDependencies(item);
        },
        addItemFromDependencies(item) {
            this.$refs['proj-deps'].addItemFromDependencies(item);
        },
    }
}
</script>