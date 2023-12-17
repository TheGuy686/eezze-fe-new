<style lang="less" scoped>
.calendar-root {

}
</style>

<template>
<!-- <div class="calendar">

     <a-popover placement="right">

        <a-button>

            {{ value ? value : placeholder ? placeholder : tr('select-date') }}

        </a-button>

        <template #content>
        
            <!-- <a-date-picker show-time placeholder="Select Time" @change="onChange" @ok="onOk" />

            <a-calendar v-model="value" :fullscreen="false"></a-calendar>

        </template>

    </a-popover>

</div> -->
<div>

    <h3 class="pt-3" non-sel v-if="!inlineOver && placeholderP">

        {{ placeholderP }}

    </h3>

    <a-date-picker 
        :popupStyle="stle" 
        :show-time="showTime"
        :placeholder="placeholder ? placeholder : tr('select-date')"
        :value="value"
        @change="onChange"
        @ok="onOk"
    />

</div>
</template>

<script>
export default {
    props: {
        stle: Object,
        placeholder: String,
        showTime: {
            type: Boolean,
            default: false,
        },
        name: String,
        placeholder: String,
        inlineOver: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            require: true,
        },
    },
    computed: {
        placeholderP: function () {
            if (!this.inlineOver && this.name != '' && this.placeholder != '') return this.name;

            if (typeof this.placeholder !== 'undefined') return this.placeholder;

            return this.name;
        },
    },
    data() {
        return {
            code: '',
            date: '',
        };
    },
    methods: {
        onChange(moment, value) {
            this.$emit('input', value);
        },
        onOk() {}
    }
}
</script>
