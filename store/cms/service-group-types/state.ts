import { InitStateCrudVars } from '~/factories/crud/State';
import { tr } from '~/classes/globals';

export default () => ({
    ...InitStateCrudVars(),
    entities: [
        {
            id: 1,
            key: 'custom',
            name: tr('custom'),
            description: tr('sg-custom-desc'),
            enabled: true,
        },
        {
            id: 2,
            key: 'authenticator',
            name: tr('authenticator'),
            description: tr('sg-authenticator-desc'),
            enabled: true,
        },
    ]
})