<style lang="less" scoped>
.assign-custom-root {
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
<e-col clss="assign-custom-root">

    <EEditor
        :condense="condense"
        :showNewBtn="showNewBtn"
        :width="320"
        height="400" 
        :value="item?.logic?.raw"
        @input="item.logic.raw = $event"
    />

    <e-col clss="summary-cont" :center="false" bev-cont>

        <e-row>

            <h3>{{ tr('summary') }}</h3>

        </e-row>

        <e-col class="summary-list">

            <a-list size="small" bordered>

                <a-list-item :key="ind" v-for="(item, ind) in summary">

                    <e-col>

                        <h3>{{ tr(ind) }}</h3>

                        <span class="span-li">

                            - {{ tr('assigned') }}: {{ item.assigned }}

                        </span>

                        <span class="span-li">

                            - {{ tr('unassigned') }}: {{ item.unassigned }}

                        </span>

                    </e-col>

                </a-list-item>

            </a-list>

        </e-col>

    </e-col>

    <e-col clss="errors-cont" :fillParent="true" :center="false" bev-cont>

        <e-row>

            <h3>{{ tr('errors') }}</h3>

        </e-row>

        <e-row>

            <a-list size="small" style="width: 100%;" bordered v-if="errors.length > 0">

                <a-list-item :key="ind" v-for="(err, ind) in errors">

                    {{ err.title }}

                </a-list-item>

            </a-list>

            <span v-else>{{ tr('no-items-to-show') }}</span>

        </e-row>

    </e-col>

    <!-- <div style="height: 200px; width: 100%;"></div> -->

</e-col>
</template>

<script>
import { randDarkColor } from '~/classes/globals';
export default {
    props: {
        item: {
            type: Object,
            require: true,
        },
        condense: {
            type: Boolean,
            default: false,
        },
        showNewBtn: {
            type: Boolean,
            default: true,
        }
    },
    computed: {
        code() {
            return this.item?.logic?.raw ?? '';
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
    methods: {
        getReturnValue() {
            const matches = this.code.match(/return (['"0-9a-zA-Z_]+)[;!]?/);
            return matches?.[1];
        },
        clearCode() {
            this.item.logic.raw = '';
            this.item.logic.variables = [];
        },
        addClicked() {
            this.$emit('about-to-add-var');
            this.item.logic.variables.push({
                id: `arg-${this.item.logic.variables.length}`,
                pos: this.item.logic.variables.length,
                color: randDarkColor(),
                value: '',
                example: ''
            });
            this.item.logic.raw += `\${${this.item.logic.variables.length}}`;
        }
    }
}
</script>
