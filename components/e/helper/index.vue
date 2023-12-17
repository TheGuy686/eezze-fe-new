<style lang="less">

.root-help-content {
    min-height: 390px;
    max-height: 420px;
    min-width: 300px;
    max-width: 400px;
    overflow-y: scroll;
}
</style>

<template>
<div class="root-help-content scroll-cont">

    <h3 v-html="helpTitle"></h3>

    <div v-html="helpContent"></div>

</div>
</template>

<script lang="ts">

let self: any;

export default {
    beforeCreate() {self = this},

    props: {
        helpKey: {
            type: String,
            required: true,
        },
    },
    computed: {
        helpTitle() {
            try {
                return self.$store.state.cms.help.help[self.helpKey].title;
            }
            catch (e: any) {
                console.log('ERROR GETTING KEY: ', self.helpKey, ' : ', e.message);
                return '';
            }
        },
        helpContent() {
            try {
                return self.$store.state.cms.help.help[self.helpKey].content;
            }
            catch (e: any) {
                console.log('ERROR GETTING KEY: ', self.helpKey, ' : ', e.message);
                return '';
            }
        }
    },
    methods: {
        show(key: string) {
            console.log('HELLO THERE RYAN: ', key);
        }
    }
}
</script>
