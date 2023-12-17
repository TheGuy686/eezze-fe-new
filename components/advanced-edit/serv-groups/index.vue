<template>
<!-- <e-col>

<h4 class="pl-1">
    
    <u>{{ tr('service-groups') }}</u>

</h4>

<e-col ai="fs" bev-cont :key="sg.id" v-for="sg in sgsDict">

    <h4 class="pt-1 mb-0">#{{ sg.id }} - {{ sg.name }}</h4>

    <span class="sg-desc">{{ sg.description }}</span>

    <e-row>

        <e-col :span="3">

            <a-list size="small" bordered :data-source="sg?.services?.rest ?? []">

                <template #header>

                    <div>{{ tr('rest', { upper: true }) }}</div>

                </template>

                <template #renderItem="{ item }">

                    <a-list-item>{{ item }}</a-list-item>

                </template>
                
            </a-list>

        </e-col>

        <e-col :span="3">

            <a-list size="small" bordered :data-source="sg?.services?.websockets ?? []">

                <template #header>

                    <div>{{ tr('websockets', { upper: true }) }}</div>

                </template>

                <template #renderItem="{ item }">

                    <a-list-item>{{ item }}</a-list-item>

                </template>

            </a-list>

        </e-col>

        <e-col :span="3">

            <a-list size="small" bordered :data-source="sg?.services?.cron ?? []">

                <template #header>

                    <div>{{ tr('cron', { upper: true }) }}</div>

                </template>

                <template #renderItem="{ item }">

                    <a-list-item>{{ item }}</a-list-item>

                </template>

            </a-list>

        </e-col>

    </e-row>

</e-col>

</e-col> -->
</template>   