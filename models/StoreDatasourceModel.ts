import { tr } from '../classes/globals';

interface IDatasource {
    id: string;
    key: string;
    type: string;
    name: string;
    description?: string;
    host?: string;
    dbName?: string;
    user?: string;
    pass?: string;
    server?: string;
    rootPath?: string;
    fileType?: string;
    secure?: boolean;
}

export default class StoreDatasourceModel implements IDatasource {
    id: string;
    key: string;
    type: string;
    name: string;
    description: string;
    metadata?: any;
    initModel?: object;

    constructor(
        id: string,
        key: string,
        type: string,
        name: string,
        description: string = '',
        metadata?: string | object,
        initModel?: string | object,
    ) {
        this.id = id;
        this.key = key;
        this.type = type;
        this.name = name;
        this.description = description;

        if (typeof metadata == 'string') {
            try {
                this.metadata = JSON.parse(metadata ?? '{}');
            }
            catch (err) {
                console.log('Error parsing datasource model metadata', metadata);
                this.metadata = {};
            }
        }
        else if (typeof metadata == 'object') {
            this.metadata = metadata;
        }
        else this.metadata = {};

        if (typeof initModel == 'string') {
            this.initModel = JSON.parse(initModel ?? '[]');
        }
        else if (typeof initModel == 'object') {
            this.initModel = initModel;
        }
        else this.initModel = [];
    }

    static create(obj: any) : StoreDatasourceModel {
        return new StoreDatasourceModel(
            obj['id'],
            obj['key'],
            obj['type'],
            obj['name'],
            obj['description'] ,
            obj['metadata'],
            obj['initModel'],
        );
    }

    static getColumns(ignoreColumns: string[] = []) : string[] {
		let cols: any = [
            {
                title: tr('type'),
                dataIndex: 'type',
                sorter: true,
            },
            {
                title: tr('name'),
                dataIndex: 'name',
                sorter: true,
            },
            // {
            //     title: 'Description',
            //     dataIndex: 'description',
            //     sorter: true,
            // },
        ];

		if (ignoreColumns.length > 0) {
			return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
		}

		return cols;
	}
}