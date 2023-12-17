import { tr } from '~/classes/globals';

interface Interface {
    id: string;
    key: string;
    title: string;
}

export default class BlActionResponseTypeModel implements Interface {
    id: string;
    key: string;
    title: string;

    constructor(id: string, key: string, title: string) {
        this.id = id;
        this.key = key;
        this.title = title;
    }

    static create(obj: any): BlActionResponseTypeModel {
        return new BlActionResponseTypeModel(
            obj['id'] || undefined,
            obj['key'] || undefined,
            obj['title'] || undefined,
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
                title: tr('key'),
                dataIndex: 'key',
                sorter: true,
            },
            {
                title: tr('title'),
                dataIndex: 'title',
                sorter: false
            },
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}