<template>
<div>

    <ActionLogicMdlInput
        clss="pl-2.5"
        :placeholder="tr('please-input-a-value')"
        src="ReturnObject->output"
        mdlKey="output"
        v-model="actionStep.schema"
        @show-bl-mdl="$emit('show-bl-mdl')"
    />


    <!-- <TextCont
        :actionStep="actionStep"
        v-if="actionStep?.type == 'text'"
    />

    <NumberCont
        :actionStep="actionStep"
        v-else-if="actionStep?.type == 'number'"
    />

    <BooleanCont
        :actionStep="actionStep"
        v-else-if="actionStep?.type == 'boolean'"
    />

    <DateCont
        :actionStep="actionStep"
        v-else-if="actionStep?.type == 'date'"
    />

    <ObjectCont
        ref="object-cont"
        :actionStep="actionStep"
        @changed="itteration++"
        v-else-if="actionStep?.type == 'object'"
    />

    <ListCont
        ref="list-cont"
        :actionStep="actionStep"
        v-else-if="actionStep?.type == 'list'"
    /> -->
</div>
</template>

<script>
import TextCont from './text';
import NumberCont from './number';
import BooleanCont from './boolean';
import DateCont from './date';
import ObjectCont from './object';
import ListCont from './list';

export default {
    components: {
        TextCont,
        NumberCont,
        BooleanCont,
        DateCont,
        ObjectCont,
        ListCont,
    },
    props: {
        actionStep: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            itteration: 0,
        }
    },
    computed: {
        objectPreview() {
            const def = {
                itteration: this.itteration,
                obj: {},
            };

            try {
                if (this.actionStep?.type == 'object' || this.actionStep?.type == 'list') {
                    return {
                        itteration: this.itteration,
                        obj: this.objectRef().getObjectOutput(),
                    };
                }
                else { return def }
            }
            catch (err) { return def }
        },
    },
    methods: {
        objectRef() {
            if (this.actionStep?.type == 'object') {
                return this.$refs['object-cont'];
            }
            else if (this.actionStep?.type == 'list') {
                return this.$refs['list-cont'];
            }
            else { 
                return {
                    jsObectOutput: '',
                    addItem: function () {
                        console.log('Your add item is coming from the wrong place');
                    }
                };
            }
        },
        addItem() {
            try {
                this.objectRef().addItem();
            }
            catch (err) {
                console.log('error: ', err);
            }
        },
        changed() {this.itteration++},
    }
}

</script>