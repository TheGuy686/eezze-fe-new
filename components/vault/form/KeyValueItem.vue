<style lang="less">
.key-value-items-root {
    .btn {
        cursor: pointer;
    }

    .add-btn-disabled {
        cursor: not-allowed;
    }
}
</style>

<template>
<e-row class="key-value-items-root">

    <e-col w-25 class="p-1">

        <EFormInput
            ref="input-key"
            class="mt-1"
            :inlineOver="true"
            :name="tr('name')"
            :placeholder="tr('please-input-a-name')"
            :hasError="!keyIsvalid"
            inputCase="upperUnderscoreCase"
            v-model="value.key"
            @enter-pressed="onEnterPressed('input-value')"
        />

    </e-col>

    <e-col w-50 class="p-1">

        <EFormTextArea
            ref="input-value"
            class="mt-1"
            :name="tr('value')"
            :placeholder="tr('please-input-a-value')"
            :inlineOver="true"
            :hasError="!valueIsValid"
            v-model="value.value"
            @enter-pressed="onEnterPressed('input-key')"
            v-if="!value.isSecret"
        />

        <EFormInput
            ref="input-value"
            class="mt-1"
            :name="tr('value')"
            :placeholder="tr('please-input-a-value')"
            :inlineOver="true"
            :hasError="!valueIsValid"
            :type="value.isSecret ? 'password': 'text'"
            v-model="value.value"
            @enter-pressed="onEnterPressed('input-key')"
            v-else
        />

    </e-col>

    <e-row w-25 ai="c" jc="sb" class="p-1">

        <e-col jc="c" :span="2">

            <EFormCheckBox
                :inlineOver="true"
                name="is-secret"
                :hideLabel="true"
                :trueValue="true"
                :defaultValue="false"
                v-model="value.isSecret"
                v-if="!disableMakeSecret"
            />

        </e-col>

        <e-row :span="2" jc="c">

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

</e-row>
</template>

<script>
export default {
    props: {
        disableMakeSecret: Boolean,
        isLastIndex: Boolean,
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
        valueIsValid() {
            if (!this.value?.value || this.value?.value == '') return false;

            return true;
        },
        disableAdd() {
            return !this.keyIsvalid || !this.valueIsValid;
        },
        mainMdl() {
            return {
                key: this.value?.key,
                value: this.value?.value,
                isSecret: this.value?.isSecret,
            }
        }
    },
    watch: {
        mainMdl(to) {
            this.$emit('item-changed', to);
        }
    },
    methods: {
        onEnterPressed(ref) {
            if (!this.valueIsValid) {
                if (!this.keyIsvalid) {
                    this.$refs[ref].focus();
                }
                else if (this.keyIsvalid && !this.valueIsValid) {
                    this.$refs['input-value'].focus();
                }
            }
            else {
                console.log('ELSE');
                if (!this.keyIsvalid) {
                    this.$refs[ref].focus();
                }
                else {
                    this.addClicked();
                }
            }
        },
        addClicked() {
            if (this.disableAdd) return;

            this.$emit('add-clicked');

            setTimeout(() => {
                this.value.key = '';
                this.value.value = '';
                this.value.isSecret = false;
            }, 20);
        }
    }
}
</script>
