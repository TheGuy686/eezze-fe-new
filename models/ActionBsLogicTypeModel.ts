interface IActionBsLogicTypeModel {
    id: string;
    name: string;
}

export default class ActionBsLogicTypeModel implements IActionBsLogicTypeModel {
    id: string;
    name: string;
    hasLifecycleEvents: boolean = false;
    hasAuthenticationEvents: boolean = false;
    
    constructor(
        id: string,
        name: string,
    ) {
        this.id = id;
        this.name = name;
    }

    static create(obj: any) : ActionBsLogicTypeModel {
        return new ActionBsLogicTypeModel(
            obj['id'] || undefined,
            obj['name'] || undefined,
        );
    }

    static getColumns(ignoreColumns: string[] = []) : string[] {
		let cols: any = [
            {
                title: 'Key',
                dataIndex: 'key',
                sorter: true,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: true
            },
        ];

		if (ignoreColumns.length > 0) {
			return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
		}

		return cols;
	}
}