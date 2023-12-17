const { tr, keyify } = require('~/classes/globals');

module.exports = {
    actions: {
        types:{
            text: {
                key: 'text',
                label: tr('text', {toUpper: true}),
                color: '#8B0000',
            },
            'long-text': {
                key: 'long-text',
                label: tr('long-text', {toUpper: true}),
                color: 'orange',
            },
            number: {
                key: 'number',
                label: tr('number', {toUpper: true}),
                color: '#008B00',
            },
            decimal: {
                key: 'decimal',
                label: tr('decimal', {toUpper: true}),
                color: 'cyan',
                textColor: 'black'
            },
            boolean: {
                key: 'boolean',
                label: tr('boolean', {toUpper: true}),
                color: '#5C5CB5',
            },
            date: {
                key: 'date',
                label: tr('date', {toUpper: true}),
                color: '#f50',
            },
            datetime: {
                key: 'date-time',
                label: tr('date-time', {toUpper: true}),
                color: '#2db7f5',
            },
            email: {
                key: 'email',
                label: tr('email', {toUpper: true}),
                color: 'green',
            },
            image: {
                key: 'image',
                label: tr('image', {toUpper: true}),
                color: 'blue',
            },
            'image-gallery': {
                key: 'image-gallery',
                label: tr('image-gallery', {toUpper: true}),
                color: 'purple',
            },
            regex: {
                key: 'regex',
                label: tr('regex', {toUpper: true}),
                color: 'magenta',
            },
            relation: {
                key: 'relation',
                label: tr('relation', {toUpper: true}),
                color: 'geekblue',
            },
            object: {
                key: 'object',
                label: tr('object', {toUpper: true}),
                color: '#C90B0B',
            },
            list: {
                key: 'list',
                label: tr('list', {toUpper: true}),
                color: '#87d068',
            },
            array: {
                key: 'array',
                label: tr('array', {toUpper: true}),
                color: '#87d068',
            },
            dict: {
                key: 'dictionary',
                label: tr('dictionary', {toUpper: true}),
                color: '#456876',
            },
            jwt: {
                key: 'jwt-token',
                label: tr('jwt-token', {toUpper: true}),
                color: '#346634',
            },
        },
    }
}