import { tr } from '~/classes/globals';

interface UserStory {
    who: string;
    what: string;
    why: string;
}

interface Interface {
    id: string;
    serviceGroupId: string;
    type: string;
    name: string;
    description: string;
    definition: object;
    actionInput: any[];
    logic: any[];
    output: any[];
    selected?: boolean;
    story?: UserStory;
    storyFull?: string;
}

// definition: {
//     interval: interval,
//     period: period
// },

let defStory =  {
    who: '',
    what: '',
    why: '',
};

export default class ServiceModel implements Interface {
    id: string;
    projectId: string;
    serviceGroupId: string;
    type: string;
    name: string;
    description: string;
    definition: object;
    actionInput: any[] = [];
    logic: any[] = [];
    output: any[] = [];
    selected: boolean = true;
    isNew: boolean;
    story?: UserStory = defStory;
    storyFull?: string;

    constructor(
        id: string,
        projectId: string,
        serviceGroupId: string,
        type: string,
        name: string,
        description: string,
        definition: object,
        actionInput: any[],
        logic: any[],
        output: any[],
        selected: boolean = true,
        story?: any,
        storyFull?: string,
    ) {
        this.id = id;
        this.projectId = projectId;
        this.serviceGroupId = serviceGroupId;
        this.type = type;
        this.name = name;
        this.description = description;
        this.selected = selected;
        this.isNew = typeof id != 'number';
        this.story = story;
        this.storyFull = storyFull;

        let def ;

        if (typeof definition == 'string') {
            try {
                def = JSON.parse(definition);
            }
            catch (err) {}
        }
        else def = definition;

        this.definition = def;

        if (typeof actionInput == 'string') {
            try {
                this.actionInput = JSON.parse(actionInput);
            }
            catch (err) {}
        }
        else this.actionInput = actionInput;

        if (typeof logic == 'string') {
            try {
                this.logic = JSON.parse(logic);
            }
            catch (err) {}
        }
        else this.logic = logic;

        if (typeof output == 'string') {
            try {
                this.output = JSON.parse(output);
            }
            catch (err) {}
        }
        else this.output = output;
    }

    serialize() {
        return {
            id: this.id,
            projectId: this.projectId,
            serviceGroupId: this.serviceGroupId,
            type: this.type,
            name: this.name,
            description: this.description,
            definition: this.definition,
            actionInput: this.actionInput,
            logic: this.logic,
            output: this.output,
            selected: this.selected,
            story: this.story,
            storyFull: this.storyFull,
        };
    }

    static create(obj: any = {}, src: string = ''): ServiceModel {
        return new ServiceModel(
            obj?.id,
            obj?.projectId,
            obj?.serviceGroupId,
            obj?.type ?? 'rest',
            obj?.name ?? '',
            obj?.description ?? '',
            obj?.definition ?? {method: 'get'},
            obj?.actionInput ?? [],
            obj?.logic ?? [],
            obj?.output ?? [],
            obj?.selected ?? true,
            obj?.story ?? defStory,
            obj?.storyFull ?? '',
        );
    }

    static getColumns(ignoreColumns: string[] = []): string[] {
        let cols: any = [
            {
                title: tr('service-group'),
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: tr('description'),
                dataIndex: 'description',
                sorter: true,
            },
            {
                title: tr('services'),
                dataIndex: 'totalServices',
                sorter: true,
            }
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}