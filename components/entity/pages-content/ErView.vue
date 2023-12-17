<style lang="less" scoped>

.main-erd-cont {
    /* width: 102%; */

    .no-slide-layout {
        background-color: transparent;

        .erd-iframe {
            width: 100%;
            height: 73vh;
            border: none;
        }
    }

    .advanced-entity-settings-slider {
        background-color: transparent;
        padding: 10px;
    }

    .loader-overlay {
        position: absolute;
        margin-left: 40%;
        margin-top: 300px;
        display: flex;
        font-weight: bold;
    }
}
</style>

<template>
<a-row no-padding class="main-erd-cont">

    <visual-entity-editor
        :devPort="devPort"
        ref="vee"
        :width="mainMenuCollpsed ? 91 : 83"
        :disabled="entityViewIsLocked && !currentlyEditing"
        :value="entity?.initModel ?? []"
        :overlayMessage="overlayMessage"
        @input="sendMdlChangedRequest($event)"
    />

</a-row>
</template>

<script>
// MouseEvent.mozPressure is deprecated. Use PointerEvent.pressure instead.
import { mapMutations, mapState, mapGetters } from 'vuex';

export default {
    props: {
        devPort: String | Number
    },

    beforeDestroy() {
        try {
            this.$refs['vee'].destroyIframeEvents();
        }
        catch (err) {}
        this.events.off('update-datasources-ui');
    },
    computed: {
        ...mapState('app', [ 'mainMenuCollpsed' ]),
        ...mapState('project/data-sources', {
            entity: (state) => state?.entity ?? {},
            datasources: (state) => state?.entities ?? [],
            filterDatasource: (state) => state?.filterDatasource ?? -1,
        }),
        ...mapGetters({
			entityViewIsLocked: 'project/erd/entityViewIsLocked',
            currentlyEditing: 'project/erd/currentlyEditing',
            editingEntitiesMember: 'project/erd/editingEntitiesMember',
		}),
        overlayMessage() {
            return this.tr('currently-editing-entities', { args: [ this.editingEntitiesMember?.email ] });
        },
    },
    data() {
        return { sendTmr: null }
    },
    watch: {
        filterDatasource() {
            this.setDsEntity();
            this.refreshView();
        },
    },
    mounted() {
        setTimeout(() => this.setDsEntity(), 200);

        this.events.on('update-datasources-ui', this.updateDatasourcesUi);
    },
    methods: {
        updateDatasourcesUi() {
            this.setDsEntity();
            this.refreshView();
        },
        refreshView() {
            this.$refs['vee'].refreshData();
        },
        setDsEntity() {
            try {
                const ds = this.datasources.filter((ds) => ds.id == this.filterDatasource)[0];

                this.setNewEditEntity(ds);
            }
            catch (err) {
                console.log(`There was an error setting filtering your DS: "${err.message}"`);
            }
        },
        sendMdlChangedRequest(value) {
            if (this.sendTmr) clearTimeout(this.sendTmr);

            if (!this.entityViewIsLocked || !this.currentlyEditing) {
                this.emitEditingEntities(this.currentProject);
            }

            this.sendTmr = setTimeout(() => {

                this.setEntityProp({ key: 'initModel', value: value });
                this.saveModel();

            }, 2000);
        },
        saveModel() {
            this.$store.dispatch('project/data-sources/updateAllEntities', {
                projectId: this.$route.params?.id,
                successCb: () => {
                    this.$store.dispatch('project/data-sources/getEntities', {
                        projectId: this.$route.params?.id,
                    });
                }
            });
        },
        ...mapMutations({
            setNewEditEntity: 'project/data-sources/setNewEditEntity',
            setEntityProp: 'project/data-sources/setEntityProp',
            emitEditingEntities: 'app/emitEditingEntities',
        }),
    }
};
</script>