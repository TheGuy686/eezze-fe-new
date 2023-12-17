<template>
<a-popover :placement="placement" trigger="click" v-model="isVisible">

    <a-button class="add-var-btn" :type="!hasValue ? 'secondary' : 'primary'" shape="circle" size="small">

        <GeneralIcon :type="!hasValue ? 'sliders-blue' : 'sliders-white'" />

    </a-button>

    <template #title>

          <span>{{ tr('date-formats') }} {{ isVisible }}</span>

    </template>

    <template #content>

        <EFormSelect
            :key="key"
            eStyle="min-width: 120px;"
            :name="tr(key)"
            :highlightOnHasValue="true"
            :inlineOver="false"
            :placeholder="tr('select-a-format')"
            keyProp="format"
            valueProp="format"
            :options="item.options"
            :toolTipText="item.help"
            @input="dateFormatterChanged(key, $event, item)"
            @option-selected="optionSelected"
            :labelFormatter="(val, obj) => `${val} (e.g: ${obj.example})`"
            :value="mdl(key)"
            v-for="(item, key) in momentFormats"
        />


    </template>

</a-popover>

</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        placement: {
            type: String,
            default: 'rightTop'
        },
        value: Object,
    },
    watch: {
        isVisible() {
            this.setMdlVal();
        }
    },
    computed: {
        ...mapState('cms/actions/bs-logic', ['momentFormats']),
        hasValue() {
            let hasVal = false;

            if (typeof this.value == 'object') {
                if (typeof this.value?.group !== 'undefined' && typeof this.value?.value != 'undefined') {
                    hasVal = true;
                }
            }

            return hasVal;
        },
        mdl() {
            return function (key) {
                if (typeof this.mdls[key] == 'undefined') {
                    this.mdls[key] = '';
                }

                return this.mdls[key];
            }
        },
    },
    data() {
        return {
            isVisible: false,
            mdls: {},
        }
    },
    mounted() {
        this.setMdlVal();
    },
    methods: {
        setMdlVal() {
            if (typeof this?.value?.group != 'undefined') {
                this.mdls[this.value.group] = this.value.value;
            }
            else {
                this.mdls = {};
            }
        },
        dateFormatterChanged(group, format, option) {
            if (format == undefined) return;

            this.mdls = {};
            this.mdls[group] = format;

            this.$emit('input', { group: group, value: format });
        },
        optionSelected(option) {
            this.$emit('set-example', (option.option?.example ?? ''));
        }
    }
}
</script>
