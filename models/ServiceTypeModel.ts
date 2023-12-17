interface IAccessService {
    name: string;
    description: string;
}

export default class ServiceTypeModel implements IAccessService {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    static create(obj: any): ServiceTypeModel {
        return new ServiceTypeModel(
            obj['name'] || undefined,
            obj['description'] || undefined
        );
    }

    static getColumns(ignoreColumns: string[] = []): string[] {
        let cols: any = [
            {
                title: 'Service Group',
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                sorter: true,
            },
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}