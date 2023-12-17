<style lang="less" scoped>
.e-regex-root {
    position: relative;
    
    .root.iframe {
        border-radius: 10px;
        border: gray 1px solid;
    }

    .evee-overlay {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        color: white;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: not-allowed;
    }
}
</style>

<template>
<div class="e-regex-root">

    <iframe
        ref="vee-iframe"
        class="root.iframe"
        :src="host"
        :style="{
            'width': '100%',
            'height': '80vh',
            'max-height': '80vh',
            'border-radius': '10px',
        }"
        @load="loaded()"
    />

    <div class="evee-overlay" v-if="disabled">

        {{ overlayMessage }}

    </div>

</div>
</template>

<script>
const { HOST_IP, FE_PORT_REGEX } = require('@/env');

const port = FE_PORT_REGEX;

export default {
    props: {
        devPort: Number | String,
        value: String,
        disabled: Boolean,
        overlayMessage: String,
        width: {
            type: Number,
            default: 94,
        },
    },
    beforeDestroy() {
        this.destroyIframeEvents();
    },
    computed: {
        pt() {
            if (this.devPort) return this.devPort;

            return port;
        },
        host() {
            return `${document.location.protocol ?? 'http'}//${HOST_IP}:${this.pt}`;
        },
    },
    data() {
        return {
            inited: false,
            lastEmitted: null,
            loadedOnRefresh: false,
        }
    },
    mounted() {
        this.setIframeEvents();

        this.os(() => {
            this._initData();
            this.inited = true;
        }, 500);
    },
    methods: {
        refreshIframeEvents() {
            this.destroyIframeEvents();
            this.setIframeEvents();
        },
        setIframeEvents() {
            try {
                window.addEventListener('message', this.handleMessage, false);

                this.$refs['vee-iframe'].addEventListener('load', this.handleIframeLoad);
            }
            catch (e) {
                console.log('There is an error here: ', e);
            }
        },
        destroyIframeEvents() {
            try {
                window.removeEventListener('message', this.handleMessage);

                this.$refs['vee-iframe'].removeEventListener('load', this.handleIframeLoad);
            }
            catch (e) {}
        },
        _initData() {
            if (this.lastEmitted == this.value) return;
            this.lastEmitted = this.value;
        },
        refreshData() {
            this.lastEmitted = {};
            this.loadedOnRefresh = true;
            this.emitToIf('reload-page');
        },
        emitToIf(eventName, data) {
            try {
                this.$refs['vee-iframe'].contentWindow.postMessage(JSON.stringify({
                    event: eventName,
                    data: data,
                }), this.host);
            }
            catch (err) {
                console.log(`Error emit to if: `, eventName, data);
            }
        },
        handleIframeLoad() {
            this._initData();
        },
        handleMessage(e) {
            if (!this.inited) return;
            
            try {
                let ev = JSON.parse(e.data);

                switch (ev.event) { 
                    case 'model-changed':
                        if (this.disabled) return;
                        this.$emit('input', ev?.data);
                        break;
                }
            }
            catch (err) {
                //console.log('Could not handle the "headleMessage": ', err, e);
            }
        },
        loaded() {
            this.emitToIf('init-data', this.value);
            this.lastEmitted = this.value;
        },
    }
}
</script>