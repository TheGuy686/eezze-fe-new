// /store/getters.js
import { keyify } from '~/classes/globals';

export default {
    loggers(state: any, getters: any, appState: any, appGetters: any) {
        const dss = (appState?.project?.['data-sources']?.entities ?? []);

        return dss.filter((ds: any) => (ds.type == 'eezze-logger'));
    },
    loggersDict(state: any, getters: any) {
        return keyify(
            Object.values(getters.loggers),
            'id'
        );
    },
}