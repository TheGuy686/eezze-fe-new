import { actions } from '~/consts/Project';

export default () => ({
    entityLevelPresets: [
        {
            key: 'who-done-it',
            name: 'Who Done It',
            description: 'These set of presets cover everything from who did it to when',
            children: [
                {
                    key: 'accountability',
                    name: 'Accountability',
                    description: 'These properties will add the properties to an entity that will allow us to track who and what time actions were applied to this entity',
                    properties: [
                        {
                            key: "createdBy",
                            type: "relation",
                            dbValues: {keyValues:{},extraValues:{}},
                            relation: 'users',
                        },
                        {
                            key: "updatedBy",
                            type: "relation",
                            dbValues: {keyValues:{},extraValues:{}},
                            relation: 'users',
                        },
                        {
                            key: "createdAt",
                            type: "datetime",
                            dbValues: {keyValues:{},extraValues:{}},
                        },
                        {
                            key: "updatedAt",
                            type: "datetime",
                            dbValues: {keyValues:{},extraValues:{}},
                        },
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
    entityPresets: [
        {
            key: 'ecommerce',
            name: 'Ecommerce',
            description: 'These are a set of presets that can be used to construct an Ecommerce site',
            children: [
                {
                    key: 'product',
                    name: 'Product',
                    description: 'These properties will give you a basic definition of a product',
                    properties: [
                        {
                            "key": "productId",
                            "type": "number",
                            "dbValues": {
                                "keyValues": {
                                    "boolean-auto-increment": true,
                                    "boolean-unique": true,
                                    "boolean-sortable": true,
                                    "input-default": "hello"
                                },
                                "extraValues": {}
                            },
                        },
                        {
                            "key": "name",
                            "type": "text",
                            dbValues: {keyValues:{},extraValues:{}},
                        },
                        {
                            "key": "description",
                            "type": "long-text",
                            dbValues: {keyValues:{},extraValues:{}},
                        },
                        {
                            "key": "price",
                            "type": "decimal",
                            dbValues: {keyValues:{},extraValues:{}},
                        },
                        {
                            "key": "contactEmail",
                            "type": "email",
                            dbValues: {keyValues:{},extraValues:{}},
                        },
                        {
                            "key": "thumbnail",
                            "type": "image",
                            dbValues: {keyValues:{},extraValues:{}},
                            "storage": "site-images"
                        },
                        {
                            "key": "productGallery",
                            "type": "image-gallery",
                            dbValues: {keyValues:{},extraValues:{}},
                            "storage": "site-images"
                        },
                        {
                            "key": "customValue",
                            "type": "regex",
                            dbValues: {keyValues:{},extraValues:{}},
                            "regex": "^value$"
                        },
                        {
                            "key": "users",
                            "type": "relation",
                            dbValues: {keyValues:{},extraValues:{}},
                            "relation": "users"
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
        {
            key: 'solutions',
            name: 'Solutions',
            description: 'This is just some Solutions',
            children: [
                {
                    key: 'sol-1',
                    name: 'Solution 1',
                    description: 'This is a description for solution 1',
                    properties: [],
                },
                {
                    key: 'sol-2',
                    name: 'Solution 2',
                    description: 'This is a description for solution 2',
                    properties: [],
                },
            ],
        },
        {
            key: 'articles',
            name: 'Articles',
            description: 'This is just some articles',
            children: [
                {
                    key: 'art-1',
                    name: 'Article 1',
                    description: 'This is a description for article 1',
                    properties: [],
                },
            ],
        },
    ],
    keyTypes: actions.types,
})