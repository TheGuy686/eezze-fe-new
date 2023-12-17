<style lang="less" scoped>
.assign-boolean-root {
    max-height: 60vh;

    .top {
        padding-top: 10px;
        padding-bottom: 10px;
        margin-top: 5px;

        .internal-condition {
            margin-top: 5px;
            width: 100%;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-right: 5px !important;
        }

        .internal-condition-link {
            margin-top: 5px;
            width: 100%;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-right: 5px !important;
            text-align: center;
        }
    }

    .results-output {
        padding-top: 10px;

        .title {}

        .true {
            padding: 5px;
            background-color: green;
            font-weight: bold;
        }

        .false {
            padding: 5px;
            background-color: red;
            font-weight: bold;
        }
    }
}
</style>

<template>
<div class="assign-boolean-root">

    <div class="top" col-f bev-cont>

        <div w-100 v-if="conditions.length > 0">

            <template v-for="(i, index) in conditions">

                <e-col
                    class="internal-condition"
                    :style="i.type == 'condition-group' ? 'padding-left: 5px;' : ''"
                    bev-cont
                    :key="index"
                    v-if="i.type != 'linker'"
                >

                    <EFormBlActionChainLogicModelContentAssignPrimitivesBooleanCondition
                        :conditionItem="i"
                        :previousAssignmentsMenu="previousAssignmentsMenu"
                        @example-result-changed="updateSampleResult(index, $event)"
                        @delete-item="() => {
                            // this deletes the trailing and or etc if it exists
                            if (index == 0 && conditions.length > 1) {
                                conditions.splice(index + 1, 1);
                            }

                            conditions.splice(index, 1);
                        }"
                        v-if="i.type == 'condition'"
                    />

                    <EFormBlActionChainLogicModelContentAssignPrimitivesBooleanConditionGroup
                        :conditionItem="i"
                        :opDict="opDict"
                        :index="index"
                        :previousAssignmentsMenu="previousAssignmentsMenu"
                        @example-result-changed="updateSampleResult(index, $event, true)"
                        @delete-item="() => {
                            // this deletes the trailing and or etc if it exists
                            if (index == 0 && conditions.length > 1) {
                                conditions.splice(index + 1, 1);
                            }

                            conditions.splice(index, 1);
                        }"
                        v-else-if="i.type == 'condition-group'"
                    />

                </e-col>

                <e-col
                    class="internal-condition-link"
                    :key="index"
                    :center="true"
                    v-else
                >

                    <EFormBlActionChainLogicModelContentAssignPrimitivesBooleanLinker
                        :conditionItem="i"
                        :item="item"
                        @delete-item="conditions.splice(index, 1)"
                    />

                    <AddMenu v-if="index == conditions.length"/>

                </e-col>

            </template>
            
            <e-col class="internal-condition-link" :center="true">

                <AddMenu
                    :isLinker="!shouldAddLinker"
                    :list="item?.logic?.raw"
                />

            </e-col>

        </div>

        <div v-else>

            {{ tr('no-items-to-show') }}

            <e-col class="internal-condition-link" :center="true">

                <AddMenu
                    :isLinker="!shouldAddLinker"
                    :list="item?.logic?.raw"
                />

            </e-col>

        </div>

    </div>

    <div class="results-output">

        <h1 class="title">{{ tr('final-output') }}</h1>

        <EFormBlActionChainLogicModelContentCSampleResult
            :value="{}"
            :overrideOnEmpty="true"
            :previewOverride="`${finalResult?.preview} = ${
                `<span style='color: white; padding: 5px; border-radius: 3px; background-color: ${(finalResult?.result ? 'green' : 'rgb(255, 85, 0)')}; font-weight: bold;'>${
                    (finalResult?.result + '').toUpperCase()
                }</span>`
            }`"
        />

    </div>

</div>
</template>

<script>
import {mapState} from 'vuex';
import AddMenu from './AddMenu';

export default {
    components: { AddMenu },
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
        ...mapState('cms/actions/bs-logic', [
            'booleanOperattions', 
            'booleanLinkOperattions'
        ]),
        opDict() {
            return this.keyify([
                ...this.booleanOperattions,
                ...this.booleanLinkOperattions,
            ], 'id');
        },
        conditions() {
            return this?.item?.logic?.raw ?? [];
        },
        results() {
            const res = {
                counter: this.counter,
                results: Object.values(this.sampleResults?.results ?? []),
            };

            return res.results;
        },
        finalResult() {
            let preview = '', raw = '', result = false;

            for (const i in this.conditions) {
                const con = this.conditions[i],
                      op = this.opDict[con.operator],
                      res = this.sampleResults?.results[`i-${i}`];

                if (con.type == 'linker' && typeof op == 'object') {
                    raw += op.operation;
                    preview += op.operation;
                }
                else if (typeof res != 'undefined') {
                    raw += res.raw;
                    preview += res.pretty;
                }
                else {
                    raw += ' NA ';
                    preview += ' NA ';
                }
            }

            try {
                result = !!eval(raw);
            }
            catch (err) {}

            return { counter: this.counter, preview, result };
        },
        shouldAddLinker() {
            try {
                const lastItem = this.conditions[this.conditions.length - 1];
                return lastItem.type == 'linker';
            }
            catch (err) { return false }
        },
    },
    data() {
        return {
            counter: 0,
            sampleResults: {
                results: {}, 
                final: { 
                    preview: '', 
                    result: false 
                }
            },
        }
    },
    mounted() {
        this.$emit('example-result-changed', '');
    },
    methods: {
        updateSampleResult(index, result, doDebug = false) {
            this.counter++;
            this.sampleResults.results[`i-${index}`] = result;
        },
    }
}
</script>
