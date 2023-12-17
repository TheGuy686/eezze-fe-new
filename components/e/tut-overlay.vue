<style lang="less" scoped>
.tutorial-overlay-root {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: none;
    flex-direction: column;

    .opaque-section {
        position: absolute;

        .focus-point {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }

    .overlay-top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.2);

        animation: opacity 1.2s ease-in-out;
    }

    .overlay-right {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.2);

        animation: opacity 1.2s ease-in-out;
    }

    .overlay-bottom {
        position: absolute;
        bottom: 0;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.2);

        animation: opacity 1.2s ease-in-out;
    }

    .overlay-left {
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.2);

        animation: opacity 1.2s ease-in-out;
    }

    .tooltip-content-stat {
        position: relative;
        background-color:#012840 !important;
        text-align: center !important;

        .text { color: white; }
    }

    .tooltip-content-arrow-stat {
        content: "";
        position: absolute; 
        left: 50%;
        top: 29%;
        transform: translateY(-100%);
        border: 10px solid #012840;
        border-color: transparent #012840 transparent transparent;
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .tooltip-content {
        transform: translateY(-50%);
        margin-top: 71px;
        padding: 10px;
        border-radius: 10px;
        background:#012840;
        color: #fff;
        text-align: center;

        .text { color: white; }
    }

    .tooltip { position: relative; }

    .tooltip-content-arrow {
        content: "";
        position: absolute; 
        left: 50%;
        top: 29%;
        transform: translateY(-100%);
        border: 10px solid #012840;
        border-color: transparent #012840 transparent transparent;
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
    }
}
</style>

<template>
<div class="tutorial-overlay-root" :style="visible ? 'display: block' : 'display: none;'">

    <div class="overlay-top" :style="topStyle">

        <e-col>

            <e-row>

                <e-col dir="reverse" w-100>

                    <a-button shape="circle" class="mr-2 mt-2" type="danger" @click="close()">

                        <GeneralIcon
                            clss="mt-1.5"
                            type="close-white"
                        />

                    </a-button>

                </e-col>

            </e-row>

        </e-col>

    </div>

    <div class="overlay-right" :style="rightStyle" />
    <div class="overlay-bottom" :style="bottomStyle" />
    <div class="overlay-left" :style="leftStyle" />

    <a-popover
        :placement="placement" 
        overlayClassName="tooltip-content-stat"
        :visible="visible"
    >
        <div class="opaque-section" :style="opaqueSectionContStyle">

            <div class="focus-point" :style="opaqueSectionStyle" />
 
        </div>

        <template #content>

            <div style="position: relative;">

                <div class="tooltip-content-stat" :style="ttContStyle">

                    <h3 class="text" style="color: white;">
                         
                        {{ tutorialText }}
                    
                    </h3>

                </div>

                <div :style="arrowStyle" />

            </div>

        </template>
        
    </a-popover>

    <!-- <div class="opaque-section" :style="opaqueSectionContStyle">

        <div class="focus-point" :style="opaqueSectionStyle" />

        <div class="tooltip-content-arrow" />

        <div class="tooltip-content" :style="ttContStyle">

            <h3 class="text">{{ tutorialText }}</h3>

        </div>

    </div> -->

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        tutorialText: {
            type: String,
            required: true,
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        width: {
            type: Number | String,
            default: 150,
        },
        height: {
            type: Number | String,
            default: 80,
        },
        ttWidth: {
            type: Number | String,
            default: 240,
        },
        x: {
            type: Number | String,
            required: true,
        },
        y: {
            type: Number | String,
            required: true,
        },
    },
    computed: {
        ...mapState('app', [ 'windowHeight', 'windowWidth' ]),

        widthP() {
            if (typeof this.width == 'string') return Number(this.width);
            return this.width;
        },

        heightP() {
            if (typeof this.height == 'string') return Number(this.height);
            return this.height;
        },

        divLocation() {
            return {
                x: ((this.windowWidth / 100) * this.x) - (this.widthP / 2),
                y: ((this.windowHeight / 100) * this.y) - (this.heightP / 2),
            }
        },
        arrowStyle() {
            return `
                content: "";
                position: absolute;
                left: 46%;
                top: -18px;
                transform: translateY(-100%);
                border: 10px solid #012840;
                border-color: transparent #012840 transparent transparent;
                -webkit-transform: rotate(90deg);
                -moz-transform: rotate(90deg);
                -o-transform: rotate(90deg);
                -ms-transform: rotate(90deg);
                transform: rotate(90deg);
            `;
        },
        topStyle() {
            return {
                height: `${this.divLocation.y}px`,
                opacity: this.opacityVisible ? 1 : 0,
            };
        },
        leftStyle() {
            return {
                top: `${this.divLocation.y}px`,
                width: `${this.divLocation.x}px`,
                opacity: this.opacityVisible ? 1 : 0,
            };
        },
        rightStyle() {
            return {
                top: `${this.divLocation.y}px`,
                width: `${this.windowWidth - (this.divLocation.x + this.widthP)}px`,
                opacity: this.opacityVisible ? 1 : 0,
            };
        },
        bottomStyle() {
            return {
                width: `${this.widthP}px`,
                top: `${this.divLocation.y + this.heightP}px`,
                left: `${this.divLocation.x}px`,
                opacity: this.opacityVisible ? 1 : 0,
            };
        },
        ttContStyle() {
            return {
                width: `${this.ttWidth}px`,
                // marginLeft: `-${this.ttWidth / 5.8}px`,
                backgroundColor: '#012840',
                marginLeft: '-16px',
                marginRight: '-16px',
                marginTop: '-14px',
                marginBottom: '-18px',
                padding: '10px',
                borderRadius: '5px',
            }
        },
        opaqueSectionContStyle() {
            return {
                width: `${this.widthP}px`,
                left: `${this.divLocation.x}px`,
                top: `${this.divLocation.y}px`,
            };
        },
        opaqueSectionStyle() {
            return {
                width: `${this.widthP}px`,
                height: `${this.heightP}px`,
            };
        }
    },
    data() {
        return {
            visible: false,
            opacityVisible: false,
        };
    },
    methods: {
        start() {
            this.visible = true;
            this.opacityVisible = true;
        },
        close() {
            this.opacityVisible = false;

            this.os(() => {

                this.visible = false;

            }, 100);
        }
    }
}
</script>