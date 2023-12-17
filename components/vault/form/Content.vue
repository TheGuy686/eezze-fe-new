<style lang="less" scoped>
.vault-form-root {
    .general-info-tab {
        margin-top: -20px;
    }

    .form-divider {
        width: 100%;
        height: 1px;
        background-color: rgba(0, 0, 0, 0.1);
        margin-top: 20px;
        margin-bottom: 20px;
    }
}
</style>

<template>
<a-form-model class="vault-form-root">

    <div class="general-info-tab" v-if="tabIndex == 0">

        <EFormInput
            class="mt-5"
            :name="tr('name')"
            :message="tr('please-input-a-name')"
            inputCase="titleCase"
            :value="entity.name"
            @input="setEntityProp({key: 'name', value: $event})"
        />

        <EFormInput
            class="mt-5"
            :name="tr('description')"
            :message="tr('please-input-a-description')"
            :value="entity.description"
            @input="setEntityProp({key: 'description', value: $event})"
        />

        <div class="form-divider" />

        <e-row>

            <e-col>

                <h2>{{ tr('accessible-to') }}</h2>

                <a-select
                    class="mr-2"
                    :options="rolesP"
                    mode="multiple"
                    :placeholder="tr('select-roles')"
                    v-model="accessibleTo"
                />

            </e-col>

            <e-col>

                <h2>{{ tr('updatable-to') }}</h2>

                <a-select
                    :options="rolesP"
                    mode="multiple"
                    :placeholder="tr('select-roles')"
                    v-model="updatableTo"
                />

            </e-col>

        </e-row>

    </div>

    <div v-else>

        <e-row>

            <e-col w-25 class="p-1">

                {{ tr('key') }}

            </e-col>

            <e-col w-50 class="p-1">

                {{ tr('value') }}

            </e-col>

            <e-row w-25 class="p-1">

                {{ tr('secret') }}

            </e-row>

        </e-row>

        <VaultFormKeyValueItem
            :key="index"
            :isLastIndex="false"
            v-model="kvItems[index]"
            @delete-clicked="kvItems.splice(index, 1)"
            v-for="(item, index) in kvItems"
            @item-changed="updateKeyModel()"
        />

        <VaultFormKeyValueItem
            :isLastIndex="true"
            v-model="newItem"
            @add-clicked="kvItems.push({...newItem})"
        />

    </div>

</a-form-model>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        tabIndex: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        ...mapState('project', {
            entity: (state) => state?.vault?.entity ?? {},
            roles: (state) => state?.roles?.entities ?? [],
        }),
        rolesP() {
            const out = [];

            for (const r of this.roles) {
                out.push({
                    value: r.id,
                    label: r.role
                });
            }

            return out;
        }
    },
    watch: {
        accessibleTo(to) {
            this.setEntityProp({ key: 'accessibleTo', value: to });
        },
        updatableTo(to) {
            this.setEntityProp({ key: 'updatableTo', value: to });
        },
        kvItems() {
            this.updateKeyModel();
        }
    },
    data() {
        return {
            accessibleTo: [],
            updatableTo: [],
            kvItems: [],
            newItem: {
                key: '',
                value: '',
                isSecret: false,
            },
        }
    },
    mounted() {
        const items = JSON.parse(JSON.stringify([...this.entity?.keyValues] ?? []));

        this.kvItems = [...items];

        this.updateStaticValues();
    },
    methods: {
        updateStaticValues() {
            this.accessibleTo = [...(this.entity?.accessibleTo ?? [])];
            this.updatableTo = [...(this.entity?.updatableTo ?? [])];
        },
        updateKeyModel() {
            this.setEntityProp({key: 'keyValues', value: [...JSON.parse(JSON.stringify(this.kvItems))]});
        },
        ...mapMutations({
            setEntityProp: 'project/vault/setEntityProp',
        }),
    }
};
</script>
