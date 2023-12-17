<template>
    <div class="pr-2">
    
        <ActionHeader
            :action="tr('logic')"
            :subAction="tr('do')"
            :details="tr('do-a-custom-action')"
            :actionStep="actionStep"
            @save-action-clicked="$emit('save-action-clicked')"
            @close="$emit('close')"
            @edit-basic-action-info="$emit('edit-basic-action-info')"
        />
    
        <p class="font-semibold text-black-1 text-lg pt-5">
        
            {{ tr('run') }}
            
        </p>
    
        <e-row class="mt-3" :fillParent="true">
    
            <ActionLogicMdlInput
                clss="pl-2.5 pt-3 pb-3"
                :hideInput="true"
                :hideContextMenu="true"
                :placeholder="tr('do')"
                src="Logic->do"
                mdlKey="run"
                v-model="actionStep.schema"
                @show-bl-mdl="$emit('show-bl-mdl')"
            />
    
        </e-row>
    
        <ActionReturnObject
            :actionStep="actionStep"
            :showReturnObject="true"
            @show-bl-mdl="$emit('show-bl-mdl', $event)"
        />
    
    </div>
    </template>
    
    <script>
    import { FILE_STORAGE_KEY } from '~/consts/BusLogic';
    
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            actionStep: {
                type: Object,
                required: true,
            },
        },
    };
    </script>