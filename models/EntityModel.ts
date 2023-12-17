import EntityItemModel from './EntityItemModel';
import { tr, camelCase } from '~/classes/globals';
import { generateRandomString } from '~/classes/libs/string';

interface IEntityModel {
	id: number;
	datasource: string;
	projectId: number;
	entityId: string;
	key: string;
	name: string;
	active: boolean;
	actions: string[] | string;
	entityItems: EntityItemModel[];
}

type VALID_KEYS = 'datasource' | 'key' | 'name';

const ARRAY_TYPES = [ 'one-to-many', 'many-to-many' ];

export default class EntityModel implements IEntityModel {
	id: number;
	projectId: number;
	datasource: string;
	key: string;
	entityId: string;
	name: string;
	active: boolean = true;
	actions: string[] | string;
	entityItems: EntityItemModel[] = [];

	constructor(
		id: number,
		projectId: number,
		datasource: string,
		key: string,
		name: string,
		active: boolean,
		actions: string[] | string,
	) {
		this.id = id;
		this.projectId = projectId;
		this.datasource = datasource;
		this.key = key;
		this.entityId = key;
		this.name = name;
		this.active = active;
		this.actions = actions;
	}

	static create(obj: any = {}): EntityModel {
		let entity = new EntityModel(
			obj['id'] || undefined,
			obj['projectId'] || undefined,
			obj['datasource'] || undefined,
			obj['key'] || undefined,
			obj['name'] || undefined,
			obj['active'] || true,
			obj['actions'] || undefined
		);

		if (typeof obj['entityItems'] == 'string') {
			try {
				obj['entityItems'] = JSON.parse(obj['entityItems']);
			}
			catch (err) {}
		}

		if (typeof obj['actions'] == 'string') {
			try {
				entity.actions = JSON.parse(obj['actions']);
			}
			catch (err) {}
		}

		//add the entity items if they exist
		if (typeof obj['entityItems'] == 'object') {
			for (let k in obj['entityItems']) {
				entity.addEntityItem(obj['entityItems'][k]);
			}
		}

		return entity;
	}

	// {
	// 	"dbValues": {
	// 		"keyValues": {
	// 			"boolean-primary-key": false,
	// 			"boolean-key": true,
	// 			"boolean-unique": false,
	// 			"boolean-nullable": false,
	// 			"radio-relation-definition": "one-to-many"
	// 		}
	// 	},
	// 	"metadata": {
	// 		"required": false,
	// 		"xor": null,
	// 		"identifying": true
	// 	},
	// 	"relation": "Address",
	// 	"regex": "",
	// 	"primitiveType": "string",
	// 	"required": false,
	// 	"isArray": false,
	// 	"ignoreInModel": false,
	// 	"key": "addresses",
	// 	"name": "Addresses",
	// 	"example": 1,
	// 	"relKey": "one-to-many",
	// 	"type": "relation"
	// },

	static updateExistingKvItem(i: any, attr: any) {
		const out = {...i};

		const dbValues = out?.dbValues ?? {};

		// keep previously defined props before overriding with new incoming values
		const keyValues: any = {...(dbValues?.keyValues ?? {})};

		const relDef = keyValues['radio-relation-definition'];

		// override old values from here
		keyValues['boolean-primary-key'] = attr['primary'];
		keyValues['boolean-unique']      = attr['unique'];
		keyValues['boolean-nullable']    = attr['nullable'];
		keyValues['boolean-required']    = attr['required'];

		if (ARRAY_TYPES.includes(relDef)) out['isArray'] = true;

		out['key']  = camelCase(attr.name);

		return out;
	}

	static createFromErd(obj: any = {}, previousItem: any): EntityModel {
		let entity = new EntityModel(
			obj['id'] || undefined,
			obj['projectId'] || undefined,
			obj['datasource'] || undefined,
			obj['key'] || undefined,
			obj['name'] || undefined,
			obj['active'] || true,
			obj['actions'] || undefined,
		);

		// add the entity items if they exist
		if (typeof obj['attributes'] == 'object') {
			let previousItems = previousItem?.entityItems ?? {};

			for (let i of obj['attributes']) {
				let previousAttr = previousItems[i.key];

				let keyValues: any = {};

				keyValues['boolean-primary-key'] = i['primary'];
				keyValues['boolean-unique'] = i['unique'];
				keyValues['boolean-nullable'] = i['nullable'];

				if (typeof i['relation'] != 'undefined') {
					keyValues['radio-relation-definition'] = i['relation'];
				}

				keyValues = {
					...keyValues,
					...previousAttr?.dbValues?.keyValues
				};

				entity.addEntityItem({
					key: previousAttr?.key ?? i.key,
					example: previousAttr?.example ?? i.name + ' example',
					type: previousAttr?.type ?? i.type,
					dbValues: {keyValues: keyValues},
					relation: i?.relationKey,
				});
			}
		}

		return entity;
	}

	addEntityItem(item: any) {
		this.entityItems.push(EntityItemModel.create(item));
	}

	flatten() {
		let out: any = {};

		for (let o of this.entityItems) {
			out[o.key] = o.example;
		}

		return out;
	}

	static getExampleForType(type: string) {
		switch (type) {
			case 'text': return generateRandomString(5);
			case 'number': return 5864;
			case 'boolean': return true;
			default: return type;
		}
	}

	static getColumns(ignoreColumns: string[] = [], context: any = {}) {
		let cols: any = [
			{
				title: tr('key'),
				dataIndex: 'key',
				sorter: true,
			},
			{
				title: tr('datasource'),
				dataIndex: 'datasource',
				sorter: true,
				format: function (val: any) {
					try {
						return context.datasourcesDict?.[val]?.name ?? val;
					}
					catch (e) {return 0}
				}
			},
			{
				title: tr('name'),
				dataIndex: 'name',
				sorter: true,
			},
			{
				title: tr('entity-items'),
				dataIndex: 'entityItems',
				format: function (val: any) {
					try {
						return val.length;
					}
					catch (e) {return 0}
				}
			},
		];

		if (ignoreColumns.length > 0) {
			return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
		}

		return cols;
	}
}
