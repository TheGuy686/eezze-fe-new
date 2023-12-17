<style lang="less" scoped>
@import "~/assets/styles/custom/main.less";

.server-stats-title-section {
    align-items: center;

    .status-section {
        flex: 2;

        .api-server {
            margin: 0.01px;
            margin-right: 10px !important;
        }
    }

    .btn-section {
        justify-content: flex-end;
    }
}
</style>

<template>
<a-row class="server-stats-title-section">

    <a-row class="status-section">

        <h4 class="api-server">{{ title }}</h4>

        <div style="display: flex;" ver-center>

            <a-tag :color="isConnected ? 'green' : 'red'">

                {{ tr(isConnected ? 'connected' : 'inactive', { toUpper: true }) }}

            </a-tag>

        </div>

    </a-row>

    <a-row class="btn-section">

        <a-button size="small" style="margin-right: 5px;" @click="$emit('clear-logs')">

            {{ tr('clear-logs') }}

        </a-button>

        <a-button size="small" :type="isConnected ? 'danger' : ''" @click="$emit(!isConnected ? 'btn-clicked' : 'close-socket')" :loading="isDoingRequest">

            {{ tr(isDoingRequest ? 'booting-and-connecting' : (isConnected ? 'close' : btnLabel)) }}

        </a-button>

    </a-row>

</a-row>
</template>

<script>
export default {
	props: {
        isDoingRequest: {
            type: Boolean,
            default: false,
        },
        isConnected: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            required: true,
        },
        btnLabel: {
            type: String,
            required: true,
        },
    },
};
</script>
