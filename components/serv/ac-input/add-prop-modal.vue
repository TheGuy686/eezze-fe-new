<template>
<EModal
    ref="mdl"
    :width="700"
    :title="tr((isEdit ? 'edit' : 'add') + '-input-prop')"
    @right-btn-clicked="rightBtnClicked()"
    @modal-closed="resetDefaults()"
>
    <div style="max-height: 60vh; margin-right: -10px;" class="pr-2" e-scroll>
        
        <e-col>

            <e-row jc="sa" ai="c" :center="true">
            
                <e-col clss="pr-2" jc="c">

                    <EFormInput
                        :name="tr('property')"
                        :message="tr('please-input-a-name')"
                        v-model="newProp.property"
                    />

                </e-col>

                <e-tag-drop-down
                    clss="mt-6"
                    colorCol="color"
                    keyCol="key"
                    valueCol="label"
                    :maxLength="15"
                    :options="actionInputTypes"
                    :placeholder="tr('return-type')"
                    v-model="newProp.type"
                />

            </e-row>

            <ServAcInputTsJwt
                :propItem="newProp"
                :aiProps="keyify(newProp.props, 'property')"
                @props-changed="newProp.props = $event"
                @add-headers-changed="newProp.additionalHeaders = $event"
                v-if="newProp.type == 'jwt-token'"
            />

            <ServAcInputTsDefault
                :propItem="newProp"
                :aiProps="keyify(newProp.props, 'property')"
                @props-changed="newProp.props = $event"
                v-else-if="isStandard"
            />
            
        </e-col>

        <!-- <e-row>

            <e-col w-50>
    
                New Prop:

                <d :d="newProp" />

            </e-col>

            <e-col w-50>

                ENtity: 

                <d :d="entity" />

            </e-col>

        </e-row> -->
    
    </div>

</EModal>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default {
    props: {
        entity: Object,
    },
    computed: {
        ...mapGetters({
            actionInputTypes: 'project/entity-presets/actionInputTypes',
        }),

        isStandard() { return true },
    },
    data() {
        return {
            isEdit: false,
            editingIndex: -1,
            newProp: {
                property: '',
                type: 'text',
                required: false,
                valutKey: '',
                additionalHeaders: [],
                metadata: {
                    regex: '',
                    valut: '',
                },
                props: {},
            },
        }
    },
    methods: {
        resetDefaults() {
            this.newProp = {
                property: '',
                type: 'text',
                required: false,
                valutKey: '',
                additionalHeaders: [],
                metadata: {
                    regex: '',
                    valut: '',
                },
                props: {},
            };  
        },
        show(prop, editingIndex) {
            this.isEdit = typeof prop == 'object' && Object.keys(prop).length > 0;

            if (prop) {
                let objIn = this.cloneObj(prop);

                objIn.props = this.keyify(Object.values(objIn.props), 'property');

                this.newProp = this.cloneObj(objIn);

                this.editingIndex = editingIndex;
            }

            this.$refs['mdl'].show();
        },
        rightBtnClicked() {
            const item = this.cloneObj(this.newProp);

            item.props = Object.values(item.props);

            if (this.isEdit) {
                Vue.set(this.entity.actionInput , this.editingIndex, item);
            }
            else {
                const items = this.entity.actionInput;

                items.push(item);

                Vue.set(this.entity, 'actionInput', items);
            }
            
            this.$refs['mdl'].hide();
        },
    },
}
</script>