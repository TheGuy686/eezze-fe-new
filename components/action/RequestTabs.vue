<template>
<div>

    <div style="clear: both; margin-bottom: 15px;" />

    <a-tabs v-model="activeKey">

        <a-tab-pane
            key="request-headers"
            :tab="tr('request-headers')"
            :disabled="actionStep?.schema?.type == 'websocket'"
            v-if="!hideHeaders"
        >
            
            <ActionMappingTable
                :title="tr('request-headers')"
                :extendedTop="false"
                srcKey="headers"
                v-model="actionStep.schema"
                @show-bl-mdl="$emit('show-bl-mdl')"
            />

        </a-tab-pane>

        <a-tab-pane key="url-params" :tab="tr('url-params')" force-render>
            
            <ActionMappingTable
                :title="tr('url-params')"
                :extendedTop="false"
                srcKey="urlParams"
                v-model="actionStep.schema"
                @show-bl-mdl="$emit('show-bl-mdl')"
            />

        </a-tab-pane>

        <a-tab-pane key="request-body" :tab="tr('request-body')">
            
            <ActionMappingTable
                :title="tr('request-body')"
                :extendedTop="false"
                srcKey="requestBody"
                v-model="actionStep.schema"
                @show-bl-mdl="$emit('show-bl-mdl')"
            />

        </a-tab-pane>

    </a-tabs>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
        hideHeaders: Boolean,
    },
    data() {
        return {
            activeKey: ref('request-headers'),
        }
    },
    mounted() {
        if (this.hideHeaders || this.actionStep?.schema?.type) {
            this.activeKey = ref('url-params');
        }
        else {
            this.activeKey = ref('request-headers');
        }
    }
}
</script>
