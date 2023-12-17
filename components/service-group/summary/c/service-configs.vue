<template>
<div style="text-align: left; max-height: 60vh;" e-scroll>

    <a-descriptions
        bordered
        size="small"
        :title="sc.name"
        v-for="sc in serviceConfigs"
    >
        <a-descriptions-item :span="2" :label="tr('type')">
            
            {{ sc.type }}
        
        </a-descriptions-item>

        <a-descriptions-item :span="2" :label="tr('active')">
            
            <span :style="`color: ${sc.active == '1' ? 'green' : 'red'}; font-size: 20px;`" v-html="sc.active == '1' ? '✓' : ''" />
        
        </a-descriptions-item>

        <a-descriptions-item :span="3" :label="tr('description')">
            
            {{ sc.description }}
        
        </a-descriptions-item>

    </a-descriptions>

</div>
</template>

<script>
export default {
    props: {
        serviceConfigs: Array,
    },
}
</script>