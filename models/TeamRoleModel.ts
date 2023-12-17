import { randDarkColor, tr } from '~/classes/globals';
import { memberRoles } from '~/consts/App';

interface Interface {
    id: string;
    color: string;
    name: string;
}

const TEAM_ROLES: any = memberRoles;

export default class TeamRoleModel implements Interface {
    id: string;
    name: string = '';
    color: string = randDarkColor()

    constructor(id: string) {
        this.id = id;

        if (typeof TEAM_ROLES[id] == 'undefined') {
            console.log(`Team role id is not valid. Got "${id}" expected one of the following [${Object.keys(TEAM_ROLES).join(', ')}]`);
        }
        else {
            const r = TEAM_ROLES[id];

            this.name = r.name;
            this.color = r.color;
        }
    }

    static create(id: string): TeamRoleModel {
        return new TeamRoleModel(id);
    }
}