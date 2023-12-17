<template>
<div>

    <h2 v-html="tr('cp-basic-q7')" />

    <div class="pl-10 mt-5">

        <e-row>

            <e-col w-25 class="p-1">

                {{ tr('key') }}

            </e-col>

            <e-col w-50 class="p-1">

                {{ tr('value') }}

            </e-col>

            <e-row w-25 class="p-1">

                {{ tr('secret') }}

            </e-row>

        </e-row>

        <VaultFormKeyValueItem
            :key="index"
            :isLastIndex="false"
            v-model="proj.vaultVals[index]"
            @delete-clicked="proj.vaultVals.splice(index, 1)"
            v-for="(item, index) in proj.vaultVals"
        />

        <VaultFormKeyValueItem
            :isLastIndex="true"
            v-model="newItem"
            @add-clicked="proj.vaultVals.push({...newItem})"
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
                isSecret: false,
            },
        }
    }
}
</script>