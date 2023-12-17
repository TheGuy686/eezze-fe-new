<template>
<div class="selector inline-block">

    <GeneralBeveledGrid>

        <GeneralBeveledGridItem
            :id="item.key"
            :title="item.name"
            :key="index"
            :bgColor="item.color"
            :disabled="csKeys.includes(item.key)"
            :helpText="csKeys.includes(item.key) ? tr('please-add-valid-datasource-to-use') : undefined"
            :value="[ editingService?.type ]"
            @input="newServiceTypeChanged(item)"
            v-for="(item, index) in serviceTypes"
        />

    </GeneralBeveledGrid>

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        hasRestResouce: Boolean,
        hasWsResouce: Boolean,
        hasCronResouce: Boolean,
    },
    computed: {
        ...mapState('project/service-types', {
            serviceTypes: (state) => state?.entities.filter((sgt) => sgt.isMainService) ?? [],
        }),
        ...mapState('project/services', {
            editingService: (state) => state?.entity,
        }),
        csKeys() {
            const out = [];

            if (!this.hasRestResouce) out.push('rest');
            if (!this.hasWsResouce) out.push('websocket');
            if (!this.hasCronResouce) out.push('cron-task');

            return out;
        },
        hasNewObject() {
            try {
                return typeof this.editingService == 'object' && Object.keys(this.editingService).length > 0;
            }
            catch (err) { return false }
        }
    },
    methods: {
        newServiceTypeChanged(type) {
            if (!this.hasNewObject) this.$emit('add-new');
            this.setEntityProp({ key: 'type', value: type.key });
        },

        ...mapMutations({
            setEntityProp: 'project/services/setEntityProp',
        }),
    }
}
</script>
