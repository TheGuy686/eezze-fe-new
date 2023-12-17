import { tr } from '~/classes/globals';
import TeamModel from './TeamModel';

interface Interface {
    id: string;
    projectName: string;
    details: string;
    industry: string;
    handle: string;
    stats: any;
    teams: TeamModel[];
    createdAt: string;
    updatedAt: string;
    hasLogger: boolean;
}

export default class ProjectModel implements Interface {
    id: string;
    projectName: string = '';
    details: string;
    industry: string;
    handle: string = '';
    createdAt: string;
    updatedAt: string;
    logo: string;
    stats: any;
    teams: TeamModel[] = [];
    hasLogger: boolean = false;

    constructor(
        id: string,
        projectName: string,
        details: string,
        industry: string,
        handle: string,
        createdAt: string,
        updatedAt: string,
        logo: string,
        hasLogger: boolean,
        stats?: any,
        teams: any[] | string = [],
    ) {
        this.id = id;
        this.projectName = projectName;
        this.details = details;
        this.industry = industry;
        this.handle = handle;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.logo = logo;
        // this.stats = stats;

        this.hasLogger = hasLogger;

        this.stats = [
            {
                id: 1,
                key: 'last-generated',
                value: 'Nod 6, 2023',
            },
            {
                id: 2,
                key: 'active-members',
                value: 5,
            },
            {
                id: 3,
                key: 'number-of-actions',
                value: 260,
            },
            {
                id: 4,
                key: 'number-of-datasources',
                value: 20,
            },
            {
                id: 4,
                key: 'deployment-status',
                value: 'active',
            },
        ];

        let tms = [];

        if (typeof teams == 'string') {
            try {
                tms = JSON.parse(teams);
            }
            catch (err) {}
        }
        else tms = teams;

        for (let t of tms) {
            this.teams.push(TeamModel.create(t));
        }
    }

    static create(obj: any = {}) : ProjectModel {
        return new ProjectModel(
            obj['id'] || undefined,
            obj['projectName'] || undefined,
            obj['details'] || undefined,
            obj['industry'] || undefined,
            obj['handle'] || undefined,
            obj['createdAt'] || undefined,
            obj['updatedAt'] || undefined,
            obj['logo'] || undefined,
            !!obj['hasLogger'],
            obj['stats'] || undefined,
            obj['teams'] || undefined,
        );
    }

    static getColumns(ignoreColumns: string[] = []) : string[] {
		let cols: any = [
            {
                title: tr('project-name'),
                dataIndex: 'projectName',
                sorter: true,
            },
            {
                title: tr('details'),
                dataIndex: 'details',
                sorter: true,
            },
            {
                title: tr('industry'),
                dataIndex: 'industry',
                sorter: true,
            },
            {
                title: tr('teams'),
                dataIndex: 'teams',
                sorter: true,
                formatter: (val: any) => (Array.isArray(val) ? val.length : 0)
            },
        ];

		if (ignoreColumns.length > 0) {
			return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
		}

		return cols;
	}
}