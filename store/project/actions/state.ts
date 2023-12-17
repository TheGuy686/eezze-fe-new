export default () => ({
    actionCategories: [
        {
            id: 'auth',
            children: [
                {
                    id: 'login',
                    returns: 'object',
                },
            ]
        },
        {
            id: 'database',
            children: [
                {
                    id: 'create-one',
                    returns: 'object',
                },
                {
                    id: 'create-one-if-not-exists',
                    returns: 'object',
                },
                {
                    id: 'delete-one',
                    returns: 'boolean',
                },
                {
                    id: 'get-list',
                    returns: 'list',
                },
                {
                    id: 'get-one',
                    returns: 'object',
                },
                {
                    id: 'get-one-and-update',
                    returns: 'object',
                },
                {
                    id: 'update-one',
                    returns: 'object',
                }
            ]
        },
        {
            id: 'files',
            children: [
                {
                    id: 'save',
                    returns: 'boolean',
                },
                {
                    id: 'delete',
                    returns: 'boolean',
                },
                {
                    id: 'read',
                    returns: 'string',
                },
            ]
        },
        {
            id: 'converters',
            children: [
                {
                    id: 'base64',
                    returns: 'text',
                },
            ]
        },
        {
            id: 'logic',
            children: [
                {
                    id: 'do',
                    returns: 'any',
                },
                {
                    id: 'list',
                    returns: 'list',
                }
            ]
        },
        {
            id: 'response',
            children: [
                {
                    id: 'redirect',
                    returns: 'boolean',
                }
            ]
        },
        {
            id: 'email',
            children: [
                {
                    id: 'send-smtp-email',
                    returns: 'boolean',
                }
            ]
        },
        {
            id: 'server',
            children: [
                {
                    id: 'rest-action',
                    returns: 'object',
                },
                {
                    id: 'socket-action',
                    returns: 'object',
                }
            ]
        },
        {
            id: 'misc',
            children: [
                {
                    id: 'render-template',
                    returns: 'string',
                },
                {
                    id: 'command',
                    returns: 'text',
                },
                {
                    id: 'service-call',
                    returns: 'object',
                },
                // {
                //     id: 'success',
                //     returns: 'object',
                // },
                // {
                //     id: 'error',
                //     returns: 'object',
                // },
            ]
        },
    ]
})