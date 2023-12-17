import { tr } from '~/classes/globals';
import { InitStateCrudVars } from '~/factories/crud/State';

export default () => ({
    ...InitStateCrudVars(),
    entities: [
        {
            id: 1,
            key: 'server',
            serviceTypes: [
                'rest',
                'websocket',
                'cron-task',
                'installable-services',
            ],
            name: tr('server'),
            comingSoon: false,
            active: true,
        },
        {
            id: 2,
            key: 'aws',
            serviceTypes: [
                'rest',
                'websocket',
                'cron-task',
                'installable-services',
            ],
            name: tr('aws'),
            comingSoon: true,
            active: false,
        },
        {
            id: 3,
            key: 'gpc',
            serviceTypes: [
                'rest',
                'websocket',
                'cron-task',
                'installable-services',
            ],
            name: tr('gpc'),
            comingSoon: true,
            active: false,
        },
        {
            id: 4,
            key: 'azure',
            serviceTypes: [
                'rest',
                'websocket',
                'cron-task',
                'installable-services',
            ],
            name: tr('azure'),
            comingSoon: true,
            active: false,
        },
        {
            id: 5,
            key: 'managed-service',
            serviceTypes: [ 'all' ],
            name: tr('managed-service'),
            help: tr('managed-service-help'),
            comingSoon: false,
            active: true,
        },
    ]
})