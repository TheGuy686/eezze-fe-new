import { InitCrudMutations } from '~/factories/crud/Mutations';
import StoreModel from '~/models/StoreModel';

import Vue from 'vue';

export default {
    ...InitCrudMutations({
        storeKey: 'user/store',
        entityClass: StoreModel,
    }),
    setIsAddingReview(state: any, ste: boolean) {
        Vue.set(state, 'isAddingReview', ste);
    }
}