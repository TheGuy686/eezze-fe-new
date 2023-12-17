<template>
<div>

    <h2 v-html="tr('cp-basic-q2')" />

    <e-row :center="true">

        <EFormInput
            eClass="mt-5"
            :placeholder="tr('project-name')"
            inputCase="titleCase"
            :hasError="prAlreadyExists"
            :errorMessage="prAlreadyExists ? tr('project-already-exists') : ''"
            v-model="proj.projectName"
        />

    </e-row>

    <h4 class="mt-5">{{ tr('description') }}</h4>

    <EFormTextArea
        inputStyle="min-height: 150px;"
        eClass="ml-20 mr-20"
        :row="12"
        v-model="proj.description"
    />

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        setPr: Function,
        proj: Object,
    },
    computed: {
        ...mapState('project/proj', [ 'entities' ]),

        prAlreadyExists() {
            for (const pr of this.entities) {
                if (pr.projectName.trim() != this.proj.projectName) continue;

                return true;
            }

            return false;
        },
    }
}
</script>