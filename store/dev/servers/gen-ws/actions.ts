import Request from '@/classes/Request';

export default {
    async bootUpGenerationLoggingSocketServer({commit}: any) {
        let res: any = await Request.post('/dev/boot-ws-logging-server')
            .then((data: any) => data.toObject())
            .catch((data: any) => data.toObject());
        
        if (res.success) {
            // commit('setGenerationLoggingWsServerVars', res.data);
        }
    },
};