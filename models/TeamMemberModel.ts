import TeamRoleModel from './TeamRoleModel';
import UserModel from './UserModel';

import { memberRoles } from '~/consts/App';
import { tr } from '~/classes/globals';
import { nameInitials } from '../classes/StringMethods';
import { randDarkColor, timeSince } from '../classes/globals';

interface Interface {
    id: string;
    projectId: string;
    permissions: string;
    user: UserModel;
    lastActive: string;
    active: boolean;
    accepted: boolean;
    createdAt: string;
    updatedAt: string;
    roles: string[];
}

export default class TeamMember implements Interface {
    id: string;
    projectId: string;
    permissions: string;
    user: UserModel;
    lastActive: string = '';
    active: boolean;
    accepted: boolean;
    createdAt: string;
    updatedAt: string;
    roles: string[] = [];
    avatarColor: string = randDarkColor();

    constructor(
        id: string,
        projectId: string,
        permissions: string,
        user: UserModel | any,
        active: boolean,
        accepted: boolean,
        createdAt: string,
        updatedAt: string,
        roles: any | string,
    ) {
        this.id = id;
        this.projectId = projectId;
        this.permissions = permissions;
        this.active = active;
        this.accepted = accepted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;

        try {
            this.user = UserModel.create(user);

            this.lastActive = this.user.lastLoggedIn;
        }
        catch (err) {console.log('TeamMember.error: Could not create Team Member: ', err)}

        let rls;

        if (typeof roles == 'string') {
            try {
                rls = JSON.parse(roles);
            }
            catch (err) {}
        }
        else rls = roles;

        this.roles = rls;

        // for (let r of rls) {
        //     this.roles.push(TeamRoleModel.create(typeof r == 'object' ? r?.id : r));
        // }
    }

    static create(obj: any) : TeamMember {
        return new TeamMember(
            obj['id'] || undefined,
            obj['projectId'] || undefined,
            obj['permissions'] || undefined,
            obj['user'] || undefined,
            obj['active'] || undefined,
            obj['accepted'] || undefined,
            obj['createdAt'] || undefined,
            obj['updatedAt'] || undefined,
            obj['roles'] || [ 'admin' ],
        );
    }

    static getColumns(ignoreColumns: string[] = []) : string[] {
		let cols: any = [
            {
                title: tr('name'),
                dataIndex: 'user',
                sorter: true,
                format: (u: any) => {
                    try {
                        const ints = nameInitials(u?.fullName ?? '');

                        return `
                            <div class="team-member-user-info" row>

                                <div class="team-member-initials" style="background-color: ${u.avatarColor};" a-center>

                                    <span class="initials">${ints}</span>

                                </div>

                                <div class="user-info" col>

                                    <span class="full-name">${u.fullName}</span>

                                    <span class="email">${u.email}</span>

                                </div>

                            </div>
                        `;
                    }
                    catch (err: any) {
                        return 'error: ' + err.message;
                    }
                }
            },
            // {
            //     title: tr('permissions'),
            //     dataIndex: 'permissions',
            //     sorter: true,
            //     format: (val: string) => {
            //         console.log('Perms: ', val);
            //         return `<span non-sel>${tr(val)}</span>`;
            //     }
            // },
            {
                title: tr('roles'),
                dataIndex: 'roles',
                sorter: true,
                format: (value: any, row: any, index: number, context: any) => {
                    if (value.length == 0) return '';

                    let str = '<div style="display: flex; flex-direction: column; margin-right: 20px; justify-content: flex-start;">';

                    for (let r of value) {
                        const rle = (memberRoles as any)[r];

                        let stl = `padding: 4px 6px; background-color: ${rle?.color ?? 'orange'}; margin-bottom: 2px; border-radius: 5px; color: white;`;

                        str += `<div col style="${stl}" a-center>${context.maxLen(rle?.name ?? '', 10)}</div>`;
                    }

                    return `${str}</div>`;
                },
            },
            {
                title: tr('last-active'),
                dataIndex: 'lastActive',
                sorter: true,
                format: ((val: string) => {
                    return timeSince(val);
                })
            },
            {
                title: tr('accepted'),
                dataIndex: 'accepted',
                sorter: true,
                format: (value: any) => {
                    if (value == 1) {
                        return '<span style="color: green" non-sel>✔</span>'
                    }
                }
            },
            {
                title: tr('active'),
                dataIndex: 'active',
                sorter: true,
                format: (value: any)=>{
                    if (value == 1) {
                        return '<span style="color: green" non-sel>✔</span>'
                    }
                }
            },
        ];

		if (ignoreColumns.length > 0) {
			return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
		}

		return cols;
	}
}