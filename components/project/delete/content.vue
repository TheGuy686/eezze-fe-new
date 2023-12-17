<template>
<e-col>

    <span class="info">{{ tr('delete-info-1') }}</span>

    <a-alert
        class="warn-alert"
        type="error"
        show-icon
    >

        <template slot="description">

            {{ tr('delete-warn') }}

        </template>

    </a-alert>

    <span class="info" v-html="tr('delete-info-2')" />

    <EFormInput
        name="delete-confirm"
        class="mt-5"
        :placeholder="tr('description')"
        :message="tr('please-input-a-description')"
        inputCase="upperCase"
        :inlineOver="true"
        v-model="deleteConfirmText"
    />

</e-col>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    computed: {
        ...mapState('project/proj' , [ 'entity' ]),

        deleteConfirm() { return this.deleteConfirm == 'DELETE PROJECT' },
    },

    watch: {
        deleteConfirmText(to) {
            this.$emit('delete-confim-changed', to);
        }
    },

    data() {
        return {
            deleteConfirmText: '',
        }
    },

    mounted() {
        this.$emit('delete-confim-changed', '');
    },

	methods: {

	}
};
</script>