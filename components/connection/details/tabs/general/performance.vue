<template>
<e-row>

    <e-row style="background: #ececec;" clss="p-5 mb-5" w-55 jc="se">

        <a-card non-sel>

            <a-statistic
                :title="tr('cpu-usage', { toUpper: true })"
                :value="cpu"
                :precision="2"
                suffix="%"
                :value-style="{ color: (cpu > 50 ? 'red' : '#3f8600') }"
                style="margin-right: 50px"
            />

        </a-card>

        <a-card non-sel>

            <a-statistic
                :title="tr('memory-usage')"
                :value="mem"
                :precision="2"
                suffix="%"
                :value-style="{ color: (mem < 50 ? '#3f8600' : (mem < 85 ? 'orange' : 'red')) }"
                style="margin-right: 50px"
            />

        </a-card>

        <a-card non-sel>

            <a-statistic
                :title="tr('temprature')"
                :value="temp"
                :precision="2"
                suffix="°C"
                :value-style="{ color: (temp > 90 ? 'red' : '#3f8600') }"
                style="margin-right: 50px"
            />

        </a-card>

        <a-card non-sel>

            <a-statistic
                :title="tr('uptime')"
                :value="stats?.uptime ?? ''"
                style="margin-right: 50px"
            />

        </a-card>

    </e-row>

    <e-row w-45 style="background: #ececec;" clss="p-5 mb-5 ml-5" jc="se">

        <a-card non-sel>

            <a-statistic
                :title="tr('received')"
                :value="netUpload"
                :precision="2"
                :suffix="tr('kps')"
                style="margin-right: 50px"
            />

        </a-card>

        <a-card non-sel>

            <a-statistic
                :title="tr('upload-speed')"
                :value="netUpload"
                :precision="2"
                :suffix="tr('kps')"
                :value-style="{ color: '#bf71ff' }"
                style="margin-right: 50px"
            >

                <template #prefix>

                    <GeneralIcon type="up-arrow-purple" />

                </template>

            </a-statistic>

        </a-card>

        <a-card non-sel>

            <a-statistic
                :title="tr('download-speed')"
                :value="netDownload"
                :precision="2"
                :suffix="tr('kps')"
                :value-style="{ color: '#19cdbe' }"
                style="margin-right: 50px"
            >

                <template #prefix>

                    <GeneralIcon type="down-arrow-green" />

                </template>

            </a-statistic>

        </a-card>

    </e-row>

</e-row>
</template>

<script>
export default {
    props: {
        stats: {
            type: Object,
            required: true,
        }
    },
    computed: {
        cpu() {
            try {
                return Number(this.stats.summary.cpu.replace(' %', ''));
            }
            catch (err) { return 0 }
        },
        mem() {
            try {
                return Number(this.stats.summary.mem.replace(' %', ''));
            }
            catch (err) { return 0 }
        },
        temp() {
            try {
                return this.stats.summary.temp.replace('°C', '');
            }
            catch (err) { return 0 }
        },
        netUpload() {
            try {
                return this.stats.summary.network.upload.speed;
            }
            catch (err) { return 0 }
        },
        netDownload() {
            try {
                return this.stats.summary.network.download.speed;
            }
            catch (err) { return 0 }
        },
    }
}
</script>