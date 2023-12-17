export default {
    emailTpls(state: any) {
        try {
            return Object.values(
                (state?.entities ?? []).filter((sc: any) => sc?.type == 'email')
            );
        }
        catch (err) { return [] }
    },
    renderTemplateTpls(state: any) {
        try {
            return Object.values(
                (state?.entities ?? []).filter((sc: any) => sc?.type == 'render-template')
            );
        }
        catch (err) { return [] }
    }
}