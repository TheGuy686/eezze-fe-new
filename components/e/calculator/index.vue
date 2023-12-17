<style lang="less" scoped>
.calculator-root {
    .add-var-btn {
        position: absolute;
        right: 5px;
        top: 5px;
    }

    .cal-content {
        display: flex;
        flex-direction: column;

        .result-preview {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 15px;
            padding-right: 15px;
            height: 70px;
            border-radius: 5px;
            margin-bottom: 5px;
            border: solid 1px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            margin-bottom: 5px;

            .title {
                font-size: 18px;
            }
        }

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

            .number-left {
                display: flex;
                justify-content: end;
                align-items: flex-end;
                flex-wrap: wrap;
                max-width: 100%;
            }

            .number-indicator {
                width: 5px;
                display: flex;
                justify-content: end;
                align-items: flex-end;
                position: absolute;
                right: 12px;
            }
        }

        .number-section {
            flex: 8;
            border: solid 1px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            padding: 15px;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            flex-wrap: wrap;
            flex: 2;

            .button-item {
                border: solid 1px rgba(0, 0, 0, 0.2);
                border-radius: 5px;
                width: 23%;
                display: flex;
                margin-bottom: 5px;
                padding-top: 10px;
                padding-bottom: 10px;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                &:hover {
                    cursor: pointer;
                    font-weight: bold;
                    border: solid 1px var(--primary-blue);
                }
            }

            .no-border {
                border: solid 1px transparent !important;

                &:hover {
                    cursor: default !important;
                }
            }
        }
    }
}
</style>

<template>
<a-col
    class="calculator-root"
    :span="span"
    :style="stle"
    v-click-outside-element="outfocused"
    @click="focused()"
>

    <div class="cal-content">

        <div class="result-preview">

            <span class="title">{{ tr('sample-result') }}: {{ resultPreview }}</span>

        </div>

        <div class="preview" :style="previewStyle + (inFocus ? 'border: red 1px solid !important;' : '')">

            <a-button class="add-var-btn" type="primary" shape="circle" size="small" @click="addVar">

                <GeneralIcon type="plus-white" />

            </a-button>

            <div class="number-left" non-sel v-html="spanPreview"></div>

            <div class="number-indicator" non-sel>

                {{ indicator }}

            </div>

        </div>

        <div class="number-section">

            <template v-for="btn in btnOrder">

                <div 
                    :class="'button-item ' + (buttons[btn].id == '' ? 'no-border' : '')" 
                    non-sel 
                    :key="buttons[btn].id" 
                    @click="handleClick(buttons[btn])"
                    v-if="buttons[btn].id != ''"
                >

                    {{ buttons[btn].label }}

                </div>

            </template>

        </div>

    </div>

</a-col>
</template>

<script>
import { randDarkColor } from '~/classes/globals';
export default {
    props: {
        id: {
            type: String,
        },
        stle: String,
        previewStyle: {
            type: String,
        },
        span: {
            type: String | Number,
            default: 12,
        },
        hoveringItem: {
            type: String | Number,
            require: true,
        },
        value: {
            type: Object,
            require: true,
        },
        isVisible: {
            type: Boolean,
            require: true,
        },
    },
    computed: {
        varVal() {return (this?.raw ?? '').replace(/\$\{[0-9]\}/g, 'v')},
        spanPreview() {
            try {
                let str = (this?.prettyPreview ?? '').replace(/(\$\{\d+\}|[\d/+()%*v-x])/g, '<span>$1</span>');

                for (let k in this.vars) {
                    const v = this.vars[k];

                    if (this.hoveringItem == v.pos) {
                        str = str.replace(`<span>\${${v.pos}}</span>`, `<span style="color: white; background-color: ${v.color};">\${${v.pos}}</span>`);
                    }
                    else {
                        str = str.replace(`<span>\${${v.pos}}</span>`, `<span style="color: ${v.color};">\${${v.pos}}</span>`);
                    }
                }

                return str;
            }
            catch (err) {
                console.log('spanPreview.error: ', err);
                return '';
            }
        },
        indicator() {
            if (this.counter == 1) {
                setTimeout(() => this.counter = 0, 500);
                return '';
            }

            return '|';
        },
        resultPreview() {
            try {
                let str = this?.raw ?? '';

                for (let v of Object.values(this.vars)) {
                    str = str.replace(`\${${v.pos}\}`, v.example);
                }

                return eval(str);
            }
            catch (err) {
                //console.log('Calculator.Result preview: ', err, this.raw);
                return '';
            }
        },
        vars() {
            let out = {}, counter = 1;

            const currentVars = this.value?.variables ?? [], hasItems = Object.keys(currentVars).length > 0;

            for (let l of this.varVal) {
                if (l != 'v') continue;

                let existingItem = hasItems ? currentVars[`v${counter}`] : {};

                out[`v${counter}`] = {
                    pos: counter,
                    color: existingItem?.color ?? randDarkColor(),
                    alias: existingItem?.alias ?? `\$\{${Object.keys(out).length + 1}\}`,
                    value: existingItem?.value ?? '',
                    example: existingItem?.example ?? getRandomInt(1, 10),
                };

                counter++;
            }

            return out;
        },
        valueMdl() {
            return {
                subtype: 'calculation',
                formula: this.raw,
                raw: this.raw,
                resultPreview: this.resultPreview,
                variables: this.vars,
                spanPreview: this.spanPreview,
                prop: this.value?.prop,
            };
        },
        validKeys() {
            let out = [];
            
            for (let btn of Object.values(this.buttons)) {
                if (!btn.keyId) continue;

                if (typeof btn.keyId == 'string') {
                    out.push(btn.keyId);
                    continue;
                }

                out = [...out, ...btn.keyId];
            }

            return out;
        }
    },
    watch: {
        inFocus(to) {
            if (!to) this.removeWindowEvents();
            else this.setWindowEvent();
        },
        value(to) {
            if (this.raw == to.raw) return;

            this.raw = to?.raw ?? '';
            this.convertToPrettyPreview();
        }
    },
    data() {
        return {
            tmr: null,
            counter: 0,
            raw: '',
            prettyPreview: '',
            inFocus: false,
            btnOrder: [
                'ac',
                'Delete',
                '%',
                '/',
                '7',
                '8',
                '9',
                '*',
                '4',
                '5',
                '6',
                '-',
                '1',
                '2',
                '3',
                '+',
                '00',
                '0',
                'e1',
                '(',
                ')',
            ],
            buttons: {
                ac: {
                    id: 'ac',
                    label: 'AC'
                },
                Delete: {
                    id: 'del',
                    keyId: ['Backspace', 'Delete'],
                    label: 'DEL'
                },
                Backspace: {
                    id: 'backspace',
                    keyId: ['Backspace', 'Delete'],
                    label: 'DEL'
                },
                '%': {
                    id: 'percent',
                    keyId: '%',
                    opKey: '%',
                    label: '%'
                },
                '/': {
                    id: 'divide',
                    keyId: '/',
                    opKey: '/',
                    label: '÷'
                },
                7: {
                    id: 'seven',
                    keyId: '7',
                    opKey: '7',
                    label: '7'
                },
                8: {
                    id: 'eight',
                    keyId: '8',
                    opKey: '8',
                    label: '8'
                },
                9: {
                    id: 'nine',
                    keyId: '9',
                    opKey: '9',
                    label: '9'
                },
                '*': {
                    id: 'multiply',
                    keyId: '*',
                    opKey: '*',
                    label: 'x'
                },
                4: {
                    id: 'four',
                    keyId: '4',
                    opKey: '4',
                    label: '4'
                },
                5: {
                    id: 'five',
                    keyId: '5',
                    opKey: '5',
                    label: '5'
                },
                6: {
                    id: 'six',
                    keyId: '6',
                    opKey: '6',
                    label: '6'
                },
                '-': {
                    id: 'subtract',
                    keyId: '-',
                    opKey: '-',
                    label: '-'
                },
                1: {
                    id: 'one',
                    keyId: '1',
                    opKey: '1',
                    label: '1'
                },
                2: {
                    id: 'two',
                    keyId: '2',
                    opKey: '2',
                    label: '2'
                },
                3: {
                    id: 'three',
                    keyId: '3',
                    opKey: '3',
                    label: '3'
                },
                '+': {
                    id: 'addition',
                    keyId: '+',
                    opKey: '+',
                    label: '+'
                },
                '00': {
                    id: 'double-zero',
                    opKey: '00',
                    label: '00'
                },
                0: {
                    id: 'zero',
                    keyId: '0',
                    opKey: '0',
                    label: '0'
                },
                'e1': {
                    id: '',
                    keyId: '--',
                    label: ''
                },
                '(': {
                    id: 'left-bractet',
                    keyId: '(',
                    opKey: '(',
                    label: '('
                },
                ')': {
                    id: 'right-bractet',
                    keyId: ')',
                    opKey: ')',
                    label: ')'
                },
                // '=': {
                //     id: 'equals',
                //     keyId: ['Enter', '='],
                //     label: '='
                // },
                Enter: {
                    id: 'enter',
                    keyId: ['Enter', '='],
                    label: '='
                },
            }
        }
    },
    beforeMount() {this.setWindowEvent()},
    beforeDestroy() {this.removeWindowEvents()},
    mounted() {
        this.raw = this.value?.raw ?? '';
        this.resetTmr();

        this.convertToPrettyPreview();
    },
    methods: {
        focused() {
            if (this.inFocus) return;

            this.inFocus = true;
        },
        outfocused() {
            if (!this.inFocus) return;

            this.inFocus = false;
        },
        addVar() {
            let vlen = Object.keys(this.vars).length + 1;
            
            this.raw += `$\{${vlen}}`;
            this.prettyPreview += `$\{${vlen}}`;

            this.$emit('about-to-add-var');
            this.$emit('input', this.valueMdl);
        },
        setWindowEvent() {
            this.removeWindowEvents();
            window.addEventListener('keydown', this.handleKeyPress);
        },
        removeWindowEvents() {
            window.removeEventListener('keydown', this.handleKeyPress);
        },
        resetTmr() {this.tmr = setInterval(() => this.counter = 1, 1000)},
        resetWindowEvents() {
            this.removeWindowEvents();
            this.setWindowEvent();
        },
        reset(item) {
            clearInterval(this.tmr);
            
            this.resetWindowEvents();
        },
        handleKeyPress(e) {
            if (!this.validKeys.includes(e.key)) return;

            this.handleClick(this.buttons[e.key]);
        },
        convertToPrettyPreview() {
            let counter = 1, str = '';

            for (let char of this.varVal) {
                if (char == 'v') {
                    str += `\${${counter}}`;
                    counter++;
                    continue;
                }

                str += `${this.buttons[char].label}`;
            }

            this.prettyPreview = str;
        },
        clearCalulator(emitEvent = true) {
            const prop = this.value?.prop;

            this.raw = ''; 
            this.prettyPreview = '';

            if (prop != '') {
                this.value.prop = prop;
            }

            this.value.variables = [];

            this.$emit('input', this.valueMdl);

            if (emitEvent) this.$emit('calculator-cleared');
        },
        handleClick(action) {
            if (action.id == '') return;

            try {
                switch (action.id) {
                    case 'ac':
                        this.clearCalulator();

                        return;

                    case 'del':
                    case 'backspace':

                        const regex = /\${[0-9]+}$/;

                        if (regex.test(this.raw)) {
                            this.raw = (this?.raw ?? '').replace(regex, '');
                            this.prettyPreview = (this?.prettyPreview ?? '').replace(regex, '');
                        }
                        else {
                            this.raw = `${this.raw.substr(0, this.raw.length - 1)}`;
                            this.prettyPreview = `${this.prettyPreview.substr(0, this.prettyPreview.length - 1)}`;
                        }

                        this.$emit('input', this.valueMdl);

                        return;

                    case 'addition':
                    case 'subtract':
                    case 'multiply':
                    case 'divide':
                    case 'percent':
                        // this is because logical operators cannot be the first char
                        if (this.value == '') return;

                        const opOperators = ['-', '+', '*', '/', '%'];
                        
                        const val = this.raw;
                        const lastChar = val.substr(val.length - 1);
                        
                        if (lastChar == action.opKey || opOperators.includes(lastChar)) {
                            console.log('avoided chatr: ', lastChar);
                            return;
                        }

                        this.raw = `${this.raw}${action.opKey}`;
                        this.prettyPreview = `${this.prettyPreview}${action.label}`;

                        this.$emit('input', this.valueMdl);

                        return;

                    default:
                        this.raw = `${this.raw}${action.opKey}`;
                        this.prettyPreview = `${this.prettyPreview}${action.label}`;

                        this.$emit('input', this.valueMdl);
                }
            }
            catch (err) {
                console.log('Calculator handle click error: ', err);
            }
        }
    }
}
</script>
