<style scoped>
.root-string-interperlate {
    padding-top: 5px;
}
</style>

<template>
<div class="root-string-interperlate">

    <EFormInterperlateInput 
        ref="input" 
        :returnType="returnType"
        :variables="item?.logic?.variables"
        v-model="item.logic.raw"
        @about-to-add-var="$emit('about-to-add-var')"
    />

    <EFormBlActionChainLogicModelContentCSampleResult
        :title="tr('sample-date')"
        :hoveringItem="hoveringItem"
        :value="item"
        v-if="!hideSampleOutput"
    />

</div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            require: true,
        },
        returnType: {
            type: String,
            default: 'text'
        },
        doOutputPreview: {
            type: Boolean,
            default: false,
        },
        hoveringItem: {
            type: String | Number,
            require: true,
        },
        hideSampleOutput: {
            type: Boolean,
            default: false,
        }
    },
    watch: {
        itemWatch(to) {
            let raw = this.item.logic.raw;

            for (const v of this.item?.logic?.variables ?? []) {
                raw = raw.replace(`\${${v.pos}}`, v.example);
            }

            this.item.logic.formula = raw;
        },
    },
    computed: {
        itemWatch() {
            try {
                return JSON.stringify(this?.item?.logic);
            }
            catch (err) { return {} }
        },
    },
    data() {
        return {
            code: '',
        };
    },
}
</script>
