<style scoped>

</style>

<template>
<GeneralBeveledGrid v-model="hoveringItem">

    <GeneralBeveledGridItem
        :id="item.key"
        :title="item.name"
        :helpText="item?.help"
        :disabled="csKeys.includes(item.key)"
        :key="index"
        :value="[ entity?.type ]"
        @input="(event) => {
            setEntityProp({ key: 'type', value: event[0] });
            setEntityProp({ key: 'metadata', value: {
                ...(entity?.metadata ?? {}),
                serviceTypes: item.serviceTypes
            } });
        }"
        v-for="(item, index) in connectionTypes"
    />
 
</GeneralBeveledGrid>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
    props: {
        value: Boolean,
    },
    computed: {
        ...mapState('project/connections', [ 'entity', 'isEdit' ]),
        ...mapState('cms/connection-types', {
            connectionTypes: (state) => state?.entities,
        }),
        ...mapGetters({
            comingSoon: 'cms/connection-types/comingSoon'
        }),
        hoveringItemComingSoon() {
            return this.csKeys.includes(this.hoveringItem);
        },

        csKeys() {
            const out = [];
            for (let e of this.comingSoon) out.push(e.key);
            return out;
        }
    },
    watch: {
        hoveringItemComingSoon(to) {
            this.$emit('input', to);
        }
    },
    data() {
        return {
            hoveringItem: '',
        }
    },
    mounted() {
        if (!this.isEdit && !this?.metadata?.serviceTypes) {
            this.setEntityProp({ key: 'type', value: this.connectionTypes[0].key});
            this.setEntityProp({ key: 'metadata', value: {
                ...(this?.entity?.metadata ?? {}),
                serviceTypes: this.connectionTypes[0].serviceTypes,
            }});
        }
    },
    methods: {
        ...mapMutations({
            setEntityProp: 'project/connections/setEntityProp',
        }),
    }
};
</script>
