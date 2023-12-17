export default {
    logsDesc: (state: any) => {
        try {
            let logs = state.dev.servers['gen-ws'].logs;

            return logs.reverse();
        }
        catch (e) {
            return [];
        }
    },
}