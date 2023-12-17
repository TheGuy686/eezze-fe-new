<style lang="less" scoped>
.root-color-picker {
    .preview {
        padding-top: 4px;
        height: 40px;
    }

    .color-border {
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
}
</style>

<template>
<e-row clss="root-color-picker" jc="c">

    <e-row clss="preview" w-80 bev-cont ai="c">

        <span>

            {{ lbe }}

        </span>

    </e-row>

    <e-col w-20 :center="true">

        <div class="color-border">

            <verte
                picker="square"
                :model="mode"
                :value="value"
                :rgbSliders="true"
                @input="setValue($event)"
            />

        </div>

    </e-col>

</e-row>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
        },
        dbounce: {
            type: Number,
            default: 200,
        },
        value: {
            type: String,
            required: true,
        }
    },
    computed: {
        lbe() {
            if (!this.value || this.value == '' && this.placeholder) return this.placeholder;

            return `${this.tr('color')}: ${this.value}`;
        }
    },
    watch: {
        value(to) {
            this.setMode();
        },
    },
    data() {
        return { mode: 'hex', debounceTmr: null }
    },
    beforeMount() {
        this.setMode();
    },
    methods: {
        setValue(value) {
            if (this.debounceTmr) clearTimeout(this.debounceTmr);

            this.debounceTmr = setTimeout(() => this.$emit('input', value), this.dbounce);
        },
        setMode() {
            if (/^rgb/.test(this.value)) this.mode = 'rgb';
            else if (/^hsl/.test(this.value)) this.mode = 'hsl';
            else this.mode =  'hex';
        }
    }
}
</script>
