<style lang="less" scoped>
.root-condition-group {
    width: 100%;
    margin-top: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 5px;
    padding-right: 5px;
    position: relative;

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

    .del-btn {
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        right: -12.5px;
        top: -15px;
        opacity: 0;

        .icn {
            position: absolute;
            left: 2px;
            top: 2px;
        }

        &:hover {
            background-color: rgb(151, 3, 3);
            cursor: pointer;
        }
    }

    &:hover  {
        .del-btn {
            opacity: 1;
        }
    }
}
</style>

<template>
<div class="root-condition-group">

    <e-row jc="sb">

        <h3>{{ tr('condition-group') }}</h3>

        <!-- <a-tooltip placement="right" :title="`Hello`" arrow-point-at-center>

            <GeneralIcon type="info-blue-xsm" />

        </a-tooltip> -->

    </e-row>

    <template v-for="(i, ind) in conditions">

        <div 
            class="internal-condition"
            :key="ind"
            bev-cont
            v-if="i.type != 'linker'"
        >

            <EFormBlActionChainLogicModelContentAssignPrimitivesBooleanCondition
                :conditionItem="i"
                :previousAssignmentsMenu="previousAssignmentsMenu"
                @example-result-changed="updateSampleResult(ind, $event)"
                @delete-item="() => {
                    // this deletes the trailing and or etc if it exists
                    if (ind == 0 && conditions.length > 1) {
                        conditions.splice(ind + 1, 1);
                    }

                    conditions.splice(ind, 1);
                }"
                v-if="i.type == 'condition'"
            />

            <EFormBlActionChainLogicModelContentAssignPrimitivesBooleanConditionGroup
                :conditionItem="i"
                :opDict="opDict"
                :previousAssignmentsMenu="previousAssignmentsMenu"
                @example-result-changed="updateSampleResult(ind, $event)"
                @delete-item="() => {
                    // this deletes the trailing and or etc if it exists
                    if (ind == 0 && conditions.length > 1) {
                        conditions.splice(ind + 1, 1);
                    }

                    conditions.splice(ind, 1);
                }"
                v-else-if="i.type == 'condition-group'"
            />

        </div>

        <div 
            class="internal-condition-link"
            :key="ind"
            v-else
        >

            <EFormBlActionChainLogicModelContentAssignPrimitivesBooleanLinker
                :conditionItem="i"
                @delete-item="conditions.splice(ind, 1)"
            />

        </div>

    </template>

    <e-col class="internal-condition-link" :center="true">

        <EFormBlActionChainLogicModelContentAssignPrimitivesBooleanAddMenu
            :isLinker="!shouldAddLinker"
            :list="conditions"
        />

    </e-col>

    <div class="del-btn" @click="$emit('delete-item')">

        <GeneralIcon clss="icn" type="close-xsm-white" />

    </div>

</div>
</template>

<script>
export default {
    props: {
        conditionItem: {
            type: Object,
            require: true,
        },
        opDict: {
            type: Object,
            require: true,
        },
        index: {
            type: Number,
            require: true,
        },
        previousAssignmentsMenu: {
            type: Object,
            require: true,
        },
    },
    watch: {
        finalResult(to) {
            this.$emit('example-result-changed', to);
        }
    },
    computed: {
        conditions() {
            return this?.conditionItem?.group ?? [];
        },
        shouldAddLinker() {
            if (!this.loaded) return true;
            try {
                const lastItem = this.conditions[this.conditions.length - 1];
                return lastItem.type == 'linker';
            }
            catch (err) { return false }
        },
        finalResult() {
            let preview = '( ', raw = '( ', result = false;

            for (const i in this.conditions) {
                const con = this.conditions[i],
                      op  = this.opDict[con.operator],
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

            raw += ' )';
            preview += ' )';

            try {
                result = eval(raw);
            }
            catch (err) {}

            return { 
                counter: this.counter,
                raw,
                preview,
                pretty: preview,
                result
            };
        }
    },
    data() {
        return {
            loaded: false,
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
        this.os(() => this.loaded = true, 200);
    },
    methods: {
        updateSampleResult(index, result) {
            this.counter++;
            this.sampleResults.results[`i-${index}`] = result;
        },
    }
}
</script>
