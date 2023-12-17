<style lang="less">
.invite-members-modal-root {
    padding-left: 15px;
    padding-right: 15px;

    .info {
        font-weight: 400;
        font-size: 12px;
        color: #4F4F4F;
        margin-bottom: 20px;
    }

    .title {
        font-weight: 600;
        font-size: 14px;
        margin-right: 20px;
        margin-top: 15px;
        margin-bottom: 15px;
        color: #012840;
    }

    .warn-alert { margin-bottom: 15px; }
}
</style>

<template>
<EModal
    ref="modal" 
    :width="400"
    :title="tr('invite-members')"
    :isLoading="isDoingRequest"
    @right-btn-clicked="inviteMembers()"
>
    <div class="invite-members-modal-root">

        <div class="info">
            
            {{ tr('invite-members-info-1') }}
        
        </div>

        <e-row ai="c">

            <div class="title">{{ tr('to') }}</div>

            <EFormSelect
                w-100
                class="pr-2"
                :name="tr('emails')"
                mode="tags"
                :placeholder="tr('input-emails')"
                keyProp="email"
                valueProp="email"
                :options="emails"
                :inlineOver="true"
                v-model="entity.emails"
            />

        </e-row>

        <e-row jc="sb" ai="c">

            <div class="title">{{ tr('team') }}</div>

            <EFormSelect
                class="pr-2"
                name=""
                :placeholder="tr('select-a-permission')"
                keyProp="id"
                valueProp="name"
                :options="project?.teams"
                :inlineOver="true"
                v-model="entity.team"
            />

        </e-row>

        <e-row jc="sb" ai="c">

            <div class="title">{{ tr('project-permissions') }}</div>

            <EFormSelect
                class="pr-2"
                name=""
                :placeholder="tr('select-a-permission')"
                keyProp="key"
                valueProp="name"
                :options="permissions"
                :inlineOver="true"
                v-model="entity.permission"
            />

        </e-row>

        <!-- <e-row jc="sb" ai="c">

            <div class="title">{{ tr('expiry-period') }}</div>

            <a-date-picker
                style="width: 150px;"
                format="YYYY-MM-DD HH:mm:ss"
                :disabled-date="disabledDate"
                :disabled-time="disabledDateTime"
                :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
                v-model="entity.expireDate"
            />

        </e-row> -->

    </div>

</EModal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import dayjs from 'dayjs';
import { tr } from '~/classes/globals';

const range = (start, end) => {
    const result = [];

    for (let i = start; i < end; i++) result.push(i);

    return result;
};

const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
};

const disabledDateTime = () => {
    return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
    };
};

export default {
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('project/proj', [ 'entities' ]),
        ...mapState('project/team-members' , [ 'isDoingRequest' ]),

        projects() {
            return this.$store.state?.project?.proj?.entities ?? [];
        },

        dayjs() {return dayjs},
        disabledDate() {return disabledDate},
        disabledDateTime() {return disabledDateTime},

        invites() {
            try{
                const emails = this.entity.emails, out = [];

                for (let e of emails) {
                    out.push({
                        email: e,
                        permission: this.entity.permission,
                        teamId: this.entity?.team,
                    });
                }

                return out;
            }
            catch (err) { return { invites: [] } }
        }
    },

    data() {
        return {
            isEdit: false,
            entity: {
                emails: [],
                permission: 'administrator',
                team: 1,
            },
            permissions: [
                {
                    id: 1,
                    key: 'administrator',
                    name: tr('administrator'),
                },
                {
                    id: 2,
                    key: 'member',
                    name: tr('member'),
                },
                // {
                //     id: 3,
                //     name: self.tr('guest'),
                // }
            ],
            // here we need to have an endpoint that will retrieve all the emails from any member in a project
            emails: [
                {
                    id: '1',
                    email: 'ryanjcooke@hotmail.com',
                    firstName: 'Ryan',
                    lastName: 'Cooke'
                },
                {
                    id: '2',
                    email: 'ryanjcooke2@hotmail.com',
                    firstName: 'Ryan2',
                    lastName: 'Cooke2'
                },
                {
                    id: '3',
                    email: 'ryanjcooke3@hotmail.com',
                    firstName: 'Ryan3',
                    lastName: 'Cooke3'
                },
                {
                    id: '4',
                    email: 'ryanjcooke4@hotmail.com',
                    firstName: 'Ryan4',
                    lastName: 'Cooke4'
                },
                {
                    id: '5',
                    email: 'ryanjcooke5@hotmail.com',
                    firstName: 'Ryan5',
                    lastName: 'Cooke5'
                },
            ]
        }
    },

	methods: {
        async inviteMembers() {
            const res = await this.$store.dispatch('project/team-members/inviteMembers', { invites: this.invites });

            const self = this;

            if (res?.success) {
                this.os(
                    () => {
                        self.$notification.success({
                            placement: 'topRight',
                            message: self.tr('operation-was-successful')
                        });
                    },
                    300
                );

                this.$store.dispatch('project/proj/getEntities', {
                    successCb: () => {
                        try {
                            const project = self.projects.filter((p) => p.id == self.currentProject)[0];

                            self.setCurrentProject(project);
                        }
                        catch (err) {
                            console.log('inviteMembers set project error: ', err);
                        }
                    }
                });
            }
            else {
                self.$notification.error({
                    placement: 'topRight',
                    message: self.tr('operation-was-unsuccessful')
                });
            }
        },

        show () {
            this.$refs['modal'].show();
        },

        hide () { this.$refs['modal'].hide() },

        ...mapMutations({
            setCurrentProject: 'project/proj/setCurrentProject',
        })
	}
};
</script>