import EntityModel from '~/models/EntityModel';
import { keyify } from '~/classes/globals';

export default {
    currentLogger(state: any, getters: any, rootState: any, rootGetters: any) {
        const def = {};

        try {
            const pr = rootGetters?.['project/proj/currrentProjectObj'];

            if (!pr?.hasLogger) return def;

            for (const ds of state?.entities ?? []) {
                if (ds?.type != 'eezze-logger') continue;

                return ds;
            }
        }
        catch (err) { return def }
    },
    datasourcesDict(state: any, getters: any, rootState: any) {
        try {
            return keyify(state?.entities ?? [], 'id');
        }
        catch (err) { return [] }
    },
    dsEntitiesDict(state: any, getters: any, rootState: any) {
        try {
            const out: any = {};

            for (const ds of state.entities ?? []) {
                out[ds?.id ?? -1] = {
                    id: ds?.id,
                    name: ds?.name,
                    entities: {},
                };

                for (const en of (Object.values(ds?.initModel ?? []) as any[])) {
                    const props = en?.modules ?? [];

                    const ent: any = { 
                        id: en.id,
                        name: en.name,
                        props: {},
                    };

                    if (props.length > 0) {
                        for (const pr of props) {
                            if (pr?.type == 'dbColumn') {
                                const type = pr.dataType == 'CHAR' ? 'text': (pr?.dataType ?? '').toLowerCase();

                                ent.props[pr.id] = {
                                    // groupId: 'actions',
                                    id: pr.id,
                                    title: pr.name,
                                    type: type,
                                    // key: `lc.prop('${pr.name}')`,
                                    example: EntityModel.getExampleForType(type),
                                };
                            }
                        }
                    }

                    if (out[ds.id]) {
                        out[ds.id]['entities'][ent.id] = ent;
                    }
                }
            }

            return out;
        }
        catch (err) { console.log('OUT: ', err); return [] }
    },
}