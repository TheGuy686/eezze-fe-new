import { camelCase, pascalCase } from "~/classes/globals";

export default {
    authenticators(state: any) {
        try {
            const sgs = (state?.entities ?? []);

            return Object.values(sgs.filter((ser: any) => ser?.isAuthenticator));
        }
        catch (err) { return [] }
    },
    allUts(state: any, getters: any, appState: any, appGetters: any) {
        const ids: any = { rest: [], ws: [], cron: []};
        const aliases: any = { rest: [], ws: [], cron: [] };

        try {
            const sgs = appGetters['project/services/groupedServices'] ?? [];

            // loop over each service group
            for (const sg of sgs) {
                const sgKey = pascalCase(sg.name);

                // then loop over each service and compile the list of ids and aliases
                for (const service of sg.services) {
                    const servKey = camelCase(service.name);

                    if (service.type == 'websocket') {
                        ids.ws.push(service.id);
                        aliases.ws.push(`${sgKey}.WS.${servKey}.default`);
                    }
                    else if (service.type == 'rest') {
                        ids.rest.push(service.id);
                        aliases.rest.push(`${sgKey}.Rest.${servKey}.default`);
                    }
                    else if (service.type == 'cron') {}
                }
            }

            return { ids, aliases };
        }
        catch (err) { return [] }
    }
}