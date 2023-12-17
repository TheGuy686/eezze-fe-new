import { keyify, tr } from '~/classes/globals';

interface IAccessRole {
    id: string;
    projectId: string;
    name: string;
    description: string;
    accessibleTo: string[];
    updatableTo: string[];
    keyValues: any;
}

interface KeyValueItem {
    key: string;
    value: string;
    isSecret: boolean;
    ignoreFromList: boolean;
}

export default class VaultModel implements IAccessRole {
    id: string;
    projectId: string;
    name: string;
    description: string;
    accessibleTo: string[] = [];
    updatableTo: string[] = [];
    keyValues: KeyValueItem[] = [];

    constructor(
        id: string,
        projectId: string,
        name: string,
        description: string,
        accessibleTo: string[] | string,
        updatableTo: string[] | string,
        kvItems: any
    ) {
        this.projectId = projectId;
        this.id = id;
        this.name = name;
        this.description = description;

        if (typeof accessibleTo == 'string' && accessibleTo != '') {
            this.accessibleTo = JSON.parse(accessibleTo);
        }
        else if (Array.isArray(accessibleTo)) {
            this.accessibleTo = accessibleTo;
        }

        if (typeof updatableTo == 'string' && updatableTo != '') {
            this.updatableTo = JSON.parse(updatableTo);
        }
        else if (Array.isArray(updatableTo)) {
            this.updatableTo = updatableTo;
        }

        if (typeof kvItems == 'string') {
            try {
                kvItems = JSON.parse(kvItems);
            }
            catch (err) { kvItems = []}
        }

        if (Array.isArray(kvItems) && kvItems.length > 0) {
            for (let i of kvItems) {
                this.keyValues.push({...i});
            }
        }
    }

    addKvItem(key: string, value: string, isSecret: boolean = false, ignoreFromList: boolean = false) {
        this.keyValues.push({ key, value, isSecret, ignoreFromList });
    }

    replaceKvItem(key: string, item: any) {
        const out = keyify(this.keyValues, 'key');

        out[key] = {...item};

        this.keyValues = Object.values(out);
    }

    deleteKvItem(key: string) {
        const out = keyify(this.keyValues, 'key');

        if (typeof out[key] != 'undefined') delete out[key];

        this.keyValues = Object.values(out);
    }

    static create(obj: any = {}): VaultModel {
        return new VaultModel(
            obj['id'] || undefined,
            obj['projectId'] || undefined,
            obj['name'] || undefined,
            obj['description'] || undefined,
            obj['accessibleTo'] || undefined,
            obj['updatableTo'] || undefined,
            obj['keyValues'] || undefined
        );
    }

    static getColumns(ignoreColumns: string[] = []): string[] {
        let cols: any = [
            {
                title: tr('id'),
                dataIndex: 'id',
                sorter: true,
                format: (val: string) => `#${val}`
            },
            {
                title: tr('name'),
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: tr('description'),
                dataIndex: 'description',
                sorter: false
            },
            {
                title: tr('accessible-to'),
                dataIndex: 'accessibleTo',
                sorter: false,
                format: (value: any, row: any, index: number, context: any) => {
                    if (Object.keys(value ?? []).length > 0) return '';

                    let str = '<div class="display: flex; flex-direction: column;">', i: any;

                    for (i of value) {
                        const r = context?.rolesDict[Number(i)];
                        let stl = `padding: 4px 6px; background-color: ${r?.color ?? 'orange'}; margin-bottom: 2px; border-radius: 5px; color: white;`;

                        str += `<div col style="${stl}" a-center>${context.maxLen(r?.role ?? '', 10)}</div>`;
                    }

                    return `${str}</div>`;
                }
            },
            {
                title: tr('updatable-to'),
                dataIndex: 'updatableTo',
                sorter: false,
                format: (value: any, row: any, index: number, context: any) => {
                    if (Object.keys(value ?? []).length > 0) return '';

                    let str = '<div style="display: flex; flex-direction: column; margin-right: 20px;">', i: any;

                    for (i of value) {
                        const r = context?.rolesDict[Number(i)];
                        let stl = `padding: 4px 6px; background-color: ${r?.color ?? 'orange'}; margin-bottom: 2px; border-radius: 5px; color: white;`;

                        str += `<div col style="${stl}" a-center>${context.maxLen(r?.role ?? '', 10)}</div>`;
                    }

                    return `${str}</div>`;
                }
            },
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}