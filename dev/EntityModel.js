"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var EntityItemModel_1 = require("./EntityItemModel");
var globals_1 = require("./globals");
var ARRAY_TYPES = ['one-to-many', 'many-to-many'];
var EntityModel = /** @class */ (function () {
    function EntityModel(id, projectId, datasource, key, name, actions) {
        this.entityItems = [];
        this.id = id;
        this.projectId = projectId;
        this.datasource = datasource;
        this.key = key;
        this.entityId = key;
        this.name = name;
        this.actions = actions;
    }
    EntityModel.create = function (obj) {
        if (obj === void 0) { obj = {}; }
        var entity = new EntityModel(obj['id'] || undefined, obj['projectId'] || undefined, obj['datasource'] || undefined, obj['key'] || undefined, obj['name'] || undefined, obj['actions'] || undefined);
        if (typeof obj['entityItems'] == 'string' && obj['entityItems'].length > 20) {
            try {
                obj['entityItems'] = JSON.parse(obj['entityItems']);
            }
            catch (err) { }
        }
        //add the entity items if they exist
        if (typeof obj['entityItems'] == 'object') {
            for (var k in obj['entityItems']) {
                entity.addEntityItem(obj['entityItems'][k]);
            }
        }
        return entity;
    };
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
    EntityModel.updateExistingKvItem = function (i, attr) {
        var _a, _b;
        var out = __assign({}, i);
        var dbValues = (_a = out === null || out === void 0 ? void 0 : out.dbValues) !== null && _a !== void 0 ? _a : {};
        // keep previously defined props before overriding with new incoming values
        var keyValues = __assign({}, ((_b = dbValues === null || dbValues === void 0 ? void 0 : dbValues.keyValues) !== null && _b !== void 0 ? _b : {}));
        var relDef = keyValues['radio-relation-definition'];
        // override old values from here
        keyValues['boolean-primary-key'] = attr['primary'];
        keyValues['boolean-unique'] = attr['unique'];
        keyValues['boolean-nullable'] = attr['nullable'];
        keyValues['boolean-required'] = attr['required'];
        if (ARRAY_TYPES.includes(relDef))
            out['isArray'] = true;
        out['key'] = (0, globals_1.camelCase)(attr.name);
        return out;
    };
    EntityModel.createFromErd = function (obj, previousItem) {
        var _a, _b, _c, _d, _e;
        if (obj === void 0) { obj = {}; }
        var entity = new EntityModel(obj['id'] || undefined, obj['projectId'] || undefined, obj['datasource'] || undefined, obj['key'] || undefined, obj['name'] || undefined);
        // add the entity items if they exist
        if (typeof obj['attributes'] == 'object') {
            var previousItems = (_a = previousItem === null || previousItem === void 0 ? void 0 : previousItem.entityItems) !== null && _a !== void 0 ? _a : {};
            for (var _i = 0, _f = obj['attributes']; _i < _f.length; _i++) {
                var i = _f[_i];
                var previousAttr = previousItems[i.key];
                var keyValues = {};
                keyValues['boolean-primary-key'] = i['primary'];
                keyValues['boolean-unique'] = i['unique'];
                keyValues['boolean-nullable'] = i['nullable'];
                if (typeof i['relation'] != 'undefined') {
                    keyValues['radio-relation-definition'] = i['relation'];
                }
                keyValues = __assign(__assign({}, keyValues), (_b = previousAttr === null || previousAttr === void 0 ? void 0 : previousAttr.dbValues) === null || _b === void 0 ? void 0 : _b.keyValues);
                entity.addEntityItem({
                    key: (_c = previousAttr === null || previousAttr === void 0 ? void 0 : previousAttr.key) !== null && _c !== void 0 ? _c : i.key,
                    example: (_d = previousAttr === null || previousAttr === void 0 ? void 0 : previousAttr.example) !== null && _d !== void 0 ? _d : i.name + ' example',
                    type: (_e = previousAttr === null || previousAttr === void 0 ? void 0 : previousAttr.type) !== null && _e !== void 0 ? _e : i.type,
                    dbValues: { keyValues: keyValues },
                    relation: i === null || i === void 0 ? void 0 : i.relationKey,
                });
            }
        }
        return entity;
    };
    EntityModel.prototype.addEntityItem = function (item) {
        this.entityItems.push(EntityItemModel_1.default.create(item));
    };
    EntityModel.prototype.flatten = function () {
        var out = {};
        for (var _i = 0, _a = this.entityItems; _i < _a.length; _i++) {
            var o = _a[_i];
            out[o.key] = o.example;
        }
        return out;
    };
    EntityModel.getColumns = function (ignoreColumns) {
        if (ignoreColumns === void 0) { ignoreColumns = []; }
        var cols = [
            {
                title: (0, globals_1.tr)('key'),
                dataIndex: 'key',
                sorter: true,
            },
            {
                title: (0, globals_1.tr)('datasource'),
                dataIndex: 'datasource',
                sorter: true,
            },
            {
                title: (0, globals_1.tr)('name'),
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: (0, globals_1.tr)('entity-items'),
                dataIndex: 'entityItems',
                format: function (val) {
                    try {
                        return val.length;
                    }
                    catch (e) {
                        return 0;
                    }
                }
            },
        ];
        if (ignoreColumns.length > 0) {
            return cols.filter(function (i) { return ignoreColumns.indexOf(i['dataIndex']) == -1; });
        }
        return cols;
    };
    return EntityModel;
}());
exports.default = EntityModel;
