<style lang="less">
.delete-account-modal-root {
    padding-left: 15px;
    padding-right: 15px;

    .info {
        font-weight: 400;
        font-size: 12px;
        color: #4F4F4F;
        margin-bottom: 15px;
    }

    .title {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 15px;
    }

    .warn-alert { margin-bottom: 15px; }
}
</style>

<template>
<EModal
    ref="modal"
    :width="400"
    :title="tr('delete-account')"
    :isLoading="isDoingRequest"
    :shouldDisableRightBtn="!deleteConfirm"
    @right-btn-clicked="deleteAccount()"
>
    <div class="delete-account-modal-root">

        <span class="info">{{ tr('delete-account-info-1') }}</span>

        <a-alert
            class="warn-alert mt-5"
            type="error"
            show-icon
        >

            <template slot="description">

                {{ tr('delete-account-warn') }}

            </template>

        </a-alert>

        <span class="info" v-html="tr('delete-account-info-2')" />

        <EFormInput
            name="delete-confirm"
            class="mt-5"
            :placeholder="tr('input-confirm-delete-text')"
            inputCase="upperCase"
            :inlineOver="true"
            v-model="deleteConfirmedText"
        />

    </div>

</EModal>
</template>

<script>
import { auth } from '~/consts/Endpoints';

export default {
    computed: {
        deleteConfirm() { return this.deleteConfirmedText == 'DELETE ME' },
    },

    data() {
        return {
            onCompleteCb: undefined,
            isDoingRequest: false,
            isEdit: false,
            deleteConfirmedText: '',
            entity: {},
        }
    },

	methods: {
        async deleteAccount() {
			this.isDoingRequest = true;

			try {
				const response = await this.$axios.delete(
					auth.deleteAccount,
					{},
					{
						headers: {
							authorization: this.$auth.strategy.token.get(),
							'Content-Type': 'application/json',
						}
                    }
				);

                this.$notification.success(this.tr('account-was-successfully-deleted'), {  timer: 10 });

                await this.$auth.refreshTokens();

                this.$auth.fetchUser();

				setTimeout(() => {
                    this.isDoingRequest = false;
                    this.isInEditMode = false;
                }, 700);
			}
			catch (err) {
                console.log('Error: ', err);

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
            this.deleteConfirmed = '';

            this.$refs['modal'].show();
        },

        hide () {
            this.deleteConfirmed = '';

            this.$refs['modal'].hide();
        },
	}
};
</script>