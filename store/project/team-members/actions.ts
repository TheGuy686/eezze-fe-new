import { InitCrudActions } from '~/factories/crud/Actions';
import TeamMemberModel from '~/models/TeamMemberModel';
import Request from '@/classes/Request';

const GLB: any = global;

export default {
    ...InitCrudActions({
        allPath: '/member',
        editUpdatePath: '/member',
        entityId: 'id',
        entityClass: TeamMemberModel,
    }),
    async inviteMembers(storeArgs: any, args: any) {
        try {
            storeArgs.commit('setDoingRequestState', true);

            const res: any = await Request.post(
                '/member/invite', 
                { invites: args?.invites ?? [] },
                {
                    authorization: GLB['AUTH_TOKEN']
                }
            );

            setTimeout(() => storeArgs.commit('setDoingRequestState', false), 1000);

            console.log('There was an error: ', res);

            return res;
        }
        catch (err) {
            console.log('inviteMembers Error: ', err);
            storeArgs.commit('setDoingRequestState', false);
            
            return { success: false }
        }
    }
};