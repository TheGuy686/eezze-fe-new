import { generateRandomString, tr } from '~/classes/globals';

interface Interface {
    id: number;
    teamId: number;
    board: string;
}

// {
//     id: 14,
//     title: "Add discount code to checkout page",
//     date: "Sep 14",
//     type: "Feature Request"
// },

const defBoard = {
    backlog: {
        key: 'backlog',
        tasks: [],
    },
    inProgress: {
        key: 'inProgress',
        tasks: [],
    },
    inReview: {
        key: 'inReview',
        tasks: [],
    },
    aAndA: {
        key: 'aAndA',
        tasks: [],
    },
    done: {
        key: 'done',
        tasks: [],
    }
}

export default class TaskBoardModel implements Interface {
    id: number;
    teamId: number;
    board: any;

    constructor(id: number, teamId: number, board: string) {
        this.id = id;
        this.teamId = teamId;

        if (typeof board === 'string') {
            try {
                board = JSON.parse(board);
            }
            catch (err) {}
        }

        if (
            !board                   ||
            typeof board != 'object' ||
            Object.keys(board).length == 0
        ) {
            this.board = {...defBoard};
        }
        else {
            this.board = board;
        }
    }

    static create(obj: any = {}): TaskBoardModel {
        return new TaskBoardModel(
            obj['id'] || undefined,
            obj['teamId'] || undefined,
            obj['board'] || undefined,
        );
    }

    static newTask() {
        return {
            id: generateRandomString(10),
            date: new Date(),
            dueDate: '',
            type: 'feature-request',
            title: '',
            description: '',
            priority: 1,
            category: '',
            comments: [],
            assignedTo: [],
        }
    }

    static getColumns(ignoreColumns: string[] = []): string[] {
        const cols: any = [
            {
                title: tr('id'),
                dataIndex: 'id',
                sorter: true,
            },
            {
                title: tr('team-id'),
                dataIndex: 'teamId',
                sorter: true,
            },
            {
                title: tr('board'),
                dataIndex: 'board',
                sorter: false
            },
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}