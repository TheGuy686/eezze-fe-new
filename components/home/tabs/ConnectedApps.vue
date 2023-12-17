<style lang="less" scoped>
.connected-apps-tab-root {
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
<e-col class="connected-apps-tab-root tab-cont-item pl-10 pr-10">

    <e-col class="bg-white pt-20 pb-20" :center="true" bev-cont>

        {{ tr('no-apps-to-show') }}

    </e-col>

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
