<template>
<div>

    <a-page-header :title="tr('connection-stats', { args: [ connection?.name ] })" />

    <span @click="dev()">Show</span>

    <ConnectionDetailsTabs :stats="stats" />

</div>
</template>

<script>
import { mapState } from 'vuex';
import ConnectionModel from '@/models/ConnectionModel';

const data = require('./dummy-data');

export default {
    mounted() {
        this.startTmr();
    },

    beforeDestroy() {
        this.clearTmr();
    },

    beforeMount() {
        this.clearTmr();
    },

    beforeRouteLeave() {
        this.clearTmr();
    },

    computed: {
        ...mapState('project/connections', [ 'entities' ]),
        filteredConnection() {
            // return { id: 2, name: 'A dummy connection', state: data };
            try {
                const filtered = this.entities.filter((con) => con.id == this.$route.params.id)[0]

                return filtered;
            }
            catch (err) { return {} }
        },
        processes() {
            if (!this.inited) return {};

            const pss = this.connection.state?.system?.processes ?? [];

            const out = {
                all: pss?.all ?? 0,
                blocked: pss?.blocked ?? 0,
                running: pss?.running ?? 0,
                sleeping: pss?.sleeping ?? 0,
                unknown: pss?.unknown ?? 0,
                users: {},
                list: {},
            };

            try {
                for (const p of pss.list) {
                    if (typeof out['list'][p.pid] != 'undefined') {
                        console.log('There is a PID alredy in use: ', p);
                    }

                    out['users'][p.user] = true;

                    out['list'][p.pid] = {
                        pid: p.pid,
                        state: p.state,
                        command: p.command,
                        cpu: p.cpu,
                        cpuUser: p.cpuu,
                        cpuSystem: p.cpus,
                        memory: p.mem,
                        vmMemory: p.memVsz,
                        tty: p.tty,
                        user: p.user,
                        params: p.params,
                        start: p.started,
                        priority: p.priority,
                        path: p.path,
                    }
                }

                out['users'] = Object.keys(out['users']);
            }
            catch (err) {}

            return out;
        },
        stats() {
            if (!this.inited) return {};

            try {
                const c   = this.connection.state,
                      os  = c?.general?.stats?.os,
                      cpu = c?.general?.stats?.cpu;

                return {
                    virtual: c?.general?.stats?.system?.virtual,
                    manufacturer: c?.system?.info?.manufacturer,
                    model: c?.system?.info?.model,
                    time: `${c?.general?.time?.current} ${c?.general?.time?.timezoneName}`, 
                    version: c?.general?.version,
                    uptime: secondsToString(c?.general?.time?.uptime),
                    summary: c?.general?.summary,
                    memory: {
                        free: formatBytes(c?.memory?.mem?.free),
                        used: formatBytes(c?.memory?.mem?.used),
                        total: formatBytes(c?.memory?.mem?.total),
                        swapFree: formatBytes(c?.memory?.mem?.swapfree),
                        swapTotal: formatBytes(c?.memory?.mem?.swaptotal),
                        swapUsed: formatBytes(c?.memory?.mem?.swapused),
                        percentFree: percentage(c?.memory?.mem?.free, c?.memory?.mem?.total, true),
                        percentUsed: percentage(c?.memory?.mem?.used, c?.memory?.mem?.total, true),
                    },
                    cpu:{
                        brand: cpu?.brand,
                        physicalCores: cpu?.physicalCores,
                        cores: cpu?.cores,
                        processors: cpu?.processors,
                        speedMin: c?.cpu?.speed?.min,
                        speed: c?.cpu?.speed?.avg,
                        speedMax: c?.cpu?.speed?.max,
                        virtualization: cpu?.virtualization,
                    },
                    os: {
                        macAddresses: c?.os?.uuid?.macs,
                        uefi: c?.os?.info?.uefi,
                        virtual: c?.system?.info?.virtual, 
                        arch: os?.arch,
                        serial: os?.serial,
                        distro: os?.distro,
                        platform: os?.platform,
                        release: os?.release,
                        codename: os?.codename,
                        shell: c?.os?.shell,
                        packages: this.getVersions(),
                        activeUsers: this.getUsers(),
                        processes: this.processes,
                    },
                    network: {
                        defaultGateway: c?.network?.gatewayDefault,
                        interfaceDefault:  c?.network?.interfaceDefault,
                        running: this.getPorts(),
                        interfaces: this.getInterfaces()
                    },
                    docker: {
                        info: this.getDockerInfo(),
                        images: c?.docker?.containersA,
                    }
                }
            }
            catch (err) {
                console.log('Error setting connection: ', err);
                return {}
            }
        }
    },
    data() {
        return {
            inited: false,
            connection: {},
            connDummy: { state: data },
            refreshTmr: null,
        }
    },
    async mounted() {
        await this.setConnection();

        this.inited = true;

        this.startTmr();
    },
    methods: {
        startTmr() {
            this.clearTmr();

            this.refreshTmr = setInterval(() => {

                // console.clear();

                this.refreshConnections(this.$route.params.id);

                setTimeout(async () => await this.setConnection(), 1000);

            }, 5000);
        },
        clearTmr() {
            if (this.refreshTmr) {
                clearInterval(this.refreshTmr);
            }
        },
        async setConnection() {
            const con = ConnectionModel.create(this.filteredConnection);

            await con.decrypt();

            this.connection = con;           
        },
        dev() {
            console.clear();
            console.log('Stats: ', this.stats);
            console.log('Connection: ', this.connection.state);
        },
        getVersions() {
            const versions = this.connection?.state?.general?.stats?.versions ?? [];

            const out = [];

            for (const p in versions) {
                if (versions[p] == '') continue;

                out.push({
                    package: p,
                    version: versions[p],
                });
            }

            return out;
        },
        getUsers() {
            const users = this.connection?.state?.os?.users ?? [];

            const out = {};

            for (const u of users) {
                if (typeof out[u.user] == 'undefined') {
                    out[u.user] = { user: u.user, processes: [] };
                }

                out[u.user].processes.push({
                    date: u.date,
                    time: u.time,
                    command: u.command,
                });
            }

            return out;
        },
        getPorts() {
            const net = this.connection?.state?.network ?? {};

            const out = {};

            for (const c of net?.connections ?? []) {
                const key = camelCase(c.state.toLowerCase());

                if (typeof out[key] == 'undefined') out[key] = [];

                out[key].push({
                    localAddress: c.localAddress,
                    peerAddress: c.peerAddress,
                    protocal: c.protocol,
                    port: c.localPort,
                    peerPort: c.peerPort,
                    pid: c?.pid ?? '',
                    process: this.processes?.['list']?.[String(c.pid)] ?? {},
                });
            }

            return out;
        },
        getInterfaces() {
            const net = this.connection?.state?.network ?? { interfaces: [] };

            const stats = this.keyify(net.stats, 'iface'), out = [];

            for (const i of net?.interfaces) {
                out.push({
                    ...i,
                    state: kebabCase(i.ieee8021xState),
                    stat: stats[i.iface]
                });
            }

            return out;
        },
        getDockerInfo() {
            const d = this.connection?.state?.docker?.info ?? {};

            return {
                id: d?.id,
                name: d?.name,
                operatingSystem: d?.operatingSystem,
                architecture: d?.architecture,
                bridgeNfIptables: d?.bridgeNfIptables,
                bridgeNfIp6tables: d?.bridgeNfIp6tables,
                containers: d?.containers,
                containersRunning: d?.containersRunning,
                containersStopped: d?.containersStopped,
                defaultRuntime: d?.defaultRuntime,
                dockerRootDir: d?.dockerRootDir,
                driver: d?.driver,
                httpProxy: d?.httpProxy,
                httpsProxy: d?.httpsProxy,
                initBinary: d?.initBinary,
                ipv4Forwarding: d?.ipv4Forwarding,
                kernelVersion: d?.kernelVersion,
                memTotal: d?.memTotal,
                memoryLimit: d?.memoryLimit,
                osType: d?.osType,
                serverVersion: d?.serverVersion,
                swapLimit: d?.swapLimit,
            }
        }
    },
}
</script>