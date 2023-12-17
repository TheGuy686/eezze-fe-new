<style lang="less" scoped>
.side {
    box-sizing: border-box;
    background: #FFF;
    border-right: 1px solid #E0E0E0;
    left: -20px;
    top: -20px;
}

.full-modal-action-cont {
    height: 92vh;
    max-height: 95vh;
    padding-top: 33px;
}
</style>

<template>
<EModalFull
    ref="modal"
    :title="''"
    :isFullWidth="true"
    :showFooter="false"
>
    <div>

        <ActionMenu
            :actionStep="actionStep"
            v-model="actMenuMdl"
        />

        <a-col :span="18" class="full-modal-action-cont">

            <div class="max-h-screen bg-white" e-scroll>

                <!-- authentication -->

                <ActionContentAuthLogin
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-if="actMenuMdl.selectedAction == 'auth' && actMenuMdl.selectedSubAction == 'login'"
                />

                <!-- authentication end -->

                <!-- databases -->

                <ActionContentDatabaseCreateOne
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-if="actMenuMdl.selectedAction == 'database' && actMenuMdl.selectedSubAction == 'create-one'"
                />

                <ActionContentDatabaseGetOne
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction == 'database' && actMenuMdl.selectedSubAction == 'get-one'"
                />

                <ActionContentDatabaseUpdateOne
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction == 'database' && actMenuMdl.selectedSubAction == 'update-one'"
                />

                <ActionContentDatabaseDeleteOne
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction==='database' && actMenuMdl.selectedSubAction == 'delete-one'"
                />

                <ActionContentDatabaseGetList
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'database' && actMenuMdl.selectedSubAction == 'get-list'"
                />

                <ActionContentDatabaseGetOneAndUpdate
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'database' && actMenuMdl.selectedSubAction == 'get-one-and-update'"
                />

                <ActionContentDatabaseCreateOneIfNotExists
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'database' && actMenuMdl.selectedSubAction == 'create-one-if-not-exists'"
                />

                <!-- files  -->

                <ActionContentFilesSave
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'files' && actMenuMdl.selectedSubAction == 'save'"
                />

                <ActionContentFilesDelete
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'files' && actMenuMdl.selectedSubAction == 'delete'"
                />

                <ActionContentFilesRead
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'files' && actMenuMdl.selectedSubAction == 'read'"
                />

                <!-- files end -->

                <!-- converters  -->

                <ActionContentConvertersBase64
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'converters' && actMenuMdl.selectedSubAction == 'base64'"
                />

                <!-- converters end -->

                <!-- Email  -->

                <ActionContentEmailSendSmtpEmail
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'email' && actMenuMdl.selectedSubAction == 'send-smtp-email'"
                />

                <!-- Resopnse  -->

                <ActionContentResponseRedirect
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'response' && actMenuMdl.selectedSubAction == 'redirect'"
                />

                <!-- Server  -->

                <ActionContentServersRestAction
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'server' && actMenuMdl.selectedSubAction == 'rest-action'"
                />

                <ActionContentServersSocketAction
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'server' && actMenuMdl.selectedSubAction == 'socket-action'"
                />

                <!-- Misc  -->

                <ActionContentMiscRenderTemplate
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'misc' && actMenuMdl.selectedSubAction == 'render-template'"
                />

                <ActionContentMiscCommand
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'misc' && actMenuMdl.selectedSubAction == 'command'"
                />

                <!--
                    
                <ActionContentMiscSuccess
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'misc' && actMenuMdl.selectedSubAction == 'success'"
                />

                <ActionContentMiscError
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'misc' && actMenuMdl.selectedSubAction == 'error'"
                /> -->

                <ActionContentMiscServiceCall
                    :actionStep="actionStep"
                    v-else-if="actMenuMdl.selectedAction === 'misc' && actMenuMdl.selectedSubAction == 'service-call'"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                />

                <!-- Misc  -->

                <!-- Logic  -->

                <ActionContentLogicDo
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'logic' && actMenuMdl.selectedSubAction == 'do'"
                />

                <ActionContentLogicList
                    :actionStep="actionStep"
                    @show-bl-mdl="$refs['action-chain'].show($event)"
                    @save-action-clicked="setDefinitionActionType()"
                    @close="$refs['modal'].hide()"
                    @edit-basic-action-info="$refs['edit-basic-info-mdl'].show()"
                    v-else-if="actMenuMdl.selectedAction === 'logic' && actMenuMdl.selectedSubAction == 'list'"
                />

                <!-- Logic  -->

            </div>

        </a-col>

    </div>

    <EFormBlActionChain
        ref="action-chain"
        prop="filename"
        type="string"
        :filteredItem="editingLogicChain"
        @save-clicked="finishedEditingCb(editingLogicChain)"
    />

    <EModal
        ref="edit-basic-info-mdl"
        :title="tr('edit-basic-action-info')"
        @right-btn-clicked="$refs['edit-basic-info-mdl'].hide()"
    >

        <EFormInput
            :name="tr('name')"
            :message="tr('please-input-a-name')"
            v-model="actionStep.name"
        />

        <EFormInput
            class="mt-5"
            :name="tr('description')"
            :message="tr('please-input-a-description')"
            v-model="actionStep.description"
        />

    </EModal>

</EModalFull>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

export default {
    props: {
        actionStep: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('app', [ 'editingBlChainItem', 'finishedEditingCb' ]),
    },
    watch: {
        editingBlChainItem(to) {
            this.editingLogicChain = {...JSON.parse(JSON.stringify(to))};

            const i = this.editingLogicChain;

            // if (i?.type == 'context-mapping' && )

            // console.log('this.editingLogicChain: ', this.editingLogicChain);
        },
    },
    data() {
        return {
            // @Ryan
            actMenuMdl: {},
            // actMenuMdl: {
            //     selectedAction: 'email',
            //     selectedSubAction: 'send-smtp-email',
            // },
            editingLogicChain: {},
        }
    },
    methods: {
        filterSchemaToType(schema, category, action) {
            const key = `${category}_${action}`;

            switch (key) {
                case 'auth_login': return {
                    _action: schema?._action,
                    type: 'JWT',
                    authenticator: schema?.authenticator ?? '',
                    authenticatorLbe: schema?.authenticatorLbe ?? '',
                    secret: schema?.secret ?? '',
                    vault: schema?.vault ?? '',
                    expiresIn: schema?.expiresIn ?? { minutes: 30},
                    password: schema?.password,
                    verifier: schema?.verifier,
                    input: schema?.input ?? {},
                    failOn: schema?.failOn ?? [],
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'database_create-one': return {
                    _action: schema?._action,
                    datasource: schema?.datasource ?? '',
                    entity: schema?.entity ?? '',
                    repo: schema?.repo ?? '',
                    input: schema?.input,
                    failOnEmpty: schema?.failOnEmpty,
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'database_create-one-if-not-exists': return {
                    _action: schema?._action,
                    datasource: schema?.datasource ?? '',
                    entity: schema?.entity ?? '',
                    repo: schema?.repo ?? '',
                    checkOn: schema?.checkOn,
                    input: schema?.input,
                    createValues: schema?.createValues,
                    failOnEmpty: schema?.failOnEmpty,
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'database_delete-one': return {
                    _action: schema?._action,
                    datasource: schema?.datasource ?? '',
                    entity: schema?.entity ?? '',
                    repo: schema?.repo ?? '',
                    checkOn: schema?.checkOn,
                    input: schema?.input,
                    failOnEmpty: schema?.failOnEmpty,
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'database_get-list': return {
                    _action: schema?._action,
                    datasource: schema?.datasource ?? '',
                    entity: schema?.entity ?? '',
                    repo: schema?.repo ?? '',
                    checkOn: schema?.checkOn,
                    input: schema?.input,
                    maximumDepth: schema?.maximumDepth ?? 4,
                    failOnEmpty: schema?.failOnEmpty,
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'database_get-one': return {
                    _action: schema?._action,
                    datasource: schema?.datasource ?? '',
                    entity: schema?.entity ?? '',
                    repo: schema?.repo ?? '',
                    checkOn: schema?.checkOn,
                    input: schema?.input,
                    maximumDepth: schema?.maximumDepth ?? 4,
                    failOnEmpty: schema?.failOnEmpty,
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'database_get-one-and-update': return {
                    _action: schema?._action,
                    datasource: schema?.datasource ?? '',
                    entity: schema?.entity ?? '',
                    repo: schema?.repo ?? '',
                    checkOn: schema?.checkOn,
                    input: schema?.input,
                    withValues: schema?.withValues,
                    maximumDepth: schema?.maximumDepth ?? 4,
                    failOnEmpty: schema?.failOnEmpty,
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'database_update-one': return {
                    _action: schema?._action,
                    datasource: schema?.datasource ?? '',
                    entity: schema?.entity ?? '',
                    repo: schema?.repo ?? '',
                    checkOn: schema?.checkOn,
                    input: schema?.input,
                    withValues: schema?.withValues ?? [],
                    maximumDepth: schema?.maximumDepth ?? 4,
                    failOnEmpty: schema?.failOnEmpty,
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'logic_do': return {
                    _action: schema?._action,
                    run: schema?.run,
                    onSuccess: schema?.onSuccess,
                }
                case 'files_save': return {
                    _action: schema?._action,
                    datasource: schema?.datasource ?? '',
                    fileType: schema?.fileType,
                    folder: schema?.folder ?? {},
                    previousFileName: schema?.previousFileName ?? {},
                    fileName: schema?.fileName ?? {},
                    content: schema?.content ?? '',
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'files_delete': return {
                    _action: schema?._action,
                    datasource: schema?.datasource ?? '',
                    folder: schema?.folder,
                    fileType: schema?.fileType,
                    fileName: schema?.fileName ?? {},
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'files_read': return {
                    _action: schema?._action,
                    folder: schema?.folder,
                    datasource: schema?.datasource ?? '',
                    fileType: schema?.fileType,
                    fileName: schema?.fileName ?? {},
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'response_redirect': return {
                    _action: schema?._action,
                    url: schema?.url,
                }
                case 'email_send-smtp-email': {
                    const out = {
                        _action: schema?._action,
                        datasource: schema?.datasource ?? '',
                        repo: schema?.repo ?? '',
                        to: schema?.to,
                        from: schema?.from,
                        fromFirstName: schema?.fromFirstName,
                        fromLastName: schema?.fromLastName,
                        subject: schema?.subject,
                        onSuccess: schema?.onSuccess,
                        output: schema?.output,
                    };

                    if (schema?.message) out['message'] = schema?.message;
                    if (schema?.html) out['html'] = schema?.html;
                    if (schema?.template) {
                        out['template'] = schema?.template ?? '';
                        out['templateName'] = schema?.templateName ?? '';
                        out['templateVars'] = schema?.templateVars ?? [];
                    }

                    return JSON.parse(JSON.stringify(out));
                }
                case 'server_rest-action': return {
                    _action: schema?._action,
                    datasource: schema?.datasource ?? '',
                    repo: schema?.repo ?? '',
                    method: schema?.method ?? 'get',
                    path: schema?.path ?? {},
                    headers: schema?.headers ?? [],
                    urlParams: schema?.urlParams ?? [],
                    requestBody: schema?.requestBody ?? [],
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'server_socket-action': return {
                    _action: schema?._action,
                    datasource: schema?.datasource ?? '',
                    repo: schema?.repo ?? '',
                    eventName: schema?.eventName,
                    path: schema?.path ?? {},
                    urlParams: schema?.urlParams ?? [],
                    requestBody: schema?.requestBody ?? [],
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'misc_command': return {
                    _action: schema?._action,
                    rootFolder: schema?.rootFolder ?? '',
                    command: schema?.command ?? '',
                    runAsynchronous: schema?.runAsynchronous ?? false,
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'misc_service-call':   
                    let out = {
                        _action: schema?._action,
                        datasource: schema?.datasource ?? '',
                        repo: schema?.repo ?? '',
                        type: schema?.type,
                        service: schema?.service,
                        serviceId: schema?.serviceId,
                        actionListSource: schema?.actionListSource ?? {},
                        headers: schema?.headers ?? [],
                        urlParams: schema?.urlParams ?? [],
                        requestBody: schema?.requestBody ?? [],
                        onSuccess: schema?.onSuccess,
                        output: schema?.output,
                    };

                    if (schema?.type != 'websocket' && typeof schema?.headers == 'object') {
                        out['headers'] = schema?.headers;
                    }

                    return out;

                case 'misc_render-template': return {
                    _action: schema?._action,
                    datasource: schema?.datasource ?? '',
                    repo: schema?.repo ?? '',
                    fileType: schema?.fileType,
                    toPath: schema?.toPath ?? {},
                    fileName: schema?.fileName ?? {},
                    linter: schema?.linter ?? '',
                    actionListSource: schema?.actionListSource ?? {},
                    template: schema?.template,
                    templateName: schema?.templateName,
                    templateVars: schema?.templateVars ?? [],
                    onSuccess: schema?.onSuccess,
                    output: schema?.output,
                }
                case 'misc_success': return {
                    _action: schema?._action,
                    success: schema?.success,
                };
                case 'misc_error': return {
                    _action: schema?._action,
                    error: schema?.error,
                };

                default: return schema;
            }
        },
        setAi() {
            const out = {...this.actionStep};

            if (this?.actionStep?.isNew) {
                out.schema = {};
                Vue.set(out, 'schema', {});
            }

            //this.editingLogicChain = ActionModel.create(out);
        },
        setDefinitionActionType() {
            const cs = {...(this?.actionStep?.schema ?? {})};

            cs['_action'] = {
                category: this.actMenuMdl.selectedAction,
                action: this.actMenuMdl.selectedSubAction,
            }

            const aschema = this.filterSchemaToType(
                cs,
                this.actMenuMdl.selectedAction,
                this.actMenuMdl.selectedSubAction
            );

            Vue.set(this.actionStep, 'schema', aschema);

            this.$emit('save-action-clicked');
        },
        show() {
            const act = this?.actionStep?.schema?._action;

            if (typeof act == 'object') {
                this.actMenuMdl.selectedAction = act.category;
                this.actMenuMdl.selectedSubAction = act.action;
            }

            this.$refs['modal'].show();

            // setTimeout(() => this.setAi(), 400);
        },
        hide() {
            this.$refs['modal'].hide();
        },
    },
};
</script>