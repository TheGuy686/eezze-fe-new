<style lang="less" scoped>
.preview {
    height: 200px !important;
    padding: 15px;
    display: flex;
    justify-content: end;
    align-items: flex-end;
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin-bottom: 5px;
    position: relative;

    .textarea {
        width: 100%;
        height: 100%;
        padding: 5px;
        padding-left: 10px;
        resize: none;
    }

    .add-var-btn {
        position: absolute;
        right: 5px;
        top: 5px;
    }
}
</style>

<template>
<div class="preview" :style="previewStyle" ref="interperlate-input">

    <textarea class="textarea" non-sel :disabled="disabled" v-model="text" @keypress="isNumber($event)"></textarea>

    <a-button class="add-var-btn" type="primary" shape="circle" size="small" :disabled="disabled" @click="addVariable">

        <GeneralIcon type="plus-white" />

    </a-button>

</div>
</template>

<script>
import { getRandomInt, randDarkColor } from '~/classes/globals';
import { generateRandomString } from '~/classes/libs/string';

export default {
    props: {
        previewStyle: String,
        returnType: {
            type: String,
            default: 'text'
        },
        value: {
            type: String,
            require: true,
        },
        variables: {
            type: Array,
            require: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        addVarDefaultValue: String | Number,
        addVarDefaultExample: String | Number,
    },
    watch: {
        text(to, from) {
            if (this.justDeletedVar) {
                this.justDeletedVar = false;
                return;
            }

            if (to != '' && to.length < from.length) {
                const regex = /\${[0-9]+}$/;

                if (regex.test(from)) {
                    this.justDeletedVar = true;
                    to = from.replace(regex, '');
                    this.variables.shift();
                }
            }

            this.$emit('input', to);

            this.text = to;
        },
        value(to) {
            if (to == this.text) return;
            this.text = to;
        }
    },
    data() {
        return {
            text: '',
            justDeletedVar: false,
        };
    },
    mounted() {
        this.text = this.value;
    },
    methods: {
        isNumber: function(evt) {
            if (this.returnType != 'number') return true;

            evt = (evt) ? evt : window.event;

            let charCode = (evt.which) ? evt.which : evt.keyCode;

            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } 
            else return true;
        },

        addVariable() {
            const len = this.variables.length + 1;

            this.text = `${this.text}\${${len}}`;

            this.$emit('about-to-add-var');

            let example = '';

            if (this.addVarDefaultValue) {
                example = this.addVarDefaultValue;
            }
            else if (this.returnType == 'number') {
                example = getRandomInt(1, 100);
            }
            else {
                example = generateRandomString(5);
            }

            this.variables.push({ 
                pos: len,
                id: len,
                color: randDarkColor(),
                format: { group: '', value: '' },
                value: this.addVarDefaultValue ? this.addVarDefaultValue : '',
                example: example,
            });
        }
    }
}
</script>
