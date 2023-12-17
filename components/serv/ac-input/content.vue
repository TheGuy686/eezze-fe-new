<template>
<div>

    <a-list size="large" bordered :data-source="entity.actionInput">

        <template #header>
            
            <e-row>

                <e-col w-75>

                    <h4>{{ tr('vars-defined-action-input-info') }}</h4>

                </e-col>

                <e-col dir="reverse" w-25>

                    <a-button shape="circle" type="primary" icon="plus" @click="addEditProp()" />

                </e-col>

            </e-row>
  
        </template>

        <template #renderItem="item, index">

            <a-list-item>

                <e-row>

                    <e-col jc="c" w-60>
        
                        <EFormInput
                            :name="tr('property-name')"
                            :placeholder="tr('property-name')"
                            :inlineOver="true"
                            inputCase="camelCase"
                            :hasError="hasError(item.property)"
                            :error="tr('property-already-exists')"
                            v-model="item.property"
                            @input="itteration++"
                        />
        
                    </e-col>
        
                    <e-row w-20 jc="sa" ai="c" :center="true">
        
                        <e-tag-drop-down
                            colorCol="color"
                            keyCol="key"
                            valueCol="label"
                            :maxLength="15"
                            :locked="true"
                            :options="logicReturnTypes"
                            :placeholder="tr('return-type')"
                            v-model="item.type"
                        />
        
                    </e-row>

                    <e-row w-20 jc="fe" ai="c" :center="true">

                        <a-button
                            shape="circle"
                            icon="edit"
                            @click="addEditProp(item, index)"
                        />

                    </e-row>
        
                </e-row>

            </a-list-item>

        </template>

    </a-list>
 
    <ServAcInputAddPropModal
        ref="add-prop-modal"
        :entity="entity"
        @props-changed="emitEntityChanges()"
    />

</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters({
            logicReturnTypes: 'project/entity-presets/logicReturnTypes',
        }),

        val() {
            if (this.entity.actionInput.length == 0) return;
            return this.entity.output[0];
        },
        allProps() {
            const currentProps = [];

            for (const i of this.entity.actionInput ?? []) {
                currentProps.push(i.property);
            }

            return {
                props: currentProps,
                itteration: this.itteration,
            };
        },
        hasError() {
            return (prop) => {
                const props = this.allProps.props.filter((p) => p == prop);
                return props.length > 1;
            };
        }
    },
    data() {
        return {
            itteration: 0,
        }
    },
    methods: {
        emitEntityChanges() {
console.clear();
console.log('emitted entity change: '), {...this.entity};
            this.$emit('save-entity-changes', {...this.entity});
        },
        roleSelected() {
            this.emitEntityChanges();
        },
        addEditProp(prop, index) {
            this.$refs['add-prop-modal'].show(prop, index);
        },
    }
}
</script>
