import { tr } from '~/classes/globals';
import RoleModel from './RoleModel';

interface Interface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    avatar: string;
    handle: string;
    roles: RoleModel[];
    lang: string;
}

export default class UserModel implements Interface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    avatar: string;
    handle: string;
    roles: RoleModel[] = [];
    fullName: string = '';
    lastLoggedIn: string = '2023-2-12 18:00:29';
    lang: string = 'en';

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        emailVerified: boolean,
        avatar: string,
        handle: string,
        roles: RoleModel[] | string,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.emailVerified = emailVerified;
        this.handle = handle;
        this.avatar = avatar;

        this.fullName = this._fullName;

        let rls;

        if (typeof roles == 'string') {
            try {
                rls = JSON.parse(roles);
            }
            catch (err) {}
        }
        else {
            rls = roles;
        }

        for (let r of rls) {
            this.roles.push(RoleModel.create(r));
        }
    }

    public get _fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    static create(obj: any) : UserModel {
        return new UserModel(
            obj['id'] || -1,
            obj['firstName'] || 'John',
            obj['lastName'] || 'Doe',
            obj['email'] || 'example@youbi.comc',
            obj['emailVerified'] || 1,
            obj['avatar'] || undefined,
            obj['handle'] || 'TheMan',
            obj['roles'] || [ 'ROLE_USER' ],
        );
    }

    static getColumns(ignoreColumns: string[] = []) : string[] {
		let cols: any = [
            {
                title: tr('first-name'),
                dataIndex: 'firstName',
                sorter: true,
            },
            {
                title: tr('last-name'),
                dataIndex: 'lastName',
                sorter: true,
            },
            {
                title: tr('handle'),
                dataIndex: 'handle',
                sorter: true,
            },
            {
                title: tr('email'),
                dataIndex: 'email',
                sorter: true,
            },
            {
                title: tr('email-verified'),
                dataIndex: 'emailVerified',
                sorter: true,
            },
            {
                title: tr('avatar'),
                dataIndex: 'avatar',
                sorter: true,
            },
            {
                title: tr('roles'),
                dataIndex: 'roles',
                sorter: true,
            },
        ];

		if (ignoreColumns.length > 0) {
			return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
		}

		return cols;
	}
}