export default {
    unitTestingIds(state: any) { return state.unitTestingIds },
    lastPassedUts(state: any) { return state.lastPassedUts },
    lastFailedUts(state: any) { return state.lastFailedUts },
    restUts: (arg: any, arg1: any, appState: any, appGetters: any) => {
        const out: any = [];

        try {
            const sgs = appGetters['project/services/groupedServices'];

            // loop over each service group
            for (const sg of sgs) {
                if (typeof sg?.metadata?.restDs == 'undefined') continue;

                // loop over the services to compile a group of UT's
                for (const ser of sg?.services ?? []) {
                    if (ser?.type != 'rest') continue;
                    out.push({ ... ser, sg: sg });
                }
            }

            return out;
        }
        catch (e) { return [] }
    },
    wsUts: (arg: any, arg1: any, appState: any, appGetters: any) => {
        const out: any = [];

        try {
            const sgs = appGetters['project/services/groupedServices'];

            // loop over each service group
            for (const sg of sgs) {
                if (typeof sg?.metadata?.restDs == 'undefined') continue;

                // loop over the services to compile a group of UT's
                for (const ser of sg?.services ?? []) {
                    if (ser?.type != 'websocket') continue;
                    out.push({ ... ser, sg: sg });
                }
            }

            return out;
        }
        catch (e) { return [] }
    },
    cronUts: (arg: any, arg1: any, appState: any, appGetters: any) => {
        const out: any = [];

        try {
            const sgs = appGetters['project/services/groupedServices'];

            // loop over each service group
            for (const sg of sgs) {
                if (typeof sg?.metadata?.restDs == 'undefined') continue;

                // loop over the services to compile a group of UT's
                for (const ser of sg?.services ?? []) {
                    if (ser?.type != 'cron') continue;
                    out.push({ ... ser, sg: sg });
                }
            }

            return out;
        }
        catch (e) { return [] }
    },
}