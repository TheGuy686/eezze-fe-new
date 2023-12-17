<style lang="less">
.change-account-info-modal-root {
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
    :title="tr('change-account-info')"
    :isLoading="isDoingRequest"
    @right-btn-clicked="updateUserAccount()"
>
    <e-col class="change-account-info-modal-root">

        <EFormInput
            :name="tr('first-name')"
            :placeholder="tr('please-input-a-name')"
            v-model="user.firstName"
        />

        <EFormInput
            class="mt-5"
            :name="tr('last-name')"
            :placeholder="tr('please-input-a-name')"
            v-model="user.lastName"
        />

        <EFormInput
            class="mt-5"
            :name="tr('handle')"
            :placeholder="tr('please-input-a-handle')"
            v-model="user.handle"
        />

    </e-col>

</EModal>
</template>

<script>
import { auth } from '~/consts/Endpoints';

export default {
    data() {
        return {
            onCompleteCb: undefined,
            isDoingRequest: false,
            isEdit: false,
            user: {},
        }
    },

	methods: {
        async updateUserAccount() {
			this.isDoingRequest = true;

			try {
				const response = await this.$axios.put(auth.updateAccount, this.user);

                // this.$notification.success(this.tr('account-successfully-updated'), {  timer: 10 });

                await this.refreshToken();

                this.os(
                    () => {
                        this.$notification.success({
                            placement: 'topRight',
                            message: this.tr('operation-was-successful')
                        });
                    },
                    300
                );

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

        show () {
            const usr = this.$auth.$state.user;

            this.user = {
                firstName: usr.firstName,
                lastName: usr.lastName,
                handle: usr?.handle ?? '',
            };

            this.$refs['modal'].show();
        },

        hide () { this.$refs['modal'].hide() },
	}
};
</script>