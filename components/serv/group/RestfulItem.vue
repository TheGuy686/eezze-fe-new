<style lang="less" scoped>
.rest-item-root {
    .item {
        position: relative;

        .bg-area {
            position: absolute;
            top: -7px;
            left: 0;
            bottom: -7px;
            right: 0;
        }

        .click-area {
            position: absolute;
            top: -7px;
            left: -5px;
            bottom: -7px;
            right: -5px;

            &:hover {
                cursor: pointer;
                border: solid 1px rgba(0, 0, 0, 0.2);
                border-radius: 5px;
            }
        }
    }

    .active-item {
        .click-area {
            position: absolute;
            top: -7px;
            left: -5px;
            bottom: -7px;
            right: -5px;
            border: solid 1px rgba(0, 0, 0, 0.2);
            border-radius: 5px;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>

<template>
<div class="rest-item-root mt-4 mb-4 ml-5 mr-5">

    <div
        :class="'mt-4 item ' + (index == activeIndex ? 'active-item' : '')"
        :key="service.id"
        v-for="(service, index) in services"
    >

        <div class="bg-area" />

        <a-tag :class="getRestMethodColor(service) + ' inline py-1 px-3.5 text-lg font-medium text-white'">

            {{ getMethodLabel(service) }}

        </a-tag>

        <p class="inline">

            {{ service?.definition?.path }}

        </p>

        <div class="click-area" @click="setActiveIndex(index); $emit('item-clicked', service)" />

        <GeneralIcon class="inline-block float-right" :type="'delete-circle'" @click="$emit('delete-item')" />

    </div>

</div>
</template>

<script>
export default {
    props: {
        services: Array,
    },
    data() {
        return {
            activeIndex: -1,
        }
    },
    methods: {
        getMethodLabel(service) {
            switch (service?.definition?.method) {
                case 'put': return this.tr('put', {toUpper: true});
                case 'post': return this.tr('post', {toUpper: true});
                case 'delete': return this.tr('del', {toUpper: true});
                default: return this.tr('get', {toUpper: true});
            }
        },
        getRestMethodColor(service) {
            switch (service?.definition?.method) {
                case 'put': return 'bg-warning';
                case 'post': return 'bg-secondary';
                case 'delete': return 'bg-error';
                default: return 'bg-success';
            }
        },
        reset() {
            this.setActiveIndex(-1);
        },
        setActiveIndex(index) {
            this.activeIndex = index;
        },
    }
}
</script>
