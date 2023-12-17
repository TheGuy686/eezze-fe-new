<style lang="less">
.badge {

}
</style>

<template>
<div
	class="px-3 h-6 rounded-full text-xs font-semibold flex items-center"
	:class="`bg-${color} text-white`"
	:style="`background-color: ${color};`"
>
    <span class="w-2 h-2 rounded-full mr-1" :class="`bg-${color}`"></span>

    <span>

    	<slot></slot>

    </span>
</div>
</template>
<script>
export default {
    props: {
		color: {
			type: String,
			default: 'teal',
		}
    }
};
</script>
  