import { tr } from '~/classes/globals';

export default () => ({
    itteration: 0,
    filteredProject: -1,
    currentProjItem: {},
    currentEditingProject: {},
    isCreatingProjectFromWizard: false,
    isDeployingProject: false,
    steps: [
        // {
        //     title: tr('cp-basic-q1-title'),
        //     desc: tr('cp-basic-q1-desc'),
        //     ask: tr('cp-basic-q1-ask'),
        // },
        {
            title: tr('cp-basic-q2-title'),
            desc: tr('cp-basic-q2-desc'),
            ask: tr('cp-basic-q2-ask'),
        },
        {
            title: tr('cp-basic-q3-title'),
            desc: tr('cp-basic-q3-desc'),
            ask: tr('cp-basic-q3-ask'),
        },
        {
            title: tr('cp-basic-q5-title'),
            desc: tr('cp-basic-q5-desc'),
            ask: tr('cp-basic-q5-ask'),
        },
        {
            title: tr('cp-basic-q6-title'),
            desc: tr('cp-basic-q6-desc'),
            ask: tr('cp-basic-q6-ask'),
        },
        {
            title: tr('cp-basic-q7-title'),
            desc: tr('cp-basic-q7-desc'),
            ask: tr('cp-basic-q7-ask'),
        },
        {
            title: tr('cp-basic-q8-title'),
            desc: tr('cp-basic-q8-desc'),
            ask: tr('cp-basic-q8-ask'),
        }
    ]
});