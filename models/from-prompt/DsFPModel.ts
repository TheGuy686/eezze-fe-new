import DatasourceModel from '../DatasourceModel';

export default class RoleFPModel {
	static create(prompt: string = '') {

		// create:ds:rest-service:Blog:This is a REST service for managing a blog on the website
		let matches = prompt.match(/create:ds:(.*?):(.*?):(.*?)/);

		if (matches) {
			return DatasourceModel.create({
				type: matches[1].trim(),
				name: matches[2].trim(),
				description: matches[3].trim(),
			});
		}

		matches = prompt.match(/create:ds:(.*?):(.*?)/);

		if (matches) {
			return DatasourceModel.create({
				type: matches[1].trim(),
				name: matches[2].trim(),
			});
		}
	}
}