import { InitStateCrudVars } from '~/factories/crud/State';

function getServiceDefaultRest(id: string, sgId: string, name: string, desc: string, method: string, path: string): object {
    return {
        id: id,
        serviceGroupId: sgId,
        type: 'rest',
        name: name,
        description: desc,
        definition: {
            method: method,
            path: path,
            roles: [ 1 ],
        },
        actionInput:[],
        logic:[
            {
                type: 'msql:get-one-andd-update',
                // plese be aware that you will be able to get the datasouce from the user model
                // there is no really much need to sent this through also unless there is some
                // issues with getting the DS from the user enity on the API in the decorators
                schema: {
                    enity: 'user',
                    checkOn: [
                        {
                            column: 'email',
                            input: '${adm.input.email}'
                        },
                        {
                            column: 'age',
                            input: '${adm.input.age}',
                            logic: {
                                id: '2',
                                type: 'string',
                                name: 'Action 2',
                                actions: [
                                    {
                                        id: '2-1',
                                        type: 'number-operation',
                                        logic: {
                                            formula: '123${1}*73+12${2}',
                                            raw: '123${1}*73+12${2}',
                                            variables: [
                                                {
                                                    id: 1,
                                                    pos: 1,
                                                    color: 'blue',
                                                    value: '${adm.request.urlPrams.anExampleNumber}',
                                                    example: 2
                                                },
                                                {
                                                    id: 2,
                                                    pos: 2,
                                                    color: 'orange',
                                                    value: '${adm.request.urlPrams.anExampleNumber2}',
                                                    example: 5
                                                },
                                                {
                                                    id: 3,
                                                    pos: 3,
                                                    color: 'green',
                                                    value: '${adm.request.urlPrams.anExampleNumber3}',
                                                    example: 1.5
                                                }
                                            ]
                                        },
                                        returns:  'number',
                                        actions: [
                                            {
                                                id: 'werfdhdgh242234',
                                                type: 'number-operation',
                                                logic: {
                                                    formula: '123${1}*73+12',
                                                    raw: '123${1}*73+12',
                                                    variables: [
                                                        {
                                                            id: 1,
                                                            pos: 1,
                                                            color: 'yellow',
                                                            value: '${adm.action(2).result.randomNumber}',
                                                            example: 2
                                                        }
                                                    ]
                                                },
                                                returns:  'number',
                                                actions: [],
                                            },
                                        ],
                                    },
                                ]
                            }
                        }
                    ],
                    updateValues: [
                        {
                            column: 'age',
                            input: 'adm.request.auth.user.age',
                            logic: {
                                id: '2',
                                type: 'string',
                                name: 'Action 2',
                                actions: [
                                    {
                                        id: '2-1',
                                        type: 'number-operation',
                                        logic: {
                                            formula: '123${1}*73+12${2}${3}',
                                            raw: '123${1}*73+12${2}${3}',
                                            variables: [
                                                {
                                                    id: 1,
                                                    pos: 1,
                                                    color: 'yellow',
                                                    value: '${adm.request.urlPrams.anExampleNumber}',
                                                    example: 2
                                                },
                                                {
                                                    id: 2,
                                                    pos: 2,
                                                    color: 'blue',
                                                    value: '${adm.request.urlPrams.anExampleNumber2}',
                                                    example: 5
                                                },
                                                {
                                                    id: 3,
                                                    pos: 3,
                                                    color: 'red',
                                                    value: '${adm.request.urlPrams.anExampleNumber3}',
                                                    example: 1.5
                                                }
                                            ]
                                        },
                                        returns:  'number',
                                        actions: [
                                            {
                                                id: 'werfdhdgh242234',
                                                type: 'number-operation',
                                                logic: {
                                                    formula: '123${1}*73+12',
                                                    raw: '123${1}*73+12',
                                                    variables: [
                                                        {
                                                            id: 1,
                                                            pos: 1,
                                                            color: 'blue',
                                                            value: '${adm.action(2).result.randomNumber}',
                                                            example: 2
                                                        }
                                                    ]
                                                },
                                                returns:  'number',
                                                actions: [],
                                            },
                                        ],
                                    },
                                ]
                            }
                        }
                    ],
                },
                output: [],
                successMessage: 'This is a sample success message',
                successCode: 200,
                errorMessge: 'This is a sample error message',
                errorCode: 400
            }
        ],
        output: [],
    };
}

function getServiceDefaultWs(id: string, sgId: string, name: string, desc: string, direction: string, eventName: string): object {
    return {
        id: id,
        serviceGroupId: sgId,
        type: 'ws',
        name: name,
        description: desc,
        definition: {
            direction: direction,
            eventName: eventName,
            roles: [ 1 ],
        },
        actionInput:[],
        logic:[
            {
                type: 'msql:get-one-andd-update',
                // plese be aware that you will be able to get the datasouce from the user model
                // there is no really much need to sent this through also unless there is some
                // issues with getting the DS from the user enity on the API in the decorators
                enity: 'user',
                checkOn: [
                    {
                        column: 'email',
                        input: '${adm.input.email}'
                    },
                    {
                        column: 'age',
                        input: '${adm.input.age}',
                        logic: {
                            id: '2',
                            type: 'string',
                            name: 'Action 2',
                            actions: [
                                {
                                    id: '2-1',
                                    type: 'number-operation',
                                    logic: {
                                        formula: '123${1}*73+12${2}',
                                        raw: '123${1}*73+12${2}',
                                        variables: [
                                            {
                                                id: 1,
                                                pos: 1,
                                                color: 'blue',
                                                value: '${adm.request.urlPrams.anExampleNumber}',
                                                example: 2
                                            },
                                            {
                                                id: 2,
                                                pos: 2,
                                                color: 'orange',
                                                value: '${adm.request.urlPrams.anExampleNumber2}',
                                                example: 5
                                            },
                                            {
                                                id: 3,
                                                pos: 3,
                                                color: 'green',
                                                value: '${adm.request.urlPrams.anExampleNumber3}',
                                                example: 1.5
                                            }
                                        ]
                                    },
                                    returns:  'number',
                                    actions: [
                                        {
                                            id: 'werfdhdgh242234',
                                            type: 'number-operation',
                                            logic: {
                                                formula: '123${1}*73+12',
                                                raw: '123${1}*73+12',
                                                variables: [
                                                    {
                                                        id: 1,
                                                        pos: 1,
                                                        color: 'yellow',
                                                        value: '${adm.action(2).result.randomNumber}',
                                                        example: 2
                                                    }
                                                ]
                                            },
                                            returns:  'number',
                                            actions: [],
                                        },
                                    ],
                                },
                            ]
                        }
                    }
                ],
                updateValues: [
                    {
                        column: 'age',
                        input: 'adm.request.auth.user.age',
                        logic: {
                            id: '2',
                            type: 'string',
                            name: 'Action 2',
                            actions: [
                                {
                                    id: '2-1',
                                    type: 'number-operation',
                                    logic: {
                                        formula: '123${1}*73+12${2}${3}',
                                        raw: '123${1}*73+12${2}${3}',
                                        variables: [
                                            {
                                                id: 1,
                                                pos: 1,
                                                color: 'yellow',
                                                value: '${adm.request.urlPrams.anExampleNumber}',
                                                example: 2
                                            },
                                            {
                                                id: 2,
                                                pos: 2,
                                                color: 'blue',
                                                value: '${adm.request.urlPrams.anExampleNumber2}',
                                                example: 5
                                            },
                                            {
                                                id: 3,
                                                pos: 3,
                                                color: 'red',
                                                value: '${adm.request.urlPrams.anExampleNumber3}',
                                                example: 1.5
                                            }
                                        ]
                                    },
                                    returns:  'number',
                                    actions: [
                                        {
                                            id: 'werfdhdgh242234',
                                            type: 'number-operation',
                                            logic: {
                                                formula: '123${1}*73+12',
                                                raw: '123${1}*73+12',
                                                variables: [
                                                    {
                                                        id: 1,
                                                        pos: 1,
                                                        color: 'blue',
                                                        value: '${adm.action(2).result.randomNumber}',
                                                        example: 2
                                                    }
                                                ]
                                            },
                                            returns:  'number',
                                            actions: [],
                                        },
                                    ],
                                },
                            ]
                        }
                    }
                ],
                output: [],
                successMessage: 'This is a sample success message',
                successCode: 200,
                errorMessge: 'This is a sample error message',
                errorCode: 400
        }],
        output: [],
    };
}

function getServiceDefaultCron(id: string, sgId: string, name: string, desc: string, raw: string, period: string): object {
    return {
        id: id,
        serviceGroupId: sgId,
        type: 'cron',
        name: name,
        description: desc,
        definition: {
            raw: raw,
            period: period,
            roles: [ 1 ],
        },
        actionInput:[],
        logic:[
            {
                type: 'msql:get-one-andd-update',
                // plese be aware that you will be able to get the datasouce from the user model
                // there is no really much need to sent this through also unless there is some
                // issues with getting the DS from the user enity on the API in the decorators
                enity: 'user',
                checkOn: [
                    {
                        column: 'email',
                        input: '${adm.input.email}'
                    },
                    {
                        column: 'age',
                        input: '${adm.input.age}',
                        logic: {
                            id: '2',
                            type: 'string',
                            name: 'Action 2',
                            actions: [
                                {
                                    id: '2-1',
                                    type: 'number-operation',
                                    logic: {
                                        formula: '123${1}*73+12${2}',
                                        raw: '123${1}*73+12${2}',
                                        variables: [
                                            {
                                                id: 1,
                                                pos: 1,
                                                color: 'blue',
                                                value: '${adm.request.urlPrams.anExampleNumber}',
                                                example: 2
                                            },
                                            {
                                                id: 2,
                                                pos: 2,
                                                color: 'orange',
                                                value: '${adm.request.urlPrams.anExampleNumber2}',
                                                example: 5
                                            },
                                            {
                                                id: 3,
                                                pos: 3,
                                                color: 'green',
                                                value: '${adm.request.urlPrams.anExampleNumber3}',
                                                example: 1.5
                                            }
                                        ]
                                    },
                                    returns:  'number',
                                    actions: [
                                        {
                                            id: 'werfdhdgh242234',
                                            type: 'number-operation',
                                            logic: {
                                                formula: '123${1}*73+12',
                                                raw: '123${1}*73+12',
                                                variables: [
                                                    {
                                                        id: 1,
                                                        pos: 1,
                                                        color: 'yellow',
                                                        value: '${adm.action(2).result.randomNumber}',
                                                        example: 2
                                                    }
                                                ]
                                            },
                                            returns:  'number',
                                            actions: [],
                                        },
                                    ],
                                },
                            ]
                        }
                    }
                ],
                updateValues: [
                    {
                        column: 'age',
                        input: 'adm.request.auth.user.age',
                        logic: {
                            id: '2',
                            type: 'string',
                            name: 'Action 2',
                            actions: [
                                {
                                    id: '2-1',
                                    type: 'number-operation',
                                    logic: {
                                        formula: '123${1}*73+12${2}${3}',
                                        raw: '123${1}*73+12${2}${3}',
                                        variables: [
                                            {
                                                id: 1,
                                                pos: 1,
                                                color: 'yellow',
                                                value: '${adm.request.urlPrams.anExampleNumber}',
                                                example: 2
                                            },
                                            {
                                                id: 2,
                                                pos: 2,
                                                color: 'blue',
                                                value: '${adm.request.urlPrams.anExampleNumber2}',
                                                example: 5
                                            },
                                            {
                                                id: 3,
                                                pos: 3,
                                                color: 'red',
                                                value: '${adm.request.urlPrams.anExampleNumber3}',
                                                example: 1.5
                                            }
                                        ]
                                    },
                                    returns:  'number',
                                    actions: [
                                        {
                                            id: 'werfdhdgh242234',
                                            type: 'number-operation',
                                            logic: {
                                                formula: '123${1}*73+12',
                                                raw: '123${1}*73+12',
                                                variables: [
                                                    {
                                                        id: 1,
                                                        pos: 1,
                                                        color: 'blue',
                                                        value: '${adm.action(2).result.randomNumber}',
                                                        example: 2
                                                    }
                                                ]
                                            },
                                            returns:  'number',
                                            actions: [],
                                        },
                                    ],
                                },
                            ]
                        }
                    }
                ],
                output: [],
                successMessage: 'This is a sample success message',
                successCode: 200,
                errorMessge: 'This is a sample error message',
                errorCode: 400
        }],
        output: [],
    };
}

const serviceGroupId = 'c6be6c58-8df7';

export default () => ({
    ...InitStateCrudVars(),
    entities2: [
        {...getServiceDefaultRest(
            'rest-transactions-all',
            serviceGroupId,
            'Get All Transactions',
            'This is just an endpoint to get all the transactions',
            'get',
            '/transaction/all'
        )},
        {...getServiceDefaultRest(
            'rest-delete-transaction',
            serviceGroupId,
            'Delete Transaction',
            'This is just a test delete',
            'delete',
            '/transaction'
        )},
        {...getServiceDefaultRest(
            'rest-create-transaction',
            serviceGroupId,
            'Create Transaction',
            'This is just a test create',
            'put',
            '/transaction'
        )},
        {...getServiceDefaultRest(
            'rest-update-transaction',
            serviceGroupId,
            'Update Transaction',
            'This is just a test update',
            'post',
            '/transaction'
        )},
        {...getServiceDefaultWs(
            'ws-on-generate-service-create',
            serviceGroupId,
            'Generate Service',
            'This is just a test update',
            'incoming',
            'OnGenerateServiceCreate'
        )},
        {...getServiceDefaultWs(
            'ws-on-generate-service-error',
            serviceGroupId,
            'Generate Service',
            'This is just a test update',
            'outgoing',
            'OnGenerateServiceCreateError'
        )},
        {...getServiceDefaultCron(
            'cron-do-something-1',
            serviceGroupId,
            'Send TM Check Emails',
            'This cron will run the checks for all the latest changes to customer tms and send out emails',
            '',
            'night'
        )},
        {...getServiceDefaultCron(
            'cron-do-something-2',
            serviceGroupId,
            'Doing Something',
            'This is another BS cron task',
            '',
            'day'
        )},
    ],
})