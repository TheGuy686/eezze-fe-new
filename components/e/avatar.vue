<style lang="less">
.session-avatar {
    &:hover {
        cursor: pointer;
    }
}
</style>

<template>
<e-col :clickable="true" :hoverable="true" @clicked="$emit('click')">

    <avatar
        :style="stle"
        :size="size"
        non-sel
        :color="color"
        :isEditable="true"
        :image="imgSrc"
        :fullname="initials"
        v-if="imgSrc"
    />

    <div e-col style="background-color: transparent !important;" v-else>

        <avatar
            :style="stle"
            :size="size"
            non-sel
            :color="color"
            :isEditable="true"
            :fullname="initials"
            v-if="renderMode== 'default'"
        />

        <a-avatar
            class="left-15 z-10 ml-4 text-white font-large font-medium text-md uppercase session-avatar"
            :style="`border: solid white 1.5px; background-color: ${color};`"
            :size="size"
            @click="$emit('click')"
            v-else
        >
            <span non-sel>

                {{ nameInitials(initials) }}

            </span>

        </a-avatar>

    </div>

</e-col>
</template>

<script>
import Avatar from '~/plugins/vue-avatar-component';
import { randDarkColor } from '~/classes/globals';

export default {
    components: { Avatar },
    props: {
        stle: String,
        size: {
            type: Number | String,
            defautl: 96,
        },
        color: {
            type: String,
            default: randDarkColor()
        },
        imgSrc: String,
        initials: String,
        renderMode: {
            type: String,
            default: 'secondary'
        }
    },
}
</script>
