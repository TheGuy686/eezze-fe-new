interface IEntityItemModel {
	key: string;
	example: string;
	type: STRING_TYPES | NUMBER_TYPES | ARRAY_TYPES;
	dbValues: any;
	storage: string;
	relation: string;
	regex: string;
	primitiveType: PRIMITIVE_TYPES;
	required: boolean;
	isArray: boolean;
	ignoreInModel: boolean;
}

type VALID_KEYS = 'key' | 'type' | 'dbValues' | 'storage' | 'relation' | 'regex';
type STRING_TYPES = 'text' | 'longText' | 'email' | 'image' | 'regex' | 'relation' | 'date' | 'datetime';
type NUMBER_TYPES = 'number' | 'decimal';
type ARRAY_TYPES = 'imageGallery';

let STRING_TYPES_LOOK_UP = ['text', 'longText', 'email', 'image', 'regex', 'relation', 'date', 'datetime'];
let NUMBER_TYPES_LOOK_UP = ['number', 'decimal'];
let ARRAY_TYPES_LOOK_UP = ['imageGallery'];

type PRIMITIVE_TYPES = 'string' | 'number';

export default class EntityItemModel implements IEntityItemModel {
	key: string;
	example: string;
	type: STRING_TYPES | NUMBER_TYPES | ARRAY_TYPES;
	dbValues: any = {};
	storage: string = '';
	relation: string = '';
	regex: string = '';
	primitiveType: PRIMITIVE_TYPES = 'string';
	required: boolean = false;
	isArray: boolean = false;
	ignoreInModel: boolean = false;
	initialIndex: number = 0;

	constructor(
		key: string,
		example: string,
		type: STRING_TYPES | NUMBER_TYPES | ARRAY_TYPES,
		dbValues: any = {
			keyValues: {},
		},
		storage?: string,
		relation?: string,
		regex?: string,
		required?: boolean,
		isArray?: boolean,
		ignoreInModel?: boolean,
	) {
		this.key = key;
		this.example = example;
		this.type = type;

		if (STRING_TYPES_LOOK_UP.indexOf(this.type) >= 0) {
			this.primitiveType = 'string';
		}

		if (NUMBER_TYPES_LOOK_UP.indexOf(this.type) >= 0) {
			this.primitiveType = 'number';
		}

		if (ARRAY_TYPES_LOOK_UP.indexOf(this.type) >= 0) {
			this.primitiveType = 'string';
		}

		if (typeof dbValues['keyValues'] == 'undefined') {
			dbValues['keyValues'] = {};
		}

		this.dbValues = dbValues;

		if (storage) this.storage = storage;
		if (relation) this.relation = relation;
		if (regex) this.regex = regex;

		if (required) this.required = required;
		if (isArray) this.isArray = isArray;
		if (ignoreInModel) this.ignoreInModel = ignoreInModel;
	}

	static create(obj: any): EntityItemModel {
		return new EntityItemModel(
			obj.key || undefined,
			obj.example || undefined,
			obj.type || undefined,
			obj.dbValues || undefined,
			obj.storage || undefined,
			obj.relation || undefined,
			obj.regex || undefined,
			obj.required || undefined,
			obj.isArray || undefined,
			obj.ignoreInModel || undefined,
		);
	}

	isAutoIncrement() {
		return !!this.dbValues['keyValues']['boolean-auto-increment'];
	}

	isPrimaryKey() {
		return !!this.dbValues['keyValues']['boolean-auto-increment'];
	}

	setProperty(key: VALID_KEYS, value: any) {this[key] = value}

	setDbSettingsProperty(key: string, value: any) {
		this.dbValues.keyValues[key] = value;
	}

	getDbSettingsProperty(type: string, key: string) {
		let valuesKey = `${type}-${key}`;

		if (typeof this.dbValues.keyValues[valuesKey] == 'undefined') {
			switch (type) {
				case 'input': return '';
				case 'boolean': return false;
				default: return false;
			}
		}

		return this.dbValues.keyValues[valuesKey];
	}
}
