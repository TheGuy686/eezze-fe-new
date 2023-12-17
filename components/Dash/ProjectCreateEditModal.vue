<template>
<EModal
    ref="modal"
    :width="width"
    :title="tr(isEdit ? 'edit-a-project' : 'create-a-project')"
    :statusMessage="tr('please-wait-while-we-set-up-your-project')"
    :isLoading="isDoingRequest || isCreatingProjectFromWizard"
    :showBackBtn="mode != ''"
    :shouldDisableRightBtn="shouldDisableRightBtn"
    :rightBtnText="rightBtnText"
    :footerMessage="hoveringItemComingSoon ? tr('feature-coming-soon') : ''"
    @back-btn-clicked="backBtnClicked()"
    @right-btn-clicked="rightBtnClicked()"
    @modal-closed="mode = 'basic'; showSummary = false; isCreate = true"
>
    <div style="margin-top: -10px;">

        <DashWelcomeScreen
            @mode-changed="mode = $event"
            v-if="isCreate && mode == ''"
        />

        <DashGuided
            ref="guided-wizard"
            :toggleItemComingSoon="toggleItemComingSoon"
            :showSummary="showSummary"
            @changed="interval++"
            v-else-if="mode == 'basic'"
        />

        <DashAi
            ref="ai-assist"
            :showSummary="showSummary"
            @changed="interval++"
            v-else-if="mode == 'ai'"
        />

        <DashContent ref="frm" v-else />

    </div>

</EModal>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    beforeDestroy() {
        if (this.tmr) clearInterval(this.tmr);
    },
    computed: {
        ...mapState('app', [ 'windowWidth' ]),
        ...mapState('project/proj', [
            'steps',
            'isCreatingProjectFromWizard',
        ]),
        width() {
            if (this.mode == 'advanced') return 600;
            return this.windowWidth * 0.8;
        },
        currentStep() {
            try {
                return { interval: this.interval, value: this.$refs['guided-wizard'].current }
            }
            catch (err) { return { interval: this.interval, value: 0 }}
        },
        finishedQuesetionair() {
            if (this.mode != 'basic') return true;

            return this.currentStep.value == this.steps.length - 1;
        },
        shouldDisableRightBtn() {
            if (this.prAlreadyExists) return true;
            if (this.mode == '' && this.isEdit) return false;
            if (this.mode == '') return true;
            if (!this.finishedQuesetionair) return false;

            return false;
        },
        rightBtnText() {
            if (this.mode == 'basic' && !this.showSummary) return this.tr('next');
            return this.tr('submit');
        },
        prAlreadyExistsP() {
            try {
                return {
                    itteration: this.interval,
                    value: this.$refs['frm'].prAlreadyExists,
                };
            }
            catch (err) {
                return {
                    itteration: this.interval,
                    value: false,
                }
            }
        },
        prAlreadyExists() {
            return this.prAlreadyExistsP.value;
        },
    },
    data() {
        return {
            onCompleteCb: undefined,
            isDoingRequest: false,
            isCreate: false,    
            isEdit: false,
            entity: {},
            checkProjectVars: null,
            mode: '',
            interval: 0,
            hoveringItemComingSoon: false,
            showSummary: false,
            tmr: null,
        };
    },
    mounted() {
        if (this.tmr) clearInterval(this.tmr);
        this.tmr = setInterval(() => this.interval++, 2000);
    },
	methods: {
        backBtnClicked() {
            if (this.showSummary) {
                return this.showSummary = false;
            }

            this.mode = '';
        },
        async rightBtnClicked() {
            if (this.mode == 'basic' && !this.finishedQuesetionair && !this.showSummary) {
                return this.$refs['guided-wizard'].next();
            }

            if (this.mode == 'basic' && !this.showSummary && !this.isEdit && this.finishedQuesetionair) {
                this.$refs['guided-wizard'].getProectDependancies();
                return this.showSummary = true;
            }

            if (this.showSummary && this.mode == 'basic') {
                const pl = { ...this.$refs['guided-wizard'].projectTree };

                pl['info'] = pl.project;
                pl['datasources'] = pl.dssDict;
                
                return this.$store.dispatch(
                    'project/proj/createProjectFromWizard',
                    {
                        project: pl,
                        successCb: () => {
                            this.$refs['modal'].hide();

                            this.os(
                                () => this.$notification.success({
                                    placement: 'topRight',
                                    message: this.tr('operation-was-successful'),
                                }),
                                300,
                            );
                        },
                    }
                );
            }

            this.doCreateEdit();
        },
        toggleItemComingSoon(state) {
            this.hoveringItemComingSoon = state;
        },
        show (entity, successCb, isCreate) {
            this.isCreate = isCreate;
            this.propsSyncTmr();

            if (successCb) this.onCompleteCb = successCb;

            if (entity && !isCreate) {
                this.isEdit = true;

                setTimeout(() => {
                    this.$refs['frm'].setInitInitials();
                }, 50);
            }

            this.setNewEditEntity(entity);
            this.$refs['modal'].show();
        },
        doCreateEdit() {
            this.$store.dispatch('project/proj/createEditEntity', {
                hideModal: () => {
                    this.$store.dispatch('project/proj/getEntities', {
                        successCb: () => {
                            this.events.emit('refresh-projects');
                            this.hide();
                        }
                    });
                },
                projectId: this.$route.params.id,
            });
        },
        hide () {
            if (typeof this.onCompleteCb == 'function') {
                this.onCompleteCb(this.entity.key);
                this.onCompleteCb = undefined;
            }

            this.$refs['modal'].hide();

            this.os(
                () => {
                    clearInterval(this.checkProjectVars);

                    this.$notification.success({
                        placement: 'topRight',
                        message: this.tr('operation-was-successful')
                    });
                },
                300
            );
        },
        propsSyncTmr() {
            this.checkProjectVars = setInterval(() => {

                this.isDoingRequest = this.$store.state.project.proj.isDoingRequest;
                this.isEdit = this.$store.state.project.proj.isEdit;
                this.entity = this.$store.state.project.proj.entity;

            }, 200);
        },

        ...mapMutations({
			setNewEditEntity: 'project/proj/setNewEditEntity',
		}),
	}
};
</script>