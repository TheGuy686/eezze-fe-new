<style lang="less">
.change-password-modal-root {
    padding-left: 15px;
    padding-right: 15px;

    .info {
        font-weight: 400;
        font-size: 12px;
        color: #4F4F4F;
        margin-bottom: 20px;
    }

    .title {
        font-weight: 600;
        font-size: 14px;
        margin-right: 20px;
        margin-top: 15px;
        margin-bottom: 15px;
        color: #012840;
    }

    .warn-alert { margin-bottom: 15px; }
}
</style>

<template>
<EModal
    ref="modal"
    :width="400"
    :title="tr('change-password')"
    :isLoading="isDoingRequest"
    @right-btn-clicked="updatePassword()"
>
    <div class="change-password-info-modal-root">

        <EFormInput
            :name="tr('password')"
            :placeholder="tr('password')"
            :type="showPassword ? 'text' : 'password'"
            rightIcon="eye-db"
            v-model="entity.password"
            @right-icon-clicked="showPassword =! showPassword"
        />

        <EFormInput
            class="mt-5"
            :name="tr('password-confirm')"
            :placeholder="tr('confim-password')"
            :hasError="!passwordsAreValid"
            :errorMessage="!passwordsAreValid ? tr('passwords-dont-match') : ''"
            :type="showConfPassword ? 'text' : 'password'"
            rightIcon="eye-db"
            v-model="entity.passwordConfirm"
            @right-icon-clicked="showConfPassword =! showConfPassword"
        />

    </div>

</EModal>
</template>

<script>
import { auth } from '~/consts/Endpoints';

export default {
    computed: {
        passwordHasValue() {
            if (!this.entity.password || this.entity.password == '') return false;

            return true;
        },
        passwordsMatch() {
            const pl = this.entity;

			if (!pl.password || pl.password == '') return false;
			if (!pl.passwordConfirm || pl.passwordConfirm == '') return false;

			return pl?.password == pl?.passwordConfirm;
        },
		passwordsAreValid() {
			if (!this.passwordHasValue) return true;

			if (!this.passwordsMatch) return false;

			return true;
		},
    },

    data() {
        return {
            onCompleteCb: undefined,
            isDoingRequest: false,
            isEdit: false,
            showPassword: false,
            showConfPassword: false,
            entity: {},
        }
    },

	methods: {
        async updatePassword() {
			this.isDoingRequest = true;

			try {
				const response = await this.$axios.put(auth.updatePassword, this.entity);

                this.$notification.success({
                    placement: 'topRight',
                    message: this.tr('password-successfully-updated'),
                }, {  timer: 10 });

                await this.$auth.refreshTokens();

                this.$auth.fetchUser();

				setTimeout(() => {
                    this.isDoingRequest = false;
                    this.isInEditMode = false;
                }, 700);
			}
			catch (err) {
				if (err?.response?.data?.error) {
					this.$notification.error(
						JSON.stringify(err?.response?.data?.error, null, 4), 
						{  timer: 10 }
					);
				}

				setTimeout(() => this.isDoingRequest = false, 700);
			}
		},

        show (entity, successCb) {

            // self.propsSyncTmr();

            // if (successCb) self.onCompleteCb = successCb;
            // self.setNewEditEntity(entity);
            this.$refs['modal'].show();
        },

        hide () {
            // if (typeof self.onCompleteCb == 'function') {
            //     self.onCompleteCb(self.entity.key);
            //     self.onCompleteCb = undefined;
            // }

            this.$refs['modal'].hide();

            // self.os(
            //     () => {
            //         self.$notification.success({
            //             placement: 'topRight',
            //             message: self.tr('operation-was-successful')
            //         });
            //     },
            //     300
            // );
        },
	}
};
</script>