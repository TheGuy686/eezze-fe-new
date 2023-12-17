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

    <a-form class="w-80 max-w-md">

		<a-col style="margin-bottom: 8px;">

			<EFormInput
				name="email"
				:placeholder="tr('email')"
				:inlineOver="true"
				v-model="user.email"
			/>

		</a-col>

		<a-col style="margin-bottom: 20px;">

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

		<a-col>

			<a-button
				size="large"
				type="secondary"
				class="bg-secondary border-0 text-white"
				html-type="submit"
				block
				:loading="busy"
				@click="login"
			>

				{{ tr('login', {toUpper: true}) }}

			</a-button>

		</a-col>

	</a-form>

	<div class="pt-5 text-white">

		<a-button class="text-white" type="link" href="forgotpassword">

			{{ tr('forgotten-pass-qu') }}

		</a-button>

	</div>

	<GeneralIcon class="pt-5" :type="'divider-or'" />

	<div class="inline pt-7">

		<a-button type="link" href="https://apple.com">

			<GeneralIcon :type="'apple'" />

		</a-button>

		<a-button type="link" href="https://google.com">

			<GeneralIcon :type="'google'" />

		</a-button>

		<a-button type="link" href="https://facebook.com">

			<GeneralIcon :type="'facebook'" />

		</a-button>

	</div>

	<p class="pt-5 text-white font-thin">{{ tr('signed-up-yet') }}</p>

	<a-button type="link" href="register" class="text-lg text-white font-semibold">

		{{ tr('create-an-account') }}

	</a-button>

</div>
</template>

<script>
export default {
	layout: 'plain',
	middleware: ['notAuthenticated'],
	data() {
		return {
			busy: false,
			showPassword: false,
			user: {
				email: 'ryanjcooke@hotmil.com',
				password: 'Password123',
			}
		}
	},
	methods: {
		async login() {
			this.busy = true;

			let res;

            try {
				res = await this.$axios.post(this.endpoints.auth.login, this.user);

				const data = res?.data;

				if (data?.token) {
					this.$message.success(tr(data.message ?? 'login-success'));

					this.$auth.strategy.token.set(data.token);
					this.$auth.strategy.refreshToken.set(data.refreshToken);

					const user = await this.$auth.fetchUser();

					this.$auth.setUser(user.data.user);

					this.$router.push({ path: '/' });
				}
				else {
					this.$message.error(tr(data.message));
				}
            }
            catch (err) {
				console.log(this.endpoints.auth.login);
				
				console.log(err);
				
				const data = err?.response?.data;

				if (data?.message) {
					this.$message.error(tr(data.message));
				}
            }

            this.busy = false;
		},
	},
}
</script>