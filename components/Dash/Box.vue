<style lang="less" scoped>
.project-obj-root {
    position: relative;

    .img-cont {
        position: relative;
        display: flex;
        width: 128px;
        height: 140px;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-color: white;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        margin-bottom: 5px;

        .icon-img {
            position: absolute;
            width: auto;
            height: 100%;
            top: 0;
            bottom: 0;
            left: 0;
        }

        .initials {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            font-size: 25px;
            background-color: white;
            color: black;
            border: 1px solid rgba(0, 0, 0, 0.2);
        }
    }

    &:hover { cursor: pointer; }
}
</style>

<template>
<div
    :class="'project-obj-root pr-5' + clss"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="$emit('click')"
>

    <!-- <div :class="'imgCont ' + (icon) ? 'box-icon mb-2' : 'box mb-2'">

        <GeneralIcon v-if="icon" :type="icon" class="place-content-center" />

        <img
            class="icon-img"
            :src="compImg"
            v-if="image"
        />

    </div> -->

    <div class="img-cont" :style="hovered ? `background-color: ${!imgaeExists ? 'rgba(0, 0, 0, 0.05)' : randBg};` : ''">

        <GeneralIcon :type="icon" class="place-content-center" v-if="icon" />

        <div v-if="isProject">

            <img
                class="icon-img"
                :src="compImg"
                v-if="image && imgExists"
            />

            <div class="initials" v-else>

                {{ nameInitials(name) }}

            </div>

        </div>

        <div v-else>

            <img class="icon-img" :src="compImg" v-if="image != ''" />

        </div>

    </div>

    <p class="text-center">{{name}}</p>

</div>
</template>

<script>
import { randDarkColor } from '~/classes/globals';

export default {
    props: {
        clss: { type: String, default: '' },
        icon: { type: String, default: '' },
        name: { type: String, default: '' },
        image: { type: String, default: '' },
        isProject: Boolean,
    },
    computed: {
        imgExists() {
            if (!this.isProject) return false;

            try {
                this.imgaeExists = this.imageExists(this.image);

                return this.imgaeExists;
            }
            catch (err) { return false }
        },
        compImg() {
            if (this.isProject) return this.image;
            return require(`../../assets/icons/${this.image}`)
        }
    },
    data() {
        return {
            imgaeExists: false,
            hovered: false,
            randBg: randDarkColor(),
        }
    }
}
</script>