<template>
<e-col>

    <e-row class="mt-2">

        <e-col w-30 jc="c" non-sel>

            {{ tr('list-style-type') }}:

        </e-col>

        <e-col w-70 :center="true">

            <EFormSelect
                w-100
                name=""
                :placeholder="tr('select-a-type')"
                keyProp="key"
                valueProp="name"
                :options="listStyleTypes"
                :inlineOver="true"
                v-model="listStyleType"
            />

        </e-col>

    </e-row>

    <e-row>

        <e-col w-30 jc="c" non-sel>

            {{ tr('list-position') }}:

        </e-col>

        <e-col w-70 stle="padding-top: 4px;">

            <EFormSelect
                w-100
                name=""
                :placeholder="tr('select-unit')"
                keyProp="key"
                valueProp="name"
                :options="listPositionTypes"
                :inlineOver="true"
                v-model="listPositionType"
            />

        </e-col>

    </e-row>

</e-col>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        currentStyleTab: String,
        editingStyle: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('app', [ 'listStyleTypes', 'listPositionTypes' ]),
    },
    watch: {
        listStyleType(to) {
            this.$emit('style-changed', { key: 'list-style-type', value: to });
        },
        listPositionType(to) {
            this.$emit('style-changed', { key: 'list-style-position', value: to });
        },
    },
    data() {
        return {
            listStyleType: '',
            listPositionType: '',
        }
    }
}
</script>
