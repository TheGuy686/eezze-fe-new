<style lang="less" scoped>
.service-configs-root {
    overflow: hidden !important;

    .sc-btn-content {
        top: -57px;
        position: absolute;
    }
}
</style>

<template>
<EModalFull
    ref="modal"
    clss="service-configs-root"
    style="overflow: hidden !important;"
    stle="overflow: hidden !important;"
    :closable="false"
    :title="tr((isEdit ? 'edit' : 'create') + '-service-configurable')"
    :isLoading="isDoingRequest"
    :showBackBtn="tabIndex > 0"
    @modal-closed="tabIndex = 0"
    @back-btn-clicked="tabIndex--"
>
    <e-col>

        <e-row class="sc-btn-content" jc="fe">

            <div style="margin-top: -24px;">

                <a-button
                    size="large"
                    class="inline bg-success float-right text-white ml-5"
                    :disabled="tabIndex == 1 && (entity?.type == '' || !entity?.type)"
                    @click="rightBtnClicked()"
                >

                    {{ tr(tabIndex > 1 ? 'submit' : 'next') }}

                </a-button>

                <a-button size="large" class="inline float-right" @click="$refs['modal'].hide()">

                    {{ tr('close') }}

                </a-button>

            </div>

        </e-row>

        <a-col v-if="tabIndex == 0">

            <ServiceConfigurableFormContent />

        </a-col>

        <a-col v-if="tabIndex == 1">

            <GeneralBeveledGrid>

                <GeneralBeveledGridItem
                    :id="item.key"
                    :title="item.name"
                    :key="index"
                    :value="entity?.type ? [ entity?.type ] : []"
                    @input="setEntityProp({key: 'type', value: $event[0]})"
                    v-for="(item, index) in serviceConfigurableTypes"
                />

            </GeneralBeveledGrid>

        </a-col>

        <ServiceConfigurableRenderTemplate
            ref="render-tpl"
            v-if="tabIndex == 2"
        />

    </e-col>

</EModalFull>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

// https://www.npmjs.com/package/mavon-editor
export default {
	computed: {
        ...mapState('app', [ 'serviceConfigurableTypes' ]),
        ...mapState('project/service-configurables', [
            'entity', 'isEdit', 'isDoingRequest'
        ]),
    },
	data() {
        return {
            onCompleteCb: undefined,
            tabIndex: 0,
        }
    },
	methods: {
        resetDefaults() {
            this.tabIndex = 0;
        },
        show(entity, successCb) {
            if (successCb) this.onCompleteCb = successCb;

            if (typeof entity == 'object') {
                this.tabIndex = 2;
            }

            this.setNewEditEntity(entity);
            this.$refs['modal'].show();
        },
        rightBtnClicked() {
            if (this.tabIndex == 1) {
                if (!this.isEdit) {
                    this.setEntityProp({key: 'enabled', value: true});
                    this.setEntityProp({key: 'metadata', value: {}, src: 'rightBtnClicked.if' });
                }
            }
            else if (this.tabIndex > 1) {
                this.$store.dispatch(
                    'project/service-configurables/createEditEntity',
                    {
                        hideModal: (entity) => {
                            if (typeof this.onCompleteCb == 'function') {
                                this.onCompleteCb(entity.key);
                                this.onCompleteCb = undefined;
                            }

                            this.$refs['modal'].hide();

                            this.os(() => {
                                this.$notification.success({
                                    placement: 'topRight',
                                    message: this.tr('operation-successful'),
                                    description: this.tr('entity-operation-was-successful'),
                                });
                            },
                            300);
                        },
                        projectId: this.currentProject,
                    }
                );
                return;
            }

            this.tabIndex++;
        },
		...mapMutations({
			setNewEditEntity: 'project/service-configurables/setNewEditEntity',
            setEntityProp: 'project/service-configurables/setEntityProp',
		}),
	},
};
</script>