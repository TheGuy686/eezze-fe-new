import { InitStateCrudVars } from '~/factories/crud/State';

export default () => ({
    ...InitStateCrudVars(),
    filterDatasource: -1,
    chosenPreset: {},
    dataSourcePresets: [
        {
            key: 'databases',
            name: 'Databases',
            description: 'These templates allow you an array of options to choose from to quick apply infrasctructure to your project',
            children: [
                {
                    key: 'database-mysql',
                    name: 'MySql',
                    description: 'This is a basic implementation of a mysql dabase connection done.',
                    properties: [
                        {
                            "keyValueItems": [],
                            "key": "host",
                            "type": "string",
                            "value": "localhost"
                        },
                        {
                            "keyValueItems": [],
                            "key": "dbName",
                            "type": "string",
                            "value": "test_db"
                        },
                        {
                            "keyValueItems": [],
                            "key": "user",
                            "type": "string",
                            "value": "root"
                        },
                        {
                            "keyValueItems": [],
                            "key": "pass",
                            "type": "string",
                            "value": "root"
                        },
                        {
                            "keyValueItems": [
                                {
                                    "keyValueItems": [],
                                    "key": "collasion",
                                    "type": "string",
                                    "value": "utf8_mb28_general_ci"
                                },
                                {
                                    "keyValueItems": [],
                                    "key": "someValue",
                                    "type": "string",
                                    "value": "a value"
                                }
                            ],
                            "key": "dbConfig",
                            "type": "object",
                            "value": ""
                        }
                    ]
                },
                {
                    key: 'lib-2',
                    name: 'Library 2',
                    description: 'This is a description for library 2',
                    properties: [],
                },
            ],
        },
    ],
    keyTypes: [
        {
            key: 'string',
            name: 'String',
        },
        {
            key: 'number',
            name: 'Number',
        },
        {
            key: 'decimal',
            name: 'Decimal',
        },
        {
            key: 'boolean',
            name: 'Boolean',
        },
        {
            key: 'object',
            name: 'Object',
        },
    ],
    keyTypesColors:{
        string: {
            label: 'STRING',
            color: 'volcano',
        },
        number: {
            label: 'NUMBER',
            color: 'pink',
        },
        decimal: {
            label: 'DECIMAL',
            color: 'cyan',
        },
        boolean: {
            label: 'BOOLEAN',
            color: '#f50',
        },
        object: {
            label: 'OBJECT',
            color: 'green',
        },
    },
})