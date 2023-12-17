import { tr } from '~/classes/globals';

interface IAccessRole {
    id: string;
    role: string;
    description: string;
    type: string;
    metadata: object;
    enabled: boolean;
}

export default class ConnectionTypeModel implements IAccessRole {
    id: string;
    role: string;
    description: string;
    type: string;
    metadata: object = {};
    enabled: boolean = true;

    constructor(id: string, role: string, description: string, type: string, metadata: object, enabled: boolean) {
        this.id = id;
        this.role = role;
        this.description = description;
        this.type = type;
        this.metadata = metadata;
        this.enabled = enabled;
    }

    static create(obj: any): ConnectionTypeModel {
        return new ConnectionTypeModel(
            obj['id'] || undefined,
            obj['role'] || undefined,
            obj['description'] || undefined,
            obj['type'] || undefined,
            obj['metadata'] || undefined,
            obj['enabled'] || undefined,
        );
    }

    static getColumns(ignoreColumns: string[] = []): string[] {
        let cols: any = [
            {
                title: tr('id'),
                dataIndex: 'id',
                sorter: true,
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
                title: tr('type'),
                dataIndex: 'type',
                sorter: false
            },
            {
                title: tr('enabled'),
                dataIndex: 'active',
                sorter: true,
                format: (value: any)=>{
                    if (value == 1) {
                        return '<span style="color: green">✔</span>'
                    }
                }
            }
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}