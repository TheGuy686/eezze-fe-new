<style lang="less" scoped>
.return-type-cont {
    span { margin-right: 10px; }
}
</style>

<template>
<div class="return-type-cont" non-sel bl-bevel-cont>

    <span non-sel>
        
        {{ tr('return-type') }}:
    
    </span>

    <e-tag-drop-down
        stle="margin-left: 8px;"
        colorCol="color"
        keyCol="key"
        valueCol="label"
        :options="logicReturnTypes"
        v-model="item.returns"
        v-if="isEditable && item"
    />

    <a-tag :color="labelColor" non-sel v-else>

        {{ label }}

    </a-tag>

</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    props: {
        item: {
            type: Object,
        },
        type: {
            type: String,
            require: true,
        },
        isEditable: Boolean,
    },
    computed: {
        ...mapState('project/entity-presets', [ 'keyTypes' ]),
        ...mapGetters({
            logicReturnTypes: 'project/entity-presets/logicReturnTypes',
        }),
        labelColor() {
            try {
                return this.keyTypes[this.type]?.color;
            }
            catch (err) {
                console.log('ReturnType.error: color did not exist for type: ', this.type);
                return 'na';
            }
        },
        label() {
            try {
                return this.keyTypes[this.type]?.label;
            }
            catch (err) {
                console.log('ReturnType.error: Label did not exist for type: ', this.type);
                return 'na';
            }
        }
    },
}
</script>
