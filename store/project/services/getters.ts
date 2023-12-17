import { camelCase } from "~/classes/globals";
import ServiceModel from "~/models/ServiceModel";

export default {
    editingServices(state: any, getters: any, rootState: any) {
        try {
            const serviceGroup = rootState?.project['service-groups']?.entity ?? {};

            const services =  Object.values(
                (state?.entities ?? []).filter((ser: any) => ser.serviceGroupId == serviceGroup.id)
            );

            const out = [];

            for (let s of services) {
                out.push(ServiceModel.create(s));
            }

            return out;
        }
        catch (err) { return [] }
    },
    groupedServices(state: any, arg1: any, appState: any) {
        const out = [];

        const services = appState?.project?.services?.entities;
        const sgs = appState?.project?.['service-groups']?.entities;

        for (const sg of sgs) {
            out.push({
                ...sg,
                services: services.filter((ser: any) => ser.serviceGroupId == sg.id),
            });
        }

        return out;
    },
    serviceExists(state: any) {
        const servs = state?.entities ?? [];

        return function(name: string) {
            const nme = camelCase(name ?? '');

            const found = servs.filter((s: any) => camelCase(s?.name ?? '') == nme);

            return found.length > 0;
        };
    },
}