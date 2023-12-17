<style lang="less">
.regex-validation {

}
</style>

<template>
<EModal
    ref="mdl"
    :width="1200"
    :hideLeftBtn="true"
    :title="tr('advanced-regex-validation')"
>
    <regex-editor
        :value="value"
        @input="$emit('input', $event)"
    />

</EModal>
</template>

<script>
export default {
    props: {
        value: String,
        hideLeftBtn: {
            type: Boolean,
            default: true,
        }
    },
    watch: {
        regItem(to) {
            this.$emit('regex-create-mdl', this.cloneObj(to));
        },
    },
    computed: {
        regItem() {
            const self = this;

            return JSON.parse(JSON.stringify({
                "example": "",
                "id": "action-0",
                "filterId": "VRt9MaeTIL",
                "property": "input",
                "name": "Custom REGEX Validation",
                "desc": "New Item Default Desc",
                "baseType": "logic-chain",
                "type": "text",
                "raw": "",
                "actions": [
                    {
                        "id": "rUdzKZkAFd",
                        "filterId": "T1zLbPwChN",
                        "property": "input",
                        "name": "Action 1",
                        "type": "string",
                        "actions": [
                            {
                                "id": "dXGr1d6OWk",
                                "filterId": "HhbaRwgrZq",
                                "type": "custom",
                                "name": "Logic item \"0\"",
                                "logic": {
                                "raw": `return ${self.value}.test(val);`,
                                "formula": "",
                                "source": "",
                                "prop": "",
                                "type": "",
                                "subtype": "",
                                "variables": [],
                                "opArgs": []
                                },
                                "returns": "text",
                                "actions": []
                            }
                        ]
                    }
                ]
            }));
        },
    },
    methods: {
        show() {
            this.$refs['mdl'].show();
        },
    }
}
</script>