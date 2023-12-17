<template>
<GeneralBeveledGrid>

    <template v-for="item in logicTypes">

        <GeneralBeveledGridItem
            :id="item.id"
            :title="item.title"
            v-model="selectedKeys"
            :key="item.id"
            v-if="!shouldHideOption(item.id) && item.id != 'new'"
            @input="$emit('logic-type-selected', $event[0])"
        />

    </template>

</GeneralBeveledGrid>
</template>

<script>
export default {
    props: {
        filterId: {
            type: String,
            require: true,
        },
        logicTypes: {
            type: Array,
            require: true,
        },
        item: {
            type: Object,
            require: true,
        },
        hiddenSections: {
            type: Array,
            required: true,
        },
    },
    computed: {
        isVisible() {
            return this.item.id == this.filterId && this.item.type == 'new';
        },
        shouldHideOption() {
            return function (key) {
                if (this.hiddenSections.length == 0) return false;

                if (key.indexOf('state') >= 0 && this.hiddenSections.includes('state')) {
                    return true;
                }

                if (key.indexOf('stash') >= 0 && this.hiddenSections.includes('stash')) {
                    return true;
                }

                if (key.indexOf('assign-values') >= 0 && this.hiddenSections.includes('assign-values')) {
                    return true;
                }

                if (key.indexOf('list') >= 0 && this.hiddenSections.includes('list')) {
                    return true;
                }

                if (key.indexOf('number-operation') >= 0 && this.hiddenSections.includes('number-operation')) {
                    return true;
                }

                if (key.indexOf('formatter') >= 0 && this.hiddenSections.includes('formatter')) {
                    return true;
                }

                return false;
            }
        }
    },
    data() {
        return {
            selectedKeys: [],
        }
    }
}
</script>