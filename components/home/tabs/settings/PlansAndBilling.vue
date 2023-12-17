<style lang="less" scoped>

</style>

<template>
<e-col class="info-section tab-cont-item pl-10 pr-10">

    <e-row class="mb-10">

        <span class="section-title">{{ tr('plans-and-billing') }}</span>

    </e-row>

    <e-row>

        <e-col w-90>

            <span class="setting-title">{{ tr('upgrade-your-project') }}</span>

            <p class="setting-details">

                {{ tr('upgrade-your-project-details') }}

            </p>

        </e-col>

        <e-col w-10 ai="fe" jc="c">

            <span class="clickable-text" non-sel @click="upgradeProject()">

                {{ tr('upgrade') }}

            </span>

        </e-col>

    </e-row>

    <e-row>

        <e-col w-90>

            <span class="setting-title">{{ tr('add-additional-members') }}</span>

            <p class="setting-details">

                {{ tr('add-additional-members-details') }}

            </p>

        </e-col>

        <e-col w-10 ai="fe" jc="c">

            <span class="clickable-text" non-sel @click="addAdditionalMembers()">

                {{ tr('manage') }}

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
    methods: {
        upgradeProject() {
            console.log('upgrade project');
        },
        addAdditionalMembers() {
            console.log('add additional members');
        }
    }
}
</script>
