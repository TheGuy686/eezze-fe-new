<template>
<e-col>

    <e-row class="mt-2">

        <e-col w-30 jc="c" non-sel>

            {{ tr('border-box') }}:

        </e-col>

        <e-col w-70 :center="true">

            <EFormCheckBox
                :inlineOver="true"
                name=""
                :trueValue="true"
                defaultValue=""
                v-model="borderBox"
            />

        </e-col>

    </e-row>

</e-col>
</template>

<script>
export default {
    props: {
        editingStyle: {
            type: Object,
            required: true,
        },
    },
    watch: {
        borderBox(to) {
            this.$emit('style-changed', { key: 'box-sizing', value: to });
        }
    },
    data() {
        return {
            borderBox: '',
        }
    }
}
</script>
