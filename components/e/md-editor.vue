<template>
<div>

    <!--

    <e-tag-drop-down
        colorCol="color"
        keyCol="key"
        valueCol="label"
        :maxLength="15"
        :options="logicReturnTypes"
        :placeholder="tr('return-type')"
        v-model="returnType"
    />  -->

    <mavon-editor
        ref="md-editor"
        language="en"
        :toolbars="toolbars"
        defaultOpen="edit"
        :ishljs="true"
        v-model="mdValue"
        @input="setHtmlTmr"
    >

        <template slot="left-toolbar-before">

            <a-popover
                :trigger="highlightInView ? 'click' : 'hover'"
                placement="bottomLeft"
                v-model="highlightInView"
            >

                <a-button class="op-icon fa">

                    <GeneralIcon type="highlight" />

                </a-button>

                <template #content>

                    <div style="width: 250px;">

                        <e-col :fillParent="true">

                            <EFormColorPicker
                                class="mb-3"
                                :placeholder="tr('select-a-font-color')"
                                v-model="textColor"
                            />

                            <EFormColorPicker
                                :placeholder="tr('select-a-bg-color')"
                                v-model="bgColor"
                            />

                            <e-row dir="reverse">

                                <a-button @click="updateInsertTextColor">

                                    {{ tr('set') }}

                                </a-button>

                            </e-row>

                        </e-col>

                    </div>

                </template>

            </a-popover>

            <!-- <button
                class="op-icon fa fa-mavon-align-left"
                aria-hidden="true"
                title="自定义"
                @click="customBtnClicked"
            /> -->

        </template>

    </mavon-editor>

</div>
</template>

<script lang="ts">
import TplRenderer from '~/classes/TplRenderer';
import  ServiceConfigurableModel from '~/models/ServiceConfigurableModel';

export default {
    props: {
        templateFilter: {
            type: String,
            required: true,
        },
        activeKey: Number,
        value: {
            type: Object,
            default: () => ({
                template: '',
                templateStyles: {},
                raw: '',
                md: '',
                html: '',
                templates: {},
                templateVars: {},
            })
        },
    },
    watch: {
        async mdValue(to: string, from: string) {
            let self: any = this;

            if (to == self.template) return;

            self.setHtmlTmr();

            self.updateMdl();
        },
        htmlOutput(to: string) {
            let self: any = this;

            self.updateMdl();

            self.$emit('html-changed', self.decode());
        },
        highlightInView(to: boolean) {
            let self: any = this;

            self.currentSelection = null;

            if (to) {
                self.setDefaultColors();
            }
            else {
                self.textColor = '#000';
                self.bgColor = '#ffffff';
            }
        },
        templateFilter() {
            (this as any).setHtmlTmr();
        },
        activeKey() {
            let self: any = this;

            self.setHtmlTmr();

            self.$emit('html-changed', self.decode());
        },
        fullPreview() {
            (this as any).setHtmlTmr();
        },
        tplVars() {
            (this as any).setHtmlTmr();
        }
    },
    computed: {
        styles() {
            let self: any = this,
                defStls = {...self.defaultStyles};

            try {
                return self.value?.templateStyles ?? defStls;
            }
            catch (err) { return defStls }
        },
        stylesP() {
            let self: any = this,
                out = '<style>',
                stls = self.styles,
                s: any;

            for (s of Object.values(stls)) {
                out += `${s.prefix} {\n`;

                const indent = '    ';

                const sss = (s?.style ?? []);

                for (let k in sss) {
                    out += `${indent}${k}: ${sss[k]};\n`;
                }

                out += `}\n\n`;
            }

            return `${out}\n<\/style>`;
        },
        tplName() {
            let self: any = this;

            try {
                return self?.templateFilter;
            }
            catch (err) {return 'index.ezt' }
        },
        templates() {
            let self: any = this;

            try {
                return self?.value?.templates ?? {};
            }
            catch (err) { return 'index.ezt'; }
        },
        template() {
            let self: any = this;

            try {
                return self?.templates[self.tplName];
            }
            catch (err) {return ''}
        },
        tplVarsMd() {
            let self: any = this;

             try {
                return self?.value?.templateVars ?? {};
            }
            catch (err) { return {}; }
        },
        tplVars() {
            let self: any = this;

            try {
                return self?.tplVarsMd[self.tplName] ?? {};
            }
            catch (err) { return {}; }
        },
        fullPreview() {
            let self: any = this;
            return `${self.stylesP}${self.decode()}`;
        },
        valMdl() {
            let self: any = this;

            const vars = {...self.tplVarsMd};

            vars[self.tplName] = {...self.tplVars};

            let out: any = {
                template: self.tplName,
                templateStyles: {...self?.value?.templateStyles},
                raw: self.mdValue,
                md: self.mdValue,
                html: self.fullPreview,
                templates: {...self.templates},
                templateVars: vars,
            };

            out['templates'][self.tplName] = self.mdValue;

            return out;
        },
    },
    data() {
        return {
            lastSetVal: '',
            mdValue: '',
            htmlOutput: '',
            counter: 0,
            returnType: '',
            mdlJustChanged: false,
            editor: null,
            updateHtmlTmr: null,
            highlightInView: false,
            textColor: '#000',
            bgColor: '',
            toolbars: {
                bold: true,
                italic: true,
                header: true,
                underline: true,
                strikethrough: true,
                mark: true,
                superscript: false,
                subscript: false,
                quote: true,
                ol: true,
                ul: true,
                link: true,
                imagelink: true,
                code: true,
                table: true,
                fullscreen: true,
                readmodel: true,
                htmlcode: true,
                help: true,
                undo: true,
                redo: true,
                trash: true,
                save: false,
                navigation: false,
                alignleft: true,
                aligncenter: true,
                alignright: true,
                preview: false,
                subfield: false,
                toolbarsFlag: false,
            },
            defaultStyles: {...ServiceConfigurableModel.getDefaultStyles()},
            currentSelection: null,
        }
    },
    mounted() {
        let self: any = this;

        self.editor = self.$refs['md-editor'];

        self.mdValue = self.template;
    },
    methods: {
        setHtmlTmr() {
            let self: any = this;

            if (self.updateHtmlTmr) clearTimeout(self.updateHtmlTmr);

            self.updateHtmlTmr = setTimeout(async () => {

                await self.setHtml();

            }, 200);
        },
        updateMdl() {
            let self: any = this;
            self.$emit('input', self.valMdl);
        },
        async setHtml() {
            let self: any = this;

            self.counter++;

            try {
                self.mdlJustChanged = true;

                const cm: any = self.valMdl;

                self.htmlOutput = await TplRenderer.render({
                    templates: {...cm.templates},
                    templateName: cm.template,
                    templateVars: {...self.tplVars},
                    parseToHtml: true,
                    htmlDecode: true,
                });

                setTimeout(() => self.mdlJustChanged = false, 100);
            }
            catch (err) { return '' };
        },
        decode () {
            let txt = document.createElement('textarea');
            txt.innerHTML = (this as any).htmlOutput;
            return txt.value;
        },
        uploadCallback(url: string) {
            console.log("uploaded url", url)
        },
        customBtnClicked() {
            let self: any = this;

            self.mdValue = '';
        },
        getDefaultStyles() {
            return {
                ...(this as any).styles,
            };
        },
        setDefaultColors() {
            let self: any = this;

            self.currentSelection = {};
            self.textColor = '#000';
            self.bgColor = '#ffffff';

            self.currentSelection = self.editor.getCurrentSelection();

            if (self.currentSelection?.type == 'colorText') {
                const bits = self.currentSelection.tag.split(':').filter((b: string) => b != '' && b != '-');

                self.textColor = bits[1];

                if (bits.length == 3) {
                    self.bgColor = bits[2];
                }
                else {
                    self.bgColor = '#ffffff';
                }
            }
        },
        updateInsertTextColor() {
            let self: any = this;

            if (self.currentSelection && self.currentSelection?.type == 'colorText') {
                const i = self.currentSelection;

                const input = `:ct:${self.textColor}${self.bgColor && self.bgColor != '#ffffff' ? `:${self.bgColor}` : ''}:-${i.selection}-:`;

                if (input == self.lastSetVal) return;

                self.mdValue = self.replaceBetween(
                    i.startPos,
                    i.endPos,
                    self.mdValue,
                    input
                );

                self.lastSetVal = input;
            }
            else {
                if (self.textColor && self.bgColor) {
                    return self.editor.wrapCurrentSelection(
                        `:ct:${self.textColor}:${self.bgColor}:-`,
                        '-:'
                    );
                }

                self.editor.wrapCurrentSelection(
                    `:ct:${self.textColor}:-`,
                    '-:'
                );
            }
        },
    },
}
</script>
