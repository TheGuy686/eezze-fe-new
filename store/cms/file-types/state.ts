import { InitStateCrudVars } from '~/factories/crud/State';

export default () => ({
    ...InitStateCrudVars(),
    entities: [
        {
            id: 1,
            key: 'jpeg',
            name: 'Jpeg',
            desc: 'This is the ext jpg',
            ext: 'jpg',
            enabled: true,
        },
        {
            id: 2,
            key: 'jpg',
            name: 'Jpg',
            desc: 'This is the ext jpg',
            ext: 'jpg',
            enabled: true,
        },
        {
            id: 3,
            key: 'png',
            name: 'Png',
            desc: 'This is the ext png',
            ext: 'png',
            enabled: true,
        },
        {
            id: 4,
            key: 'gif',
            name: 'Gif',
            desc: 'This is the ext gif',
            ext: 'gif',
            enabled: true,
        },
        {
            id: 5,
            key: 'svg',
            name: 'Svg',
            desc: 'This is the ext svg',
            ext: 'svg',
            enabled: true,
        },
        {
            id: 6,
            key: 'base64',
            name: 'Base 64 Encoded',
            desc: 'This is a file compression type and does\'t have a file extension',
            ext: '',
            enabled: true,
        },
        {
            id: 7,
            key: 'plain-text',
            name: 'Plain Text',
            desc: 'This is just plain text and doesn\'t have a corrisponding file type',
            ext: '',
            enabled: true,
        },
        {
            id: 8,
            key: 'html',
            name: 'HTML',
            desc: 'This is the ext html',
            ext: 'html',
            enabled: true,
        },
        {
            id: 9,
            key: 'binary',
            name: 'Binary',
            desc: 'This is a binary file string and doesn\'t have a corrisponding file type',
            ext: '',
            enabled: true,
        },
    ]
})