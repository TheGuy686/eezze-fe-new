<style lang="less" scoped>
.summary-tab-root {
    .stat-item {
        border-right: 1px solid #E0E0E0;

        &:last-child { border-right: none !important; }

        .label {
            font-weight: 500;
            font-size: 12px;
            color: #828282;
            margin-bottom: 5px;
        }

        .value {
            font-style: normal;
            font-weight: 550;
            font-size: 22px;
            line-height: 26px;
            color: #000000;
        }
    }
}
</style>

<template>
<e-col class="summary-tab-root tab-cont-item pl-10 pr-10">

    <e-row bev-cont class="bg-white pl-0 pr-0">
        <e-col
            class="stat-item pt-5 pb-5"
            w-20 :center="true"
            :key="index"
            v-for="(stat, index) in project.stats"
        >

            <span class="label">{{ tr(stat.key) }}</span>

            <span class="value" :style="getStyle(stat)">

                {{ stat.value }}

            </span>

        </e-col>

    </e-row>

</e-col>
</template>

<script>
export default {
    props: {
        project: {
            type: Object,
            required: true,
        }
    },
    computed: {
        getStyle() {
            return function (stat) {
                switch (stat.key) {
                    case 'deployment-status':
                        return `color: #27AE60; !important`;
                }
            }
        }
    }
}
</script>
