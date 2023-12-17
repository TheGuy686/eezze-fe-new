interface IDatasourceTypeModel {
    id: string;
    name: string;
    description: string;
    type: string;
    enabled: boolean;
}

export default class DatasourceTypeModel implements IDatasourceTypeModel {
    id: string;
    name: string;
    description: string;
    type: string;
    enabled: boolean;
    
    constructor(
        id: string,
        name: string,
        description: string,
        type: string,
        enabled: boolean
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.enabled = enabled;
    }

    static create(obj: any) : DatasourceTypeModel {
        return new DatasourceTypeModel(
            obj['id'] || undefined,
            obj['name'] || undefined,
            obj['description'] || undefined,
            obj['type'] || undefined,
            obj['enabled'] || undefined,
        );
    }

    static getColumns(ignoreColumns: string[] = []) : string[] {
		let cols: any = [
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                sorter: true
            },
            {
                title: 'enabled',
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