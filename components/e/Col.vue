<style lang="less" scoped>
.eezze-col {
    position: relative;

    .clickable {
        &:hover {
            cursor: pointer;
        }
    }
}
</style>

<template>
<div :class="clssP" :a-center="center" col s-1 :style="styleP" v-if="dir == 'col' && span == 1" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :class="clssP" :a-center="center" col s-2 :style="styleP" v-else-if="dir == 'col' && span == 2" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :class="clssP" :a-center="center" col s-3 :style="styleP" v-else-if="dir == 'col' && span == 3" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :class="clssP" :a-center="center" col s-4 :style="styleP" v-else-if="dir == 'col' && span == 4" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')"  @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :class="clssP" :a-center="center" col s-5 :style="styleP" v-else-if="dir == 'col' && span == 5" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :class="clssP" :a-center="center" col s-6 :style="styleP" v-else-if="dir == 'col' && span == 6" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :class="clssP" :a-center="center" col-r s-1 :style="styleP" v-else-if="dir == 'reverse' && span == 1" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :class="clssP" :a-center="center" col-r s-2 :style="styleP" v-else-if="dir == 'reverse' && span == 2" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :class="clssP" :a-center="center" col-r s-3 :style="styleP" v-else-if="dir == 'reverse' && span == 3" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :class="clssP" :a-center="center" col-r s-4 :style="styleP" v-else-if="dir == 'reverse' && span == 4" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :class="clssP" :a-center="center" col-r s-5 :style="styleP" v-else-if="dir == 'reverse' && span == 5" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :class="clssP" :a-center="center" col-r s-6 :style="styleP" v-else-if="dir == 'reverse' && span == 6" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)">

    <slot></slot>

</div>
<div :class="clssP" :a-center="center" col-r scope :style="styleP" @mouseenter="hoverable ? $emit('hovered', true) : ''" @mouseleave="hoverable ? $emit('hovered', false) : ''" @click="$emit(clickable ? 'clicked' : '')" @focusin="$emit('focusin')" @focusout="$emit('focusout')" @focus="$emit('focus', $event)" v-else>

    <slot></slot>

</div>
</template>

<script>
export default {
    name: 'e-col',
    props: {
        stle: String,
        clss: String,
        dir: {
            type: String,
            default: 'col'
        },
        span: {
            type: String | Number,
            default: '1'
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
            let clss = 'eezze-col';

            if (typeof this.clss != 'undefined') clss += ` ${this.clss}`;
            if (this.clickable) clss += ' clickable';

            if (this.debug) {
                console.log(this.clickable, ' : ', clss);
            }

            return clss;
        },
        styleP() {
            let  style = this?.stle ?? '';

            if (this.fillParent) {
                style += 'width: 100%;';
            }

            if (typeof this.jc != 'undefined') {
                switch (this.jc) {
                    case 'sa': style += 'justify-content: space-around;'; break;
                    case 'c': style += 'justify-content: center;'; break;
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
                    case 'fe': style += 'align-items: flex-end;'; break;
                }
            }

            return style;
        }
    }
}
</script>
