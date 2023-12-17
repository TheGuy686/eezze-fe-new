<style lang="less">
.change-language-modal-root {
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
    :title="tr('change-language')"
    :isLoading="isDoingRequest"
    @right-btn-clicked="updateLanguage()"
>
    <e-col class="change-language-modal-root">

        <EFormSelect
            w-100
            :name="tr('language')"
            :placeholder="tr('choose-a-language')"
            keyProp="key"
            valueProp="name"
            :options="supportedLanguages"
            v-model="entity.lang"
        />

    </e-col>

</EModal>
</template>

<script>
import { auth } from '~/consts/Endpoints';
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('app' , [ 'supportedLanguages' ]),
    },

    data() {
        return {
            onCompleteCb: undefined,
            isDoingRequest: false,
            isEdit: false,
            entity: {},
        }
    },

	methods: {
        async updateLanguage() {
			this.isDoingRequest = true;

			try {
				const response = await this.$axios.put(
					auth.changeLanguage,
					this.user,
					{
						headers: {
							authorization: this.$auth.strategy.token.get(),
							'Content-Type': 'application/json',
						}
                    }
				);

                this.$notification.success(this.tr('account-language-successfully-updated'), {  timer: 10 });

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

        show () {
            const usr = this.$auth.$state.user;
            this.entity.lang = usr.lang;
            this.$refs['modal'].show();
        },

        hide () {
            this.$refs['modal'].hide();
            this.os(() => this.entity = {}, 200);
        },
	}
};
</script>