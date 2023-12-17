<style lang="less" scoped>

</style>

<template>
<e-col class="pb-6" bev-cont>

    <!-- <e-row class="mt-5">

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
                :value="entity?.metadata?.auth?.credentials"
                @input="setCredentials($event)"
            />

        </e-col>

    </e-row> -->

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
                :value="mdPropMdl('user')"
                @input="setEntityProp({ key: 'metadata', value: {
                        ...entity.metadata,
                        auth: {
                            ...entity.metadata.auth,
                            props: {
                                ...entity.metadata.auth.props,
                                user: $event,
                            }
                        }
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
                :value="mdPropMdl('password')"
                @input="setEntityProp({ key: 'metadata', value: {
                        ...entity.metadata,
                        auth: {
                            ...entity.metadata.auth,
                            props: {
                                ...entity.metadata.auth.props,
                                password: $event,
                            }
                        }
                    }
                })"
            />

        </e-col>

    </e-row>

</e-col>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('project', {
            entity: (state) => state?.connections?.entity ?? {},
            credentials: (state) => state?.vault?.entities ?? [],
        }),

        mdPropMdl() {
            return function (key) {
                try {
                    if (typeof this.entity?.metadata?.auth != 'object') {
                        this.entity.metadata.auth = { props: {} };
                    }

                    if (!this.entity?.metadata?.auth?.props[key]) {
                        //this.entity.metadata.auth.props[key] = '';
                    }

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
                return this.entity?.metadata?.auth?.credentials;
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
        setCredentials(value) {
            if (this.entity?.metadata?.auth?.credentials == value) return;

            const auth = JSON.parse(JSON.stringify(this.entity?.metadata?.auth));

            auth['type'] = auth?.type ?? 'basic';
            auth['credentials'] = value;
            auth['props'] = {};

            this.setEntityProp({ key: 'metadata', value: {
                    ...this.entity?.metadata ?? {},
                    auth
                }
            });
        },
        ...mapMutations({
            setEntityProp: 'project/connections/setEntityProp',
        }),
    }
}
</script>
