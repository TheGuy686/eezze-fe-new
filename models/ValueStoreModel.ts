import { tr } from '~/classes/globals';

interface Interface {
    id: string;
    key: string;
    value: string;
    type: string;
}

export default class ValueStoreModel implements Interface {
    id: string;
    key: string;
    value: string;
    type: string = 'text';

    constructor(
        id: string,
        key: string,
        value: string,
        type: string = 'text',
    ) {
        this.id = id;
        this.key = key;
        this.value = value;
        this.type = type;
    }

    static create(obj: any): ValueStoreModel {
        return new ValueStoreModel(
            obj['id'] || undefined,
            obj['key'] || undefined,
            obj['value'] || undefined,
            obj['type'] || 'text',
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
                title: tr('key'),
                dataIndex: 'key',
                sorter: true,
            },
            {
                title: tr('value'),
                dataIndex: 'value',
                sorter: true
            },
            {
                title: tr('type'),
                dataIndex: 'type',
                sorter: true
            },
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}