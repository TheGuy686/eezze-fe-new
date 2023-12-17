<template>
<div>

    <a-page-header
        style="margin-top: -15px;"
        :title="tr('datasource-docs', { args: [ dsId, dsTitle ] })"
        non-se
    /> 

    <iframe
        ref="openapi-iframe"
        :src="host"
        class="root.iframe"
        :style="{
            'width': 79 + 'vw',
            'height': '78vh',
            'border-radius': '10px',
            'border': 'gray 1px solid',
        }"
        @load="loaded()"
    />

</div>
</template>

<script>
const { HOST_IP, FE_PORT_OPENAPI } = require('@/env');

import { project } from '~/consts/Endpoints'

const port = FE_PORT_OPENAPI;

export default {
    layout: 'collaboration',
    beforeDestroy() {
        this.destroyIframeEvents();
    },
    computed: {
        host() {
            const prUrl = `${project.spec}?projectId=${this.currentProject}&currentProject=${this.currentProject}&token=${this.$auth.strategy.token.get()}`;
            return `${document.location.protocol ?? 'http'}//${HOST_IP}:${port}?prUrl=${prUrl}`;
        },
    },
    data() {
        return {
            inited: false,
            dsId: '',
            dsTitle: '',
            creator: {},
        }
    },
    mounted() {
        this.events.off('docs-api-ds-changed');
        this.events.on('docs-api-ds-changed', (ds) => {
            this.dsId = ds.id;
            this.dsTitle = ds.name;

            this.emitToIf('load-ds-data', ds.id);
        });

        this.setIframeEvents();

        this.os(() => this.inited = true, 500);
    },
    methods: {
        refreshIframeEvents() {
            this.destroyIframeEvents();
            this.setIframeEvents();
        },
        setIframeEvents() {
            try {
                window.addEventListener('message', this.handleMessage, false);

                this.$refs['openapi-iframe'].addEventListener('load', this.handleIframeLoad);
            }
            catch (e) {
                console.log('There is an error here: ', e);
            }
        },
        destroyIframeEvents() {
            try {
                window.removeEventListener('message', this.handleMessage);

                this.$refs['openapi-iframe'].removeEventListener('load', this.handleIframeLoad);
            }
            catch (e) {}
        },
        handleIframeLoad() {

        },
        loaded() {
            
        },
        handleMessage(e) {
            if (!this.inited) return;
            
            try {
                let ev = JSON.parse(e.data);

                switch (ev.event) { 
                    case 'set-creator': {
                        this.creator = ev.data;
                    }
                }
            }
            catch (err) {
                //console.log('Could not handle the "headleMessage": ', err, e);
            }
        },
        refreshData() {
            this.emitToIf('reload-page');
        },
        emitToIf(eventName, data) {
            try {
                this.$refs['openapi-iframe'].contentWindow.postMessage(JSON.stringify({
                    event: eventName,
                    data: data,
                }), this.host);
            }
            catch (err) {
                console.log(`Error emit to if: `, eventName, data);
            }
        },
    }
}
</script>