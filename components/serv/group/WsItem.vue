<style lang="less" scoped>
.ws-item-root {
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
</style><template>
<div class="ws-item-root mt-4 mb-4">

    <div
        :class="'item mt-4 ml-5 mr-5 ' + (index == activeIndex ? 'active-item' : '')"
        :key="service.id"
        v-for="(service, index) in services"
    >

        <div class="bg-area" />

        <a-tag :class="getWsMethodColor(service) + ' inline py-1 px-4 text-lg font-medium text-white'">

            {{ getWsDirectionLabel(service) }}

        </a-tag>

        <p class="inline">

            {{ getShortMethod(service) }}

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
        getShortMethod(service) {
            const threshhold = 17;

            const type = service?.definition?.eventType;

            let str = '';

            switch (type) {
                case 'channel': {
                    str = service?.definition?.id ?? this.tr('no-channel-id');
                    break;
                }
                // default to on
                default: {
                    str = service?.definition?.eventName ?? this.tr('no-event-defined');
                }
            }

            if (str.length < threshhold) return str;

            return str.substr(0, threshhold) + '...';
        },
        getWsDirectionLabel(service) {
            if (service?.definition?.onConnectionSubscribe || service?.definition?.onDisConnectionSubscribe) {
                return this.tr('on-sh', {toUpper: true});
            }

            const type = service?.definition?.eventType;

            switch (type) {
                case 'channel': return this.tr('channel-sh', { toUpper: true });
                case 'broadcast': return this.tr('broadcast-sh', { toUpper: true });
                case 'notify': return this.tr('notify-sh', { toUpper: true });
                default: return this.tr('on-sh', { toUpper: true });
            }
        },
        getWsMethodColor(service) {
            if (service?.definition?.onConnectionSubscribe || service?.definition?.onDisConnectionSubscribe) {
                return 'bg-success';
            }

            const type = service?.definition?.eventType;

            switch (type) {
                case 'channel': return 'bg-error'
                case 'broadcast': return 'bg-primary'
                case 'notify': return 'bg-warn'
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
