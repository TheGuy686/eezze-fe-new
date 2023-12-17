<template>
<div>

    <h2 v-html="tr('cp-basic-q1')" />

    <a-radio-group class="mt-5" v-model="answer" non-sel>

        <a-radio-button value="easy">
            
            {{ tr('easy') }}

        </a-radio-button>

        <a-radio-button value="not-sure">
            
            {{ tr('not-sure') }}

        </a-radio-button>

        <a-radio-button value="im-really-confused">
            
            {{ tr('im-really-confused') }}

        </a-radio-button>

    </a-radio-group>

</div>
</template>

<script>
export default {
    data() {
        return {
            answer: 'easy',
        }
    },
}
</script>