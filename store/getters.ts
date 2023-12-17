export default {
    isAuthenticated(state: any) {
        return state.auth.loggedIn
    },

    loggedInUser(state: any) {
        return state.auth.user
    },
};