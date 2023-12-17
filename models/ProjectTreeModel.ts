import ProjectModel from './ProjectModel';
import ConnectionModel from './ConnectionModel';
import DatasourceModel from './DatasourceModel';
import RoleModel from './RoleModel';
import VaultModel from './VaultModel';
import ValueStoreModel from './ValueStoreModel';

interface Interface {
    project: ProjectModel;
    connection: ConnectionModel;
    datasources: DatasourceModel[];
    roles: RoleModel[];
    vault: VaultModel;
    values: ValueStoreModel[];
}

export default class ProjectTreeModel implements Interface {
    project!: ProjectModel;
    connection!: ConnectionModel;
    datasources: DatasourceModel[] = [];
    roles: RoleModel[] = [];
    vault!: VaultModel;
    values: ValueStoreModel[] = [];
    dssDict: any = {};

    constructor(
        project: any,
        connection: any,
        datasources: any[],
        roles: any[],
        vault: any,
        values: any,
        dssDict: any = {}
    ) {
        try {
            this.project = ProjectModel.create(project);
            this.connection = ConnectionModel.create(connection);

            if (typeof vault == 'string') {
                try {
                    this.vault = VaultModel.create(JSON.parse(vault));
                }
                catch (err) {
                    console.log('There was an error creating your project tree vault: ', err);
                }
            }
            else this.vault = VaultModel.create(vault);

            for (const ds of datasources) {
                this.datasources.push(DatasourceModel.create(ds));
            }

            for (const rl of roles) {
                this.roles.push(RoleModel.create(rl));
            }

            for (const vl of values) {
                this.values.push(ValueStoreModel.create(vl));
            }

            this.dssDict = dssDict;
        }
        catch (err) {
            console.log(`There was an error creating your project tree model: `, err);
        }
    }

    static create(obj: any = {}) : ProjectTreeModel {
        let dss: any[] = [];

        if (Array.isArray(obj?.datasources)) {
            dss = obj?.datasources;
        }
        else {
            if (typeof obj?.datasources?.['restDs'] == 'object') dss.push(obj.datasources['restDs']);
            if (typeof obj?.datasources?.['wsDs'] == 'object') dss.push(obj.datasources['wsDs']);
            if (typeof obj?.datasources?.['cronDs'] == 'object') dss.push(obj.datasources['cronDs']);
            if (typeof obj?.datasources?.['loggerDs'] == 'object') dss.push(obj.datasources['loggerDs']);
            if (typeof obj?.datasources?.['mysqlDs'] == 'object') dss.push(obj.datasources['mysqlDs']);
        }

        return new ProjectTreeModel(
            obj?.info,
            obj?.connection,
            dss,
            obj?.roles,
            obj?.vault,
            obj?.values,
            obj?.datasources,
        );
    }
}