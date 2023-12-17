import { getRandomInt, tr } from '~/classes/globals';

interface IAccessService {
    id: string;
    type: string;
    name: string;
    description: string;
    schema: object;
    output: any[];
    successCode: number;
    successMessage: string;
    errorCode: number;
    errorMessage: string;
    isNew: boolean;
}

export default class ActionModel implements IAccessService {
    id: string;
    type: string;
    name: string;
    description: string;
    schema: object;
    output: any[] = [];
    successCode: number;
    successMessage: string;
    errorCode: number;
    errorMessage: string;
    isNew: boolean = false;

    constructor(
        id: string = `${getRandomInt(10)}`,
        type: string = '',
        name: string = '',
        description: string = '',
        schema: object = {},
        output: any[] = [],
        successCode: number = 200,
        successMessage: string = 'Success message',
        errorCode: number = 400,
        errorMessage: string = 'Error message',
        isNew: boolean = false
    ) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.description = description;
        this.schema = schema;
        this.output = output;
        this.successCode = successCode;
        this.successMessage = successMessage;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.isNew = isNew;
    }

    static create(obj: any): ActionModel {
        return new ActionModel(
            obj['id'] || undefined,
            obj['type'] || undefined,
            obj['name'] || undefined,
            obj['description'] || undefined,
            obj['schema'] || undefined,
            obj['output'] || undefined,
            obj['successCode'] || undefined,
            obj['successMessage'] || undefined,
            obj['errorCode'] || undefined,
            obj['errorMessage'] || undefined,
            obj['isNew'] || undefined,
        );
    }

    static getColumns(ignoreColumns: string[] = []): string[] {
        const cols: any = [
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
                sorter: true,
            },
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}