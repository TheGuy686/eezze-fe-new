<template>
<div style="text-align: left;">

    <div style="max-height: 60vh;" e-scroll>

        <a-descriptions
            bordered
            size="small"
            :title="con.name"
            v-for="con in connections"
        >
            <a-descriptions-item :span="3" :label="tr('description')">

                {{ con.description }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('type')">

                {{ con.type }}

            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('state-stored')">

                <span style="color: green; font-size: 20px;" v-html="con.state == 'true' ? '✓' : ''" />

            </a-descriptions-item>

            <a-descriptions-item :span="3" :label="tr('host')">

                {{ con?.metadata?.host }}

            </a-descriptions-item>

            <a-descriptions-item :span="3" :label="tr('authentication')">

                <template v-if="con?.metadata?.auth?.type == 'basic'">

                    <span>{{ tr('type') }}:</span><a-tag class="ml-2 mb-1" color="pink">{{ tr(`${con?.metadata?.auth?.type}-auth`) }}</a-tag><br />

                    <span>{{ tr('user') }}:</span><a-tag class="ml-2 mb-1" color="red">{{ tr('credentials-vault') }}->{{ con?.metadata?.auth?.props?.user }}</a-tag><br />

                    <span>{{ tr('pass') }}:</span><a-tag class="ml-2" color="blue">{{ tr('credentials-vault') }}->{{ con?.metadata?.auth?.props?.password }}</a-tag><br />

                </template>

                <template v-else-if="con?.metadata?.auth?.type == 'rsa'">

                    <span>{{ tr('type') }}:</span><a-tag class="ml-2 mb-1" color="pink">{{ tr(`${con?.metadata?.auth?.type}-auth`) }}</a-tag><br />

                    <span>{{ tr('user') }}:</span><a-tag class="ml-2" color="red">{{ tr('credentials-vault') }}->{{ con?.metadata?.auth?.props?.key }}</a-tag><br />

                </template>

            </a-descriptions-item>

        </a-descriptions>

    </div>

</div>
</template>

<script>
export default {
    props: {
        connections: Array,
    },
}
</script>