<template>
<div>

    <h2 v-html="tr('cp-basic-q8')" />

    <e-col :center="true">

        <EFormSelect 
            class="pr-2" 
            :name="tr('db-type')"
            :placeholder="tr('select-type')"
            leftIcon="diff-db"
            keyProp="key"
            valueProp="name"
            :options="dbTypesF"
            v-model="proj.dsMetadata.type"
        />

        <h2 v-html="tr('credentials')" class="pt-5" />

        <span class="auth-store-info" v-html="tr('auth-storage-fyi')" />

        <h4 class="pt-5">{{ tr('basic-authentication') }}</h4>

        <DashGuidedBasicQ7TMysql
            ref="tMysql"
            :proj="proj"
            v-show="proj.dsMetadata.type == 'mysql'"
        />

        <!-- <GeneralBeveledGrid v-model="hoveringItem">

            <GeneralBeveledGridItem
                :key="i"
                :id="t.key"
                :width="151"
                :height="151"
                :bgColor="t.color"
                :title="t.name"
                :disabled="csKeys.includes(t.key)"
                v-model="type"
                v-for="t, i in dbTypes"
            />
    
        </GeneralBeveledGrid> -->

    </e-col>

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        proj: Object,
    },
    computed: {
        ...mapState('cms/datasources/type', [ 'dbTypes' ]),

        // csKeys() {
        //     try {
        //         const out = [];

        //         for (let t of this.dbTypes) {
        //             if (t.active) continue;
        //             out.push(t.key);
        //         }

        //         return out;
        //     }
        //     catch (err) {
        //         return [];
        //     }
        // },
        // hoveringItemComingSoon() {
        //     return this.csKeys.includes(this.hoveringItem);
        // },
        dbTypesF() {
            return this.dbTypes.filter((t) => t.active);
        }
    },
    data() {
        return {
            type: '',
            hoveringItem: '',
        }
    }
}
</script>