<template>
<div style="text-align: left; min-height: 40vh; max-height: 60vh;" e-scroll>

    <h2>{{ tr('values') }}</h2>

    <a-list size="small" bordered :data-source="values">

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

        <template #renderItem="{ key, value }">

            <a-list-item>

                <e-row>

                    <e-col w-30>

                        {{ key }}:

                    </e-col>

                    <e-col w-70>

                        {{ value }}
                        
                    </e-col>

                </e-row>

            </a-list-item>

        </template>

    </a-list>

</div>
</template>

<script>
export default {
    props: {
        values: Array,
    }
}
</script>