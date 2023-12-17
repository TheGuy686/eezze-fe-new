<template>

    <a-date-picker
        ref="picker"
        :format="format"
        :default-value="defaultValueP"
        :value="moment(value, 'YYYY-MM-DD HH:mm')"
        @openChange="openChange($event)"
        @change="handleDateChanged"
    />
    
</template>

<script>
import moment from 'moment';

export default {
	props: {
        format: {
            type: String,
            default: 'YYYY-MM-DD HH:mm:ss',
        },
        value: {
            required: true,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'small'
        },
        defaultValue: {
            type: String,
        }
	},
    computed: {
        defaultValueP() {
            if (!this.defaultValue) return null;

            return this.moment(this.defaultValue, this.format);
        }
    },
    methods: {
        handleDateChanged(date, dateValue) {this.$emit('input', dateValue)},

        openChange(visiblity) {this.$emit('openChange', visiblity)},

        moment,
    }
};
</script>
