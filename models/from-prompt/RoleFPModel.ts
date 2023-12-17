import RoleModel from '../RoleModel';

export default class RoleFPModel {
	static create(prompt: string = '') {
		let matches = prompt.match(/create:role:(.*?):(.*?)/);

		if (matches) {
			return RoleModel.create({
				role: matches[1].trim(),
				description: matches[2].trim(),
			});
		}

		matches = prompt.match(/create:role:(.*?)/);

		if (matches) {
			return RoleModel.create({ role: matches[1].trim() });
		}
	}
}