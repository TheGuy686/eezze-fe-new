import { tr } from '~/classes/globals';
import { generateRandomString } from '~/classes/libs/string';
import { actions } from '~/consts/Project';

interface Interface {
    id: string | number;
    filterId: string;
    property: string;
    name: string;
    desc: string;
    baseType: string;
    type: string;
    raw: string | number | boolean | object;
    actions: any[];
    example: any;
}

export default class BlLogicChain implements Interface {
    id: string;
    filterId: string;
    property: string;
    name: string;
    desc: string;
    baseType: string;
    type: string;
    raw: string | number | boolean | object;
    actions: any[];
    example: any = '';

    constructor(
        id: string,
        property: string = '',
        name: string = '',
        desc: string = '',
        baseType: string = 'logic-chain',
        type: string = 'text',
        raw: string | number | boolean | object = { default: 'message' },
        actions: any[] = [],
        example: any = '',
    ) {
        this.id = id ?? BlLogicChain.getRandId();
        this.filterId = BlLogicChain.getRandId();
        this.property = property;
        this.name = name;
        this.desc = desc;
        this.baseType = baseType ?? 'logic-chain';
        this.type = type;
        this.raw = raw;
        this.actions = actions;

        if (typeof example != 'undefined') {
            this.example = example;
        }
    }

    public static getRandId() { return generateRandomString(10) }

    static create(obj: any = {}): BlLogicChain {
        return new BlLogicChain(
            obj['id'] || undefined,
            obj['property'] || undefined,
            obj['name'] || undefined,
            obj['desc'] || undefined,
            obj['baseType'] || 'logic-chain',
            obj['type'] || 'text',
            obj['raw'] || {},
            obj['actions'] || undefined,
            obj['example'] || undefined,
        );
    }

    static getColumns(ignoreColumns: string[] = []): string[] {
        let cols: any = [
            {
                title: tr('key'),
                dataIndex: 'property'
            },
            {
                title: tr('mapped-input'),
                dataIndex: 'baseType',
                format: (val: string) => (tr(val))
            },
            {
                title: tr('type'),
                dataIndex: 'type',
                format: (val: string) => {
                    const type = actions.types[val];

                    return `
                        <div
                            class="text-white" 
                            style="background-color: ${type?.color}; ${type?.textColor ? `color: ${type?.textColor} !important;` : ''}"
                            e-tag
                            non-sel
                        >

                            ${type?.label}

                        </div>
                    `;
                }
            },
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}