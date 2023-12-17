<template>
<e-col>

    <span class="info">{{ tr('transfer-info-1') }}</span>

    <a-alert
        class="warn-alert"
        :description="tr('transfer-warn')"
        type="warning"
        show-icon
    />

    <e-col>

        <EFormSelect
            class="pr-2"
            :name="tr('emails')"
            mode="tags"
            :placeholder="tr('input-emails')"
            keyProp="id"
            valueProp="email"
            :options="emails"
            :inlineOver="true"
            v-model="entity.emails"
        />

        <EFormTextArea
            name="name"
            class="mt-5"
            :placeholder="tr('description')"
            :message="tr('please-input-a-description')"
            :value="entity.details"
            @input="initialsTmp = $event; setEntityProp({key: 'details', value: $event})"
        />

    </e-col>

</e-col>
</template>

<script lang="ts">
import { mapMutations, mapState } from 'vuex';

export default {
    computed: {
        ...mapState('project/proj' , [ 'entity' ]),
    },

    data() {
        return {
            emails: [
                {
                    id: '1',
                    email: 'ryanjcooke@hotmail.com',
                    firstName: 'Ryan',
                    lastName: 'Cooke'
                },
                {
                    id: '2',
                    email: 'ryanjcooke2@hotmail.com',
                    firstName: 'Ryan2',
                    lastName: 'Cooke2'
                },
                {
                    id: '3',
                    email: 'ryanjcooke3@hotmail.com',
                    firstName: 'Ryan3',
                    lastName: 'Cooke3'
                },
                {
                    id: '4',
                    email: 'ryanjcooke4@hotmail.com',
                    firstName: 'Ryan4',
                    lastName: 'Cooke4'
                },
                {
                    id: '5',
                    email: 'ryanjcooke5@hotmail.com',
                    firstName: 'Ryan5',
                    lastName: 'Cooke5'
                },
            ]
        }
    },

	methods: {

	}
};
</script>