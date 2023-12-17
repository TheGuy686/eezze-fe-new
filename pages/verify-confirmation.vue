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

        <h1 class="text-white">{{ tr('account-verified') }}</h1>

    </e-col>

    <a-button type="link" href="login" class="mt-5 text-lg text-white font-semibold">

        {{ tr('return-to-sign-in') }}

    </a-button>

</div>
</template>

<script>
export default {
    layout: 'plain',
    auth: 'guest',
    middleware: ['notAuthenticated'],

    data() {
        return {
        }
    },
    methods: {}
}
</script>