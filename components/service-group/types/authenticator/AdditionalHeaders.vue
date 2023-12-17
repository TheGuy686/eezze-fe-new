<template>
<e-col>

    <EInfoHelp trKey="auth-additional-headers-help" />

    <ServiceGroupTypesAuthenticatorHeaderItem
        :key="index"
        :allHeaders="allHeaders"
        :isLastIndex="false"
        v-model="headers[index]"
        @delete-clicked="headers.splice(index, 1)"
        v-for="(item, index) in headers"
        @item-changed="updateHeaderModel()"
    />

    <ServiceGroupTypesAuthenticatorHeaderItem
        :isLastIndex="true"
        :allHeaders="allHeaders"
        v-model="newItem"
        @add-clicked="headers.push({...newItem})"
    />

</e-col>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        entIn: Object,
    },
    computed: {
        ...mapState('project/service-groups', [ 'entity' ]),

        entP() {
            return this.entIn ?? this.entity;
        },

        allHeaders() {
            const out = [];

            for (let i of this.headers) {
                if (!i.key) continue;
                out.push(i.key);
            }

            return out;
        },

        changeEmitter() {
            try {
                return JSON.parse(JSON.stringify(this.headers));
            }
            catch (err) {
                return [];
            }
        }
    },
    watch: {
        headers() {
            this.updateHeaderModel();
        },
        changeEmitter(to) {
            this.updateHeaderModel();
        }
    },
    data() {
        return {
            headers: [],
            newItem: { key: '', value: '' },
        }
    },
    mounted() {
        let md = {};

        try {
            md = JSON.parse(JSON.stringify({...this.entP?.metadata} ?? {}));

            this.headers = [...md?.additionalHeaders ?? []];
        }
        catch (err) { console.log('error: ', err) }
    },
    methods: {
        updateHeaderModel() {
            const md = JSON.parse(JSON.stringify({...this.entP?.metadata} ?? {}));

            md['additionalHeaders'] = [...JSON.parse(JSON.stringify(this.headers))];

            this.$emit('md-changed', JSON.parse(JSON.stringify(md)));
        },
    }
}
</script>
