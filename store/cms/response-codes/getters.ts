export default {
    successCodes(state: any) {
        try {
            return Object.values(
                (state?.entities ?? []).filter((i: any) => i.code > 199 && i.code < 300)
            );
        }
        catch (err) { return [] }
    },
    errorCodes(state: any) {
        try {
            return Object.values(
                (state?.entities ?? []).filter((i: any) => i.code > 299)
            );
        }
        catch (err) { return [] }
    },
}