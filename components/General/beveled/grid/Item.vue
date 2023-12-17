<style lang="less" scoped>
.grid-item {
    height: 180px;
    width: 180px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    padding-top: 15px;

    .grid-item-content {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        border-radius: 20px;
        display: flex;
        flex-direction: column-reverse;
        padding: 15px;
        padding-bottom: 5px;
        box-shadow: 4px 4px 4.5px rgba(3, 3, 3, 0.36);
        transition: box-shadow 0.2s ease-in-out;

        &:hover {
            box-shadow: 4px 4px 4.5px rgba(3, 3, 3, 0.6);

            h3 {
                text-shadow: 2px 1px 1px #000000;
            }

            .check {opacity: 1;}
        }

        h3 {
            color: white;
            font-weight: 600;
            font-size: 14px;;
        }

        .top-left-circle {
            position: absolute;
            top: -70px;
            left: -70px;
            height: 140px;
            width: 140px;
            border-radius: calc(200px / 2);
            border: 35px solid rgba(255, 255, 255, 0.45);
        }

        .bottom-right-circle {
            position: absolute;
            right: -90px;
            bottom: -90px;
            height: 180px;
            width: 180px;
            border-radius: calc(200px / 2);
            border: 35px solid rgba(255, 255, 255, 0.45);
        }

        .check {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            padding: 5px;
            border-radius: 20px;
            background-color: white;
            opacity: 0;
            transition: opacity 0.1s ease-in-out;

            .icn {color: rgba(0, 0, 0, 0.7);}
        }

        .check-disabled {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            padding: 5px;
            border-radius: 20px;
            background-color: white;
            opacity: 0;
            transition: opacity 0.1s ease-in-out;

            .icn {color: rgba(0, 0, 0, 0.7);}

            &:hover {
                .icn { opacity: 1; }
            }
        }
    }
}
</style>

<template>
<div
    :style="`width: ${width}px; height: ${height}px;`"
    class="grid-item"
    a-center
    @mouseenter="hovered()"
    @mouseleave="left()"
    @click="updateMdl"
>
    <a-tooltip :placement="placement" :title="helpText">

        <div
            class="grid-item-content"
            :style="{'background-color': bgColorP, cursor: !disabled ? 'pointer' : 'not-allowed' }"
        >
            <div class="top-left-circle" />
            <div class="bottom-right-circle" />

            <h3 non-sel>{{ title }}</h3>

            <div class="check" :style="getCheckedStyle" v-if="!hideHover">

                <a-icon
                    type="check"
                    class="icn"
                    :style="isChecked ? 'opacity: 1;' : 'opacity: 0;'"
                    v-if="!disabled"
                />

                <a-icon
                    class="icn"
                    type="minus"
                    v-else
                />

            </div>

        </div>

    </a-tooltip>

</div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number | String,
            require: true,
        },
        hideHover: Boolean,
        title: {
            type: String,
            require: true,
        },
        value: {
            type: Array,
            require: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        helpText: String,
        isMultiSelect: {
            type: Boolean,
            default: false,
        },
        height: {
            type: Number,
            default: 180,
        },
        width: {
            type: Number,
            default: 180,
        },
        placement: {
            type: String,
            default: 'right'
        },
        bgColor: String,
    },
    computed: {
        isChecked() {
            return this.value.includes(this.id);
        },
        getCheckedStyle() {
            return this.isChecked ?  'opacity: 1 !important;' : '';
        },
    },
    watch: {
        bgColor(to) {
            if (this.bgColorP == to) return;

            this.bgColorP = to;
        }
    },
    data() {
        return {
            bgColorP: '',
        }
    },
    mounted() {
        if (this.bgColor) this.bgColorP = this.bgColor;
        else this.bgColorP = randDarkColor();
    },
    methods: {
        updateMdl() {
            if (this.disabled) return;

            let value = [];

            if (this.isMultiSelect) {
                value = [...this.value];

                const index = value.indexOf(this.id);

                if (index !== -1) {
                    value.splice(index, 1);
                }
                else value.push(this.id);
            }
            else value = [ this.id ];

            this.$emit('input', value);

            this.$emit('clicked');
        },
        hovered() {
            if (this.$parent.$options._componentTag == 'GeneralBeveledGrid') {
                this.$parent.$emit('input', this.id);
            }
        },
        left() {
            if (this.$parent.$options._componentTag == 'GeneralBeveledGrid') {
                this.$parent.$emit('input', '');
            }
        }
    }
}
</script>