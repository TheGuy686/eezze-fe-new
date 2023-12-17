import { tr } from '~/classes/globals';

interface IResponseCode {
    name: string;
    description: string;
    code: string;
    enabled: string;
}

export default class ResponseCodeModel implements IResponseCode {
    name: string;
    description: string;
    code: string;
    enabled: string;

    constructor(name: string, description: string, code: string, enabled: string) {
        this.name = name;
        this.description = description;
        this.code = code;
        this.enabled = enabled;
    }

    static create(obj: any): ResponseCodeModel {
        return new ResponseCodeModel(
            obj['name'] || undefined,
            obj['description'] || undefined,
            obj['code'] || undefined,
            obj['enabled'] || undefined
        );
    }

    static getColumns(ignoreColumns: string[] = []): string[] {
        let cols: any = [
            {
                title: tr('name'),
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: tr('description'),
                dataIndex: 'description',
                sorter: true,
            },
            {
                title: tr('code'),
                dataIndex: 'code',
                sorter: true,
            },
            {
                title: tr('enabled'),
                dataIndex: 'enabled',
                sorter: true,
                format: (value: any)=>{
                    if (value==1) {
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