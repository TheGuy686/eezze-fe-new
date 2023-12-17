<style lang="less" scoped>
.auth-store-info {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.4);
}

.qinput {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background: #FFF;
    border: 1px solid #D9D9D9;
    border-radius: 2px !important;
    min-height: 40px;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: 'tnum', "tnum";
    position: relative;
    display: inline-block;
    width: 100%;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 1.5;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    transition: all 0.3s;
}
</style>

<template>
<div>

    <h2 v-html="tr('cp-basic-q3')" />

    <a-radio-group
        class="mt-5"
        non-sel
        v-model="proj.type"
    >
        <a-radio-button value="server">
            
            {{ tr('server') }}

        </a-radio-button>

        <!-- <a-radio-button value="cloud">
            
            {{ tr('in-the-cloud') }}

        </a-radio-button> -->

        <a-radio-button value="managed-service">
            
            {{ tr('managed-service') }}

        </a-radio-button>


        <!-- <a-radio-button value="other">
            
            {{ tr('other') }}

        </a-radio-button> -->

    </a-radio-group>

    <e-col clss="pr-10 pb-5">

        <h4 class="pt-5">{{ tr('host-info') }}</h4>

        <e-row>

            <e-col :center="true" w-40>

                {{ tr('host') }}

            </e-col>

            <e-col w-60>

                <input
                    name="random123"
                    class="qinput"
                    autocomplete="off"
                    :placeholder="tr('input-a-host')"
                    v-model="proj.host"
                />

            </e-col>

        </e-row>

        <!-- <e-row>

            <e-col :center="true" w-40>

                {{ tr('ip-address') }}

            </e-col>

            <e-col w-60>

                <input
                    name="random123"
                    class="qinput"
                    autocomplete="off"
                    :placeholder="tr('input-an-ip-address')"
                    v-model="proj.ip"
                />

            </e-col>

        </e-row> -->

    </e-col>

    <h2 v-html="tr('cp-basic-q4')" class="pt-5" />

    <span class="auth-store-info" v-html="tr('auth-storage-fyi')" />

    <e-col clss="pr-10 pb-5 pt-5">

        <h4>{{ tr('authentication') }}</h4>

        <e-row>

            <e-col :center="true" w-40>

                {{ tr('user') }}

            </e-col>

            <e-col w-60>

                <input
                    name="random123"
                    class="qinput"
                    autocomplete="off"
                    :placeholder="tr('input-a-user')"
                    v-model="proj.user"
                />

            </e-col>

        </e-row>

        <e-row>

            <e-col :center="true" w-40>

                {{ tr('password') }}

            </e-col>

            <e-col w-60>

                <input
                    name="random1232"
                    class="qinput mt-2"
                    autocomplete="off"
                    :placeholder="tr('input-a-password')"
                    type="password"
                    v-model="proj.pass"
                />

            </e-col>

        </e-row>

        <div class="mt-3" />

        <h4>{{ tr('ssh-key') }}</h4>

        <EFormTextArea
            inputStyle="min-height: 150px;"
            eClass="ml-10"
            :row="12"
            :placeholder="tr('rsa-key-help')"
            v-model="proj.sshKey"
        />

    </e-col>

</div>
</template>

<script>
export default {
    props: {
        proj: Object,
    },
}
</script>