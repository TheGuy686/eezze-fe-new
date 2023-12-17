import { tr } from '~/classes/globals';
import ServiceModel from './ServiceModel';

interface IAccessService {
    id: string;
    projectId: string;
    name: string;
    description: string;
    type: string;
    metadata: any;
    isAuthenticator: boolean;
    services?: ServiceModel[];
}

export default class ServiceGroupModel implements IAccessService {
    id: string;
    projectId: string;
    name: string;
    description: string;
    type: string = '';
    metadata: any = {};
    isAuthenticator: boolean = false;
    services: ServiceModel[] = [];

    constructor(
        id: string,
        projectId: string,
        name: string,
        description: string,
        metadata: any,
        type: string = 'custom',
        services?: any,
    ) {
        this.id = id;
        this.projectId = projectId;
        this.name = name;
        this.description = description;
        this.type = type;

        if (typeof metadata == 'string') {
            try {
                this.metadata = JSON.parse(metadata);
            }
            catch (err) {}
        }
        else if (typeof metadata == 'object') {
            this.metadata = metadata;
        }

        this.isAuthenticator = type == 'authenticator';

        let servs = [];

        if (typeof services == 'string') {
            try {
                servs = JSON.parse(services);
            }
            catch(err) {}
        }
        else if (Array.isArray(services)) {
            servs = services;
        }

        for (const ser of servs) {
            this.services.push(ServiceModel.create(ser));
        }
    }

    static create(obj: any): ServiceGroupModel {
        return new ServiceGroupModel(
            obj['id'] || undefined,
            obj['projectId'] || undefined,
            obj['name'] || undefined,
            obj['description'] || undefined,
            obj['metadata'] || undefined,
            obj['type'] || undefined,
            obj['services'] || undefined,
        );
    }

    static getColumns(ignoreColumns: string[] = []): string[] {
        let cols: any = [
            {
                title: tr('service-group'),
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: tr('description'),
                dataIndex: 'description',
                sorter: true,
            },
            {
                title: tr('type'),
                dataIndex: 'type',
                sorter: true,
            },
            // {
            //     title: tr('services'),
            //     dataIndex: 'totalServices',
            //     sorter: true
            // }
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}