<template>
<a-col :style="`padding-left: 10px; max-height: ${maxHeight}px;`" e-scroll>
                
    <DatasourceFormOConnectionOverrides
        :connection="connection"
        :hideLogger="true"
        :hideAuth="true"
    />

</a-col>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        connection: {
            type: Object,
            required: false,
        },
        width: {
            type: Number,
            required: true,
        },
        maxHeight: {
            type: Number,
            required: true,
        },
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

            const md = this.entity?.metadata;

            if (!md?.host) return false;
            if (!md?.port) return false;

            return true;
        },
	},
    methods: {
        ...mapMutations({
			setEntityProp: 'project/data-sources/setEntityProp',
        }),
    }
};
</script>
