<template>
<a-form-model-item :label="name" :class="'form-input ' + clss">

    <span
        class="hoverable"
        non-sel
        @click="inputChange(!value)"
        v-if="!inlineOver && !hideLabel && !reverseLayout"
    >
        
        {{ placeholderP }}
        
    </span>

    <a-checkbox
        :name="name"
        :value="value"
        :checked="isChecked"
        :true-value="true"
        :false-value="false"
        @input="inputChange"
        :disabled="disabled"
        v-if="!inlineOver"
    />

    <span
        non-sel
        @click="inputChange(!value)"
        v-if="!inlineOver && !hideLabel && reverseLayout"
    >
        
        {{ placeholderP }}
        
    </span>

    <a-row v-if="inlineOver">

        <span
            :style="inlineLabelStyle"
            class="hoverable"
            non-sel
            @click="inputChange(!value)"
            v-if="!hideLabel && !reverseLayout"
        >
        
            {{ placeholderP }}
            
        </span>

        <a-checkbox
            style="padding-left: 5px;"
            :name="name"
            :value="value"
            :checked="isChecked"
            :true-value="true"
            :false-value="false"
            :disabled="disabled"
            @input="inputChange"
        />

        <span
            :style="inlineLabelStyle"
            class="hoverable"
            non-sel
            @click="inputChange(!value)"
            v-if="!hideLabel && reverseLayout"
        >
        
            {{ placeholderP }}
            
        </span>

    </a-row>

</a-form-model-item>
</template>

<script>
//:default-checked="defaultValue"
export default {
	props: {
        clss: {
            type: String,
            default: '',
        },
		name: {
			type: String,
            required: true,
		},
        value: {
            required: true,
        },
        trueValue: {
            required: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
        defaultValue: {
            type: Boolean,
            default: false,
        },
        inlineOver: {
            type: Boolean,
            default: false
        },
        placeholder: {
			type: String,
		},
        inlineLabelStyle: {
            type: String,
            default: 'padding-left: 5px;'
        },
        hideLabel: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        reverseLayout: {
            type: Boolean,
            default: false,
        }
	},
    computed: {
        isChecked() {
            return this.value === this.trueValue;
        },
        placeholderP: function () {
            if (typeof this.placeholder !== 'undefined') return this.placeholder;

            return this.name;
        },
    },
    methods: {
        inputChange(state) {
            this.$emit('input', state);
        }
    }
};
</script>
