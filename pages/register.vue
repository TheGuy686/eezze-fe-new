<template>
<div
    class="
        relative
        flex flex-col
        items-center
        justify-center
        min-h-screen
        bg-primary
        overflow-hidden
    "
>
    <img src="../assets/icons/hero.png" class="absolute object-cover w-full bg-center bg-cover pb-20" alt="waves" />

    <div class="text-center">

        <GeneralLogo class="mb-6 text-8xl" />

    </div>

    <a-form class="w-80 max-w-md">

        <a-col class="pb-2 pr-2" style="margin-bottom: 8px;" :span="12">

            <EFormInput name="firstname" :placeholder="tr('first-name')" :inlineOver="true" v-model="user.firstName" />

        </a-col>

        <a-col class="pb-2 pl-2" style="margin-bottom: 8px;" :span="12">

            <EFormInput name="surname" :placeholder="tr('last-name')" :inlineOver="true" v-model="user.lastName" />

        </a-col>

        <a-col class="pb-2" style="margin-bottom: 8px;" :span="24">

            <EFormInput name="email" :placeholder="tr('email')" :inlineOver="true" v-model="user.email" />

        </a-col>

        <a-col style="margin-bottom: 20px;" :span="24">

            <EFormInput
                name="password"
                :placeholder="tr('password')"
                :inlineOver="true"
                :type="showPassword ? 'text' : 'password'"
                rightIcon="eye-db"
                v-model="user.password"
                @right-icon-clicked="showPassword =! showPassword"
            />

        </a-col>

        <a-col style="margin-bottom: 20px;" :span="24">

            <EFormInput
				name="password-confirm"
				:placeholder="tr('confim-password')"
				:inlineOver="true"
				:hasError="!passwordsAreValid"
				:errorMessage="!passwordsAreValid ? tr('passwords-dont-match') : ''"
				:type="showConfPassword ? 'text' : 'password'"
				rightIcon="eye-db"
				v-model="user.passwordConfirm"
                @right-icon-clicked="showConfPassword =! showConfPassword"
			/>

        </a-col>

        <a-col :span="24">

            <a-button
                size="large"
                type="secondary"
                class="bg-secondary border-0 text-white"
                block
                :disabled="!passwordHasValue || !passwordsMatch || !formIsValid"
                :loading="busy"
                @click="formSubmit"
            >

                {{ tr('register', {toUpper: true}) }}

            </a-button>

        </a-col>

    </a-form>

    <p class="pt-5 text-white font-thin">{{ tr('already-have-an-account') }}</p>

    <a-button type="link" href="login" class="text-lg text-white font-semibold">

        {{ tr('sign-in') }}

    </a-button>

</div>
</template>

<script>
export default {
    layout: 'plain',
    auth: 'guest',
    middleware: [ 'notAuthenticated' ],

    computed: {
        passwordHasValue() {
            if (!this.user.password || this.user.password == '') return false;

            return true;
        },
        passwordsMatch() {
            const pl = this.user;

			if (!pl.password || pl.password == '') return false;
			if (!pl.passwordConfirm || pl.passwordConfirm == '') return false;

			return pl?.password == pl?.passwordConfirm;
        },
		passwordsAreValid() {
			if (!this.passwordHasValue) return true;

			if (!this.passwordsMatch) return false;

			return true;
		},
        formIsValid() {
            if (!this.user.firstName || this.user.firstName == '') return false;
            if (!this.user.lastName || this.user.lastName == '') return false;
            if (!this.user.email || this.user.email == '') return false;
            if (!this.passwordHasValue) return false;
            if (!this.passwordsMatch) return false;

            return true;
        }
    },
    data() {
        return {
            busy: false,
            showPassword: false,
            showConfPassword: false,
            user: {},
        }
    },
    methods: {
        async formSubmit() {
            try {
                this.busy = true;

                await this.$axios.post(this.endpoints.auth.register, {...this.user, email: this.user.email.toLowerCase()})
                    .then(res => {
                        if (res.status > 199 && res.status < 300) {
                            this.$notification.success({
                                placement: 'topRight',
                                message: tr('success'),
                                description: tr('registration-success'),
                            });
                            this.busy = false;
                        }
                        else {
                            this.$notification.error({
                                placement: 'topRight',
                                message: tr('error'),
                                description: tr('unknown-error'),
                            });
                            this.busy = false;
                        }
                    })
                    .catch(err => {
                        this.$notification.error({
                            placement: 'topRight',
                            message: tr('error'),
                            description: tr('unknown-error'),
                        });
                        this.busy = false;
                    })
            }
            catch (error) {
                console.error('error', error);
            }
        }
    }
}
</script>