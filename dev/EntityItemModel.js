"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var STRING_TYPES_LOOK_UP = ['text', 'longText', 'email', 'image', 'regex', 'relation', 'date', 'datetime'];
var NUMBER_TYPES_LOOK_UP = ['number', 'decimal'];
var ARRAY_TYPES_LOOK_UP = ['imageGallery'];
var EntityItemModel = /** @class */ (function () {
    function EntityItemModel(key, example, type, dbValues, storage, relation, regex, required, isArray, ignoreInModel) {
        if (dbValues === void 0) { dbValues = {
            keyValues: {},
        }; }
        this.dbValues = {};
        this.storage = '';
        this.relation = '';
        this.regex = '';
        this.primitiveType = 'string';
        this.required = false;
        this.isArray = false;
        this.ignoreInModel = false;
        this.initialIndex = 0;
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
        if (storage)
            this.storage = storage;
        if (relation)
            this.relation = relation;
        if (regex)
            this.regex = regex;
        if (required)
            this.required = required;
        if (isArray)
            this.isArray = isArray;
        if (ignoreInModel)
            this.ignoreInModel = ignoreInModel;
    }
    EntityItemModel.create = function (obj) {
        return new EntityItemModel(obj.key || undefined, obj.example || undefined, obj.type || undefined, obj.dbValues || undefined, obj.storage || undefined, obj.relation || undefined, obj.regex || undefined, obj.required || undefined, obj.isArray || undefined, obj.ignoreInModel || undefined);
    };
    EntityItemModel.prototype.isAutoIncrement = function () {
        return !!this.dbValues['keyValues']['boolean-auto-increment'];
    };
    EntityItemModel.prototype.isPrimaryKey = function () {
        return !!this.dbValues['keyValues']['boolean-auto-increment'];
    };
    EntityItemModel.prototype.setProperty = function (key, value) { this[key] = value; };
    EntityItemModel.prototype.setDbSettingsProperty = function (key, value) {
        this.dbValues.keyValues[key] = value;
    };
    EntityItemModel.prototype.getDbSettingsProperty = function (type, key) {
        var valuesKey = "".concat(type, "-").concat(key);
        if (typeof this.dbValues.keyValues[valuesKey] == 'undefined') {
            switch (type) {
                case 'input': return '';
                case 'boolean': return false;
                default: return false;
            }
        }
        return this.dbValues.keyValues[valuesKey];
    };
    return EntityItemModel;
}());
exports.default = EntityItemModel;
