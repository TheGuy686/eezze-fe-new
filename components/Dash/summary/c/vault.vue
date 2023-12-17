<template>
<div style="text-align: left; min-height: 40vh; max-height: 60vh;" e-scroll>

    <template v-if="Array.isArray(vault)">

        <h2>{{ tr('vaultes') }}</h2>

        <a-list size="small" bordered :data-source="v?.keyValues ?? []" :key="i" v-for="(v, i) in vault">

            <template #header>

                <e-row>

                    <e-col w-30>

                        <b>{{ tr('key') }}</b>

                    </e-col>

                    <e-col w-70>

                        <b>{{ tr('value') }}</b>
                        
                    </e-col>

                </e-row>

            </template>

            <template #renderItem="{ key, value, isSecret }">

                <a-list-item>

                    <e-row>

                        <e-col w-30>

                            {{ key }}:

                        </e-col>

                        <e-row w-70>

                            {{ value }}

                            <a-tag class="ml-3" color="blue" v-if="isSecret">

                                {{ tr('is-secret') }}

                            </a-tag>
                            
                        </e-row>

                    </e-row>

                </a-list-item>

            </template>

        </a-list>

    </template>

    <template v-else>

        <h2>{{ tr('vault') }}</h2>

        <a-list size="small" bordered :data-source="vault?.keyValues ?? []">

            <template #header>

                <e-row>

                    <e-col w-30>

                        <b>{{ tr('key') }}</b>

                    </e-col>

                    <e-col w-70>

                        <b>{{ tr('value') }}</b>
                        
                    </e-col>

                </e-row>

            </template>

            <template #renderItem="{ key, value, isSecret }">

                <a-list-item>

                    <e-row>

                        <e-col w-30>

                            {{ key }}:

                        </e-col>

                        <e-row w-70>

                            {{ value }}

                            <a-tag class="ml-3" color="blue" v-if="isSecret">

                                {{ tr('is-secret') }}

                            </a-tag>
                            
                        </e-row>

                    </e-row>

                </a-list-item>

            </template>

        </a-list>

    </template>

</div>
</template>

<script>
export default {
    props: {
        vault: Object | Array,
    },
}
</script>