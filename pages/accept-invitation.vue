<template>
<div
    class="
        relative
        flex flex-col
        items-center
        justify-center
        min-h-screen
        bg-primary
        overflow-hidden
    "
>

    <img src="../assets/icons/hero.png" class="absolute object-cover w-full bg-center bg-cover pb-20" alt="waves" />

    <div class="text-center">

        <GeneralLogo class="mb-6 text-8xl" />

    </div>

    <e-col :center="true">

        <h1 class="text-white">{{ tr('invitation-accepted') }}</h1>

    </e-col>

    <a-button type="link" href="home" class="mt-5 text-lg text-white font-semibold">

        {{ tr('return-to-home') }}

    </a-button>

</div>
</template>

<script>
export default {
    layout: 'plain',
    // middleware: ['notAuthenticated'],

    data() {
        return {
        }
    },
    methods: {}
}
</script>