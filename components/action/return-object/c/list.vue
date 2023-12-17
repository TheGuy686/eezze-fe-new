<style lang="less">
.return-obect-c-list-root {

}
</style>

<template>
<e-row clss="return-obect-c-list-root mt-3">

    <ActionLogicMdlInputKey
        clss="pl-2.5"
        src="ReturnObjectCList"
        :nonStoreMdl="true"
        :placeholder="tr('enter-a-value') + '...'"
        mdlKey="raw"
        :setOnlyKeyValue="true"
        :hideInput="true"
        :value="val"
        @init-new-value="setInput()"
    />

</e-row>
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
            if (this.actionStep.output.length == 0) return;

            return this.actionStep.output[0];
        }
    },
    methods: {
        setInput() {
            this.actionStep.output.push(BlLogicChain.create({
                id: generateRandomString(10),
                type: 'logic-chain'
            }));
        }
    }
}
</script>