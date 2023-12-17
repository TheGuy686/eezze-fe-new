import Request from '@/classes/Request';

export default {
    async bootUpUnitTests({commit, state}: any, handler: string) {
        let res: any = await Request.post('/dev/execute-unit-tests', {
            pathIds: handler
        })
            .then((data: any) => data.toObject())
            .catch((data: any) => data.toObject());
        
        if (res.success) {
            //commit('setGenerationLoggingWsServerVars', res.data);
        }
    }
};``