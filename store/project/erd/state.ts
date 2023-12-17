import { tr } from '~/classes/globals';
import { InitStateCrudVars } from '~/factories/crud/State';

export default () => ({
    ...InitStateCrudVars(),
    filterDatasource: '',
    editingEntitySeshId: '',
    typeOptions: [
        {
            key: 'text',
            title: 'Text',
        },
        {
            key: 'long-text',
            title: 'Long Text',
        },
        {
            key: 'boolean',
            title: 'Boolean',
        },
        {
            key: 'number',
            title: 'Number',
        },
        {
            key: 'decimal',
            title: 'Decimal',
        },
        {
            key: 'email',
            title: 'Email',
        },
        {
            key: 'image',
            title: 'Image',
        },
        {
            key: 'date',
            title: 'Date',
        },
        {
            key: 'datetime',
            title: 'Date Time',
        },
        {
            key: 'image-gallery',
            title: 'Image Gallery',
        },
        {
            key: 'regex',
            title: 'Regex',
        },
        {
            key: 'relation',
            title: 'Relation',
        },
    ],
});