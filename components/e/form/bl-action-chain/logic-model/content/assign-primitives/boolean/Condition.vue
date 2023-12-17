<style lang="less" scoped>
.root-condition {
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
<e-col class="root-condition" :fillParent="true" js="sa">

    <e-row jc="sb">

        <h3>{{ tr('condition') }}</h3>

        <CompMenu
            :sampleOutput="sampleOutput"
            :previousAssignmentsMenu="previousAssignmentsMenu"
            v-model="conditionItem"
            @example-result-changed="sampleOutput = $event"
        />

    </e-row>

    <e-row :center="true">

        <e-col :fillParent="false" w-75>

            <span v-html="sampleOutput?.pretty" />

        </e-col>

        <e-col dir="reverse" :fillParent="false" w-25>

            <a-tag class="result" :color="sampleOutput?.result ? '#008000' : '#f50'">
                    
                {{ (sampleOutput?.result + '').toUpperCase() }}
                
            </a-tag>

        </e-col>

    </e-row>

    <div class="del-btn" @click="$emit('delete-item')">

        <GeneralIcon clss="icn" type="close-xsm-white" />

    </div>

</e-col>
</template>

<script>
import CompMenu from './CompMenu';

export default {
    components: { CompMenu },
    props: {
        conditionItem: {
            type: Object,
            require: true,
        },
        previousAssignmentsMenu: {
            type: Object,
            require: true,
        },
    },
    watch: {
        sampleOutput(to) {
            this.$emit('example-result-changed', to);
        },
    },
    data() {
        return  {
            sampleOutput: {},
        }
    },
}
</script>
