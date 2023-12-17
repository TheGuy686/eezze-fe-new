<style lang="less" scoped>
.action-header-root {
    margin-top: -15px;
    .edit-basic-infot-icon {
        cursor: pointer;
    }
}
</style>

<template>
<div class="pt-5 action-header-root">

    <div class="inline-block">

        <p class="inline-block font-semibold text-black-1 text-xl">

            {{ action + ' > ' + subAction }}

        </p>

        <GeneralIcon
            class="inline-block mr-2 ml-3 edit-basic-infot-icon"
            :type="'edit-grey'"
            @click="$emit('edit-basic-action-info')"
        />

        <p class="mt-3">

            {{ details }} <b>#{{ actionStep.name }}</b>

        </p>

    </div>

    <div class="inline">

        <a-button
            size="large"
            class="inline bg-success float-right text-white ml-5"
            @click="$emit('save-action-clicked')"
        >

            {{ tr('save-action') }}

        </a-button>

        <a-button size="large" class="inline float-right" @click="$emit('close')">

            {{ tr('close') }}

        </a-button>

    </div>

</div>
</template>

<script>
export default {
    props: {
        action: {
            type: String,
            default: ''
        },
        subAction: {
            type: String,
            default: ''
        },
        details: {
            type: String,
            default: ''
        },
        actionStep: {
            type: Object,
            required: true,
        }
    },
}
</script>
