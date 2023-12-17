import { InitCrudActions } from '~/factories/crud/Actions';
import StoreModel from '~/models/StoreModel';

import { store } from '../../../consts/Endpoints';

export default {
    ...InitCrudActions({
        allPath: '/store/all',
        editUpdatePath: '/store/publish-module',
        entityId: 'id',
        entityClass: StoreModel,
    }),
    async addReview(stateArgs: any, params: any = {}) {
        stateArgs.commit('setIsAddingReview', true);

        let error, res: any;

        try {
            res = await (this as any).$axios.$post(store.addReview, params.review);
        }
        catch (e: any) {
            error = e.message;
            stateArgs.commit('setIsAddingReview', false);
        }

        if (!error || !res.success) {
            if (typeof params['successCb'] == 'function') {
                await params['successCb'](res);
            }
        }
        else await params['errorFallback'](res);

        stateArgs.commit('setIsAddingReview', false);
    }
};