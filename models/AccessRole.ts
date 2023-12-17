import RoleModel from './RoleModel';

interface IAccessRole {
	create: string[];
    read: string[];
    update: string[];
    delete: string[];
}

type VALID_MODES = 'create' | 'read' | 'update' | 'delete';

export default class AccessRoleModel implements IAccessRole {
	create: string[] = [];
    read: string[] = [];
    update: string[] = [];
    delete: string[] = [];

	static create(obj: any): AccessRoleModel {
		let role = new AccessRoleModel();

        if (typeof obj['create'] == 'object' && Array.isArray(obj['create'])) {
            obj['create'].forEach((rolePair: any) => {
                let rp = RoleModel.create(rolePair);
                //role.addRole(rp.mode, rp.role);
            });
        }

        if (typeof obj['read'] == 'object' && Array.isArray(obj['create'])) {
            obj['read'].forEach((rolePair: any) => {
                let rp = RoleModel.create(rolePair);
                //role.addRole(rp.mode, rp.role);
            });
        }

        if (typeof obj['update'] == 'object' && Array.isArray(obj['create'])) {
            obj['update'].forEach((rolePair: any) => {
                let rp = RoleModel.create(rolePair);
                //role.addRole(rp.mode, rp.role);
            });
        }

        if (typeof obj['delete'] == 'object' && Array.isArray(obj['create'])) {
            obj['delete'].forEach((rolePair: any) => {
                let rp = RoleModel.create(rolePair);
                //role.addRole(rp.mode, rp.role);
            });
        }

        return role;
	}

    addRole(mode: VALID_MODES, role: string) {
        this[mode].push(role);
    }
}