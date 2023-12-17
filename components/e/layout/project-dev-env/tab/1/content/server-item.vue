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

        .peers {
            font-weight: 600;
            font-size: 12px;
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

        <a-dropdown-button size="small" style="margin-right: 5px;"  v-if="ddOptions">

            <h4 class="api-server">{{ title }}</h4>

            <a-menu slot="overlay">

                <a-menu-item
                    :key="i"
                    v-for="(opt, i) in ddOptions"
                    @click="() => {
                        $emit('title-dd-option-clicked', opt);
                        $emit('clear-logs');
                    }"
                >
                    {{ opt.title }}
                    
                </a-menu-item>

            </a-menu>

            <a-icon slot="icon" type="cluster" />

        </a-dropdown-button>

        <h4 class="api-server" v-else>{{ title }}</h4>

        <div style="display: flex;" ver-center>

            <a-tag :color="isConnected ? 'green' : 'red'">

                {{ tr(isConnected ? 'connected' : 'inactive', { toUpper: true }) }}

            </a-tag>

        </div>

        <a-row no-padding ver-center>
            
            <a-icon type="team" />

            <div class="peers">({{ peers }})</div>

        </a-row>

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
        ddOptions: {
            type: Array,
        },
        btnLabel: {
            type: String,
            required: true,
        },
        peers: {
            type: Number,
            default: 0,
        }
    },
};
</script>
