import { InitCrudActions } from '~/factories/crud/Actions';
import { kebabCase } from '~/classes/globals';
import Request from '@/classes/Request';

export default {
    ...InitCrudActions({
        allPath: '/cms/service-presets',
        editUpdatePath: '/cms/service-preset',
        entityId: 'servicePresetId'
    }),

    async applyPresetsToProject(stateArgs: any, args: any) {
        stateArgs.commit('setDoingRequestState', true);

        let keyOverrides = {};

        if (Object.keys(stateArgs.state.datasourceKeyOverrides).length > 0) {
            keyOverrides = stateArgs.state.datasourceKeyOverrides;
        }

        let res: any = await Request.post('/service/project/apply', {
            key: kebabCase(stateArgs.state.newPresetName),
            name: stateArgs.state.newPresetName,
            data: stateArgs.state.selectedStoreKeys,
            datasourceKeyOverrides: keyOverrides,
        })
            .then((d: any) => d.toObject())
            .catch((d: any) => d.toObject());

        if (res.success) {
            if (args.successCb) args.successCb();
            setTimeout(() => stateArgs.commit('setDoingRequestState', false), 1000);
            return;
        }

        console.log('There was an error: ', res);

        setTimeout(() => {
            if (args.errorCb) args.errorCb(res);
            stateArgs.commit('setAddToProjectErrors', res);
            stateArgs.commit('setDoingRequestState', false);
        }, 1000);
    },
};