<style lang="less" scoped>

</style>

<template>
<e-col class="tab-cont-item pl-10 pr-10">

    <e-row class="mb-10">

        <span class="section-title">{{ tr('danger-zone') }}</span>

    </e-row>

    <e-row>

        <e-col w-90>

            <span class="setting-title">{{ tr('transfer-you-projct') }}</span>

            <p class="setting-details">

                {{ tr('transfer-you-projct-details') }}

            </p>

        </e-col>

        <e-col w-10 ai="fe" jc="c">

            <span class="clickable-text" non-sel @click="$emit('transfer-project')">

                {{ tr('manage') }}

            </span>

        </e-col>

    </e-row>

    <e-row>

        <e-col w-90>

            <span class="setting-title text-red">

                {{ tr('delete-project') }}

            </span>

            <p class="setting-details">

                {{ tr('permanently-delete-details') }}

            </p>

        </e-col>

        <e-col clss="text-red" w-10 ai="fe" jc="c">

            <span class="clickable-text text-red" non-sel @click="$emit('delete-project')">

                {{ tr('delete') }}

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
    methods: {}
}
</script>
