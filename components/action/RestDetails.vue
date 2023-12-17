<style lang="less" scoped>
.file-details-root {}
</style>

<template>
<div class="mt-10 pt-10 file-details-root">

    <p class="font-semibold text-black-1 text-lg">
        
        {{ tr('set-rest-method') }}
        
    </p>

    <e-row>

        <a-radio-group
            class="mt-2 mb-5"
            button-style="solid"
            :value="method.value"
            @input="setMethod($event)"
        >
            <a-radio-button value="get">

                {{ tr('get', {toUpper: true}) }}

            </a-radio-button>

            <a-radio-button value="post">

                {{ tr('post', {toUpper: true}) }}

            </a-radio-button>

            <a-radio-button value="put">

                {{ tr('put', {toUpper: true}) }}

            </a-radio-button>

            <a-radio-button value="delete">

                {{ tr('delete', {toUpper: true}) }}

            </a-radio-button>

        </a-radio-group>

    </e-row>

    <e-row :fillParent="true">

        <ActionLogicMdlInput
            clss="pl-2.5"
            :placeholder="tr('set-a-path') + '...'"
            addonBefore="/"
            castTo="website-path"
            src="RestDetails->path"
            mdlKey="path"
            v-model="actionStep.schema"
            @show-bl-mdl="$emit('show-bl-mdl')"
        />

    </e-row>

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('cms/file-types', {
            fileTypes: (state) => state?.entities ?? [],
        }),
        method() {
            return {
                value: this.actionStep.schema.method ?? 'get',
                increment: this.increment,
            }
        },
    },
    data() {
        return { increment: 0 }
    },
    methods: {
        setMethod(method) {
            this.increment++;
            this.actionStep.schema.method = method;
        },
    }
}
</script>