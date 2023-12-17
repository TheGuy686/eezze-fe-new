import ConnectionModel from './ConnectionModel';
import DatasourceModel from './DatasourceModel';
import RoleModel from './RoleModel';
import VaultModel from './VaultModel';
import ValueStoreModel from './ValueStoreModel';
import ServiceConfigurableModel from './ServiceConfigurableModel';
import ServiceGroupModel from './ServiceGroupModel';

interface Interface {
    connections: ConnectionModel[];
    datasources: DatasourceModel[];
    roles: RoleModel[];
    vaults: VaultModel[];
    values: ValueStoreModel[];
    serviceConfigs: ServiceConfigurableModel[];
    serviceGroup: ServiceGroupModel;
}

export default class StoreSgTreeModel implements Interface {
    connections: ConnectionModel[] = [];
    datasources: DatasourceModel[] = [];
    roles: RoleModel[] = [];
    vaults: VaultModel[] = [];
    values: ValueStoreModel[] = [];
    serviceConfigs: ServiceConfigurableModel[] = [];
    serviceGroup!: ServiceGroupModel;

    constructor(
        connections: any,
        sg: any,
        datasources: any[],
        roles: any[],
        vaultes: any[],
        values: any,
        serviceConfigs: any[],
    ) {
        try {
            if (Array.isArray(connections)) {
                for (const con of connections) {
                    this.connections.push(ConnectionModel.create(con));
                }
            }

            if (typeof sg == 'object') {
                this.serviceGroup = ServiceGroupModel.create(sg);
            }

            if (Array.isArray(vaultes)) {
                for (const vault of vaultes) {
                    this.vaults.push(VaultModel.create(vault));
                }
            }

            if (Array.isArray(datasources)) {
                for (const ds of datasources) {
                    this.datasources.push(DatasourceModel.create(ds));
                }
            }

            if (Array.isArray(roles)) {
                for (const rl of roles) {
                    this.roles.push(RoleModel.create(rl));
                }
            }

            if (Array.isArray(values)) {
                for (const vl of values) {
                    this.values.push(ValueStoreModel.create(vl));
                }
            }

            if (Array.isArray(serviceConfigs)) {
                for (const sc of serviceConfigs) {
                    this.serviceConfigs.push(ServiceConfigurableModel.create(sc));
                }
            }
        }
        catch (err) {
            console.log(`There was an error creating your project tree model: `, err);
        }
    }

    static create(obj: any = {}) : StoreSgTreeModel {
        return new StoreSgTreeModel(
            obj?.connections,
            obj?.serviceGroup,
            obj?.datasources,
            obj?.roles,
            obj?.vault,
            obj?.valueStore,
            obj?.serviceConfigs,
        );
    }
}