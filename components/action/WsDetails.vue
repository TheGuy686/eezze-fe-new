<style lang="less" scoped>
.file-details-root {}
</style>

<template>
<div class="mt-10 pt-10 file-details-root">

    <p class="font-semibold text-black-1 text-lg">
        
        {{ tr('set-rest-method') }}
        
    </p>

    <EFormInput
        class="mt-2 mb-3"
        name=""
        :placeholder="tr('enter-an-event-name')"
        :inlineOver="true"
        :value="eventName.value"
        @input="setEventName($event)"
    />

    <e-row :fillParent="true">

        <ActionLogicMdlInput
            clss="pl-2.5"
            castTo="website-path"
            addonBefore="/"
            :placeholder="tr('set-a-path') + '...'"
            src="WsDetails->path"
            mdlKey="path"
            v-model="actionStep.schema"
            @show-bl-mdl="$emit('show-bl-mdl')"
        />

    </e-row>

</div>
</template>

<script>
export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
    },
    data() {
        return { increment: 0 }
    },
    computed: {
        eventName() {
            return {
                increment: this.increment,
                value: this.actionStep.schema.eventName ?? '',
            }
        },
    },
    methods: {
        setEventName(name) {
            this.increment++;
            this.actionStep.schema.eventName = name;
        }
    }
}
</script>