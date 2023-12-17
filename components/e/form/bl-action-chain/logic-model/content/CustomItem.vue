<style lang="less" scoped>
.custom-code-main-item {
    .cal-column {
        display: flex;
        flex-direction: column;
        padding-top: 5px;
    }
    
    .cal-row {
        display: flex;
        flex-direction: row;
        padding-top: 5px;
    }

    .summary-cont {
        margin-top: 5px;
        padding-top: 5px;
        padding-bottom: 5px;

        .summary-list {
            .span-li {
                padding-left: 10px;
            }
        }
    }

    .errors-cont {
        margin-top: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
}
</style>

<template>
<div class="custom-code-main-item">

    <div :class="isHorizontalLayout ? 'cal-column' : 'cal-row'">

        <EFormBlActionChainLogicModelContentCVariablesMapping
            :title="tr('variable-values')"
            :returnType="item?.returns"
            :isEditable="true"
            mode="md"
            :resetType="item?.type"
            :showHeader="true"
            :resetSubType="item?.logic?.subtype"
            :item="item"
            :valuePreviewTile="tr('formula')"
            :valuePreview="item?.logic?.formula"
            :clearRawOnClear="false"
            :fillParent="false"
            @hovering-item-changed="itemHovered($event)"
            @mdl-cleared="clearOutVarsFromCode()"
            v-if="!isHorizontalLayout"
        />

        <EEditor
            :minLines="25"
            :width="400"
            :value="item?.logic?.raw"
            @input="item.logic.raw = $event"
            @add-btn-clicked="addClicked()"
        />

    </div>

</div>
</template>

<script>
import { randDarkColor } from '~/classes/globals';

export default {
    props: {
        filterId: {
            type: String,
            require: true,
        },
        item: {
            type: Object,
            require: true,
        },
        logicTypes: {
            type: Array,
            require: true,
        },
        isHorizontalLayout: {
            type: Boolean,
        },
        hoveringItem: String | Number,
        previousAssignmentsMenu: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        code() {
            try {
                return this.item?.logic?.raw ?? '';
            }
            catch (err)  { return '' }
        },
        consts() {
            const vars = {assigned: {}, unassigned: {}, stats: {}};

            try {
                const code = this.code.replaceAll('\`', '`').replaceAll(/,[ ]+?\n/g, ', ');

                const matches = code.match(/(const[\s]+(.*))/gmi) ?? [];

                for (let m of matches) {
                    let l = m.replaceAll(/[ ]+/g, ' ')
                            .replace(/([a-zA-Z0-9]+)[\s|]+=[\s|]+(['|"|`]+)/, '$1 = $2')
                            .replace(/([a-zA-Z0-9]+)=(['|"|`]+)/, '$1 = $2')
                            .replace(/;$/, '');

                    const assignment  = l.match(/const (.*?) = (["|'|`]{1}.*?["|'|`]{1})/),
                        nonAssigned = l.match(/const ([a-zA-Z0-9_]+)/);

                    let val = {};

                    // normla assignments
                    if (assignment) {
                        const name = assignment[1];

                        val['name'] = name;
                        val['assigned'] = true;
                        val['value'] = assignment[2];

                        vars.assigned[name] = val;
                    }
                    // multi line or comma assignments
                    else if (nonAssigned && /const[ ]+([a-zA-Z0-9, ]+)/.test(l)) {
                        const vars = l.replace(/^const /, '').split(',');

                        for (let name of vars) {
                            name = name.trim();

                            const ckReg = `(${name}[\\s|!]+)=[\\s|!]+(['|"|\`].*?['|"|\`])`;
                            const assignCheck = code.match(new RegExp(ckReg));

                            if (assignCheck) {
                                val['assigned'] = true;
                                val['value'] = assignCheck[2];

                                vars.assigned[name] = val;
                            }
                            else {
                                val['assigned'] = false;
                                val['value'] = '';

                                vars.unassigned[name] = val;
                            }
                        }

                    }
                    else if (nonAssigned) {
                        const name = nonAssigned[1];
                        const ckReg = `(${name}[\\s|!]+)=[\\s|!]+(['|"|\`].*?['|"|\`])`;
                        const assignCheck = code.match(new RegExp(ckReg));

                        val['name'] = name;

                        if (assignCheck) {
                            val['assigned'] = true;
                            val['value'] = assignCheck[2];

                            vars.assigned[name] = val;
                        }
                        else {
                            val['assigned'] = false;
                            val['value'] = '';
                            vars.unassigned[name] = val;
                        }
                    }
                    else {
                        console.log('Crap: ', matches);
                    }
                }

                vars.stats.assigned = Object.keys(vars.assigned).length;
                vars.stats.unassigned = Object.keys(vars.unassigned).length;
            }
            catch (err) {}

            return vars;
        },
        lets() {
            const vars = {assigned: {}, unassigned: {}, stats: {}};

            try {
                const code = this.code.replaceAll('\`', '`').replaceAll(/,[ ]+?\n/g, ', ');

                const matches = code.match(/(let[\s]+(.*))/gmi) ?? [];

                for (let m of matches) {
                    let l = m.replaceAll(/[ ]+/g, ' ')
                            .replace(/([a-zA-Z0-9]+)[\s|]+=[\s|]+(['|"|`]+)/, '$1 = $2')
                            .replace(/([a-zA-Z0-9]+)=(['|"|`]+)/, '$1 = $2')
                            .replace(/;$/, '');

                    const assignment  = l.match(/let (.*?) = (["|'|`]{1}.*?["|'|`]{1})/),
                        nonAssigned = l.match(/let ([a-zA-Z0-9_]+)/);

                    let val = {};

                    // normla assignments
                    if (assignment) {
                        const name = assignment[1];

                        val['name'] = name;
                        val['assigned'] = true;
                        val['value'] = assignment[2];

                        vars.assigned[name] = val;
                    }
                    // multi line or comma assignments
                    else if (nonAssigned && /let[ ]+([a-zA-Z0-9, ]+)/.test(l)) {
                        const vss = l.replace(/^let /, '').split(',');

                        for (let name of vss) {
                            name = name.trim();

                            const ckReg = `(${name}[\\s|!]+)=[\\s|!]+(['|"|\`].*?['|"|\`])`;
                            const assignCheck = code.match(new RegExp(ckReg));

                            if (assignCheck) {
                                val['assigned'] = true;
                                val['value'] = assignCheck[2];

                                vars.assigned[name] = val;
                            }
                            else {
                                val['assigned'] = false;
                                val['value'] = '';

                                vars.unassigned[name] = val;
                            }
                        }

                    }
                    else if (nonAssigned) {
                        const name = nonAssigned[1];
                        const ckReg = `(${name}[\\s|!]+)=[\\s|!]+(['|"|\`].*?['|"|\`])`;
                        const assignCheck = code.match(new RegExp(ckReg));

                        val['name'] = name;

                        if (assignCheck) {
                            val['assigned'] = true;
                            val['value'] = assignCheck[2];

                            vars.assigned[name] = val;
                        }
                        else {
                            val['assigned'] = false;
                            val['value'] = '';
                            vars.unassigned[name] = val;
                        }
                    }
                    else {
                        console.log('Crap: ', matches);
                    }
                }

                vars.stats.assigned = Object.keys(vars.assigned).length;
                vars.stats.unassigned = Object.keys(vars.unassigned).length;
            }
            catch (err) {}

            return vars;
        },
        vars() {
            const vs = {assigned: {}, unassigned: {}, stats: {}};

            try {
                const code = this.code.replaceAll('\`', '`').replaceAll(/,[ ]+?\n/g, ', ');

                const matches = code.match(/(var[\s]+(.*))/gmi) ?? [];

                for (let m of matches) {
                    let l = m.replaceAll(/[ ]+/g, ' ')
                            .replace(/([a-zA-Z0-9]+)[\s|]+=[\s|]+(['|"|`]+)/, '$1 = $2')
                            .replace(/([a-zA-Z0-9]+)=(['|"|`]+)/, '$1 = $2')
                            .replace(/;$/, '');

                    const assignment  = l.match(/var (.*?) = (["|'|`]{1}.*?["|'|`]{1})/),
                        nonAssigned = l.match(/var ([a-zA-Z0-9_]+)/);

                    let val = {};

                    // normla assignments
                    if (assignment) {
                        const name = assignment[1];

                        val['name'] = name;
                        val['assigned'] = true;
                        val['value'] = assignment[2];

                        vs.assigned[name] = val;
                    }
                    // multi line or comma assignments
                    else if (nonAssigned && /var[ ]+([a-zA-Z0-9, ]+)/.test(l)) {
                        const vars = l.replace(/^var /, '').split(',');

                        for (let name of vars) {
                            name = name.trim();

                            const ckReg = `(${name}[\\s|!]+)=[\\s|!]+(['|"|\`].*?['|"|\`])`;
                            const assignCheck = code.match(new RegExp(ckReg));

                            if (assignCheck) {
                                val['assigned'] = true;
                                val['value'] = assignCheck[2];

                                vars.assigned[name] = val;
                            }
                            else {
                                val['assigned'] = false;
                                val['value'] = '';

                                vs.unassigned[name] = val;
                            }
                        }

                    }
                    else if (nonAssigned) {
                        const name = nonAssigned[1];
                        const ckReg = `(${name}[\\s|!]+)=[\\s|!]+(['|"|\`].*?['|"|\`])`;
                        const assignCheck = code.match(new RegExp(ckReg));

                        val['name'] = name;

                        if (assignCheck) {
                            val['assigned'] = true;
                            val['value'] = assignCheck[2];

                            vs.assigned[name] = val;
                        }
                        else {
                            val['assigned'] = false;
                            val['value'] = '';
                            vs.unassigned[name] = val;
                        }
                    }
                    else {
                        console.log('Crap Var: ', matches);
                    }
                }

                vs.stats.assigned = Object.keys(vs.assigned).length;
                vs.stats.unassigned = Object.keys(vs.unassigned).length;
            }
            catch (err) {}

            return vs;
        },
        summary() {
            return {
                consts: this.consts.stats,
                lets: this.lets.stats,
                vars: this.vars.stats,
            };
        },
        errors() {
            const errors = [], 
                  returnVal = this.getReturnValue();

            if (!(!!returnVal)) {
                errors.push({ title: 'Code has no return value' });
            }

            return errors;
        }
    },
    data() {
        return {
            hoveringItemI: '',
        }
    },
    methods: {
        itemHovered(id) {
            if (typeof this.hoveringItem == 'string') {
                this.$emit('hovering-item-changed', id);
                return;
            }

            this.hoveringItemI = id;
        },
        getReturnValue() {
            const matches = this.code.match(/return (['"0-9a-zA-Z_]+)[;!]?/);
            return matches?.[1];
        },
        clearCode() {
            this.item.logic.raw = '';
            this.item.logic.variables = [];
        },
        addClicked() {
            if (!Array.isArray(this.item?.logic?.variables)) {
                this.item.logic.variables = [];
            }

            const pos = this.item.logic.variables.length + 1;

            this.item.logic.variables.push({
                id: `arg-${pos}`,
                pos: pos,
                color: randDarkColor(),
                value: '',
                example: '',
            });
            this.item.logic.raw += `\${${pos}}`;
        },
        clearOutVarsFromCode() {
            this.item.logic.raw = this.item.logic.raw.replace(/\$\{[0-9]+\}/g, '');
        },
    }
}
</script>