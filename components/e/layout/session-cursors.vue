<style lang="less">
.cursor-view {
    position: absolute;
    z-index: 1000;

    .arrow-cont {
        position: relative;
        width: 15px;
        height: 15px;

        .left-b {
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            height: 100%;
            transform: rotate(165deg);
            -webkit-transform: rotate(165deg)
        }

        .right-b {
            position: absolute;
            top: -5px;
            left: 5px;
            width: 2px;
            height: 100%;
            transform: rotate(103deg);
            -webkit-transform: rotate(103deg);
        }
    }

    .details {
        color: white;
        font-size: 11px;
        padding: 2px 4px;
        border-radius: 5px;
        margin-left: 10px;
        margin-top: -4px;
        font-weight: bold;
    }
}


</style>

<template>
<div>

    <div
        class="cursor-view"
        :style="`left: ${xPos(s?.wp, s.id)}px; top: ${yPos(s?.hp, s.id)}px;`"
        :key="s.id"
        v-for="s in teamSessions().sessions"
        v-if="shouldShowCursor(s)"
    >
        <div class="arrow-cont">
  
            <i class="left-b" :style="`background-color: ${memberColor(s.email)};`"></i>
            
            <i class="right-b" :style="`background-color: ${memberColor(s.email)};`"></i>
        
        </div>

        <div class="details" :style="`background-color: ${memberColor(s.email)};`">

            {{ s.firstName }} {{ s.lastName }} <br>
<!--             
            W: <b>{{ s?.wp }}</b>% <br>
            H: <b>{{ s?.hp }}</b>% <br>

            <hr>

            top: {{ yPos(s?.hp, s.id) }}px<br>
            left: {{ xPos(s?.wp, s.id) }}px<br> -->

        </div>

        <!-- <div class="details" :style="`background-color: ${s.avatarColor}; margin-top: -500px;`">

            {{ s.firstName }} {{ s.lastName }} <br>

            W: <b>{{ s?.wp }}</b>% <br>
            H: <b>{{ s?.hp }}</b>% <br>

            <hr>

            top: {{ yPos(s?.hp, s.id) }}px<br>
            left: {{ xPos(s?.wp, s.id) }}px<br>

            </div> -->

    </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapState('app', [ 'windowWidth', 'windowHeight' ]),
        ...mapGetters({
			memberColor: 'app/memberColor',
		}),
        xPos() {
            return function (percent, userId) {
                if (userId != this.$auth.user.id) {
                    //console.log('XPOS: ', percent, this.windowWidth, ' : ', (this.windowWidth / 100) * percent);
                    //console.log(userId, ' : ', this.$auth.user.id, ' : ', percent);
                }
                
                return (this.windowWidth / 100) * percent;
            }
        },
        yPos() {
            return function (percent) {
                return (this.windowHeight / 100) * percent;
            }
        },
        shouldShowCursor() {
            return function (session) {
                if (typeof session['mouseX'] == 'undefined') return false;
                if (typeof session['mouseY'] == 'undefined') return false;
                return true;
            }
        }
    },
}
</script>