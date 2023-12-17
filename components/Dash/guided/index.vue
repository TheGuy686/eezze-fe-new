<style lang="less" scoped>
.steps-content {
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 20px;
}
</style>

<template>
<e-row>

    <e-col ref="question-steps" :style="`max-height-ryan: ${windowHeight * 0.7}px; max-height: 63vh;`" w-25 e-scroll v-if="!showSummary">

        <a-steps
            non-sel
            direction="vertical"
            status="error"
            size="small"
            :current="current"
            v-model="current"
            
        >
            <a-step 
                :status="process(i, s)" 
                :title="s.title" 
                :description="s.desc"
                :key="i"
                v-for="s, i in steps"
            />
    
        </a-steps>

    </e-col>

    <e-col clss="steps-content" :w-75="!showSummary">

        <DashGuidedBasic
            ref="src" 
            :current="current"
            :toggleItemComingSoon="toggleItemComingSoon"
            v-model="project"
            v-if="!showSummary"
        />

        <DashSummary :project="projectTree" v-else />

    </e-col>

    <!-- <d :d="projectTree" /> -->

</e-row>
</template>

<script>
import { mapState }from 'vuex';
import Vue from 'vue';
import ProjectTreeModel from '~/models/ProjectTreeModel';

export default {
    props: {
        toggleItemComingSoon: Function,
        showSummary: Boolean,
    },
    computed: {
        ...mapState('project/proj', ['steps']),
        ...mapState('app', [ 'windowHeight' ]),

        process() {
            return function (index, step) {
                if (index < this.current) 'finish';
                else if (index == this.current) return 'process';

                return '';
            }
        },
        hoveringItemComingSoon() {
            try {
                return this.$refs['src'].hoveringItemComingSoon;
            }
            catch (err) { return false }
        },
        prWatcher() {
            try {
                return JSON.parse(JSON.stringify(this.project));
            }
            catch (err) {
                return {};
            }
        },
    },
    watch: {
        current(to) {
            this.$emit('changed');

            try {
                if (to >= 3) {
                    let divElement = this.$refs['question-steps'].$el;
                    divElement.scrollTop = divElement.scrollHeight;
                }
            }
            catch (err) {}
        },
        prWatcher(to) {
            if (this.jsutChanged) return;

            Vue.set(this.project, 'datasources', to?.datasources);

            setTimeout(() => this.jsutChanged = false, 200);

            this.jsutChanged = true;
        }
    },
    data() {
        return {
            current: 0,
            speak: false,
            isDoingRequest: false,
            jsutChanged: false,

            project: {
                projectName: '',
                description: '',
                type: 'server',
                host: '',
                ip: '',
                user: '',
                pass: '',
                sshKey: '',
                roles: '',
                envVals: [],
                vaultVals: [],
                dataSourceType: 'Mysql',
                dsMetadata: {
                    props: {
                        host: 'localhost',
                        port: 3360,
                        user: '',
                        password: '',
                    },
                },
            },
            projectTree: {}
        }
    },
    mounted() {
        if (this.speak) {
            events.emit('member-handle-clicked', this.steps[this.current].ask);
        }
    },
    methods: {
        previous() { this.current-- },
        next() { this.current++ },
        async getProectDependancies() {SVGAngle
            let res;

            this.isDoingRequest = true;

            const totmr= setTimeout(() => {
                this.isDoingRequest = false;

                this.$notification.error(this.tr('request-timeout'), { timer: 2 });
            }, 6000);

            try {
                res = await this.$axios.post(this.endpoints.project.projectTree, this.project);

                if (res.status > 199 && res.status < 300) {
                    this.projectTree = ProjectTreeModel.create(res.data);

                    clearTimeout(totmr);

                    setTimeout(() => {
                        this.current++;

                        if (this.speak) {
                            this.events.emit('member-handle-clicked', this.steps[this.current].ask);
                        }

                        this.isDoingRequest = false;
                    }, 200);
                }
            }
            catch (e) {
                console.log('There was an error uploading avatar. ', e);

                if (e?.response?.data?.error) {
					this.$notification.error(
						JSON.stringify(e?.response?.data?.error, null, 4),
						{ timer: 2 }
					);
				}

				this.isDoingRequest = false;
            }
        }
    }
}
</script>