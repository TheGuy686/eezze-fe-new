import { tr } from '~/classes/globals';
import { InitStateCrudVars } from '~/factories/crud/State';

export default () => ({
    ...InitStateCrudVars(),
    entities: [
        {
            id: 1,
            key: 'email',
            name: 'sc-type-email-name',
            desc: 'sc-type-email-desc',
            ext: 'jpg',
            enabled: true,
        },
        {
            id: 2,
            key: 'render-template',
            name: 'sc-type-email-name',
            desc: 'sc-type-email-desc',
            enabled: true,
        },
    ]
})