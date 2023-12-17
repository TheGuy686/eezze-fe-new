<template>
<div>

    <h2 v-html="tr('cp-basic-q6')" />

    <div class="pl-10 mt-5">

        <e-row>

            <e-col w-25 class="p-1">

                {{ tr('key') }}

            </e-col>

            <e-col w-50 class="p-1">

                {{ tr('value') }}

            </e-col>

        </e-row>

        <VaultFormKeyValueItem
            :key="index"
            :disableMakeSecret="true"
            :isLastIndex="false"
            v-model="proj.envVals[index]"
            @delete-clicked="proj.envVals.splice(index, 1)"
            v-for="(item, index) in proj.envVals"
        />

        <VaultFormKeyValueItem
            :disableMakeSecret="true"
            :isLastIndex="true"
            v-model="newItem"
            @add-clicked="proj.envVals.push({...newItem})"
        />

    </div>

</div>
</template>

<script>
export default {
    props: {
        proj: Object,
    },
    data() {
        return {
            newItem: {
                key: '',
                value: '',
                type: 'text',
            },
        }
    }
}
</script>