<template>
  <!-- https://github.com/nuxt-community/svg-module -->
  <!-- eslint-disable vue/no-v-html -->
  <i
    :style="stle"
    :class="`inline-block ${clss}`"
    tabindex="-1"
    :aria-label="`icon: ${type}`"
    v-html="require(`@/assets/icons/${type}.svg?raw`)"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
    @click="$emit('click')"
  />
</template>

<script>
export default {
  props: {
    type: { type: String, default: '' },
    clss: { type: String, default: '' },
    stle: { type: String, default: '' },
  }
}
</script>