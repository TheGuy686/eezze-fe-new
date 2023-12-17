<style lang="less" scoped>
.cron-item-root {
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
<div class="cron-item-root mt-4 mb-4 ml-5 mr-5">

    <div 
        :class="'mt-4 item ' + (index == activeIndex ? 'active-item' : '')" 
        :key="service.id"
        v-for="(service, index) in services"
    >

        <div class="bg-area" />

        <!-- <a-tag :class="getCronMethodColor(service) + ' inline py-1 px-4 text-lg font-medium text-white'">
            
            {{ (service?.definition?.period ?? '').toUpperCase() }}

        </a-tag> -->

        <p class="inline">{{ getShortName(service) }}</p>

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
        getCronMethodColor(service) {
            switch (service?.definition?.period) {
                case 'day': return 'bg-warning';
                default: return 'bg-secondary';
            }
        },
        getShortName(service) {
            const threshhold = 17;

            let name = service?.name ?? '';

            if (name.length < threshhold) return name;

            return name.substr(0, threshhold) + '...';
        },
        reset() {
            this.setActiveIndex(-1);
        },
        setActiveIndex(index) {
            this.activeIndex = index;
        }
    }
}
</script>
