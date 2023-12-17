<template>
<div class="
	relative
	flex flex-col
	items-center
	justify-center
	min-h-screen
	bg-primary
	overflow-hidden"
>

    <img src="../assets/icons/hero.png" class="absolute object-cover w-full bg-center bg-cover pb-20" alt="waves" />

    <div class="text-center">

      <GeneralLogo class="mb-6 text-8xl" />

    </div>

    <div>

      	<a-col style="margin-bottom: 20px;">

			<EFormInput
				name="password"
				:placeholder="tr('password')"
				:inlineOver="true"
				type="password"
				v-model="password"
			/>

		</a-col>

		<a-col style="margin-bottom: 20px;">

			<EFormInput
				name="password-confirm"
				:placeholder="tr('confim-password')"
				:inlineOver="true"
				:hasError="passwordsAreValid"
				:errorMessage="!passwordsAreValid ? tr('passwords-dont-match') : ''"
				type="password"
				v-model="passConfirm"
			/>

		</a-col>

      	<a-col>

			<a-button
				size="large"
				type="secondary"
				class="bg-secondary border-0 text-white"
				block
				:disabled="!hasPassValue || !passwordsAreSame"
				:loading="busy"
				@click="resetPassword"
			>

				{{ tr('submit') }}

			</a-button>

		</a-col>

    </div>

    <a-button type="link" href="/login" class="pt-5 text-white">

		{{ tr('back-to-login') }}

	</a-button>

</div>
</template>

<script>
import Request from '~/classes/Request';

export default {
    layout: 'plain',
	auth: 'guest',
    middleware: ['notAuthenticated'],
	computed: {
		hasPassValue() {return this.payload?.password != '' && typeof this.payload?.password == 'string'},
		passwordsAreSame() {
			const pl = this.payload;

			if (!pl.password || pl.password == '') return false;
			if (!pl.passwordConfirm || pl.passwordConfirm == '') return false;

			return pl?.password == pl?.passwordConfirm;
		},
		passwordsAreValid() {
			if (!this.hasPassValue) return true;

			if (!this.passwordsAreSame) return false;

			return true;
		},
		payload() {
			return {
				token: this.$route.query.token,
				password: this.password,
				passwordConfirm: this.passConfirm,
			}
		}
	},
    data() {
        return {
            busy: false,
			password: 'Password123',
			passConfirm: 'Password123',
        }
    },
    methods: {
        async resetPassword() {
            this.busy = true;

            try {
                const res = await Request.put('/auth/reset-password', this.payload);

				if (res.status == 200) {
					this.$notification.success({
						placement: 'topRight',
						message: tr('success'),
						description: tr('password-reset-success'),
					});
				}
				else {
					this.$notification.error({
						placement: 'topRight',
						message: tr('error'),
						description: tr('password-reset-error'),
					});
				}
            }
            catch (err) {
                console.log('Error: ', err);
            }

            this.busy = false;
        },
    },
}
</script>