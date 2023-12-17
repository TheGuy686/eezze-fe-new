import { tr } from '~/classes/globals';

interface Interface {
    id: string;
    name: string;
    description: string;
    type: string;
    metadata: object;
    active: boolean;
}

const defaultStyles = {
    '.eezze-h1': {
        key: 'heading-1',
        prefix: '.eezze-h1',
        style: {
            'padding-bottom': '0.3em',
            'font-size': '2em',
            'border-bottom': '1px solid #eaecef',
        }
    },
    '.eezze-h2': {
        key: 'heading-2',
        prefix: '.eezze-h2',
        style: {
            'padding-bottom': '0.3em',
            'font-size': '1.5em',
            'border-bottom': '1px solid #eaecef',
        }
    },
    '.eezze-h3': {
        key: 'heading-3',
        prefix: '.eezze-h3',
        style: {
            'font-size': '1.25em'
        }
    },
    '.eezze-h4': {
        key: 'heading-4',
        prefix: '.eezze-h4',
        style: {
            'font-size': '1em'
        }
    },
    '.eezze-h5': {
        key: 'heading-5',
        prefix: '.eezze-h5',
        style: {
            'font-size': '.875em'
        }
    },
    '.eezze-h6': {
        key: 'heading-6',
        prefix: '.eezze-h6',
        style: {
            'font-size': '.85em',
            color: '#6a737d',
        }
    },
    '.eezze-ul': {
        key: 'ul',
        prefix: '.eezze-ul',
        style: {
            'list-style-type': 'disc',
            'list-style-position': 'inside',
            'margin-left': '15px',
        }
    },
    '.eezze-ol': {
        key: 'ol',
        prefix: '.eezze-ol',
        style: {
            'list-style-type': 'decimal',
            'list-style-position': 'inside',
            'margin-left': '15px',
        }
    },
    '.eezze-table th': {
        key: 'th',
        prefix: '.eezze-table th',
        style: {
            'padding-left': '13px',
            'padding-right': '13px',
            'padding-top': '6px',
            'padding-bottom': '6px',
            border: '1px solid #dfe2e5',
            'font-weight': 600,
            'box-sizing': 'border-box',
        }
    },
    'table td': {
        key: 'td',
        prefix: '.eezze-table td',
        style: {
            'padding-left': '13px',
            'padding-right': '13px',
            'padding-top': '6px',
            'padding-bottom': '6px',
            border: '1px solid #dfe2e5',
            'box-sizing': 'border-box',
        }
    },
    '.hljs-right': {
        key: 'text-align-right',
        prefix: '.hljs-right',
        style: {
            'text-align': 'right',
        }
    },
    '.hljs-center': {
        key: 'text-align-center',
        prefix: '.hljs-center',
        style: {
            'text-align': 'center',
        }
    },
    '.hljs-left': {
        key: 'text-align-left',
        prefix: '.hljs-left',
        style: {
            'text-align': 'left',
        }
    },
    'blockquote': {
        key: 'blockquote',
        prefix: 'blockquote',
        style: {
            padding: '0 1em',
            color: '#6a737d',
            'border-left': '0.25em solid #dfe2e5',
        }
    },
    '.hljs': {
        key: 'code',
        prefix: '.hljs',
        style: {
            'background-color': 'hsl(0,0%,96.5%) !important',
            color: 'hsl(210,8%,15%) !important',
            padding: '0px 10px 20px 10px !important',
        }
    },
};

export default class ServiceConfigurableModel implements Interface {
    id: string;
    name: string;
    description: string;
    type: string;
    metadata: object = {};
    active: boolean = false;

    constructor(
        id: string,
        name: string,
        description: string,
        type: string,
        metadata: object | string,
        active: boolean
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.active = active;

        if (typeof metadata == 'string') {
            try {
                this.metadata = JSON.parse(metadata);
            }
            catch (err) {}
        }
        else {
            this.metadata = metadata;
        }
    }

    static create(obj: any) : ServiceConfigurableModel {
        return new ServiceConfigurableModel(
            obj['id'] || undefined,
            obj['name'] || undefined,
            obj['description'] || undefined,
            obj['type'] || undefined,
            obj['metadata'] || undefined,
            obj['active'] || undefined,
        );
    }

    static getDefaultStyles() {return defaultStyles}

    static getColumns(ignoreColumns: string[] = []) : string[] {
		const cols: any = [
            {
                title: tr('name'),
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: tr('type'),
                dataIndex: 'type',
                type: 'tag-dd',
                sorter: true,
                format: (value: any) => tr(value)
            },
            {
                title: tr('enabled'),
                dataIndex: 'active',
                sorter: true,
                format: (value: any)=>{
                    if (value == 1) {
                        return '<span style="color: green">✔</span>'
                    }
                }
            }
        ];

		if (ignoreColumns.length > 0) {
			return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
		}

		return cols;
	}
}