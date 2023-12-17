<template>
<a-tabs v-model="activeKey">

    <a-tab-pane key="general" :tab="tr('general')">

        <a-descriptions bordered size="small">

            <a-descriptions-item :span="2" :label="tr('serial')">

                {{ stats?.os?.serial }}

            </a-descriptions-item>

            <a-descriptions-item :label="tr('architecture')">
                        
                {{ tr(stats?.os?.arch == 'x64' ? '64-bit' : '32-bit') }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('codename')">

                {{ stats?.os?.codename }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('distro')">

                {{ stats?.os?.distro }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('platform')">

                {{ stats?.os?.platform }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('release')">

                {{ stats?.os?.release }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('uefi')">

                {{ stats?.os?.uefi }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('shell')">

                {{ stats?.os?.shell }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('shell')">

                {{ stats?.os?.shell }}

            </a-descriptions-item>

            <a-descriptions-item :label="tr('is-virtual-machine')">

                {{ tr(stats?.os?.virtual ? 'yes': 'no', {toUpper: true}) }}

            </a-descriptions-item>

            <a-descriptions-item :label="tr('mac-addresses')">

                <template v-for="a, i in stats?.os?.macAddresses">

                    <span :key="i">
                        
                        {{ a }}
                    
                    </span><br />

                </template>

            </a-descriptions-item>

        </a-descriptions>

    </a-tab-pane>

    <a-tab-pane key="active-users" :tab="tr('active-users')">
    
        <a-descriptions
            size="small"
            bordered
            :title="tr('process-user', { args: [ u ] })"
            :key="u"
            v-for="p, u in stats?.os?.activeUsers"
        >
            <a-descriptions-item
                :span="3"
                :key="i"
                :label="`${p.date} ${p.time}`"
                v-for="p, i in p.processes"
            >

                {{ p.command }}

            </a-descriptions-item>

        </a-descriptions>

    </a-tab-pane>

    <a-tab-pane key="package-versions" :tab="tr('package-versions')">
    
        <a-descriptions :title="tr('package-versions')" size="small" bordered>

            <a-descriptions-item
                :label="p.package"
                :span="2"
                :key="i"
                v-for="p, i in stats?.os?.packages"
            >

                {{ p.version }}

            </a-descriptions-item>

        </a-descriptions>

    </a-tab-pane>

    <a-tab-pane key="processes" :tab="tr('processes')">

        <a-descriptions size="small" bordered>

            <a-descriptions-item :span="2" :label="tr('all')">

                {{ stats?.os?.processes?.all }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('running')">

                {{ stats?.os?.processes?.running }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('blocked')">

                {{ stats?.os?.processes?.blocked }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('sleeping')">

                {{ stats?.os?.processes?.sleeping }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('unknown')">

                {{ stats?.os?.processes?.unknown }}

            </a-descriptions-item>

        </a-descriptions>

        <a-descriptions size="small" class="mt-5" bordered>

            <a-descriptions-item :span="2" :label="tr('all-process-users')">

                <template v-for="u in stats?.os?.processes?.users">

                    <span :key="u">{{ u }}</span><br />

                </template>

            </a-descriptions-item>

        </a-descriptions>

        <div class="ant-descriptions-title mt-5">
            
            {{ tr('processes') }}
        
        </div>

        <TablePaginated
            :disablePagination="false"
            :showRowCheckboxs="false"
            :data="processesP"
            :columns="[
                {
                    title: tr('pid'),
                    dataIndex: 'pid',
                    sorter: true,
                },
                {
                    title: tr('command'),
                    dataIndex: 'command',
                    sorter: true,
                },
                {
                    title: tr('cpu'),
                    dataIndex: 'cpu',
                    sorter: true,
                    sortDirections: [ 'descend', 'ascend' ],
                    sorter: (a, b) => a.cpu > b.cpu ? -1 : 1,
                    format: (val) => `${val.toFixed(2)}%`
                },
                {
                    title: tr('user'),
                    dataIndex: 'user',
                    sorter: true,
                },
                {
                    title: tr('state'),
                    dataIndex: 'state',
                    sorter: true
                },
            ]"
            :showNewButton="false"
        />

    </a-tab-pane>

</a-tabs>
</template>

<script>
// onFilter: (value, record) => record.name.indexOf(value) === 0,
// sorter: (a, b) => a.name.length - b.name.length,
// sortDirections: ['descend'],
export default {
    props: {
        stats: {
            type: Object,
            required: true,
        }
    },
    computed: {
        processesP() {
            const data = Object.values(this.stats?.os?.processes?.list ?? []);

            data.sort((a, b) => a.cpu > b.cpu ? -1 : 1);

            return data;
        },
    },
    data() {
        return {
            activeKey: 'general',
        }
    }
}
</script>