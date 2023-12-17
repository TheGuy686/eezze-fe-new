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
}
</style>

<template>
<e-col class="raw-input-root pt-5 pb-5 pl-1 pr-1">

    <e-row dir="reverse">

        <a-radio
            :class="inputIsValidJson ? 'is-valid-dot' : 'is-invalid-dot'"
            :disabled="true"
            v-model="inputIsValidJson"
        />

        {{ tr('json-is-' + (inputIsValidJson ? 'valid' : 'invalid')) }}

    </e-row>

    <EEditor
        :showNewBtn="false"
        :fillParent="true"
        :condense="true"
        :minLines="25"
        :tabSize="2"
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
        inputIsValidJson() {
            try {
                const data = JSON.parse(this.json);

                return typeof data == 'object' || Array.isArray(data);
            }
            catch (err) {
                return false;
            }
        },
    },
    watch: {
        json(to) {
            if (!this.inited || !to) return;

            try {
                const md = JSON.parse(JSON.stringify(this.metadata));

                md.templateVars[this.templateFilter] = {...JSON.parse(to)};

                this.$emit('input', md);
            }
            catch (err) {}
        },
    },
    data() {
        return {
            inited: false,
            json: ''
        }
    },
    mounted() {
        this.json = JSON.stringify({...this.tplVars}, null, 4);
        setTimeout(() => this.inited = true, 100);
    },
    methods: {
        setIntialMdl() {
            this.json = JSON.stringify({...this.tplVars}, null, 4);
        }
    }
}
</script>
