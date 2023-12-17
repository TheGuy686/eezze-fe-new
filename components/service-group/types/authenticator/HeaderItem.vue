<style lang="less">
.additional-headers-item-root {
    .btn {
        cursor: pointer;
    }

    .add-btn-disabled {
        cursor: not-allowed;
    }
}
</style>

<template>
<e-row class="additional-headers-item-root">

    <e-col :fillParent="true" class="p-1">

        <EFormInput
            class="mt-1"
            :inlineOver="true"
            :name="tr('name')"
            :placeholder="tr('please-input-a-header-name')"
            :hasError="!keyIsvalid"
            inputCase="kebabCase"
            v-model="value.key"
            @enter-pressed="addClicked()"
        />

    </e-col>

    <e-col :fillParent="true" class="p-1">

        <EFormInput
            class="mt-1"
            :inlineOver="true"
            :name="tr('value')"
            :placeholder="tr('please-input-a-type-value')"
            :hasError="!keyIsvalid"
            v-model="value.value"
            @enter-pressed="addClicked()"
        />

    </e-col>

    <e-row w-25 ai="c" class="p-1">

        <GeneralIcon
            class="btn"
            type="minus-circle-ol-red"
            @click="$emit('delete-clicked')"
            v-if="!isLastIndex"
        />

        <GeneralIcon
            :class="disableAdd ? 'add-btn-disabled' : 'btn'"
            type="plus-circle-ol-lb"
            @click="addClicked()"
            v-else
        />

    </e-row>

</e-row>
</template>

<script>
export default {
    props: {
        isLastIndex: Boolean,
        allHeaders: {
            type: Array,
            required: true,
        },
        value: {
            type: Object,
            required: true,
        }
    },
    computed: {
        keyIsvalid() {
            if (!this.value?.key || this.value?.key == '') return false;

            return true;
        },
        disableAdd() { return !this.keyIsvalid },
        mainMdl() {
            return { key: this.value?.key }
        }
    },
    watch: {
        mainMdl(to) {
            this.$emit('item-changed', to);
        }
    },
    methods: {
        addClicked() {
            if (this.disableAdd) return;

            this.$emit('add-clicked');

            setTimeout(() => { 
                this.value.key = '';
                this.value.value = '';
            }, 20);
        }
    }
}
</script>
