import { tr } from "~/classes/globals";

interface IAccessRole {
    id: number;
    name: string;
    nameTr: string;
    description: string;
}

export default class StoreCategoryModel implements IAccessRole {
    id: number;
    name: string;
    nameTr: string;
    description: string;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.nameTr = tr(name);
        this.description = description;
    }

    static create(obj: any = {}): StoreCategoryModel {
        return new StoreCategoryModel(
            obj['id'] || undefined,
            obj['name'] || undefined,
            obj['description'] || undefined,
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
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}