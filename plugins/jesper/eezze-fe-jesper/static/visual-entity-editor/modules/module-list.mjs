import dbTable from './database/db-table.mjs';
import dbColumn from './database/db-column.mjs';

export default class ModuleList {
	
	constructor() {
		return { 
			dbTable,
			dbColumn
		};
	}

}