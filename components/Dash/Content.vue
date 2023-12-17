<style>
.form-div {
    height: 100%;
    width: 1px;
    background-color: #d9d9d9;
    margin-left: 10px;
}

.center {
    margin-left: auto;
    margin-right: auto;
}
</style>

<template>
<e-col :center="true">

    <e-col :center="true">

        <e-img-avatar
            :size="100"
            :uploadable="true"
            dataKey="logo"
            :initials="initialsTmp"
            :imgUrl="projectLogoUrl"
            :uploadPath="endpoints.project.logoUpload"
            :success="logoUploadSuccessful"
        />

    </e-col>

    <e-col>

        <EFormInput
            :name="tr('project-name')"
            class="mt-2"
            :placeholder="tr('project-name')"
            :message="tr('please-input-a-project-name')"
            inputCase="titleCase"
            :hasError="prAlreadyExists"
            :errorMessage="prAlreadyExists ? tr('project-already-exists') : ''"
            :value="entity.projectName"
            @input="initialsTmp = $event; setEntityProp({key: 'projectName', value: $event})"
        />

        <EFormInput
            :name="tr('handle')"
            class="mt-5"
            inputCase="kebabCase"
            :placeholder="tr('handle')"
            :message="tr('please-input-a-project-handle')"
            :value="entity.handle"
            @input="setEntityProp({key: 'handle', value: $event})"
        />

        <EFormInput
            :name="tr('industry')"
            class="mt-5"
            :placeholder="tr('industry')"
            :message="tr('please-input-an-industry')"
            :value="entity.industry"
            @input="setEntityProp({key: 'industry', value: $event})"
        />

        <EFormTextArea
            :name="tr('description')"
            class="mt-5"
            :placeholder="tr('description')"
            :message="tr('please-input-a-description')"
            :value="entity.details"
            @input="setEntityProp({key: 'details', value: $event})"
        />

    </e-col>

</e-col>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { generateRandomString } from '~/classes/StringMethods';
import { assets } from '../../consts/Endpoints';

export default {
    computed: {
        ...mapState('project/proj', [ 'entity', 'entities' ]),

        projectLogoUrl() {
            if (!this.entity?.logo || this.entity?.logo == '') return '';
            return `${assets.logos}/${this.entity?.logo}?rand=${generateRandomString(20)}`
        },
        prAlreadyExists() {
            for (const pr of this.entities) {
                if (pr.projectName.trim() != this.entity.projectName) continue;

                return true;
            }

            return false;
        },
    },

    data() {
        return {
            initialsTmp: '',
        }
    },

    methods: {
        logoUploadSuccessful(project) {
            this.setCurrentProject(project);
            this.setNewEditEntity(project);
            this.$store.dispatch('project/proj/getEntities');
        },

        setInitInitials() {
            this.initialsTmp = this.entity?.projectName;
        },

        ...mapMutations({
            setEntityProp: 'project/proj/setEntityProp',
            setNewEditEntity: 'project/proj/setNewEditEntity',
            setCurrentProject: 'project/proj/setCurrentProject',
        })
    }
};
</script>