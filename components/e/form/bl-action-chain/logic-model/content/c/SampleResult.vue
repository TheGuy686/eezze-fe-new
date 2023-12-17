<style lang="less" scoped>
.result-preview {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 7px;
    padding-bottom: 7px;
    border-radius: 5px;
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin-bottom: 5px;
    width: 100%;

    .title {
        font-size: 14px;
    }
}
</style>

<template>
<div class="result-preview">

    <div
        class="title"
        non-sel
        v-html="`<span non-sel>${title}:</span> <span style='font-weight: 600;'>${resultPreview}</span>`"
    />

</div>
</template>

<script>
export default {
    props: {
        doDebug: {
            type: Boolean,
            default: false,
        },
        hoveringItem: {
            type: String | Number,
        },
        title: {
            type: String,
            default: tr('sample-result')
        },
        value: {
            type: Object,
            require: true,
        },
        overrideOnEmpty: {
            type: Boolean,
            default: false,
        },
        previewOverride: String,
    },
    computed: {
        variables() {
            return this.value?.logic?.variables ?? [];
        },
        resultPreview() {
            try {
                if (typeof this.previewOverride != 'undefined') {
                    if (this.overrideOnEmpty && this.previewOverride == '') {
                        return tr('invalid-sample-preview') + ' 0.5';
                    }
                    else {
                        return this.previewOverride;
                    }
                }
                
                let str = this.value?.logic?.raw, 
                    example = this.value?.logic?.example ?? '',
                    exampleOverride = this.value?.logic?.exampleOverride ?? '';

                if (typeof exampleOverride != 'undefined' && exampleOverride != '') return exampleOverride + ' 1.5';     

                const vars = Object.values(this?.variables ?? []);

                if (vars.length > 0) {
                    for (let o of vars) {
                        const normal = `<span style="color: ${o.color};">${o?.example ?? ''}</span>`;

                        if (this.hoveringItem) {
                            if (this.hoveringItem == o.pos) {
                                str = str.replace(`\${${o.pos}}`, `<span style="background-color: ${o.color}; color: white;">${o?.example ?? ''}</span>`);
                            }
                            else {
                                str = str.replace(`\${${o.pos}}`, normal);
                            }
                        }
                        else {
                            str = str.replace(`\${${o.pos}}`, normal);
                        }
                    }
                }
                
                if (str == '' && example != '') str = example;

                return str != '' ? str : tr('nothing-to-show');
            }
            catch (err) { return '' }
        }
    },
}
</script>
