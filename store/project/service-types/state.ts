import { randDarkColor, tr } from '~/classes/globals';
import { InitStateCrudVars } from '~/factories/crud/State';

export default () => ({
    ...InitStateCrudVars(),
    entities: [
        {
            id: 1,
            key: 'rest',
            color: randDarkColor(),
            name: tr('rest'),
            desc: tr('rest-desc'),
            isMainService: true,
        },
        {
            id: 2,
            key: 'websocket',
            color: randDarkColor(),
            name: tr('websocket'),
            desc: tr('websocket-desc'),
            isMainService: true,
        },
        {
            id: 3,
            key: 'cron-task',
            color: randDarkColor(),
            name: tr('cron-task'),
            desc: tr('cron-task-desc'),
            isMainService: true,
        },
        {
            id: 4,
            key: 'installable-services',
            color: randDarkColor(),
            name: tr('installable-services'),
            desc: tr('installable-services'),
            isMainService: false,
        }
    ]
})