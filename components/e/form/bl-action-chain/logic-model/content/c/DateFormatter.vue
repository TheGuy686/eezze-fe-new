<style lang="less" scoped>
.root-date-formatter {
    padding-top: 5px;

    .source-cont {
        align-items: center;
    }
}
</style>

<template>
<div class="root-date-formatter">

    <e-row :fillParent="true" class="source-cont" jc="sb" bl-bevel-cont>

        {{ tr('date-source') }}:

        <EFormContextMenu
            stle="margin-right: 5px;"
            :inlineOver="true"
            :name="tr('choose-date-source')"
            :additioalTopValues="previousAssignmentsMenu"
            :filter="item.logic.filterId"
            v-model="item.logic.source"
        />

        <EFormBlActionChainLogicModelContentCDateActionsMenu :item="item" v-model="item.logic.source" />

        <EFormCalendar :stle="{ width: '85px', 'margin-left': '5px' }" v-model="item.logic.example" />

    </e-row>

    <a-row bl-bevel-cont>

        <a-col style="width: 43%;" non-sel>

            {{ tr('select-format') }}:

        </a-col>

        <a-row style="width: 62%;">

            <EFormSelect
                eStyle="margin-top: 5px; width: 100%;"
                name="format" 
                :placeholder="tr('select-a-format')"
                keyProp="format"
                valueProp="label"
                :options="standardFormats.options"
                :inlineOver="true"
                v-model="item.logic.format"
                @option-selected="handleGeneralFormatOptionSelected"
            />

        </a-row>

    </a-row>

    <EFormInterperlateInput
        :variables="item?.logic?.variables"
        :disabled="item.logic.format!= 'custom'"
        v-model="item.logic.raw"
        @about-to-add-var="$emit('about-to-add-var')"
    />

    <EFormBlActionChainLogicModelContentCSampleResult
        :title="tr('sample-date')"
        :hoveringItem="hoveringItem"
        :value="item"
    />

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        item: {
            type: Object,
            require: true,
        },
        previousAssignmentsMenu: {
            type: Object,
            require: true,
        },
        hoveringItem: {
            type: String | Number,
            require: true,
        },
    },
    computed: {
        ...mapState('cms/actions/bs-logic', ['standardFormats']),
    },
    data() {
        return {
            hasLoaded: false,
            optionJustChanged: false,
            sampleOverrideMdl: 'RYAN COOKE',
        };
    },
    mounted() {
        setTimeout(() => this.hasLoaded = true, 10);
    },
    methods: {
        handleGeneralFormatOptionSelected(selection) {
            if (!this.hasLoaded) return;
            
            //@Ryan fix hard lock
            if (this.optionJustChanged) {
                console.log('Todo: fix option hard lock');
                this.optionJustChanged = false;
                return;
            }

            if (selection?.value == 'custom') {
                if (!(typeof selection.option.example != 'undefined' || selection.option.example != '')) {
                    this.item.logic.example = '';
                }

                this.item.logic.format = selection.value;
                this.item.logic.raw = '';
                this.item.logic.variables = [];
                this.item.logic.opArgs = [];
                this.exampleOverride = '';
                this.optionJustChanged = true;
                return;
            }

            this.item.logic.format = selection.value;

            if (typeof selection.option.example == 'undefined' || selection.option.example != '') {
                this.item.logic.example = selection.option.example;
            }

            this.item.logic.raw = '';
            this.item.logic.variables = [];
            this.item.logic.opArgs = [];
            this.optionJustChanged = true;
        }
    }
}
</script>
