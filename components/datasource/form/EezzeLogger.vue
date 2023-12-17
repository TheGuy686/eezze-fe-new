<template>
<div :style="`margin-top: -31px;`">

    <e-col>

        <div e-scroll :style="`max-height: ${maxHeight + 50}px;`">
            
            <DatasourceFormOConnectionOverrides
                :connection="connection"
                :hideDefaults="true"
                :isLogger="true"
            />

        </div>

    </e-col>

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        width: {
            type: Number,
            required: true,
        },
        maxHeight: {
            type: Number,
            required: true,
        },
        connection: {
            type: Object,
            required: false,
        }
    },
    watch: {
        formIsValid() {
            this.$emit('validity-changed');
        },
    },
    computed: {
        ...mapState('project/data-sources', ['entity']),
        formIsValid() {
            if (typeof this.entity != 'object') return false;
            if (!this.entity?.host) return false;
            if (!this.entity?.port) return false;

            return true;
        },
    },
    data() {
        return {
            activeKey: 'connection-info',
        }
    },
    methods: {
        ...mapMutations({
            setEntityProp: 'project/data-sources/setEntityProp',
        }),
    }
};
</script>