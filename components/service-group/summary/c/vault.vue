<template>
<div style="text-align: left; min-height: 40vh; max-height: 60vh;" e-scroll>

    <h2>{{ tr('credentials-vault') }}</h2>

    <a-list size="small" bordered :data-source="v?.keyValues ?? []" :key="i" v-for="(v, i) in vaults">

        <template #header>

            <e-row>

                <e-col w-50>

                    <b>{{ tr('key') }}</b>

                </e-col>

                <e-col w-50>

                    <b>{{ tr('value') }}</b>
                    
                </e-col>

            </e-row>

        </template>

        <template #renderItem="item">

            <a-list-item>

                <e-row>

                    <e-col w-30 jc="c">

                        {{ item.key }}:

                    </e-col>

                    <e-row w-70>

                        <EFormInput
                            :type="item.isSecret ? 'password' : 'text'"
                            v-model="item.value"
                            @input="valueChainged(item, $event)"
                        />

                        <a-tag class="ml-3" color="blue" v-if="item.isSecret">

                            {{ tr('is-secret') }}

                        </a-tag>
                        
                    </e-row>

                </e-row>

            </a-list-item>

        </template>

    </a-list>

</div>
</template>

<script>
export default {
    props: {
        vaults: Object | Array,
    },
    methods: {
        valueChainged(item, value) {
            this.events.emit('create-edit-override-value', { key: item.key, value })
        },
    }
}
</script>