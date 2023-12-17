<style lang="less">
.divider {
    width: 100%;
    height: 1px;
    margin-bottom: 10px;
}
</style>

<template>
<div>

    <EFormVariableLogic
        clss="pl-2.5"
        src="Serv->Event Hooks"
        :label="tr('on-success')"
        :hideInput="true"
        mdlKey="onSuccess"
        :obj="onSuccessMdl.definition"
        @model-changed="onSuccessMdl.definition = $event"
        @item-deleted="onSuccessMdl.definition = $event ?? {}"
    />

    <EFormVariableLogic
        clss="pl-2.5"
        src="Serv->Event Hooks"
        :label="tr('on-error')"
        :hideInput="true"
        mdlKey="onError"
        :obj="onErrorMdl.definition"
        @model-changed="onErrorMdl.definition = $event"
        @item-deleted="onErrorMdl.definition = $event ?? {}"
    />

</div>
</template>?? {}

<script>
import Vue from 'vue';

export default {
    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
    watch: {
        osChangeEmitter(to) {
            Vue.set(this.entity.definition, 'onSuccess', to.definition.onSuccess);
        },
        oeChangeEmitter(to) {
            Vue.set(this.entity.definition, 'onError', to.definition.onError);
        },
    },
    computed: {
        osChangeEmitter() {
            try {
                return this.cloneObj(this.onSuccessMdl);
            }
            catch (err) {
                return {};
            }
        },
        oeChangeEmitter() {
            try {
                return this.cloneObj(this.onErrorMdl);
            }
            catch (err) {
                return {};
            }
        },
    },
    data() {
        return {
            tmpIn: {},
            onSuccessMdl: {
                definition: {},
            },
            onErrorMdl: {
                definition: {},
            },
        };
    },
    beforeMount() {
        this.tmpIn = this.cloneObj(this?.entity?.definition);
        this.setInits();
        this.tmpIn = {};
    },
    methods: {
        setInits() {
            const sucIn = this.cloneObj(this?.tmpIn?.onSuccess);
            const errIn = this.cloneObj(this?.tmpIn?.onError);

            if (sucIn) {
                this.onSuccessMdl.definition.onSuccess = sucIn;
            }

            if (errIn) {
                this.onErrorMdl.definition.onError = errIn;
            }
        }
    },
}
</script>
