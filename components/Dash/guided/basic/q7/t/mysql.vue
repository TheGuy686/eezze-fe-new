<style lang="less" scoped>
.password-strength {
    padding: 5px;
}
</style>

<template>
<e-col stle="margin-right: 200px;">

    <e-row>

        <e-col :center="true" w-40>

            {{ tr('host') }}

        </e-col>

        <e-col w-60>

            <EFormInput
                :placeholder="tr('enter-a-host')"
                v-model="proj.dsMetadata.props.host"
            />

        </e-col>

    </e-row>

    <e-row>

        <e-col :center="true" w-40>

            {{ tr('port') }}

        </e-col>

        <e-col w-60>

            <EFormInput
                :placeholder="tr('port')"
                type="number"
                castTo="number"
                v-model="proj.dsMetadata.props.port"
            />

        </e-col>

    </e-row>

    <e-row>

        <e-col :center="true" w-40>

            {{ tr('user') }}

        </e-col>

        <e-col w-60>

            <EFormInput
                :placeholder="tr('user')"
                v-model="proj.dsMetadata.props.user"
            />

        </e-col>

    </e-row>

    <e-row>

        <e-col :center="true" w-40>

            {{ tr('password') }}

        </e-col>

        <e-col w-60>

            <EFormInput
                :placeholder="tr('password')"
                type="password"
                v-model="proj.dsMetadata.props.password"
            />

            <e-row>

                <span class="password-strength">{{ tr(strength) }}</span>

                <password-meter style="margin-top: 13px;" :password="proj.dsMetadata.props.password" @score="onScore" />
                
            </e-row>

        </e-col>

    </e-row>

</e-col>
</template>

<script>
import passwordMeter from 'vue-simple-password-meter';

export default {
    components: { passwordMeter },
    props: {
        proj: Object,
    },
    data() {
        return {
            score: null,
            strength: null,
        }
    },
    methods: {
        onScore({ score, strength }) {
            this.score = score;
            this.strength = strength;
        },
    }
}
</script>