<template>
<e-col>

    <h2 class="pb-5">
        
        {{ tr('how-would-you-like-to-create-a-project') }}
    
    </h2>

    <e-row :center="true">

        <GeneralBeveledGrid>

            <GeneralBeveledGridItem
                id="basic"
                :hideHover="true"
                bgColor="#0d1c52"
                placement="left"
                :title="tr('basic')"
                :helpText="tr('create-project-basic-help')"
                :value="mode"
                @input="mode = $event"
            />
         
            <GeneralBeveledGridItem
                id="advanced"
                :hideHover="true"
                bgColor="#358123"
                placement="right"
                :title="tr('advanced')"
                :helpText="tr('create-project-advanced-help')"
                :value="mode"
                @input="mode = $event"
            />

            <GeneralBeveledGridItem
                id="ai"
                :hideHover="true"
                bgColor="#345681"
                placement="right"
                :title="tr('ai')"
                :helpText="tr('create-project-ai-help')"
                :value="mode"
                @input="mode = $event"
            />
    
        </GeneralBeveledGrid>

    </e-row>

</e-col>
</template>

<script>
export default {
    watch: {
        mode(to) {
            this.$emit('mode-changed', to[0]);
        }
    },
    data() {
        return {
            mode: [],
        }
    }
}
</script>