const ENV = require('../env');

const env = {};

const API_HOST = `${ENV.API_HOST}/v1`;
const WS_HOST = ENV.WS_HOST;
const ASSETS_HOST = `${ENV.API_HOST}`;
const WS_STATS_HOST = ENV.WS_STATS_HOST ?? 'ws://localhost:3001/v1';

module.exports = {
    setEnvVars: function (key, value) {
        env[key] = value;

        // console.log('SETTING: ', key, ' : ', value);
    },
    getEnv() {
        // console.log('ENV: ', env);
    },
    WS_HOST: WS_HOST,
    API_HOST: API_HOST,
    WS_STATS_HOST: WS_STATS_HOST,

    cms: {

    },
    datasource: {
        all: `${API_HOST}/datasource/all`
    },
    roles: {
        createEdit: `${API_HOST}/role`,
        all: `${API_HOST}/role/all`,
    },
    auth: {
        login: API_HOST + '/auth/login',
        register: API_HOST + '/auth/register',
        uploadAvarar: API_HOST + '/auth/avatar',
        deleteAccount: API_HOST + '/auth/user',
        updateAccount: API_HOST + '/auth/user',
        forgotPassword: API_HOST + '/auth/reset-password',
        resestPassword: API_HOST + '/auth/reset-password',
        updatePassword: API_HOST + '/auth/update-password',
        changeLanguage: API_HOST + '/auth/lang',
    },
    general: {
        notifications: API_HOST + '/notification/all',
        createNotification: API_HOST + '/notification',
        app: {
            menu: API_HOST + '/store/menu-categories',
            searchStore: API_HOST + '/store/search',
            menuCategoryModules: API_HOST + '/store/modules',
            storeDependancies: API_HOST + '/store',
            sendFeedback: API_HOST + '/feedback',
        },
    },
    project: {
        create: API_HOST + '/project',
        stats: API_HOST + '/project/stats',
        logoUpload: API_HOST + '/project/logo',
        projectTree: `${API_HOST}/project/tree`,
        spec: `${API_HOST}/project/spec`,
        askAi: `${API_HOST}/project/ask-ai`,
        depsFromTags: `${API_HOST}/project/deps-from-tags`,
    },
    serviceGroup: {
        depTree: API_HOST + '/service-group/store',
        publish: API_HOST + '/service-group/publish',
    },
    service: {
        all: API_HOST + '/service/all',
    },
    assets: {
        root: ASSETS_HOST,
        logos: `${ASSETS_HOST}/logos`,
        avatars: `${ASSETS_HOST}/avatars`,
    },
    store: {
        addReview: `${API_HOST}/store/review`,
        searchOnTags: `${API_HOST}/store/search-on-tags`,
        sgTags: {
            all: `${API_HOST}/store/tags`
        }
    }
};