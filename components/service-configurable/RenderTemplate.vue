<style lang="less" scoped>
.sc-render-tpl-root {
    .sc-btn-content {
        right: -87.9%;
        top: -57px;
        position: absolute;
    }

    .preview {
        background-color: rgb(251, 251, 251);
    }

    .add-tab-btn {
        position: absolute;
        right: 0;
        top: 0;
    }
}
</style>

<template>
<a-row clss="sc-render-tpl-root">

    <!-- {{ currentTabs }}<br>-->

    <!-- <d :d="entity" /> -->

    <e-col class="pt-5" ai="fe" w-35 bev-cont>

        <a-button
            class="add-tab-btn"
            type="primary"
            shape="circle"
            size="small"
            @click="$refs['add-new-tab-model'].show()"
        >

            <GeneralIcon type="plus-white" />

        </a-button>

        <e-col class="p-5" :center="true" v-if="(currentTabs?.tabs ?? []).length == 0">

            <h3>{{ tr('please-add-a-template-to-proceed') }}</h3>

        </e-col>

        <a-tabs
            hide-add
            type="editable-card"
            v-model="activeKey"
            @edit="onEdit"
            v-else
        >

            <a-tab-pane
                :key="index"
                :tab="template"
                :closable="index > 0"
                v-for="(template, index) in currentTabs.tabs"
            >

                <e-md-editor
                    ref="md-editor"
                    :activeKey="activeKey"
                    :templateFilter="template"
                    :value="entity.metadata"
                    @input="setEntityProp({key: 'metadata', value: $event, src: 'e-md-editor.input'})"
                    @html-changed="counter++"
                />

            </a-tab-pane>

        </a-tabs>

    </e-col>

    <e-col class="p-5 ml-2 preview" w-35 bev-cont>

        <e-col>

            <h2>{{ tr('preview') }}</h2>

        </e-col>

        <div v-html="htmlPreviewOut.html" />

    </e-col>

    <e-col class="pt-5 pb-2 pl-2 pr-2 ml-2" ai="fs" w-30 bev-cont>

        <a-tabs style="width: 100%;" v-model="activeRightTab">

            <a-tab-pane key="template-input" :tab="tr('template-input')">

                <a-radio-group class="mt-2" button-style="solid" v-model="rightTabInnerTab">

                    <a-radio-button value="editor">

                        {{ tr('editor') }}

                    </a-radio-button>

                    <a-radio-button value="raw">

                        {{ tr('raw') }}

                    </a-radio-button>

                </a-radio-group>

                <ServiceConfigurableEditorInput
                    ref="input-editor"
                    :templateFilter="currentFilterName"
                    :metadata="entity.metadata"
                    :tplVars="tplVars"
                    @input="setEntityProp({key: 'metadata', value: $event, src: 'ServiceConfigurableEditorInput.input'})"
                    v-if="rightTabInnerTab == 'editor'"
                />

                <ServiceConfigurableRawInput
                    :templateFilter="currentFilterName"
                    :metadata="entity.metadata"
                    :tplVars="tplVars"
                    @input="setEntityProp({key: 'metadata', value: $event, src: 'ServiceConfigurableRawInput.input'})"
                    v-else
                />

            </a-tab-pane>

            <a-tab-pane key="template-theme" :tab="tr('template-theme')">

                <ServiceConfigurableTemplateTheme
                    :metadata="entity.metadata"
                    :value="entity.metadata?.templateStyles"
                    @input="setEntityProp({key: 'metadata', value: $event, src: 'ServiceConfigurableTemplateTheme.input'})"
                />

            </a-tab-pane>

            <a-tab-pane class="p-5" key="image-gallery" :tab="tr('image-gallery')" force-render>

                {{ tr('feature-coming-soon') }}

            </a-tab-pane>

        </a-tabs>

    </e-col>

    <EModal
        ref="add-new-tab-model"
        :title="tr('add-new-template')"
        @right-btn-clicked="addTemplate()"
    >

        <EFormInput
            name=""
            :inlineOver="true"
            :placeholder="tr('input-a-template-name')"
            addonAfter=".ezt"
            inputCase="kebabCase"
            :value="newTabName.replace('.ezt', '')"
            @input="newTabName = `${$event}.ezt`"
            @enter-pressed="addTemplate()"
        />

    </EModal>

</a-row>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import ServiceConfigurableModel from '~/models/ServiceConfigurableModel';

// https://www.npmjs.com/package/mavon-editor
export default {
	computed: {
        ...mapState('project/service-configurables', [
            'entity', 'isEdit', 'isDoingRequest'
        ]),
        ...mapGetters({
            logicReturnTypes: 'project/entity-presets/logicReturnTypes',
        }),

        currentFilterName() {
            try {
                return (this.currentTabs?.tabs ?? [])[this.activeKey];
            }
            catch (err) { return '' }
        },
        tplVarsMd() {
            try {
                return self?.entity?.metadata?.templateVars ?? {};
            }
            catch (err) { return {}; }
        },
        tplVars() {
            try {
                return self?.tplVarsMd[this.currentFilterName] ?? {};
            }
            catch (err) { return {}; }
        },

        currentTabs() {
            const tpls = this.entity?.metadata?.templates ?? {}, out= [];

            for (let k in tpls) {
                if (!k || k == null) continue;
                out.push(k);
            }

            return {
                itteration: this.counter,
                tabs: out,
            };
        },
        htmlPreviewOut() {
            try {
                return {
                    itteration: this.counter,
                    html: this.$refs['md-editor'][this.activeKey].fullPreview
                };
            }
            catch (err) { return 'error' }
        },
    },
    watch: {
        activeKey(to) {
            setTimeout(() => {
                try {
                    this.counter++;
                    this.$refs['input-editor'].setIntialMdl();
                }
                catch (err) {
                    console.log('Couldnt set the inital mdl: ', err);
                }
            }, 15);
        }
    },
	data() {
        return {
            activeKey: 0,
            // @Ryan
            activeRightTab: 'template-theme',
            rightTabInnerTab: 'editor',
            btnHovered: false,
            newTabName: '',
            counter: 0,
        }
    },
    mounted() {
        this.mdValue = self?.entity?.metadata?.content;
    },
	methods: {
        addTemplate() {
            if (/-\.ezt$/.test(this.newTabName)) {
                this.newTabName = this.newTabName.replace('-.ezt', '.ezt');
            }

            let out = {...JSON.parse(JSON.stringify(this.entity))};

            if (typeof out.metadata?.templates == 'undefined') out.metadata.templates = {};
            if (typeof out.metadata?.templateStyles == 'undefined') out.metadata.templateStyles = {};
            if (typeof out.metadata?.templateVars == 'undefined') out.metadata.templateVars = {};

            out.metadata.templates[this.newTabName] = '';
            out.metadata.templateVars[this.newTabName] = {};
            out.metadata.templateStyles = {...ServiceConfigurableModel.getDefaultStyles()};

            this.setEntityProp({key: 'metadata', value: out.metadata, src: 'RenderTemplate.addTemplate.input' });

            this.counter++;

            this.$refs['add-new-tab-model'].hide();

            this.newTabName = '';
        },
        onEdit(targetKey) {
            let out = {...this.entity};

            delete out.metadata.templates[targetKey];

            this.setEntityProp({key: 'metadata', value: out.metadata, src: 'RenderTemplate.onEdit.input' });

            this.counter++;
        },
		...mapMutations({
            setEntityProp: 'project/service-configurables/setEntityProp',
			setNewEditEntity: 'project/service-configurables/setNewEditEntity'
		}),
	},
};
</script>