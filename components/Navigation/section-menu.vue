<style lang="less" scoped>
.section-menu-divider {
    width: 100%; 
    height: 1px;
    margin-top: 5px;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.3);
}
</style>

<template>
<e-col clss="left-menu" ai="c">

    <a-tooltip
        :title="tr('admin')"
        placement="right"
        @click="menuItemClicked({
            path: 'admin/store-publications',
            key: 'admin'
        })"
    >
        <div :class="'round-btn' + (activeKey == 'admin' ? '-active' : '')">

            A

        </div>

    </a-tooltip>

    <a-tooltip
        :title="tr('store')"
        placement="right"
        @click="menuItemClicked({
            path: 'store/publications',
            key: 'store'
        })"
    >
        <div :class="'round-btn' + (activeKey == 'store' ? '-active' : '')">

            S

        </div>

    </a-tooltip>

    <a-tooltip
        :title="tr('internal')"
        placement="right"
        @click="menuItemClicked({
            path: 'internal/modules',
            key: 'internal'
        })"
    >
        <div :class="'round-btn' + (activeKey == 'internal' ? '-active' : '')">

            I

        </div>

    </a-tooltip>

    <div class="section-menu-divider" />

    <a-tooltip
        overlayClassName="main-left-menu-tooltip"
        placement="right"
        color="blue"
        :title="tr('project')"
        @click="menuItemClicked({
            path: `${$route?.params?.id ?? filteredProject}/home`,
            key: 'project'
        })"
    >
        <div :class="'round-btn' + (activeKey == 'project' ? '-active' : '')">

            P

        </div>

    </a-tooltip>

    <a-tooltip
        :title="tr('management')"
        placement="right"
        @click="menuItemClicked({
            path: `${$route?.params?.id ?? filteredProject}/management/tasks`,
            key: 'management'
        })"
    >
        <div :class="'round-btn' + (activeKey == 'management' ? '-active' : '')">

            M

        </div>

    </a-tooltip>

    <a-tooltip
        :title="tr('collaboration')"
        placement="right"
        @click="menuItemClicked({
            path: `${$route?.params?.id ?? filteredProject}/collaboration/docs/api`,
            key: 'collaboration'
        })"
    >
        <div :class="'round-btn' + (activeKey == 'collaboration' ? '-active' : '')">

            C

        </div>

    </a-tooltip>

</e-col>
</template>

<script>
import { mapState } from 'vuex';

export default {
    beforeMount() {
        if (this.$route.name == 'id-management-tasks') {
            this.activeKey = 'management';
            setTimeout(() => {
                this.activeKey = 'management';
            }, 200);
        }
        else if (this.$route.name == 'admin') {
            this.activeKey = 'admin';
            setTimeout(() => {
                this.activeKey = 'admin';
            }, 200);
        }
        else if (this.$route.name == 'id-collaboration-docs-api') {
            this.activeKey = 'collaboration';
            setTimeout(() => {
                this.activeKey = 'collaboration';
            }, 200);
        }
        else if (this.$route.name == 'admin-store-publications') {
            this.activeKey = 'admin';
            setTimeout(() => {
                this.activeKey = 'admin';
            }, 200);
        }
        else if (this.$route.name == 'store-publications') {
            this.activeKey = 'store';
            setTimeout(() => {
                this.activeKey = 'store';
            }, 200);
        }
        else if (this.$route.name == 'internal-modules') {
            this.activeKey = 'internal';
            setTimeout(() => {
                this.activeKey = 'internal';
            }, 200);
        }
    },
    computed: {
        ...mapState('project/proj', [ 'filteredProject' ])
    },
    data() {
        return {
            activeKey: 'project',
        }
    },
    methods: {
        menuItemClicked(item) {
            this.activeKey = item.key;
            this.$router.push({ path: `/${item.path}` });
        }
    },
}
</script>