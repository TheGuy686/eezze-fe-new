<template>
<div style="text-align: left; max-height: 60vh;" e-scroll>

    <template v-if="Array.isArray(con)">

        <a-descriptions
            bordered
            size="small"
            :title="con.name"
            v-for="c in con"
            
        >
            <a-descriptions-item :span="3" :label="tr('description')">
                
                {{ c.description }}
            
            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('type')">
                
                {{ c.type }}
            
            </a-descriptions-item>

            <a-descriptions-item :span="2" :label="tr('state-stored')">
                
                <span style="color: green; font-size: 20px;" v-html="c.state == 'true' ? '✓' : ''" />
            
            </a-descriptions-item>

            <a-descriptions-item :span="3" :label="tr('host')">
                
                {{ c?.metadata?.host }}
            
            </a-descriptions-item>

            <a-descriptions-item :span="3" :label="tr('authentication')">

                <template v-if="c?.metadata?.auth?.type == 'basic'">

                    <span>{{ tr('type') }}:</span><a-tag class="ml-2" color="pink">{{ tr(`${c?.metadata?.auth?.type}-auth`) }}</a-tag><br />

                    <span>{{ tr('user') }}:</span><a-tag class="ml-2" color="red">{{ tr('credentials-vault') }}->{{ c?.metadata?.auth?.props?.user }}</a-tag><br />

                    <span>{{ tr('pass') }}:</span><a-tag class="ml-2" color="blue">{{ tr('credentials-vault') }}->{{ c?.metadata?.auth?.props?.password }}</a-tag><br />

                </template>

                <template v-else-if="c?.metadata?.auth?.type == 'rsa'">

                    <span>{{ tr('type') }}:</span><a-tag class="ml-2" color="pink">{{ tr(`${c?.metadata?.auth?.type}-auth`) }}</a-tag><br />

                    <span>{{ tr('user') }}:</span><a-tag class="ml-2" color="red">{{ tr('credentials-vault') }}->{{ c?.metadata?.auth?.props?.key }}</a-tag><br />

                </template>
            
            </a-descriptions-item>

        </a-descriptions>

    </template>

    <a-descriptions
        bordered
        size="small"
        :title="con.name"
        v-else
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

                <span>{{ tr('type') }}:</span><a-tag class="ml-2" color="pink">{{ tr(`${con?.metadata?.auth?.type}-auth`) }}</a-tag><br />

                <span>{{ tr('user') }}:</span><a-tag class="ml-2" color="red">{{ tr('credentials-vault') }}->{{ con?.metadata?.auth?.props?.user }}</a-tag><br />

                <span>{{ tr('pass') }}:</span><a-tag class="ml-2" color="blue">{{ tr('credentials-vault') }}->{{ con?.metadata?.auth?.props?.password }}</a-tag><br />

            </template>

            <template v-else-if="con?.metadata?.auth?.type == 'rsa'">

                <span>{{ tr('type') }}:</span><a-tag class="ml-2" color="pink">{{ tr(`${con?.metadata?.auth?.type}-auth`) }}</a-tag><br />

                <span>{{ tr('user') }}:</span><a-tag class="ml-2" color="red">{{ tr('credentials-vault') }}->{{ con?.metadata?.auth?.props?.key }}</a-tag><br />

            </template>
        
        </a-descriptions-item>

    </a-descriptions>

</div>
</template>

<script>
export default {
    props: {
        con: Object | Array,
    },
}
</script>