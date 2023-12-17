import { tr } from '~/classes/globals';
import TeamMemberModel from './TeamMemberModel';
import TaskBoardModel from './TaskBoardModel';

interface Interface {
    id: string;
    name: string;
    description: string;
    members: TeamMemberModel[];
    board: TaskBoardModel;
}

export default class TeamModel implements Interface {
    id: string;
    name: string;
    description: string;
    active: boolean;
    members: TeamMemberModel[] = [];
    board: TaskBoardModel;

    constructor(
        id: string,
        name: string,
        description: string,
        active: boolean,
        members: any,
        board: any,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.active = active;

        let mbrs, brd;

        this.board = TaskBoardModel.create({});

        if (typeof board == 'string') {
            try {
                brd = JSON.parse(board);
            }
            catch (err) {}
        }
        else brd = board;

        this.addBoard(brd);

        if (typeof members == 'string') {
            try {
                mbrs = JSON.parse(members);
            }
            catch (err) {}
        }
        else mbrs = members ?? [];

        for (let m of mbrs) {
            if (typeof m['id'] == 'undefined') continue;
            this.members.push(TeamMemberModel.create(m));
        }
    }

    addBoard(board: any) {
        this.board = TaskBoardModel.create(board);
    }

    static create(obj: any) : TeamModel {
        return new TeamModel(
            obj['id'] || undefined,
            obj['name'] || undefined,
            obj['description'] || undefined,
            obj['active'] || false,
            obj['members'] || undefined,
            obj['board'] || undefined,
        );
    }

    static getColumns(ignoreColumns: string[] = []) : string[] {
		const cols: any = [
            {
                title: tr('name'),
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: tr('members'),
                dataIndex: 'members',
                sorter: true,
                format: ((val: string) => val.length)
            },
            {
                title: tr('enabled'),
                dataIndex: 'active',
                sorter: true,
                format: (value: any) => {
                    if (value) {
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