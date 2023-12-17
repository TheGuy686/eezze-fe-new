<template>
<div>

    <ServiceGroupTypesAuthenticator
        :value="entity"
        @show-bl-mdl="$emit('show-bl-mdl', $event)"
        v-if="type == 'authenticator'"
    />

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        type: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState('project/service-groups', [ 'entity' ]),
    }
}
</script>
