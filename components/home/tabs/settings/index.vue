<style lang="less" scoped>

</style>

<template>
<e-col class="tab-cont-item pl-10 pr-10">

    <e-col class="pl-10 pr-10 pb-10 pt-5 bg-white" bev-cont>

        <HomeTabsSettingsProjectInfoHeader
            :project= "project"
            @edit-project="$emit('edit-project')"
        />

        <HomeTabsSettingsPlansAndBilling
            :project= "project"
            v-if="false"
        />

        <HomeTabsSettingsDangerZone
            :project= "project"
            @transfer-project="$refs['mdl-transfer'].show()"
            @delete-project="$refs['mdl-delete'].show()"
        />

    </e-col>

    <ProjectTransferModal ref="mdl-transfer" />

    <ProjectDeleteModal ref="mdl-delete" />

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
}
</script>
