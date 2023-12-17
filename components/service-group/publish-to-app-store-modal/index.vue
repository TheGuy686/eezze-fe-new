<template>
<EModal
    ref="modal"
    :dialogStyle="{ top: '50px' }"
    :width="1050"
    :title="tr(`publish-to-${payload.scope}`)"
    :showBackBtn="mainIndex > 0"
    :isLoading="isDoingRequest"
    :rightBtnText="tr(mainIndex == 0 ? 'next' : 'submit')"
    @back-btn-clicked="mainIndex > 0 ? mainIndex = 0 : undefined"
    @right-btn-clicked="rightBtnClicked()"
    @modal-closed="modalClosed"
>
    <ServiceGroupSummary
        :sg="sgTree"
        :services="services"
        :roles="roles"
        v-if="mainIndex == 0"
    />

    <ServiceGroupSummaryUserStories
        :services="services"
        :modalWidth="modalWidth"
        :roles="roles"
        :addRoles="payload?.overrides?.roles ?? []"
        @update-services="iteration++"
        v-else
    />

</EModal>
</template>

<script>
import Vue from 'vue';
import StoreSgTreeModel from '~/models/StoreSgTreeModel';
import ServiceModel from '~/models/ServiceModel';
import RoleModel from '~/models/RoleModel';

export default {
    watch: {
        servsChangeEmitter(to) {
            if (!this.sgTree?.serviceGroup?.services) return;

            if (this.justUpdatedServices) {
                this.justUpdatedServices = false;
                return;
            }

            Vue.set(
                this.sgTree.serviceGroup,
                'services',
                to.services.map(s => ServiceModel.create(s))
            );

            this.justUpdatedServices = true;
        },
        serStories(to) {
            this.payload.overrides.serviceStories = to.mdl;
        },
    },
    computed: {
        modalWidth() { return 1050 },
        services() {
			return this.cloneArr(this.sgTree?.serviceGroup?.services) ?? [];
		},
        roles() {
            if (!Array.isArray(this.sgTree?.roles)) {
                Vue.set(this.sgTree, 'roles', []);
            }

			return this.sgTree.roles;
		},
        servsChangeEmitter() {
            try {
                return {
                    iteration: this.iteration,
                    services: this.cloneArr(this.services)
                };
            }
            catch (err) {
                return [];
            }
        },
        serStories() {
            const out = {};

            for (const ser of this.services) {
                out[ser.name] = ser.story;
            }

            return {
                iteration: this.iteration,
                mdl: out
            };
        },
    },
    data() {
        return {
            justUpdatedServices: false,
            iteration: 0,
            mainIndex: 0,
            entity: {},
            sgTree: {},
            isDoingRequest: false,
            payload: {
                scope: 'store',
                projectId: -1,
                serviceGroups: '',
                form: {},
                overrides: {
                    serviceStories: this.serStories?.mdl ?? {},
                    roles: [],
                },
            },
        };
    },
    mounted() {
        this.events.off('create-edit-override-value');
        this.events.off('set-publish-store-form-data');
        this.events.off('add-role-override');
        this.events.on(
            'set-publish-store-form-data',
            (form) => {
                Vue.set(this.payload, 'form', form);
            }
        );
        this.events.on(
            'create-edit-override-value',
            (data) => {
                Vue.set(this.payload.overrides, data.key, data.value);
            }
        );
        this.events.on(
            'add-role-override',
            (role) => {
                if (this.payload.overrides.roles.includes(role)) {
                    this.payload.overrides.roles.push(RoleModel.create({
                        role: role,
                        description: '',
                    }));
                }
            }
        );

    },
    methods: {
        async rightBtnClicked() {
            if (this.mainIndex == 0) {
                this.mainIndex = 1;
                return;
            }

            let res;

            this.isDoingRequest = true;

            const totmr = setTimeout(() => {
                this.isDoingRequest = false;

                this.$notification.error(this.tr('request-timeout'), { timer: 2 });
            }, 6000);

            try {
                res = await this.$axios.post(
                    this.endpoints.serviceGroup.publish,
                    this.payload,
                );

                if (res.status > 199 && res.status < 300) {
                    clearTimeout(totmr);

                    setTimeout(() => {
                        this.isDoingRequest = false;
                        this.hide();
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
        },
        async populateSgDepTree(entity) {
            let res;

            this.payload.projectId = entity.projectId;

            this.isDoingRequest = true;

            const totmr= setTimeout(() => {
                this.isDoingRequest = false;

                this.$notification.error(this.tr('request-timeout'), { timer: 2 });
            }, 6000);

            this.payload.serviceGroups = `${entity.id}`;

            try {
                res = await this.$axios.get(`${this.endpoints.serviceGroup.depTree}?id=${entity.id}`);

                if (res.status > 199 && res.status < 300) {
                    clearTimeout(totmr);

                    this.sgTree = StoreSgTreeModel.create(res.data);

                    setTimeout(() => {
                        this.current++;

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
        },
        hide() {
            this.$refs['modal'].hide();
        },
        show(entity, scope) {
            this.payload.scope = scope;
            this.populateSgDepTree(entity);
            this.$refs['modal'].show();
        },
        modalClosed() {
            this.mainIndex = 0;
            this.payload = {
                scope: 'store',
                projectId: -1,
                serviceGroups: '',
                form: {},
                overrides: {},
            }
        },
    }
}
</script>