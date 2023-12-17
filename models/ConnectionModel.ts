import { tr } from '~/classes/globals';

interface IAccessRole {
    id: string;
    name: string;
    description: string;
    type: string;
    metadata: object;
    enabled: boolean;
    state: object;
}

const { decompress } = require('shrink-string');

export default class ConnectionModel implements IAccessRole {
    id: string;
    name: string;
    description: string;
    type: string = 'server';
    metadata: object = {};
    enabled: boolean = true;
    state: any = {};

    constructor(
        id: string, 
        name: string, 
        description: string, 
        type: string, 
        metadata: object, 
        enabled: boolean = true,
        state: any,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.enabled = enabled;
        this.state = state;

        if (typeof metadata == 'string') {
            try {
                this.metadata = JSON.parse(metadata);
            }
            catch (err) { this.metadata = {} }
        }
        else {
            this.metadata = metadata;
        }
    }

    static create(obj: any = {}): ConnectionModel {
        return new ConnectionModel(
            obj['id'] || undefined,
            obj['name'] || undefined,
            obj['description'] || undefined,
            obj['type'] || undefined,
            obj['metadata'] || undefined,
            obj['enabled'] || true,
            obj['state'] || true,
        );
    }

    async decrypt() {
        try {
            try {
                this.state = JSON.parse(this.state);

                return this.state;
            }
            catch (err) {}

            const res = await decompress(this.state);

            this.state = JSON.parse(res);

            return res;
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }

    static getColumns(ignoreColumns: string[] = []): string[] {
        const cols: any = [
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
                sorter: false,
                format: (val: string) => tr(val)
            },
            {
                title: tr('enabled'),
                dataIndex: 'enabled',
                sorter: true,
                format: (value: any)=>{
                    if (value == 1) {
                        return '<span style="color: green">✔</span>';
                    }
                }
            }
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }

    serialize() {
        return {
            id: Number(`${this.id}`), 
            name: this.name + '', 
            description: this.description + '', 
            type: this.type + '', 
            metadata: JSON.parse(JSON.stringify(this.metadata)), 
            enabled: this.enabled == true,
            state: this.state + '',
        }
    }
}