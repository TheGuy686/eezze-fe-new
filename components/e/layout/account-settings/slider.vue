<style lang="less" scoped>
.root-account-settings-drawer {
    border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
    margin-bottom: 15px;

    .section-title {
        font-style: normal;
        font-weight: 550;
        font-size: 16px;
        line-height: 19px;
        color: #828282;
        padding-top: 30px;
        padding-bottom: 10px;
        text-transform: capitalize !important;
    }

    .info {
        font-weight: 500;
        font-size: 16px;
        color: #000000;
        padding-bottom: 5px;
    }

    .info-s {
        font-weight: 400;
        font-size: 14px;
        color: #000000;
        padding-bottom: 5px;
    }

    .text-bl {
        color: #3F88C5 !important;
    }

    .clickable-text {
        text-decoration: underline;
        text-transform: capitalize !important;

        &:hover {
            cursor: pointer;
        }
    }

    .section-div {
        width: 100%;
        height: 1px;
        background-color: rgba(0, 0, 0, 0.2);
        margin-top: 25px;
        margin-bottom: 10px;
    }
}
</style>

<template>
<a-drawer
    class="root-account-settings-drawer"
    :title="tr('account-settings')"
    placement="right"
    :bodyStyle="{ 'background-color': 'white' }"
    :width="550"
    :closable="true"
    :visible="value"
    @close="$emit('input', false)"
>

    <e-col>

        <e-row class="pb-6 pt-6" :center="true">

            <e-img-avatar
                :size="120"
                dataKey="avatar"
                :uploadable="true"
                :initials="`${$auth.user?.firstName} ${$auth.user?.lastName}`"
                :imgUrl="profileImg($auth.user)"
                :uploadPath="endpoints.auth.uploadAvarar"
                @img-upload-success="imageSuccessfullyUploaded($event)"
            />

        </e-row>

        <e-col>

            <span class="section-title">

                {{ tr('contact-information') }}

            </span>

            <e-row jc="sb">

                <span class="info capitalize">

                    {{ account.firstName }} {{ account.lastName }}

                </span>

                <span class="clickable-text" non-sel @click="$refs['mdl-change-account-info'].show()">

                    {{ tr('change') }}

                </span>

            </e-row>

            <span class="info-s text-bl">

                {{ account.email }}

            </span>

            <span class="info-s text-bl">

                @{{ account.handle }}

            </span>

            <span class="section-title">

                {{ tr('security') }}

            </span>

            <e-row jc="sb">

                <span class="info">

                    {{ tr('change-password') }}

                </span>

                <span class="clickable-text" non-sel @click="$refs['mdl-change-password'].show()">

                    {{ tr('change') }}

                </span>

            </e-row>

            <span class="section-title">

                {{ tr('language') }}

            </span>

            <e-row jc="sb">

                <span class="info capitalize">

                    {{ accountLanguage }}

                </span>

                <span class="clickable-text" non-sel @click="$refs['mdl-change-lang'].show()">

                    {{ tr('change') }}

                </span>

            </e-row>

            <div class="section-div" />

            <span class="section-title">

                {{ tr('danger-zone') }}

            </span>

            <span class="info text-red clickable-text" @click="$refs['mdl-delete-account'].show()">

                {{ tr('delete-account') }}

            </span>

        </e-col>

    </e-col>

    <ELayoutAccountSettingsChangeInfoModal ref="mdl-change-account-info" />

    <ELayoutAccountSettingsChangePasswordModal ref="mdl-change-password" />

    <ELayoutAccountSettingsChangeLanguageModal ref="mdl-change-lang" />

    <ELayoutAccountSettingsDeleteAccountModal ref="mdl-delete-account" />

</a-drawer>
</template>

<script>
export default {
    props: {
        value: Boolean,
    },
    computed: {
        account() {
            return {
                ...this.$auth.user,
                lang: 'en',
            }
        },
        accountLanguage() {
            try {
                return 'english';
            }
            catch (err) { return 'english' }
        }
    },
    methods: {
        imageSuccessfullyUploaded(user) {
            delete user['message'];

            this.$auth.setUser(user);
        }
    }
}
</script>
