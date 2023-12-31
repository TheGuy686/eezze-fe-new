import { tr } from '~/classes/globals';
import { InitStateCrudVars } from '~/factories/crud/State';

export default () => ({
    ...InitStateCrudVars(),
    entityId: 'id',
    entities: [
        {
            id: 1,
            name: tr('200-name'),
            description: tr('200-description'),
            code: 200,
            enabled: true,
        },
        {
            id: 1.5,
            name: tr('201-name'),
            description: tr('201-description'),
            code: 201,
            enabled: true,
        },
        {
            id: 2,
            name: tr('202-name'),
            description: tr('202-description'),
            code: 202,
            enabled: true,
        },
        {
            id: 3,
            name: tr('203-name'),
            description: tr('203-description'),
            code: 203,
            enabled: true,
        },
        {
            id: 4,
            name: tr('204-name'),
            description: tr('204-description'),
            code: 204,
            enabled: true,
        },
        {
            id: 5,
            name: tr('300-name'),
            description: tr('300-description'),
            code: 300,
            enabled: true,
        },
        {
            id: 6,
            name: tr('301-name'),
            description: tr('301-description'),
            code: 301,
            enabled: true,
        },
        {
            id: 7,
            name: tr('302-name'),
            description: tr('302-description'),
            code: 302,
            enabled: true,
        },
        {
            id: 8,
            name: tr('303-name'),
            description: tr('303-description'),
            code: 303,
            enabled: true,
        },
        {
            id: 9,
            name: tr('304-name'),
            description: tr('304-description'),
            code: 304,
            enabled: true,
        },
        {
            id: 10,
            name: tr('400-name'),
            description: tr('400-description'),
            code: 400,
            enabled: true,
        },
        {
            id: 11,
            name: tr('401-name'),
            description: tr('401-description'),
            code: 401,
            enabled: true,
        },
        {
            id: 12,
            name: tr('402-name'),
            description: tr('402-description'),
            code: 402,
            enabled: true,
        },
        {
            id: 13,
            name: tr('403-name'),
            description: tr('403-description'),
            code: 403,
            enabled: true,
        },
        {
            id: 14,
            name: tr('404-name'),
            description: tr('404-description'),
            code: 404,
            enabled: true,
        },
        {
            id: 15,
            name: tr('405-name'),
            description: tr('405-description'),
            code: 405,
            enabled: true,
        },
        {
            id: 16,
            name: tr('500-name'),
            description: tr('500-description'),
            code: 500,
            enabled: true,
        },
        {
            id: 17,
            name: tr('501-name'),
            description: tr('501-description'),
            code: 501,
            enabled: true,
        },
        {
            id: 18,
            name: tr('502-name'),
            description: tr('502-description'),
            code: 502,
            enabled: true,
        },
        {
            id: 19,
            name: tr('503-name'),
            description: tr('503-description'),
            code: 503,
            enabled: true,
        },
        {
            id: 20,
            name: tr('504-name'),
            description: tr('504-description'),
            code: 504,
            enabled: true,
        },
        {
            id: 21,
            name: tr('505-name'),
            description: tr('505-description'),
            code: 505,
            enabled: true,
        },

    ]
})