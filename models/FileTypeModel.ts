import { tr } from '~/classes/globals';

interface Interface {
    id: string;
    key: string;
    name: string;
    description: string;
    ext: string;
    enabled: boolean;
}

export default class FileTypeModel implements Interface {
    id: string;
    key: string;
    name: string;
    description: string;
    ext: string;
    enabled: boolean;
    
    constructor(
        id: string,
        key: string,
        name: string,
        description: string,
        ext: string,
        enabled: boolean
    ) {
        this.id = id;
        this.key = key;
        this.name = name;
        this.description = description;
        this.ext = ext;
        this.enabled = enabled;
    }

    static create(obj: any) : FileTypeModel {
        return new FileTypeModel(
            obj['id'] || undefined,
            obj['key'] || undefined,
            obj['name'] || undefined,
            obj['description'] || undefined,
            obj['ext'] || undefined,
            obj['enabled'] || undefined,
        );
    }

    static getColumns(ignoreColumns: string[] = []) : string[] {
		let cols: any = [
            {
                title: tr('name'),
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: tr('key'),
                dataIndex: 'key',
                sorter: true,
            },
            {
                title: tr('type'),
                dataIndex: 'type',
                sorter: true
            },
            {
                title: tr('extension'),
                dataIndex: 'ext',
                sorter: true
            },
            {
                title: tr('enabled'),
                dataIndex: 'enabled',
                sorter: true
            }
        ];

		if (ignoreColumns.length > 0) {
			return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
		}

		return cols;
	}
}