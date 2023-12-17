<style lang="less" scoped>

</style>

<template>
<e-col class="mt-5">

    <h3 non-sel>{{ tr('authentication') }}</h3>

    <e-col class="pb-6" bev-cont>

        <e-row class="mt-5">

            <e-col :center="true" w-40>

                {{ tr('credentials') }}

            </e-col>

            <e-col w-60>

                <EFormSelect
                    class="pl-2"
                    name=""
                    leftIconContStyle="padding-left: 12px;"
                    leftIcon="vault-db"
                    :placeholder="tr('select-credentials')"
                    keyProp="id"
                    valueProp="name"
                    :options="credentials"
                    :inlineOver="true"
                    :value="entity?.metadata?.credentials"
                    @input="setEntityProp({
                        key: 'metadata',
                        value: {
                            ...(entity?.metadata ?? {}),
                            credentials: $event,
                        },
                    })"
                />

            </e-col>

        </e-row>

        <e-row class="mt-5">

            <e-col :center="true" w-40>

                {{ tr('user') }}

            </e-col>

            <e-col w-60>

                <EFormSelect
                    class="pl-2"
                    name=""
                    leftIconContStyle="padding-left: 12px;"
                    leftIcon="user-db"
                    :placeholder="tr('select-a-user-property')"
                    keyProp="key"
                    valueProp="key"
                    :options="credentialOptions"
                    :inlineOver="true"
                    :disabled="!hasCreds"
                    :value="entity?.metadata?.user"
                    @input="setEntityProp({ key: 'metadata', value: {
                            ...(entity?.metadata ?? {}),
                            user: $event
                        }
                    })"
                />

            </e-col>

        </e-row>

        <e-row class="mt-5">

            <e-col :center="true" w-40>

                {{ tr('password') }}

            </e-col>

            <e-col w-60>

                <EFormSelect
                    class="pl-2"
                    name=""
                    leftIconContStyle="padding-left: 12px;"
                    leftIcon="key-db"
                    :placeholder="tr('select-a-user-property')"
                    keyProp="key"
                    valueProp="key"
                    :options="credentialOptions"
                    :inlineOver="true"
                    :disabled="!hasCreds"
                    :value="entity?.metadata?.password"
                    @input="setEntityProp({ key: 'metadata', value: {
                            ...(entity?.metadata ?? {}),
                            password: $event
                        }
                    })"
                />

            </e-col>

        </e-row>

    </e-col>

</e-col>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('project', {
            entity: (state) => state?.['data-sources']?.entity ?? {},
            credentials: (state) => state?.vault?.entities ?? [],
        }),

        selectedGroup() {
            try {
                return this.entity?.metadata?.credentials;
            }
            catch (err) { return '' }
        },
        selectedCredentials() {
            try {
                return this.credentials.filter((c) => c.id == this.selectedGroup)[0];
            }
            catch (err) { return [] }
        },
        hasCreds() {
            const sc = this.selectedCredentials;
            return typeof sc === 'object' && Object.keys(sc).length > 0;
        },
        mdPropMdl() {
            return function (key) {
                try {
                    return this.entity?.metadata?.auth?.props[key];
                }
                catch (err) { 
                    console.log('Error: ', err);
                    return ''
                }
            }
        },
        hasCreds() {
            const sc = this.selectedCredentials;
            return typeof sc === 'object' && Object.keys(sc).length > 0;
        },
        selectedGroup() {
            try {
                return this.entity?.metadata?.credentials;
            }
            catch (err) { return '' }
        },
        selectedCredentials() {
            try {
                return this.credentials.filter((c) => c.id == this.selectedGroup)[0];
            }
            catch (err) { return [] }
        },
        credentialOptions() {
            try {
                return Object.values(this.selectedCredentials?.keyValues);
            }
            catch (err) { return [] }
        }
    },
    methods: {
        ...mapMutations({
			setEntityProp: 'project/data-sources/setEntityProp',
        }),
    }
}
</script>
