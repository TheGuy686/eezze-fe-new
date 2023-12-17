import { tr } from '../../classes/globals';
import { memberRoles } from '../../consts/App';
import WSocket from '../../classes/WSocket';

export default () => ({
    isGettingNotifications: false,
    isDeleteingAllNotifications: false,
    isMarkingAllNotificationsAsRead: false,
    
    viewMode: 'tables',

    toggleNotiDrawer: false,
    avatarCounter: 0,
    notifications: [],
    projectStats: {},

    mainMenuCollpsed: false,
    devBarCollpsed: false,

    editingBlChainItem: {},
    finishedEditingCb: null,

    wsServerIsDoingRequest: false,
    wsServerConnected: false,

    generalStatsWs: WSocket,

    filteredUserCollapsibled: false,
    filteredUserProfile: {},

    projectsItteration: 0,

    membersColors: {},

    sessionId: '',

    isGettingStoreMenu: false,
    storeMenu: [],

    isGettingModules: false,
    filteredModules: [],

    showSearchView: false,
    storeSearch: '',
    devMode: true,

    isSendingFeedback: false,

    mouseX: 0,
    mouseY: 0,
    _sendMounseEventTmr: null,

    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,

    projectSessions: {},

    supportedLanguages: [
        {
            id: 1,
            key: 'en',
            name: 'English'
        },
        {
            id: 2,
            key: 'zh',
            name: '中文'
        },
        {
            id: 3,
            key: 'th',
            name: 'ไทย'
        },
    ],

    listStyleTypes: [
        {
            id: 1,
            key: 'none',
            name: tr('none'),
            desc: tr('none-desc'),
        },
        {
            id: 2,
            key: 'disc',
            name: tr('disc'),
            desc: tr('disc-desc'),
        },
        {
            id: 3,
            key: 'circle',
            name: tr('circle'),
            desc: tr('circle-desc'),
        },
        {
            id: 4,
            key: 'square',
            name: tr('square'),
            desc: tr('square-desc'),
        },
        {
            id: 5,
            key: 'decimal',
            name: tr('decimal'),
            desc: tr('decimal-desc'),
        },
        {
            id: 6,
            key: 'georgian',
            name: tr('georgian'),
            desc: tr('georgian-desc'),
        },
        {
            id: 7,
            key: 'trad-chinese-informal',
            name: tr('trad-chinese-informal'),
            desc: tr('trad-chinese-informal-desc'),
        },
        {
            id: 8,
            key: 'kannada',
            name: tr('kannada'),
            desc: tr('kannada-desc'),
        },
        {
            id: 9,
            key: 'inherit',
            name: tr('inherit'),
            desc: tr('inherit-desc'),
        },
        {
            id: 19,
            key: 'initial',
            name: tr('initial'),
            desc: tr('initial-desc'),
        },
        {
            id: 11,
            key: 'revert',
            name: tr('revert'),
            desc: tr('revert-desc'),
        },
        {
            id: 12,
            key: 'revert-layer',
            name: tr('revert-layer'),
            desc: tr('revert-layer-desc'),
        },
        {
            id: 13,
            key: 'unset',
            name: tr('unset'),
            desc: tr('unset-desc'),
        },
    ],

    serviceConfigurableTypes: [
        {
            id: 1,
            key: 'email',
            name: tr('sc-email'),
            desc: tr('sc-email-desc'),
        },
        {
            id: 2,
            key: 'render-template',
            name: tr('sc-render-template'),
            desc: tr('sc-render-template-desc'),
        },
    ],

    listPositionTypes: [
        {
            id: 1,
            key: 'inside',
            name: tr('inside'),
            desc: tr('inside-desc'),
        },
        {
            id: 2,
            key: 'outside',
            name: tr('outside'),
            desc: tr('outside-desc'),
        },
        {
            id: 3,
            key: 'inherit',
            name: tr('inherit'),
            desc: tr('inherit-desc'),
        },
        {
            id: 4,
            key: 'initial',
            name: tr('initial'),
            desc: tr('initial-desc'),
        },
        {
            id: 5,
            key: 'revert',
            name: tr('revert'),
            desc: tr('revert-desc'),
        },
        {
            id: 6,
            key: 'revert-layer',
            name: tr('revert-layer'),
            desc: tr('revert-layer-desc'),
        },
        {
            id: 7,
            key: 'unset',
            name: tr('unset'),
            desc: tr('unset-desc'),
        },
    ],

    fontStyles: [
        {
            id: 1,
            key: 'normal',
            name: tr('normal'),
            desc: tr('normal-desc'),
        },
        {
            id: 2,
            key: 'italic',
            name: tr('italic'),
            desc: tr('italic-desc'),
        },
        {
            id: 3,
            key: 'oblique',
            name: tr('oblique'),
            desc: tr('oblique-desc'),
        },
    ],

    borderTypes: [
        {
            id: 1,
            key: 'solid',
            name: tr('solid'),
            desc: tr('solid-desc'),
        },
        {
            id: 2,
            key: 'dotted',
            name: tr('dotted'),
            desc: tr('dotted-desc'),
        },
        {
            id: 3,
            key: 'dashed',
            name: tr('dashed'),
            desc: tr('dashed-desc'),
        },
        {
            id: 4,
            key: 'double',
            name: tr('double'),
            desc: tr('double-desc'),
        },
        {
            id: 5,
            key: 'groove',
            name: tr('groove'),
            desc: tr('groove-desc'),
        },
        {
            id: 6,
            key: 'ridge',
            name: tr('ridge'),
            desc: tr('ridge-desc'),
        },
        {
            id: 7,
            key: 'inset',
            name: tr('inset'),
            desc: tr('inset-desc'),
        },
        {
            id: 8,
            key: 'outset',
            name: tr('outset'),
            desc: tr('outset-desc'),
        },
        {
            id: 9,
            key: 'none',
            name: tr('none'),
            desc: tr('none-desc'),
        },
        {
            id: 10,
            key: 'hidden',
            name: tr('hidden'),
            desc: tr('hidden-desc'),
        },
    ],

    units: [
        {
            id: 1,
            key: 'px',
            name: tr('pixels'),
            desc: tr('pixels-desc'),
        },
        {
            id: 2,
            key: 'cm',
            name: tr('centimeters'),
            desc: tr('centimeters-desc'),
        },
        {
            id: 3,
            key: 'mm',
            name: tr('millimeters'),
            desc: tr('millimeters-desc'),
        },
        {
            id: 4,
            key: 'in',
            name: tr('in'),
            desc: tr('in-desc'),
        },
        {
            id: 5,
            key: 'pt',
            name: tr('points'),
            desc: tr('points-desc'),
        },
        {
            id: 6,
            key: 'pc',
            name: tr('picas'),
            desc: tr('picas-desc'),
        },
        {
            id: 8,
            key: 'em',
            name: tr('element-measurement'),
            desc: tr('element-measurement-desc'),
        },
        {
            id: 9,
            key: 'ex',
            name: tr('relevant-x'),
            desc: tr('relevant-x-desc'),
        },
        {
            id: 10,
            key: 'ch',
            name: tr('relevant-0-width'),
            desc: tr('relevant-0-width-desc'),
        },
        {
            id: 11,
            key: 'rem',
            name: tr('relevant-to-root-font'),
            desc: tr('relevant-to-root-font-desc'),
        },
        {
            id: 13,
            key: 'vw',
            name: tr('relevant-to-viewport-width'),
            desc: tr('relevant-to-viewport-width-desc'),
        },
        {
            id: 14,
            key: 'vh',
            name: tr('relevant-to-viewport-height'),
            desc: tr('relevant-to-viewport-height-desc'),
        },
        {
            id: 15,
            key: 'vmin',
            name: tr('relevant-to-viewport-smaller-dimention'),
            desc: tr('relevant-to-viewport-smaller-dimention-desc'),
        },
        {
            id: 16,
            key: 'vmax',
            name: tr('relevant-to-viewport-larger-dimention'),
            desc: tr('relevant-to-viewport-larger-dimention-desc'),
        },
        {
            id: 17,
            key: '%',
            name: tr('percent'),
            desc: tr('percent-desc'),
        },
    ],

    memberRoles: memberRoles,
})