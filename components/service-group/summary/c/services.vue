<template>
<div style="text-align: left;">

    <div style="max-height: 60vh;" e-scroll>

        <a-descriptions
            class="mt-3"
            bordered
            size="small"
            :title="ser.name"
            v-for="ser in services"
        >
            <a-descriptions-item :span="3" :label="tr('description')">
                
                {{ ser.description }}
            
            </a-descriptions-item>

            <a-descriptions-item :span="1" :label="tr('type')">
                
                {{ ser.type }}
            
            </a-descriptions-item>

            <a-descriptions-item :span="1" :label="tr('has-roles')">
            
                <span style="color: green; font-size: 20px;" v-if="Array.isArray(ser?.definition?.roles) && ser?.definition?.roles.length > 0">
                
                    ✓

                </span>

                <span style="color: red; font-size: 20px;" v-else>
                
                    ✘

                </span>

            </a-descriptions-item>

            <a-descriptions-item :span="1" :label="tr('has-authentication')">

                <span style="color: green; font-size: 20px;" v-if="ser?.definition?.auth">
                
                    ✓

                </span>

                <span style="color: red; font-size: 20px;" v-else>
                
                    ✘

                </span>

            </a-descriptions-item>

            <template v-if="ser.type == 'rest'">

                <a-descriptions-item :span="1" :label="tr('method')">
                
                    {{ ser?.definition?.method.toUpperCase() }}
                
                </a-descriptions-item>

                <a-descriptions-item :span="2" :label="tr('path')">
                    
                    /{{ ser?.definition?.path }}
                
                </a-descriptions-item>

            </template>

            <template v-else-if="ser.type == 'websocket'">

                <a-descriptions-item :span="1" :label="tr('event-name')">
                
                    {{ ser?.definition?.eventName }}
                
                </a-descriptions-item>

                <a-descriptions-item :span="2" :label="tr('path')">
                    
                    /{{ ser?.definition?.path }}
                
                </a-descriptions-item>

            </template>

            <template v-else-if="ser.type == 'cron'">

                <a-descriptions-item :span="1" label="nothing defined yet">
                
                    NA
                
                </a-descriptions-item>

            </template>

        </a-descriptions>

    </div>

</div>
</template>

<script>
export default {
    props: {
        services: Array,
    },
}
</script>