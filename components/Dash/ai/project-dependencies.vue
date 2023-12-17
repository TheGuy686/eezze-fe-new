<style lang="less">
.ai-create-project-dependencies-root {
    width: 100%;

    .mini-input {
        padding: 3px;
        border: #d9d9d9 1px solid;
        border-radius: 3px;
    }
}
</style>

<template>
<div class="ai-create-project-dependencies-root">

    <e-col class="mb-5">

        <h2>{{ tr('project-info') }}</h2>

        <e-row class="mb-1">

            <e-col jc="c" w-25>

                {{ tr('name') }}:

            </e-col>

            <e-col jc="c" w-75>

                <input
                    class="mini-input"
                    :placeholder="tr('input-a-value')"
                    v-model="project.projectName"
                />

            </e-col>

        </e-row>

        <e-row>

            <e-col jc="c" w-25>

                {{ tr('host') }}:

            </e-col>

            <e-col jc="c" w-75>

                <input
                    class="mini-input"
                    :placeholder="tr('input-a-value')"
                    v-model="project.host"
                />

            </e-col>

        </e-row>

    </e-col>

    <div class="pl-3 pr-2 pb-3" bev-cont>

        <e-col class="p-2 pl-0" jc="fs">

            <h2>{{ tr('project-dependencies') }}</h2>

        </e-col>

        <a-list
            style="max-height: 37.5vh;"
            size="small"
            :data-source="depOptions"
            w-100
            e-scroll
        >
            <template #renderItem="{ key, label }">

                <a-list-item>

                    <e-row class="pr-1" jc="sb">

                        {{ label }}

                        <a-badge :count="mdlCount(key)"></a-badge>

                    </e-row>

                </a-list-item>

            </template>

        </a-list>

    </div>

</div>

</template>

<script>
import Vue from 'vue';

import routes from '@/assets/js/routes';
import DsFPModel from '@/models/from-prompt/DsFPModel';

import { project } from '~/consts/Endpoints';

export default {
    props: {
        context: String,
    },
    watch: {
        dsGeneralTags(to) {
            const qus = [];

            for (const i in to) {
                qus.push({
                    confirmed: false,
                    key: to[i],
                    target: 'confirmedProjectTags',
                    prompt: `<b>${to[i]}</b>`,
                });
            }

            this.dssDepsCConfirmations.push({
                src: 'confirmations',
                target: 'confirmedProjectTags',
                context: `${this.context}`,
                isConfirmAction: true,
                isRawItem: true,
                forceComplete: true,
                message: this.tr('dss-high-level-min-confirm'),
                // message: this.tr('dss-high-level-confirm',
                //     {
                //         args: [ `<ul>${qus.join('')}</ul>` ]
                //     }
                // ),
                data: qus,
            });

            this.$emit('add-confirmations', this.dssDepsCConfirmations);
        },
        // dsHighLevelTags(to) {
        //     console.log('dsHighLevelTags: ', to);
        // },
    },
    computed: {
		depOptions() {
            const ignoreRoutes = [
                'home',
                'entity',
            ];

            const comList = [...routes.ADMIN_USER_ROLE, {
                key: 'modules',
                label: this.tr('modules'),
            }];

			return comList.filter(r => !ignoreRoutes.includes(r.key));
		},
        mdlCount() {
            return function (key) {
                const dps = this.depsP.mdl;

                try {
                    let out;
                    
                    switch (key) {
                        case 'connection': {
                            out = Object.keys(dps?.deps?.cons ?? {});
                            break;
                        }
                        case 'datasource': {
                            out = Object.keys(dps?.deps?.dss ?? {});
                            break;
                        }
                        case 'vault': {
                            out = Object.keys(dps?.deps?.vaults ?? {});
                            break;
                        }
                        case 'value-store': {
                            out = Object.keys(dps?.deps?.valueStores ?? {});
                            break;
                        }
                        case 'role': {
                            out = Object.keys(dps?.deps?.roles ?? {});
                            break;
                        }
                        case 'service-configurables': {
                            out = Object.keys(dps?.deps?.servConfigs ?? {});
                            break;
                        }
                        case 'service-groups': {
                            out = Object.keys(dps?.deps?.servGroups ?? {});
                            break;
                        }
                        case 'modules': {
                            out = Object.keys(this.project.modules);
                            break;
                        }
                    }

                    return (out ?? []).length;
                }
                catch (err) { return 0 }
            }
        },
        depsP() {
            const out = {
                todos: {},
                deps: {
                    cons: {},
                    dss: {},
                    roles: [],
                    vaults: {},
                    valueStores: {},
                    servConfigs: {},
                    servGroups: {},
                }
            };

            for (const rp of Object.keys(this.confirmedRoles)) {
                // const role = RoleFPModel.create(prompt);

                // if (role) out.deps.roles.push(role);
                out.deps.roles.push(rp);
            }

            for (const i of this.confirmedTagDepItems) {
                const prts = i.answers.manual.prompts;
                const todso = i.answers.manual.todos;

                // then loop through each prompt and sort out the dependancies
                promptsLoop: for (const p of prts) {
                    const matches = p.match(/^create:(.*?):/);

                    switch (matches?.[1]) {
                        case 'con': {
                            out.deps.cons[p] = true;
                            continue promptsLoop;
                        }
                        case 'ds': {
                            out.deps.dss[p] = true;
                            continue promptsLoop;
                        }
                        case 'role': {
                            out.deps.roles[p] = true;
                            continue promptsLoop;
                        }
                        case 'cv': {
                            out.deps.vaults[p] = true;
                            continue promptsLoop;
                        }
                        case 'vs': {
                            out.deps.valueStores[p] = true;
                            continue promptsLoop;
                        }
                        case 'sc': {
                            out.deps.servConfigs[p] = true;
                            continue promptsLoop;
                        }
                        case 'sg': {
                            out.deps.servGroups[p] = true;
                            continue promptsLoop;
                        }
                        default: {
                            console.log('default: ', matches?.[1], p);
                        }
                    }
                }

                for (const td of todso) {
                    out.todos[td] = true;
                }
            }

            return {
                iteration: this.iteration,
                mdl: out,
            };
        },
    },
    data() {
        return {
            iteration: 0,
            project: {
                projectName: '',
                description: '',
                type: 'server',
                host: '',
                user: '',
                pass: '',
                sshKey: '',

                roles: [],
                envVals: [],
                vaultVals: [],
                dss: [],
                serviceConfigs: [],
                sgs: [],

                modules: {},
            },
            rolePrompts: [],
            datasourcePrompts: [],
            dsGeneralTags: [],
            dsHighLevelTags: [],
            dssDepsQuestions: [],
            dssDepsCConfirmations: [],
            dssPromptConfirms: [],
            confirmedProjectTags: [],
            isDoingRequest: false,
            generalDependanciesUnconf: [],
            projectTagDeps: {},
            confirmedTagDepItems: [],
            confirmedRoles:{},
        };
    },
    methods: {
        addModule(mod) {
            Vue.set(this.project.modules, mod.id, mod);

            this.iteration++;
        },
        addRole(prompt) {
            Vue.set(this.confirmedRoles, prompt, true);

            this.iteration++;
        },
        addDs(prompt) {
            this.datasourcePrompts.push(prompt);

            const ds = DsFPModel.create(prompt);

            if (ds) this.project.dss.push(ds);

            this.iteration++;
        },
        async setDsTags(tags) {
            this.dsGeneralTags = tags.general;
            this.dsHighLevelTags = tags.highLevel;

            await this.getDepsFromTags();
        },
        setDssConfirmPrompts(prompts) {
            this.dssPromptConfirms = prompts;
        },
        confirmProjectTag(tag) {
            if (!this.confirmedProjectTags.includes(tag)) {
                this.confirmedProjectTags.push(tag);
            }
        },
        addItemFromDependencies(item) {
            if (item?.target && item?.key) {
                if (Array.isArray(this?.[item.target])) {
                    if (!this?.[item.target].includes(item.key)) {
                        this?.[item.target].push(item.key);

                        this.getDepsFromTags();
                    }
                }
            }
        },
        deleteItemFromDependencies(item) {
            if (item?.target && item?.key) {
                if (Array.isArray(this?.[item.target])) {
                    const arrIn = [];

                    for (const t of this[item.target]) {
                        if (t == item.key) continue;
                        arrIn.push(t);
                    }

                    this[item.target] = arrIn;

                    this.getDepsFromTags();
                }
            }
        },
        async getDepsFromTags() {
            if (this.confirmedProjectTags.length == 0) {
                return;
            }

            let res;

            this.isDoingRequest = true;

            let totmr;

            try {
                const url = `${project.depsFromTags}?tags=${this.confirmedProjectTags.join(',')}`;

                res = await this.$axios.get(url);

                if (res.status > 199 && res.status < 300) {
                    this.projectTagDeps = res.data;

                    if (totmr) clearTimeout(totmr);
                }

                this.isDoingRequest = false;
            }
            catch (e) {
                // console.log('ERROR: ', e);
                if (e?.response?.data?.error) {
					this.$notification.error(
						JSON.stringify(e?.response?.data?.error, null, 4),
						{ timer: 2 }
					);
				}

				this.isDoingRequest = false;
            }
        },
        pushConfirmedTagAction(ci) {
            this.confirmedTagDepItems.push(ci);
        },
    }
}
</script>