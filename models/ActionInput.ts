interface IAccessService {
    id: string;
    serviceGroupId: string;
    type: string;
    name: string;
    description: string;
    definition: object;
    actionInput: any[];
    logic: any[];
    output: any[];
}

// definition: {
//     interval: interval,
//     period: period
// },

export default class ServiceGroupModel implements IAccessService {
    id: string;
    serviceGroupId: string;
    type: string;
    name: string;
    description: string;
    definition: object;
    actionInput: any[] = [];
    logic: any[] = [];
    output: any[] = [];

    constructor(
        id: string, 
        serviceGroupId: string, 
        type: string, 
        name: string,
        description: string,
        definition: object,
        actionInput: any[],
        logic: any[],
        output: any[],
    ) {
        this.id = id;
        this.serviceGroupId = serviceGroupId;
        this.type = type;
        this.name = name;
        this.description = description;
        this.definition = definition;

        if (Array.isArray(actionInput)) {
            for (const item of actionInput) {
                this.actionInput.push({

                });
            }
        }

        if (Array.isArray(logic)) {
            for (const item of logic) {
                
            }
        }

        if (Array.isArray(output)) {
            for (const item of output) {
                
            }
        }
    }

    static create(obj: any): ServiceGroupModel {
        return new ServiceGroupModel(
            obj['id'] || undefined,
            obj['serviceGroupId'] || undefined,
            obj['type'] || undefined,
            obj['name'] || undefined,
            obj['description'] || undefined,
            obj['definition'] || undefined,
            obj['actionInput'] || undefined,
            obj['logic'] || undefined,
            obj['output'] || undefined,
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
            {
                title: 'Services',
                dataIndex: 'totalServices',
                sorter: true
            }
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}