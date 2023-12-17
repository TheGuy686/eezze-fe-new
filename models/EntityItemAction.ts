import AccessRole from './AccessRole';

interface IEntityItemAction {
	key: string;
	name: string;
	accessRight?: AccessRole;
}

export default class EntityItemActionModel implements IEntityItemAction {
	key: string;
    name: string;
    accessRight?: AccessRole;

	constructor(
		key: string,
		name: string,
		accessRight?: AccessRole,
	) {
		this.key = key;
		this.name = name;
        
        if (typeof this.accessRight == 'object') {
            this.addAccessRight(accessRight);
        }
	}

    addAccessRight(accessRight?: AccessRole) {
        this.accessRight = accessRight;
    }

	static create(obj: any): EntityItemActionModel {
		return new EntityItemActionModel(
			obj.key || undefined,
			obj.type || undefined,
			obj.accessRight || undefined,
		);
	}
}
