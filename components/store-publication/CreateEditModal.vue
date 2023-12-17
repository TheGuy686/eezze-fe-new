<template>
<EModal
    ref="modal"
    :title="tr('publish-store-module')"
    :isLoading="isDoingRequest"
    :shouldDisableRightBtn="!valid"
    @modal-closed="confirmText = ''"
    @right-btn-clicked="() => {
        $store.dispatch(
            'admin/store/createEditEntity',
            {
                hideModal: (entity) => {
                    if (typeof onCompleteCb == 'function') {
                        onCompleteCb(entity.key);
                        onCompleteCb = undefined;
                    }

                    $refs['modal'].hide();

                    os(
                        () => {
                            $notification.success({
                                placement: 'topRight',
                                message: tr('operation-successful'),
                                description: tr('entity-operation-was-successful'),
                            });
                        },
                        300
                    );
                },
            }
        );
    }"
>
    <a-col>

        <e-row>

            <EFormCheckBox
                :inlineOver="true"
                inlineLabelStyle="margin-left: 8px;"
                name="run-asynchronous"
                :placeholder="tr('approve-publication-qu')"
                :trueValue="true"
                :defaultValue="false"
                :reverseLayout="true"
                :value="entity?.publishApproved"
                @input="setEntityProp({ key: 'publishApproved', value: $event })"
            />

        </e-row>

        <e-row>

            <EFormInput
                class="mt-4"
                :inlineOver="false"
                :hasError="!entity?.publishApproved"
                :placeholder="tr('type-yes-to-confirm')"
                v-model="confirmText"
            />

        </e-row>

    </a-col>

</EModal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	computed: {
        ...mapState('admin/store', ['entity', 'isEdit', 'isDoingRequest']),

        valid() {
            return this.confirmText.toLowerCase() == 'yes' && this.entity?.publishApproved;
        },
    },
	data() {
        return {
            onCompleteCb: undefined,
            confirmText: '',
        }
    },
	methods: {
        show(entity, successCb) {
            if (successCb) this.onCompleteCb = successCb;
            this.setNewEditEntity(entity);
            this.$refs['modal'].show();
        },
		...mapMutations({
			setNewEditEntity: 'admin/store/setNewEditEntity',
            setEntityProp: 'admin/store/setEntityProp',
		}),
	},
};

</script>