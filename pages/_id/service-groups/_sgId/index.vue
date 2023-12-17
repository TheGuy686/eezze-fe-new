<style>
.side {
    box-sizing: border-box;
    height: 100%;
    background: #FFF;
    border-right: 1px solid #E0E0E0;
    left: -20px;
    top: -20px;
}

.selector {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px;
    background: #FFF;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;


    transition-property: all;
    transition-duration: 2s;
    transition-timing-function: cubic-bezier(0, 1, 2, 1);
}

.add-action {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 8px;
    width: 100%;
    height: 56px;
    border: 1px solid #3F88C5;
    border-radius: 8px;
    flex: none;
    order: 0;
    flex-grow: 0;
    color: #3F88C5;
}

.service-back-button:hover { cursor: pointer; }

</style>

<template>
<span>
    <a-col class="side" :span="6">

        <div class="mt-10 ml-5 mr-5 service-back-button" @click="navigateBack()">

            <GeneralIcon class="inline-block" :type="'back-arrow'" />

            <p class="inline-block font-medium text-xl text-black-1">
                
                {{ tr('back') }}
            
            </p>

        </div>

        <div class="ml-5 mr-5">

            <p class="inline font-bold text-lg text-black-1">{{ tr('services') }}</p>

            <a-button
                size="large"
                class="inline bg-success float-right text-white"
                @click="addServiceClicked()"
            >
                {{ tr('add') }}

            </a-button>

        </div>

        <ServServiceMenus
            ref="service-menu"
            :services="services"
            :entity="editingService"
            :hasRestResouce="hasRestResouce"
            :hasWsResouce="hasWsResouce"
            :hasCronResouce="hasCronResouce"
            :hasEndpoints="hasEndpoints"
            :hasWebsockets="hasWebsockets"
            :hasCronTasks="hasCronTasks"
            :restfulEndpoints="restfulEndpoints"
            :websocketEvents="websocketEvents"
            :scheduledTasks="scheduledTasks"
            @new-from-init="addServiceClicked()"
            @edit-service-selected="editingServiceClicked($event)"
        />

    </a-col>

    <a-col class="pt-1" :span="18">

        <div class="inline mt-5 mb-5">

            <p class="inline pl-5 pt-5 font-semibold text-xl text-black-1">

                <span v-if="hasService">

                    {{ tr('bl-service-title', { args: [ editingService.name ] }) }}

                </span>

                <span v-else>

                    {{ tr('bl-service-titleadd-new') }}

                </span>

            </p>

            <a-popover placement="right" v-if="devMode">

                <a-button shape="circle" size="small" type="primary">

                    <GeneralIcon type="eye-white" />

                </a-button>

                <template #content>

                    <d :d="editingService" />

                </template>

            </a-popover>

            <a-button
                :class="`inline float-right text-white px-10 ` + (isNew && serviceExists(entity.name) ? '' : 'bg-success' )"
                size="large"
                :type="isNew && serviceExists(entity.name) ? 'warn' : 'default'"
                :loading="isDoingServiceRequest"
                :disabled="isNew && serviceExists(entity.name)"
                @click="saveChanges()"
            >
                {{ tr(isDoingServiceRequest ? 'please-wait' : showServiceSelectore ? 'next' : 'save') }}

            </a-button>

        </div>

        <ServNewServiceContent
            :editingService="editingService"
            :entity="entity"
            :hasRestResouce="hasRestResouce"
            :hasWsResouce="hasWsResouce"
            :hasCronResouce="hasCronResouce"
            @add-new="addNew()"
            v-if="showServiceSelectore"
        />

        <ServContent
            :editingService="editingService"
            :entity="entity"
            v-if="!showServiceSelectore"
            @save-entity-changes="saveEntityChanges($event)"
        />

    </a-col>

</span>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
import ServiceModel from '~/models/ServiceModel';

let enterRoutePath;

export default {
    beforeRouteEnter(to, from, next) {
        enterRoutePath = from.path;
        next();
    },

    watch: {
        entity(to) {
            if (this.changeCount > 5) return;
            if (this.justDidSet) {
                setTimeout(() => this.justDidSet = false, 200);
                return;
            }

            this.saveEntityChanges(to);
            this.changeCount++;
            setTimeout(() => this.changeCount = 0, 200);
        },
        entityChangeMdl() {
            if (this.changeCount > 5) return;
            if (this.justSetEditingEntity) return;

            this.setNewEditEntityObject(
                ServiceModel.create(JSON.parse(JSON.stringify(this.entity)))
            );

            this.setIsEdit(false);
            this.changeCount++;
            setTimeout(() => this.changeCount = 0, 200);
        },
        editingService(to) {
            if (this.changeCount > 5) return;

            if (this.justDidSet) {
                setTimeout(() => {
                    this.justDidSet = false;
                    this.changedFromDelete = false;
                }, 200);
                return;
            }

            if (this.justSetEditingEntity) {
                setTimeout(() => {
                    this.justSetEditingEntity = false;
                }, 200);
                return;
            }

            this.entity = ServiceModel.create(JSON.parse(JSON.stringify(to)));
            this.justDidSet = true;
            this.changeCount++;
            setTimeout(() => this.changeCount = 0, 200);
        },
    },

    computed: {
        ...mapState('project', {
            serviceGroup: (state) => state['service-groups']?.entity ?? {},
            serviceGroups: (state) => state['service-groups']?.entities ?? [],
            isServiceEdit: (state) => state?.services?.isEdit,
            editingService: (state) => state?.services?.entity,
            isDoingServiceRequest: (state) => state?.services?.isDoingRequest,
        }),
        ...mapGetters({
            services: 'project/services/editingServices',
            serviceExists: 'project/services/serviceExists',
        }),

        hasEndpoints() { return this.restfulEndpoints.length > 0 },
        hasWebsockets() { return this.websocketEvents.length > 0 },
        hasCronTasks() { return this.scheduledTasks.length > 0 },
        restfulEndpoints() {
            if (!this.services || this.services.length == 0) return [];

            return this.services.filter((ser) => ser.type == 'rest');
        },
        websocketEvents() {
            if (!this.services || this.services.length == 0) return [];

            return this.services.filter((ser) => ser.type == 'websocket');
        },
        scheduledTasks() {
            if (!this.services || this.services.length == 0) return [];

            return this.services.filter((ser) => ser.type == 'cron-task');
        },

        entityChangeMdl() {
            return JSON.parse(JSON.stringify(this.entity))
        },

        hasService() {
            if (!this.editingService) return false;
            if (typeof this.editingService != 'object') return false;
            if (Object.keys(this.editingService).length == 0) return false;

            return true;
        },

        hasRestResouce() {
            try {
                const md = this.serviceGroup?.metadata;

                return typeof md?.restDs == 'number' && md?.restDsName != '';
            }
            catch (err) {
                return false;
            }
        },
        hasWsResouce() {
            try {
                const md = this.serviceGroup?.metadata;

                return typeof md?.wsDs == 'number' && md?.wsDsName != '';
            }
            catch (err) { return false }
        },
        hasCronResouce() {
            try {
                const md = this.serviceGroup?.metadata;

                return typeof md?.cronDs == 'number' && md?.cronDsName != '';
            }
            catch (err) {
                return false;
            }
        },
        hasService() {
            if (this.hasEndpoints) return true;
            if (this.hasWebsockets) return true;
            if (this.hasCronTasks) return true;

            return false;
        },
    },

    data() {
        return {
            enterRoutePath: '',
            showServiceSelectore: true,
            justChangedEntity: false,
            entity: {},
            isNew: true,
            justDidSet: false,
            justSetEditingEntity: false,
            changeCount: 0,
            justSetSSS: false,
        }
    },

    beforeMount() {
        if (typeof this.editingService == 'object' && Object.keys(this.editingService)) {
            this.setSelector(true, 'beforeMount');
        }

        for (let i = 0; i < 5; i++) {
            this.os(() => this.setCurrentServiceGroup(), 500);
        }
    },

    mounted() {
        this.events.off('update-entity');
        this.events.on('update-entity', (ent) => {
            this.setNewEditEntityObject(
                ServiceModel.create(JSON.parse(JSON.stringify(ent)))
            );
        });
    },

    methods: {
        setSelector(state, src, ignoreCheck = false) {
            if (this.justSetSSS && !ignoreCheck) {
                return;
            }
            this.showServiceSelectore = state;
            this.justSetSSS = true;
            setTimeout(() => this.justSetSSS = false, 300);
        },
        addServiceClicked() {
            this.addNew();
            this.setSelector(true, 'addServiceClicked');
        },
        saveEntityChanges(to) {
            const val = JSON.parse(JSON.stringify({...to}));

            this.setNewEditEntityObject(val);

            this.justSetEditingEntity = true;

            Vue.set(this, 'entity', JSON.parse(JSON.stringify(val)));
        },
        addNew() {
            this.isNew = true;

            this.setIsEdit(false);

            this.entity = ServiceModel.create({
                serviceGroupId: this.serviceGroup.id
            });

            this.setEditingService(this.entity);
        },
        setCurrentServiceGroup() {
            const serviceGroup = this.serviceGroups.filter((sg) => sg.id == this.$route?.params?.sgId);

            if (serviceGroup.length == 0) {
                console.log(`There was an error setting the editing service group for id "${this.$route?.params?.sgId}"`);
                return;
            }

            this.setNewEditEntity(serviceGroup[0]);

            if (typeof this.services == 'object' && this.services.length > 0) {
                this.setEditingService(this.services[0]);
            }

            this.justChangedEntity = true;
        },
        navigateBack() {
            if (/^\/[a-zA-Z0-9 -_]+\/service-groups/.test(enterRoutePath)) this.$router.go(-1);

            this.$router.push({ path: `/${this.$route.params?.id}/service-groups`});
        },
        saveChanges() {
            if (this.showServiceSelectore) {
                this.setSelector(false, 'saveChanges');
                return;
            }

            this.setIsEdit(true);

            this.$store.dispatch(
                'project/services/createEditEntity',
                {
                    projectId: this.currentProject,
                    hideModal: async (entity, res) => {
                        if (this.isNew) {
                            entity.id = res.body.id;
                            entity.isNew = false;
    
                            this.setEditingService(entity);
                            this.isNew = false;

                            this.$refs['service-menu'].setNewSectionInfo(entity);
                        }

                        this.os(
                            () => {
                                this.$notification.success({
                                    placement: 'topRight',
                                    message: this.tr('operation-successful'),
                                    description: this.tr('entity-operation-was-successful'),
                                });
                            },
                            300
                        );
                    },
                }
            );
        },
        editingServiceClicked(service) {
            this.isNew = false;

            this.setEditingService(service);
            this.setSelector(false, 'editingServiceClicked', true);
        },
        ...mapMutations({
			setNewEditEntity: 'project/service-groups/setNewEditEntity',
            setNewEditEntityObject: 'project/services/setNewEditEntityObject',
			setEditingService: 'project/services/setNewEditEntity',
            setIsEdit: 'project/services/setIsEdit',
		}),
    },

}
</script>