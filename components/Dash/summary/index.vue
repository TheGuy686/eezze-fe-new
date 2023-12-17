<style lang="less" scoped>
.tab-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}
</style>

<template>
<a-tabs v-model="activeKey" tab-position="left" animated>

    <a-tab-pane :key="i" v-for="s, i in sections">
        
        <template #tab>

            <div class="tab-row">

                {{ tr(s.key) }} {{ getTabLabel(s, i) }}

                <GeneralIcon
                    class="ml-2"
                    :type="activeKey == i ? s.activeIcon : s.icon"
                />

            </div>

        </template>

        <DashSummaryCConnections 
            :con="project?.connection ?? project?.connections ?? {}"
            v-if="s.key == 'connection'"
        />

        <DashSummaryCDatasources 
            :datasources="Object.values(project?.datasources ?? [])"
            v-else-if="s.key == 'datasources'"
        />

        <DashSummaryCRoles
            :roles="project?.roles ?? []"
            v-else-if="s.key == 'roles'"
        />

        <DashSummaryCVault
            :vault="project?.vault ?? []"
            v-else-if="s.key == 'vault'"
        />

        <DashSummaryCValues
            :values="project?.values ?? []"
            v-else-if="s.key == 'values'"
        />
    
    </a-tab-pane>

</a-tabs>
</template>

<script>
export default {
    props: {
        project: Object,
    },
    data() {
        return {
            sections: [
                {
                    key: 'connection',
                    title: 'connection',
                    icon: 'server',
                    activeIcon: 'server-sld-lb'
                },
                {
                    key: 'datasources',
                    title: 'datasources',
                    icon: 'datasource',
                    activeIcon: 'datasource-sld-lb'
                },
                {
                    key: 'roles',
                    title: 'roles',
                    icon: 'role',
                    activeIcon: 'role-sld-lb'
                },
                {
                    key: 'values',
                    title: 'values',
                    icon: 'vault',
                    activeIcon: 'vault-sld-lb'
                },
                {
                    key: 'vault',
                    title: 'vault',
                    icon: 'vault',
                    activeIcon: 'vault-sld-lb'
                },
            ],
            activeKey: 0,
        };
    },
    methods: {
        getTabLabel(item, index) {
            if (index == 0) return '';
            else if (index == 1) {
                return `(${Object.keys(this.project?.[item?.key] ?? {}).length})`;
            }

            return Array.isArray(this.project?.[item?.key]) ? `(${this.project?.[item?.key].length})` : `(${this.project?.[item?.key]?.keyValues?.length})`;
        },
    }
}
</script>