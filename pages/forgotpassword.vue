<template>
  <div class="
      relative
      flex flex-col
      items-center
      justify-center
      min-h-screen
      bg-primary
      overflow-hidden
    ">

    <img src="../assets/icons/hero.png" class="absolute object-cover w-full bg-center bg-cover pb-20" alt="waves" />

    <div class="text-center">

      <GeneralLogo class="mb-6 text-8xl" />

    </div>

    <div>

      <a-col style="margin-bottom: 8px;">

        <EFormInput
          name="email"
          :placeholder="tr('forgot-password-email')"
          :inlineOver="true"
          v-model="email"
        />

      </a-col>

      <a-col>

        <a-button
          size="large"
          type="secondary"
          class="bg-secondary border-0 text-white"
          block
          :loading="busy"
          @click="forgotPassword"
        >

          {{ tr('submit') }}

        </a-button>

      </a-col>

    </div>

    <a-button type="link" href="/login" class="pt-5 text-white">{{ tr('back-to-login') }}</a-button>

  </div>

</template>

<script>
import Request from '~/classes/Request';

export default {
    layout: 'plain',
    auth: 'guest',
    middleware: ['notAuthenticated'],
    data() {
        return {
            busy: false,
            email: '',
        }
    },
    methods: {
        async forgotPassword() {
            this.busy = true;

            try {
                const res = await Request.put(
                    '/auth/forgot-password',
                    {email: this.email}
                );

				if (res.status == 200) {
					this.$notification.success({
						placement: 'topRight',
						message: tr('success'),
						description: tr('send-email-success'),
					});
				}
				else {
					this.$notification.error({
						placement: 'topRight',
						message: tr('error'),
						description: tr('unknown-error'),
					});
				}
            }
            catch (err) {
                console.log('Error: ', err);
            }

            this.busy = false
        },
    },
}
</script>