<style lang="less" scoped>
.auto-complete-root {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.8);
    border: rgba(0, 0, 0, 0.3) solid 1px;
    border-radius: 2px;
    z-index: 100;
    width: 200px;

    .active-item {
        background-color: #012840;
        color: white;
    }

    .choice-item {
        &:hover {
            background-color: #012840;
            color: white;
        }
    }
}
</style>

<template>
<div ref="root" class="auto-complete-root p-1" :style="stle" v-show="isVisible">

    <ul ref="list">

        <template v-if="filterOps.options.length > 0">

            <li
                :class="`choice-item hoverable ${selectIndex == i ? 'active-item' : ''}`"
                :key="i"
                v-for="o, i in filterOps.options"
            >
                {{ o }}

            </li>

        </template>

        <li v-else>{{ tr('no-items-to-show') }}</li>

    </ul>

</div>
</template>

<script>
export default {
    props: {
        x: Number,
        y: Number,
        value: String,
        overrideMinKeyLen: Number,
        options: {
            type: Array,
            required: true,
        },
    },
    watch: {
        value() {
            if (this.forceHide && !this.isVisible) this.forceHide = false;
            if (this.forceShow && !this.isVisible) this.forceShow = false;
        },
        isVisible(to) {
            if (to) this.calHeight();
            else {
                this.selectIndex = 0;
            }
        },
        choppedStr() {
            this.calHeight();
        },
        filterOps(to) {
            if (to.options.length == 0) {
                this.forceHide = false;
                this.forceShow = false;
            }
        }
    },
    computed: {
        contHeight() {
            if (!this.isVisible) return {
                iteration: this.iteration,
                height: 0,
            };

            return {
                iteration: this.iteration,
                height: this.$refs['root']?.clientHeight,
            };
        },
        stle() {
            const diff = this.contHeight.height - 40;
            return `left: ${this.x + 10}px; top: ${(this.y - diff)}px;`;
        },
        isVisible() {
            if (this.filterOps.options == 0) return false;

            if (this.forceShow) return true;

            const minLen = this.overrideMinKeyLen ? this.overrideMinKeyLen : 2;

            if (this.forceHide || this.choppedStr.length <= minLen) return false;

            if (!this.choppedStr || this.choppedStr == '') return false;

            return this.filterOps.options.length > 0;
        },
        choppedStr() {
            try {
                const matches = this.value.match(/([a-zA-Z0-9-]+)$/);

                if (matches) return matches[1];

                return '';
            }
            catch (err) { return '' }
        },
        filterOps() {
            let found = '', term = '';

            const reg = new RegExp(this.choppedStr);

            const ops = this.options
                .filter(v => reg.test(v))
                .sort((a, b) => a.length - b.length);

            if (ops.length > 0) {
                term = ops[this.selectIndex];
                found = this.choppedStr;
            }

            return { found, term, options: ops };
        },
    },
    data() {
        return {
            forceShow: false,
            forceHide: false,
            selectIndex: 0,
            iteration: 0,
        }
    },
    mounted() {
        this.calHeight();
    },
    methods: {
        getSelection() {
            if (!this.isVisible) return;

            const term = this.filterOps.term + '';
            const found = this.filterOps.found + '';

            setTimeout(() => this.forceHide = true, 10);

            return term.replace(new RegExp(`^${found}`), '');
        },
        cycleUp() {
            if (this.selectIndex == 0) return;
            this.selectIndex--;
        },
        cycleDown() {
            if (this.selectIndex >= this.filterOps.options.length - 1) return;

            this.selectIndex++;
        },
        show() {
            this.forceShow = true;
        },
        hide() {
            this.forceHide = true;
            this.forceShow = false;
        },
        calHeight() {
            this.iteration++;
            setTimeout(() => this.iteration++, 10);
            setTimeout(() => this.iteration++, 2);
            setTimeout(() => this.iteration++, 50);
        }
    }
}
</script>