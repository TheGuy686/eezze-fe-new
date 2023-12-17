<template>
<e-col>

    <h2 class="pt-5" non-sel>{{ tr('compatible-service-types') }}</h2>

    <e-row non-sel v-if="types.length > 0">

        <a-tag
            class="pl-3"
            :color="type(t).color"
            :key="index"
            v-for="(t, index) in types"
        >
            {{ type(t).name }}

        </a-tag>

    </e-row>

    <e-row non-sel v-else>

        {{ tr('there-are-no-compatible-service-types') }}

    </e-row>

</e-col>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        types: {
            type: Array,
            required: true,
        }
    },
    computed: {
        ...mapGetters({
            typesDict: 'project/service-types/typesDict',
        }),
        type() {
            return function (type) {
                return this.typesDict?.[type] ?? {};
            }
        }
    }
}
</script>