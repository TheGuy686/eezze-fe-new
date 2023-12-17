<style lang="less" scoped>
.eezze-row {
    position: relative;

    .clickable {
        &:hover {
            cursor: pointer;
        }
    }
}
</style>

<template>
<div :a-center="center" :class="clssP" row s-1 :style="styleP" v-if="dir == 'row' && span == 1" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :a-center="center" :class="clssP" row s-2 :style="styleP" v-else-if="dir == 'row' && span == 2" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :a-center="center" :class="clssP" row s-3 :style="styleP" v-else-if="dir == 'row' && span == 3" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :a-center="center" :class="clssP" row s-4 :style="styleP" v-else-if="dir == 'row' && span == 4" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :a-center="center" :class="clssP" row s-5 :style="styleP" v-else-if="dir == 'row' && span == 5" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :a-center="center" :class="clssP" row s-6 :style="styleP" v-else-if="dir == 'row' && span == 6" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :a-center="center" :class="clssP" row-r s-1 :style="styleP" v-else-if="dir == 'reverse' && span == 1" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :a-center="center" :class="clssP" row-r s-2 :style="styleP" v-else-if="dir == 'reverse' && span == 2" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :a-center="center" :class="clssP" row-r s-3 :style="styleP" v-else-if="dir == 'reverse' && span == 3" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :a-center="center" :class="clssP" row-r s-4 :style="styleP" v-else-if="dir == 'reverse' && span == 4" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :a-center="center" :class="clssP" row-r s-5 :style="styleP" v-else-if="dir == 'reverse' && span == 5" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :a-center="center" :class="clssP" row-r s-6 :style="styleP" v-else-if="dir == 'reverse' && span == 6" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :a-center="center" :class="clssP" row-r scope :style="styleP" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)" v-else>

    <slot></slot>

</div>
</template>

<script>
export default {
    name: 'e-row',
    props: {
        stle: String,
        clss: String,
        dir: {
            type: String,
            default: 'row',
        },
        span: {
            type: String | Number,
            default: '1',
        },
        center: {
            type: Boolean,
            default: false,
        },
        fillParent: {
            type: Boolean,
            default: true,
        },
        jc: {
            type: String,
            default: '',
        },
        ai: {
            type: String,
            default: '',
        },
        debug: Boolean,
        hoverable: Boolean,
        clickable: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        clssP() {
            let clss = 'eezze-row';

            if (typeof this.clss != 'undefined') clss += ` ${this.clss}`;
            if (this.clickable) clss += ' clickable';

            if (this.debug) {
                console.log(this.clickable, ' : ', clss);

                console.log('ERow class: ', clss);
            }

            return clss;
        },
        styleP() {
            let style = this?.stle ?? '';

            if (this.fillParent) {
                style += 'width: 100%;';
            }

            if (typeof this.jc != 'undefined') {
                switch (this.jc) {
                    case 'sa': style += 'justify-content: space-around;'; break;
                    case 'sb': style += 'justify-content: space-between;'; break;
                    case 'se': style += 'justify-content: space-evenly;'; break;
                    case 'fs': style += 'justify-content: flex-start;'; break;
                    case 'fe': style += 'justify-content: flex-end;'; break;
                }
            }

            if (typeof this.ai != 'undefined') {
                switch (this.ai) {
                    case 's': style += 'align-items: start;'; break;
                    case 'c': style += 'align-items: center;'; break;
                    case 'e': style += 'align-items: end;'; break;
                    case 'fs': style += 'align-items: flex-start;'; break;
                    case 'c': style += 'align-items: flex-end;'; break;
                }
            }

            if (this.debug) {
                console.log('ERow style: ', style);
            }

            return style;
        }
    }
}
</script>
