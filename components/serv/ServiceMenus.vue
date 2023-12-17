<template>
<div>

    <a-collapse v-model="sideActiveKey" class="mt-5">

        <a-collapse-panel key="1" :header="tr('restful')">

            <ServGroupRestfulItem
                ref="restfulGroups"
                :services="restfulEndpoints"
                non-sel
                v-show="restfulEndpoints.length > 0"
                @item-clicked="selectService($event, 0)"
            />

            <div non-sel v-if="!hasRestResouce">

                {{ tr('please-add-rest-datasource-to-sg') }}

            </div>

            <e-col a-center v-show="restfulEndpoints.length == 0 && hasRestResouce">

                {{ tr('no-items-to-show') }}

            </e-col>

        </a-collapse-panel>

        <a-collapse-panel key="2" :header="tr('web-sockets')">

            <ServGroupWsItem
                ref="websocketGroups"
                :services="websocketEvents"
                non-sel
                v-show="websocketEvents.length > 0"
                @item-clicked="selectService($event, 1)"
            />

            <div non-sel v-if="!hasWsResouce">

                {{ tr('please-add-ws-datasource-to-sg') }}

            </div>

            <e-col a-center v-show="websocketEvents.length == 0 && hasWsResouce">

                {{ tr('no-items-to-show') }}

            </e-col>

        </a-collapse-panel>

        <a-collapse-panel key="3" :header="tr('cron-tasks')">

            <ServGroupCronItem
                ref="cronGroups"
                :services="scheduledTasks"
                non-sel
                v-show="scheduledTasks.length > 0"
                @item-clicked="selectService($event, 2)"
            />

            <div non-sel v-if="!hasCronResouce">

                {{ tr('please-add-cron-datasource-to-sg') }}

            </div>

            <e-col a-center v-show="scheduledTasks.length == 0 && hasCronResouce">

                {{ tr('no-items-to-show') }}

            </e-col>

        </a-collapse-panel>

    </a-collapse>

</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    props: {
        services: Array,
        hasRestResouce: Boolean,
        hasWsResouce: Boolean,
        hasCronResouce: Boolean,
        hasEndpoints: Boolean,
        hasWebsockets: Boolean,
        hasCronTasks: Boolean,
        restfulEndpoints: Array,
        websocketEvents: Array,
        scheduledTasks: Array,
        entity: {},
    },
    computed: {
        ...mapState('project/services', [ 'isEdit' ] ),
    },
    data() {
        return {
            sideActiveKey: [ '0' ],
        }
    },
    mounted() {
        const serv = this.getDefaultService();

        this.sideActiveKey = [ String(serv.src + 1) ];

        setTimeout(() => {
            this.selectService(serv.service, serv.src, 0);
        }, 200);

        setTimeout(() => {
            const serv = this.getDefaultService();

            if (Object.keys(serv ?? {}).length > 0) {
                this.sideActiveKey = [ String(serv.src + 1) ];
                this.selectService(serv.service, serv.src, 0);
            }
            // by default then we need to select / emit a new event to make sure the 
            // new service screen always works as expected
            else this.$emit('new-from-init');
        }, 500);
    },
    methods: {
        getDefaultService() {
            if (this.hasEndpoints) return {
                src: 0,
                service: this.restfulEndpoints[0],
            };
            if (this.hasWebsockets) return {
                src: 1,
                service: this.websocketEvents[0],
            };
            if (this.hasCronTasks) return {
                src: 2,
                service: this.scheduledTasks[0],
            };

            return {};
        },
        manageSelectedState(index) {
            const ind = String(index + 1);

            if (this.sideActiveKey && !this.sideActiveKey.includes(ind)) {
                this.sideActiveKey.push(ind);
            }
        },
        selectService(service, srcIndex, itemIndex) {
            const rg = this?.$refs['restfulGroups'],
                  wg = this?.$refs['websocketGroups'],
                  cg = this?.$refs['cronGroups'];

            this.manageSelectedState(srcIndex);

            if (srcIndex == 0) {
                if (rg?.setActiveIndex && typeof itemIndex === 'number') {
                    rg?.setActiveIndex(itemIndex);
                }
                if (wg?.reset) wg?.reset();
                if (cg?.reset) cg?.reset();
            }
            else if (srcIndex == 1) {
                if (wg?.setActiveIndex && typeof itemIndex === 'number') {
                    this?.$refs['websocketGroups']?.setActiveIndex(itemIndex);
                }
                if (rg?.reset) rg?.reset();
                if (cg?.reset) cg?.reset();
            }
            else if (srcIndex == 2) {
                if (cg?.setActiveIndex && typeof itemIndex === 'number') {
                    cg?.setActiveIndex(itemIndex);
                }
                if (rg?.reset) rg?.reset();
                if (wg?.reset) wg?.reset();
            }
            
            this.setEditingService(service);

            setTimeout(() => this.setServiceIsEdit(true), 20);

            this.$emit('edit-service-selected', service);
        },
        setNewSectionInfo(service) {
            let srcIndex, itemIndex;

            if (service.type == 'rest') {
                srcIndex = 0;
                for (const i in this.restfulEndpoints) {
                    if (this.restfulEndpoints[i].id != service.id) continue;
                    itemIndex = i;
                    break;
                }
            }
            else if (service.type == 'websocket') {
                srcIndex = 1;
                for (const i in this.websocketEvents) {
                    if (this.websocketEvents[i].id != service.id) continue;
                    itemIndex = i;
                }
            }
            else {
                srcIndex = 2;
            }

            this.selectService(service, srcIndex, itemIndex);
        },
        ...mapMutations({
			setNewEditEntity: 'project/service-groups/setNewEditEntity',
			setEditingService: 'project/services/setNewEditEntity',
            setServiceIsEdit: 'project/services/setIsEdit',
		}),
    }
}
</script>
