import { randDarkColor, tr } from '~/classes/globals';
import { InitStateCrudVars } from '~/factories/crud/State';

export default () => ({
    ...InitStateCrudVars(),

    taskCategories: [
        {
            id: 1,
            key: 'bug',
            title: tr('bug'),
        },
        {
            id: 2,
            key: 'new-feature',
            title: tr('new-feature'),
        },
        {
            id: 3,
            key: 'feature-request',
            title: tr('feature-request'),
        },
    ],

    priorityLevels: [
        {
            id: 1,
            color: randDarkColor(),
            title: tr('low'),
        },
        {
            id: 2,
            color: randDarkColor(),
            title: tr('medium'),
        },
        {
            id: 3,
            color: randDarkColor(),
            title: tr('high'),
        },
        {
            id: 4,
            color: randDarkColor(),
            title: tr('urgent'),
        }
    ]
});