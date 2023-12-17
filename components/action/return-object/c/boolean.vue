<style lang="less">
.return-obect-c-boolean-root {

}
</style>

<template>
<e-col clss="return-obect-c-boolean-root mt-3">

    <ActionLogicMdlInputKey
        clss="pl-2.5"
        src="ReturnObjectCBoolean"
        :nonStoreMdl="true"
        :placeholder="tr('enter-a-value') + '...'"
        mdlKey="raw"
        :setOnlyKeyValue="true"
        type="boolean"
        :value="val"
        @init-new-value="setInput()"
    />

</e-col>
</template>

<script>
import BlLogicChain from '~/models/BlLogicChain';

export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        }
    },
    computed: {
        val() {
            if (this.actionStep.output.length == 0) {
                return ;
            }

            return this.actionStep.output[0];
        }
    },
    methods: {
        setInput() {
            this.actionStep.output.push(BlLogicChain.create({
                id: generateRandomString(10),
                // property: 'body',
                type: 'text'
            }));
        },
    }
}
</script>