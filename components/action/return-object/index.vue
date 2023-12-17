<style lang="less" scoped>
.root-return-object {
    .return-cont {
        border: solid 1px rgba(0, 0, 0, 0.4);
        border-radius: 3px;
    }

    .message-cont {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        background: #FFF;
        border: 1px solid #E0E0E0;
        border-radius: 1px;

        .form-input {
            padding-top: 0px !important;
            padding-bottom: 0px !important;
        }

        .se-box {
            display: flex;
            align-items: center;
            padding: 9px 12px;
            border-radius: 2px 0px 0px 2px;
        }
    }

    .add-var-btn { margin-left: 5px; }
}
</style>

<template>
<div>

    <e-col clss="mt-5 root-return-object">
        
        <p class="font-semibold text-black-1 text-lg" v-if="!hideReturnSection">

            {{ tr('return-object') }}

        </p>

        <e-col clss="p-2 return-cont" ai="fs" v-if="!hideReturnSection">

            <e-row>

                <e-row :span="2" ai="c">
                
                    <p class="font-semibold text-black-1 text-l pt-2 pb-2" non-sel>

                        {{ tr('action-messages') }}

                    </p>

                </e-row>

                <e-col dir="reverse" :span="2">

                    <a-popover placement="left">

                        <a-button
                            shape="circle"
                            size="small"
                            type="primary"
                        >

                            <GeneralIcon type="eye-white" />

                        </a-button>

                        <template #title>

                            <h3>{{ tr('output-preview') }}</h3>

                        </template>

                        <template #content>

                            <d :d="actionStep" :expandDepth="2" />

                        </template>

                    </a-popover>

                </e-col>

            </e-row>

            <e-col>

                <div class="message-cont mb-5">

                    <a-col :span="5">

                        <div class="se-box bg-success font-semibold text-white align-middle" non-sel>

                            <GeneralIcon class="inline-block mr-2 ml-3" :type="'success-message'" />

                            {{ tr('success-message') }}

                        </div>

                    </a-col>

                    <a-col :span="5">

                        <EFormSelect
                            class="form-input ant-select-selection--single" 
                            :name="''"
                            placeholder=""
                            keyProp="code"
                            valueProp="name"
                            :options="successCodes"
                            :required="false" 
                            :inlineOver="true"
                            v-model="actionStep.successCode"
                        />

                    </a-col>

                    <a-col :span="14">

                        <EFormInput
                            :name="''"
                            class="form-input" 
                            :message="tr('enter-message')"
                            v-model="actionStep.successMessage"
                        />

                    </a-col>

                </div>

                <div class="message-cont mb-5">

                    <a-col :span="5">

                        <div class="se-box bg-error font-semibold text-white align-middle" non-sel>

                            <GeneralIcon class="inline-block mr-2 ml-3" :type="'error-message'" />

                            {{ tr('error-message') }}

                        </div>

                    </a-col>

                    <a-col :span="5">

                        <EFormSelect
                            name=""
                            placeholder=""
                            keyProp="code"
                            valueProp="name"
                            :options="errorCodes"
                            :required="false" 
                            :inlineOver="true" 
                            v-model="actionStep.errorCode" 
                        />

                    </a-col>

                    <a-col :span="14">

                        <EFormInput
                            name=""
                            :message="tr('enter-message')"
                            v-model="actionStep.errorMessage"
                        />

                    </a-col>

                </div>

            </e-col>

        </e-col>

        <e-col clss="p-2 return-cont mt-3" ai="fs" v-if="!hideReturnSection">

            <e-row ai="c" :clickable="true" @click="returnObjOpen =! returnObjOpen">

                <e-row :span="2">

                    <e-row :span="2">

                        <!-- clss="hoverable" -->

                        <div @click="returnObjOpen =! returnObjOpen">

                            <p class="font-semibold text-black-1 text-l pt-2 pb-2" non-sel>

                                {{ tr('action-output') }} {{  returnDefault  }}

                            </p>

                        </div>

                        <!-- <e-tag-drop-down
                            clss="ml-2"
                            colorCol="color"
                            keyCol="key"
                            valueCol="label"
                            :maxLength="15"
                            :options="logicReturnTypes"
                            :placeholder="tr('return-type')"
                            v-model="actionStep.type"
                            @input="!returnObjOpen ? returnObjOpen = true : undefined"
                        />

                        <div style="flex: 1;" @click="returnObjOpen =! returnObjOpen" /> -->

                    </e-row>

                </e-row>

                <e-row clss="hoverable" :span="2" dir="reverse" ai="c" jc="fe">

                    <!-- <GeneralIcon clss="ml-2" :type="returnObjOpen ? 'up-arrow' : 'down-arrow'" /> -->
                    
                    <template v-if="actionStep?.type == 'object'" @click="returnObjOpen =! returnObjOpen">

                        <a-button 
                            class="add-var-btn" 
                            type="primary" 
                            shape="circle" 
                            size="small" 
                            @click="addItem()"
                        >

                            <GeneralIcon type="plus-white" />

                        </a-button>

                        <!-- <a-popover placement="left">

                            <a-button shape="circle" size="small" type="primary">

                                <GeneralIcon type="eye-white" />

                            </a-button>

                            <template #title>

                                <h3>{{ tr('output-preview') }}</h3>

                            </template>

                            <template #content>

                                <d :d="$refs['output-cont']?.objectPreview?.obj ?? {}" />

                            </template>

                        </a-popover> -->

                    </template>

                    <div style="width: 100%; height: 100%;" @click="returnObjOpen =! returnObjOpen" />

                </e-row>

            </e-row>

            <e-col v-show="returnObjOpen">

                <ReturnContent
                    ref="output-cont"
                    :actionStep="actionStep"
                    @show-bl-mdl="$emit('show-bl-mdl')"
                />

            </e-col>

        </e-col>

    </e-col>

    <e-col clss="mt-5 root-return-object">
        
        <p class="font-semibold text-black-1 text-lg">

            {{ tr('action-hooks') }}

        </p>

        <e-col clss="p-2 return-cont" ai="fs">

            <ActionLogicMdlInput
                clss="pl-2.5"
                src="action-return-object"
                mdlKey="onSuccess"
                :label="tr('on-success')"
                :hideInput="true"
                :hideContextMenu="true"
                v-model="actionStep.schema"
                @show-bl-mdl="$emit('show-bl-mdl')"
            />

            <!-- <ActionLogicMdlInput
                clss="pl-2.5"
                mdlKey="onError"
                :label="tr('on-error')"
                :hideInput="true"
                v-model="actionStep.schema"
                @show-bl-mdl="$emit('show-bl-mdl')"
            /> -->

        </e-col>

    </e-col>

</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import ReturnContent from './c/index';

export default {
    components: { ReturnContent },
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
        hideReturnSection: Boolean,
    },
    watch: {
        type() {
            if (!this.returnObjOpen) this.returnObjOpen = true;
        }
    },
    computed: {
        ...mapGetters({
            logicReturnTypes: 'project/entity-presets/logicReturnTypes',
            successCodes: 'cms/response-codes/successCodes',
            errorCodes: 'cms/response-codes/errorCodes',
        }),
        ...mapState('project/actions', [ 'actionCategories' ]),

        type() {return this.actionStep?.type},
        returnDefault() {
            try {
                const category = this.actionCategories.filter((cat) => cat.id == this.actionStep.schema._action.category)[0];
            
                return category.children.filter(
                    (act) => act.id == this.actionStep?.schema._action.action
                )[0].returns;
            }
            catch (err) {return 'text'}
        },
    },
    data() {
        return { returnObjOpen: true }
    },
    mounted() {
        if (!this.actionStep.type || this.actionStep.type == '') {
            this.actionStep.type = this.returnDefault;
        }

        if (this.actionStep?.type == 'object' || this.actionStep.type == 'list') {
            if (Object.keys(this.actionStep?.output ?? []).length > 0) {
                this.returnObjOpen = true;
            }
        }
    },
    methods: {
        addItem() {
            if (!this.returnObjOpen) this.returnObjOpen = true;
           
            this.$refs['output-cont'].addItem();
        }
    }
}
</script>