<style lang="less">
.raw-input-root {
    .is-valid-dot {
        margin-left: 5px;

        .ant-radio-inner {
            background-color: green;
        }
    }

    .is-invalid-dot {
        margin-left: 5px;

        .ant-radio-inner {
            background-color: red;
        }
    }

    .no-items-title {
        margin-bottom: 5px;
    }
}
</style>

<template>
<e-col class="raw-input-root pt-5 pb-5 pl-1 pr-1">

    <e-col clss="no-items-title" :center="true">

        <h3 v-if="!hasItems">

            {{ tr('no-items-to-show') }}

        </h3>

    </e-col>

    <JsonEditor
        :options="{
            confirmText: tr('confirm'),
            cancelText: tr('cancel'),
        }"
        :objData="json"
        v-model="json"
    />

</e-col>
</template>

<script>
export default {
    props: {
        metadata: Object,
        templateFilter: {
            type: String,
        },
        tplVars: {
            type: Object,
        },
    },
    computed: {
        hasItems() {return Object.keys(this.json ?? {}).length > 0}
    },
    watch: {
        json(to) {
            if (!this.inited || !to) return;

            const md = JSON.parse(JSON.stringify(this.metadata));

            md.templateVars[this.templateFilter] = {...to};

            this.$emit('input', md);
        },
    },
    data() {
        return {
            inited: false,
            json: {}
        }
    },
    mounted() {
        this.json = {...this.tplVars};
        setTimeout(() => this.inited = true, 100);
    },
    methods: {
        setIntialMdl() {
            this.json = {...this.tplVars};
        }
    }
}
</script>
