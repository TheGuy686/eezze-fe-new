<template>
<a-layout-sider
    :trigger="null"
    width="1"
    collapsedWidth="400"
    theme="light"
    collapsible
    v-model="collapsed"
>

    <div :class="collapsed ? 'open' : 'collapsed'">

        <p class="pl-5 pt-5 font-bold text-black-1">

            {{ tr('service-list') }}

        </p>

        <div v-for="(not, index) in serviceList" :key="index">

        </div>
    </div>

</a-layout-sider>
</template>

<script>
export default {
    props: {
        collapsed: {
            type: Boolean,
            default: true,
        },
    },

    data: () => ({
        serviceList: []
    }),

    async fetch() {
        const self = this;
        try {
            await this.$axios.get(self.endpoints.service.all, self.user)
                .then(response => {
                    self.serviceList = response.data
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (error) {
            console.error('error', error);
        }
    },

    methods: {

    }
};
</script>

<style lang="less" scoped>
.collapsed {
    padding: 0.01px !important;
    display: none;
}

.open {
    padding: 0%;
}
</style>