import { tr } from '../classes/globals';
import UserModel from './UserModel';
import ReviewModel from './ReviewModel';
import StoreDatasourceModel from './StoreDatasourceModel';
import StoreConnectionModel from './StoreConnectionModel';
import StoreRoleModel from './StoreRoleModel';
import StoreValueStoreModel from './ValueStoreModel';
import StoreVaultModel from './StoreVaultModel';
import StoreServiceConfigurableModel from './StoreServiceConfigurableModel';
import StoreServiceGroupModel from './StoreServiceGroupModel';
import ProjectModel from './ProjectModel';

interface Interface {
    id: string | number;
    name: string;
    description: string;
    active: boolean;
    categoryFour: string;
    categoryThree: string;
    createdBy: UserModel;
    metadata: string | object;
    required: true;
    reviews: ReviewModel[];
    datasources: StoreDatasourceModel[];
    connections: StoreConnectionModel[] | string;
    roles: StoreRoleModel[];
    scope: string;
    sgFunction: string | string[];
    shortFunction: string | string[];
    serviceGroups: StoreServiceGroupModel[];
    serviceConfigs: StoreServiceConfigurableModel[];
    valueStore: StoreValueStoreModel[];
    vault: StoreVaultModel[];
    version: number | string;
    allServiceIds: number[];
}

export default class StoreModel implements Interface {
    id: string | number;
    name: string = '';
    description: string = '';
    active: boolean = true;
    categoryFour: string = '';
    categoryThree: string = '';
    metadata: string | object = {};
    required: true = true;
    scope: string = 'internal';
    sgFunction: string | string[] = [];
    shortFunction: string | string[] = [];
    connections: StoreConnectionModel[] = [];
    serviceConfigs: StoreServiceConfigurableModel[] = [];
    serviceGroups: StoreServiceGroupModel[] = [];
    valueStore: StoreValueStoreModel[] = [];
    roles: StoreRoleModel[] = [];
    datasources: StoreDatasourceModel[] = [];
    vault: StoreVaultModel[] = [];
    reviews: ReviewModel[] = [];
    version: number | string = 1.0;
    createdBy: UserModel;
    allServiceIds: number[] = [];
    publishApproved: boolean = false;

    constructor(
        id: number | string,
        name: string,
        description: string,
        active: boolean,
        categoryFour: string,
        categoryThree: string,
        metadata: string | object,
        scope: string,
        sgFunction: string | string[],
        shortFunction: string | string[],
        version: number | string,
        serviceConfigs: StoreServiceConfigurableModel[] | string,
        serviceGroups: StoreServiceGroupModel[] | string,
        roles: StoreRoleModel[] | string,
        valueStore: StoreValueStoreModel[] | string,
        datasources: StoreDatasourceModel[] | string,
        connections: StoreConnectionModel[] | string,
        vault: StoreValueStoreModel[] | string,
        reviews: ReviewModel[] | string,
        createdBy: any,
        allServiceIds: number[] | string,
        publishApproved: boolean = false,
    ) {
        this.id = id;
        this.active = active;
        this.categoryFour = categoryFour;
        this.categoryThree = categoryThree;
        this.name = name;
        this.description = description;
        this.scope = scope;
        this.createdBy = createdBy;
        this.publishApproved = publishApproved;

        if (createdBy instanceof UserModel) {
            this.createdBy = createdBy;
        }
        else if (typeof createdBy == 'object') {
            this.createdBy = UserModel.create(createdBy);
        }
        else if (typeof createdBy == 'string') {
            try {
                this.createdBy = UserModel.create(JSON.parse(createdBy));
            }
            catch (err) {}
        }
        else this.createdBy = createdBy;
try {
        if (typeof version == 'string') {
            this.version = parseFloat(version ?? '1.0');
        }

        if (typeof metadata == 'string') {
            try {
                this.metadata = JSON.parse(metadata);
            }
            catch (err) {}
        }
        else this.metadata = metadata;

        if (typeof sgFunction == 'string') {
            try {
                this.sgFunction = sgFunction.split('\n');
            }
            catch (err) {}
        }
        else this.sgFunction = sgFunction;

        if (typeof shortFunction == 'string') {
            try {
                this.shortFunction = shortFunction.split('\n');
            }
            catch (err) {}
        }
        else this.shortFunction = shortFunction;

        if (typeof serviceConfigs == 'string') {
            try {
                const obs = JSON.parse(serviceConfigs);

                for (const o of obs) {
                    this.serviceConfigs.push(StoreServiceConfigurableModel.create(o));
                }
            }
            catch (err) {}
        }
        else if (Array.isArray(serviceConfigs)) {
            for (const o of serviceConfigs) {
                this.serviceConfigs.push(StoreServiceConfigurableModel.create(o));
            }
        }
        else this.serviceConfigs = serviceConfigs;

        if (typeof serviceGroups == 'string') {
            try {
                const obs = JSON.parse(serviceGroups);

                for (const o of obs) {
                    this.serviceGroups.push(StoreServiceGroupModel.create(o));
                }
            }
            catch (err) {}
        }
        else if (Array.isArray(serviceGroups)) {
            for (const o of serviceGroups) {
                this.serviceGroups.push(StoreServiceGroupModel.create(o));
            }
        }
        else this.serviceGroups = serviceGroups;

        if (typeof roles == 'string') {
            try {
                const objs = JSON.parse(roles);

                for (const o of objs) {
                    this.roles.push(StoreRoleModel.create(o));
                }
            }
            catch (err) {}
        }
        else if (Array.isArray(roles)) {
            for (const o of roles) {
                this.roles.push(StoreRoleModel.create(o));
            }
        }
        else this.roles = roles;

        if (typeof valueStore == 'string') {
            try {
                const objs = JSON.parse(valueStore);

                for (const o of objs) {
                    this.valueStore.push(StoreValueStoreModel.create(o));
                }
            }
            catch (err) {}
        }
        else if (Array.isArray(valueStore)) {
            for (const o of valueStore) {
                this.valueStore.push(StoreValueStoreModel.create(o));
            }
        }
        else this.valueStore = valueStore;

        if (typeof datasources == 'string') {
            try {
                const objs = JSON.parse(datasources);

                for (const o of objs) {
                    this.datasources.push(StoreDatasourceModel.create(o));
                }
            }
            catch (err) {}
        }
        else if (Array.isArray(datasources)) {
            for (const o of datasources) {
                this.datasources.push(StoreDatasourceModel.create(o));
            }
        }
        else this.datasources = datasources;

        if (typeof connections == 'string') {
            try {
                const objs = JSON.parse(connections);

                for (const o of objs) {
                    this.connections.push(StoreConnectionModel.create(o));
                }
            }
            catch (err) {}
        }
        else if (Array.isArray(connections)) {
            for (const o of connections) {
                this.connections.push(StoreConnectionModel.create(o));
            }
        }
        else this.connections = connections;

        if (typeof vault == 'string') {
            try {
                const objs = JSON.parse(vault);

                for (const o of objs) {
                    this.vault.push(StoreVaultModel.create(o));
                }
            }
            catch (err) {}
        }
        else if (Array.isArray(vault)) {
            for (const o of vault) {
                this.vault.push(StoreVaultModel.create(o));
            }
        }
        else this.vault = vault;

        if (typeof reviews == 'string') {
            try {
                const objs = JSON.parse(reviews);

                for (const o of objs) {
                    this.reviews.push(ReviewModel.create(o));
                }
            }
            catch (err) {}
        }
        else if (Array.isArray(reviews)) {
            for (const o of reviews) {
                this.reviews.push(ReviewModel.create(o));
            }
        }
        else this.reviews = reviews;

        if (typeof allServiceIds == 'string') {
            try {
                this.allServiceIds = JSON.parse(allServiceIds);
            }
            catch (err) {}
        }
        else if (Array.isArray(allServiceIds)) {
            this.allServiceIds = allServiceIds;
        }
}
catch (err) {
    console.log('Error: ', err);
}
    }

    static create(obj: any = {}): StoreModel {
        return new StoreModel(
            obj['id'],
            obj['name'],
            obj['description'],
            obj['active'],
            obj['categoryFour'],
            obj['categoryThree'],
            obj['metadata'],
            obj['scope'],
            obj['sgFunction'],
            obj['shortFunction'],
            obj['version'],
            obj['serviceConfigs'],
            obj['serviceGroups'],
            obj['roles'],
            obj['valueStore'],
            obj['datasources'],
            obj['connections'],
            obj['vault'],
            obj['reviews'],
            obj['createdBy'],
            obj['allServiceIds']
        );
    }

    serializeToTemplate(project: ProjectModel | any, flattenVault: boolean = false) {
        let proj;

        if (project instanceof ProjectModel) {
            proj = project;
        }
        else {
            proj = ProjectModel.create({
                projectName: `"${this.name}" template scaffold`,
                details: `This project was created from store tempalte "${this.name}"`,
            });
        }

        const out: any = {
            info: proj,
            id: this.id,
            name: this.name,
            description: this.description,
            active: this.active,
            categoryFour: this.categoryFour,
            categoryThree: this.categoryThree,
            metadata: this.metadata,
            scope: this.scope,
            sgFunction: this.sgFunction,
            shortFunction: this.shortFunction,
            version: this.version,
            serviceConfigs: this.serviceConfigs,
            serviceGroups: this.serviceGroups,
            roles: this.roles,
            values: this.valueStore,
            datasources: this.datasources,
            connections: this.connections,
            reviews: this.reviews,
            createdBy: this.createdBy,
            allServiceIds: this.allServiceIds,
        };

        if (flattenVault) {
            if (this.vault.length > 0) {
                out['vault'] = this.vault[0];
            }
            else out['vault']= {};
        }
        else out['vault'] = this.vault;

        return out;
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
                title: tr('services'),
                dataIndex: 'totalServices',
                sorter: true,
            },
            {
                title: tr('status'),
                dataIndex: 'publishApproved',
                format: (value: any, row: any) => {
                    return !!value ? `<span style="color: green">${tr('approved')} ✔</span>` : `<span style="color: red">${tr('awaiting-approval')} ✗</span>`;
                }
            }
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}