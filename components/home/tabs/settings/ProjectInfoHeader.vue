<style lang="less" scoped>
.root-project-ingo-header {
    border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
    margin-bottom: 15px;

    .section-title {
        font-style: normal;
        font-weight: 550;
        font-size: 16px;
        line-height: 19px;
        color: #828282;
    }

    .info {
        h2 {
            font-weight: 700;
            font-size: 20px;
            line-height: 25px;
            color: #012840;
            margin-bottom: 5px;
        }

        h3 {
            color: #4F4F4F;
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0em;
        }
    }
}
</style>

<template>
<e-col
    class="root-project-ingo-header tab-cont-item pl-10 pr-10"
>
    <e-row>

        <span class="section-title">{{ tr('project-information') }}</span>

    </e-row>

    <e-row>

        <e-row class="pb-6 pt-6" w-10 :center="true">

            <e-img-avatar
                :size="90"
                dataKey="logo"
                :initials="project?.projectName"
                :imgUrl="projectLogoUrl"
                :uploadPath="endpoints.project.logoUpload"
                :success="logoUploadSuccessful"
            />

        </e-row>

        <e-col class="info pl-5" w-80 jc="c">

            <h2>{{ project?.projectName }}</h2>

            <h3>@{{ kebabCase(project?.projectName) }}</h3>

        </e-col>

        <e-col class="info" w-10 dir="reverse" jc="c">

            <span class="clickable-text" non-sel @click="$emit('edit-project')">

                {{ tr('manage') }}

            </span>

        </e-col>

    </e-row>

</e-col>
</template>

<script>
import { mapMutations } from 'vuex';
import { generateRandomString } from '~/classes/StringMethods';
import { assets } from '~/consts/Endpoints';

export default {
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
    computed: {
        projectLogoUrl() {
            if (!this.project?.logo || this.project?.logo == '') return '';
            return `${assets.logos}/${this.project?.logo}?rand=${generateRandomString(20)}`
        },
    },
    methods: {
        logoUploadSuccessful(project) {
            this.setCurrentProject(project);
            this.setNewEditEntity(project);
            this.$store.dispatch('project/proj/getEntities');
        },
        ...mapMutations({
            setEntityProp: 'project/proj/setEntityProp',
            setNewEditEntity: 'project/proj/setNewEditEntity',
            setCurrentProject: 'project/proj/setCurrentProject',
        }),
    }
}
</script>
