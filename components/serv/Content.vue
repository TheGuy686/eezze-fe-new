<template>
<div class="selector">

    <a-tabs v-model="serviceActiveKey">

        <a-tab-pane key="1" :tab="tr('service')">

            <ServRestContent :entity="entity" v-if="editingService.type == 'rest'" />

            <ServWsContent :entity="entity" v-else-if="editingService.type == 'websocket'" />

            <ServCronTaskContent :entity="entity" v-else-if="editingService.type == 'cron-task'" />

        </a-tab-pane>

        <a-tab-pane key="2" :tab="tr('roles')" force-render>

            <ServRolesContent
                :entity="entity"
                @save-entity-changes="$emit('save-entity-changes', $event)"
            />

        </a-tab-pane>

        <a-tab-pane key="3" :tab="tr('action-chain-input')">

            <ServAcInputContent
                :entity="entity"
                @save-entity-changes="$emit('save-entity-changes', $event)"
            />

        </a-tab-pane>

        <a-tab-pane key="4" :tab="tr('actions')">

            <ServActionsContent
                :entity="entity"
                @save-entity-changes="$emit('save-entity-changes', $event)"
            />

        </a-tab-pane>

        <a-tab-pane key="5" :tab="tr('event-hooks')">

            <ServEventHooks
                :entity="entity"
                @save-entity-changes="$emit('save-entity-changes', $event)"
            />

        </a-tab-pane>

    </a-tabs>

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('project/services', {
            editingService: (state) => state?.entity,
        }),
    },
    data() {
        return {
            serviceActiveKey: '1',
        };
    },
    mounted() {
        this.entity.type = this.editingService.type;
    },
}
</script>
