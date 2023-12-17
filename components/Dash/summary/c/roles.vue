<template>
<div style="text-align: left; min-height: 40vh; max-height: 60vh;" e-scroll>

    <template v-if="roles.length > 0">

        <a-descriptions
            :class="i > 0 ? 'mt-5' : ''"
            bordered
            size="small"
            :title="r.role"
            v-for="r, i in roles"
        >
            <a-descriptions-item :span="3" :label="tr('description')">
                        
                {{ r.description }}
            
            </a-descriptions-item>
    
        </a-descriptions>

    </template>

    <template v-else>

        <h2>{{ tr('no-items-to-show') }}</h2>

    </template>

</div>
</template>

<script>
export default {
    props: {
        roles: Array,
    }
}
</script>