// /store/getters.js
import RoleModel from '~/models/RoleModel';
import { keyify } from '../../../classes/globals';

export default {
    rolesDict(state: any) {
        let out: any = {}, r: any;

        for (r of Object.values(state.entities)) {
            out[r.id] = RoleModel.create(r);
        }

        return out;
    },
}