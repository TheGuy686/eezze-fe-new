<template>
<EModal
    ref="modal"
    :title="tr('store-modal-overview', { args: [ fltModule.title ] })"
    :width="windowWidth * 0.65"
    @right-btn-clicked="$emit('confirm-add-module', fltModule)"
>
    <ServiceGroupAppStoreModuleDetails
        style="margin-top: -25px;"
        :mdl="fltModule"
    />

</EModal>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('app', [ 'windowWidth' ]),
    },
    data() {
        return {
            fltModule: {},
        };
    },
    methods: {
        show(mdul) {
            this.fltModule = mdul;

            this.$refs['modal'].show();
        },
        hide() {
            this.$refs['modal'].hide();
        },
    }
}
</script>