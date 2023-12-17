<style lang="less" scoped>

</style>

<template>
<ETutOverlay
    ref="tut-overlay"   
    :width="95"
    :height="62"
    :x="x"
    :y="y"
    :tutorialText="tr('add-logging-server-type-from-here')"
/>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('app', [
            'devBarCollpsed',
            'windowHeight',
            'windowWidth'
        ]),
    },
    data() {
        return {
            x: this.devBarCollpsed ? 67.5 : 90,
            y: 16,
        }
    },
    methods: {
        getCoords() {
            const elements = document.getElementsByClassName('bg-success text-white ant-btn ant-btn-lg');

            // Access the specific element (e.g., first element in the collection)
            const element = elements[0];

            // Get the bounding rectangle of the element
            const rect = element.getBoundingClientRect();

            // Retrieve the x and y coordinates
            const x = rect.x || rect.left;
            const y = rect.y || rect.top;

            this.x = this.percentage(x + 30, this.windowWidth, true);
            this.y = this.percentage(y + 20, this.windowHeight, true);

            // console.log('x:', x);
            // console.log('y:', y);
        },
        start() { this.getCoords(); this.$refs['tut-overlay'].start() },
        close() { this.$refs['tut-overlay'].close() }
    }
}
</script>