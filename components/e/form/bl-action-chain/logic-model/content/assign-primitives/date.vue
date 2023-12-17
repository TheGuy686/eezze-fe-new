<style lang="less" scoped>
.root-date-formatter {
    padding-top: 5px;

    .source-cont {
        display: flex;
        flex-direction: row;
        padding-left: 5px;
        padding-top: 5px;
        align-items: center;
    }
}
</style>

<template>
<div class="root-date-formatter">

    <div bl-bevel-cont>
        
        <span class="title" s-3 non-sel>

            {{ tr('date-source') }}:

        </span>

        <div class="source-cont" s-1>

            <e-col :span="2" :fillParent="false">

                {{ tr('current-date-time') }}

            </e-col>

            <EFormBlActionChainLogicModelContentCDateActionsMenu :item="item" v-model="item.logic.source" />

            <EFormCalendar :stle="{width: '85px', 'margin-left': '5px'}" v-model="item.logic.example" />

        </div>

    </div>

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
    />

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    beforeMount() {
        if (typeof this.item?.logic?.variables != 'object') {
            this.item.logic.variables = [];
        }
    },
    props: {
        item: {
            type: Object,
            require: true,
        },
        previousAssignmentsMenu: {
            type: Object,
            require: true,
        },
    },
    computed: {
        ...mapState('cms/actions/bs-logic', ['standardFormats']),
    },
    data() {
        return {
            hasLoaded: false,
        };
    },
    mounted() {
        setTimeout(() => this.hasLoaded = true, 10);
    },
    methods: {
        handleGeneralFormatOptionSelected(selection) {
            if (!this.hasLoaded) return;

            if (selection?.value == 'custom') {
                if (!(typeof selection.option.example != 'undefined' || selection.option.example != '')) {
                    this.item.logic.example = '';
                }

                this.item.logic.format = selection.value;
                this.item.logic.raw = '';
                this.item.logic.variables = [];
                this.item.logic.opArgs = [];
                this.exampleOverride = '';
                return;
            }

            this.item.logic.format = selection.value;

            if (typeof selection.option.example == 'undefined' || selection.option.example != '') {
                this.item.logic.example = selection.option.example;
            }

            this.item.logic.raw = '';
            this.item.logic.variables = [];
            this.item.logic.opArgs = [];
        }
    }
}
</script>
