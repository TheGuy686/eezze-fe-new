import { randDarkColor, tr } from '../classes/globals';

interface IAccessRole {
    id: number;
    projectId: number;
    role: string;
    description: string;
}

export default class StoreRoleModel implements IAccessRole {
    id: number;
    projectId: number;
    role: string;
    description: string;
    color: string = randDarkColor()

    constructor(id: number, projectId: number, role: string, description: string) {
        this.id = id;
        this.projectId = projectId;
        this.role = role;
        this.description = description;
    }

    static create(obj: any = {}): StoreRoleModel {
        return new StoreRoleModel(
            obj['id'] || undefined,
            obj['projectId'] || undefined,
            obj['role'] || undefined,
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
                title: tr('role'),
                dataIndex: 'role',
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