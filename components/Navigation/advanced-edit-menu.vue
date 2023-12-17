<style lang="less" scoped>
.val-vals-cont {
	height: 24vh !important;
}

.empty-list-sm {
	text-align: center;
	font-size: 11px;
}

.li-xxs {
	padding-top: 1px !important;
	padding-bottom: 1px !important;
}

.aem-back-btn {
	display: flex;
	flex-direction: row;
	justify-content: center;

	&:hover {
		.txt {
			color: blue;
		}
	}
}
</style>

<template>
<div style="padding-left: 45px;" non-sel>

	<e-col style="height: 89vh;" jc="sb">

		<template v-if="!isEntityRoute">

			<e-col>

				<h4 class="pl-1 pt-1">{{ tr('service-configurables') }}</h4>

				<a-radio-group v-model="topActiveKey" size="small">

					<a-radio-button value="sc-email-templates">

						{{ tr('sc-email-templates') }}

					</a-radio-button>

					<a-radio-button value="sc-render-templates">

						{{ tr('sc-render-templates') }}

					</a-radio-button>

				</a-radio-group>

				<e-col class="val-vals-cont" v-show="topActiveKey == 'sc-email-templates'" e-scroll>

					<a-list size="small" bordered :data-source="scEmailsP">

						<template #header>

							<e-row jc="sb">

								<a-input
									style="padding: 2px 5px; height:23px; min-height: 10px;"
									:placeholder="tr('search-vaults')"
									v-model:value="filterScEmailTpls"
								/>

								<a-button class="ml-2" shape="circle" size="small" @click="$refs['mdl-service-configurables'].show(undefined, undefined, 'email')">

									<GeneralIcon type="plus" />

								</a-button>

							</e-row>

						</template>

						<template #renderItem="ent">

							<a-list-item class="li-xxs">
								
								<e-row jc="sb" ai="c">

									<span style="font-size: 12px;">
										
										{{ ent.name }}
									
									</span>

									<a-button class="ml-2" shape="circle" size="small" @click="$refs['mdl-service-configurables'].show(ent, undefined, 'email')">

										<GeneralIcon type="edit-sm" />

									</a-button>

								</e-row>
							
							</a-list-item>

						</template>
						
					</a-list>

				</e-col>

				<e-col class="val-vals-cont" v-show="topActiveKey == 'sc-render-templates'" e-scroll>

					<a-list size="small" bordered :data-source="scTemplatesP">

						<template #header>

							<e-row jc="sb">

								<a-input
									style="padding: 2px 5px; height:23px; min-height: 10px;"
									:placeholder="tr('search-vaults')"
									v-model:value="filterScRenderTpls"
								/>

								<a-button class="ml-2" shape="circle" size="small" @click="$refs['mdl-service-configurables'].show(undefined, undefined, 'render-template')">

									<GeneralIcon type="plus" />

								</a-button>

							</e-row>

						</template>

						<template #renderItem="ent">

							<a-list-item class="li-xxs">
								
								<e-row jc="sb" ai="c">

									<span style="font-size: 12px;">
										
										{{ ent.name }}
									
									</span>

									<a-button class="ml-2" shape="circle" size="small" @click="$refs['mdl-service-configurables'].show(ent, undefined, 'render-template')">

										<GeneralIcon type="edit-sm" />

									</a-button>

								</e-row>
							
							</a-list-item>

						</template>
						
					</a-list>

				</e-col>

				<a-radio-group v-model="middleActiveKey" size="small">

					<a-radio-button value="roles">

						{{ tr('roles') }}

					</a-radio-button>

				</a-radio-group>

				<e-col class="val-vals-cont" v-show="middleActiveKey == 'roles'" e-scroll>

					<a-list size="small" bordered :data-source="rolesFlt">

						<template #header>

							<e-row jc="sb">

								<a-input
									style="padding: 2px 5px; height:23px; min-height: 10px;"
									:placeholder="tr('search-vaults')"
									v-model:value="filterRoles"
								/>

								<a-button class="ml-2" shape="circle" size="small" @click="$refs['mdl-roles'].show()">

									<GeneralIcon type="plus" />

								</a-button>

							</e-row>

						</template>

						<template #renderItem="ent">

							<a-list-item>
								
								<e-row jc="sb">

									<span style="font-size: 12px;">{{ ent.role }}</span>

									<a-button class="ml-2" shape="circle" size="small" @click="$refs['mdl-roles'].show(ent)">

										<GeneralIcon type="edit-sm" />

									</a-button>

								</e-row>
							
							</a-list-item>

						</template>
						
					</a-list>

				</e-col>

			</e-col>

			<e-col>

				<a-radio-group v-model="bottomActiveKey" size="small">
				
					<a-radio-button value="values">

						{{ tr('values') }}

					</a-radio-button>

					<a-radio-button value="vaults">

						{{ tr('vaults') }}

					</a-radio-button>

				</a-radio-group>

				<e-col class="val-vals-cont" v-show="bottomActiveKey == 'values'" e-scroll>

					<a-list size="small" bordered :data-source="valuesFlt">

						<template #header>

							<e-row jc="sb">

								<a-input
									style="padding: 2px 5px; height:23px; min-height: 10px;"
									:placeholder="tr('search-vaults')"
									v-model:value="filterValues"
								/>

								<a-button class="ml-2" shape="circle" size="small" @click="$refs['mdl-ce-value-store'].show()">

									<GeneralIcon type="plus" />

								</a-button>

							</e-row>

						</template>

						<template #renderItem="ent">

							<a-list-item class="li-xxs">
								
								<e-row jc="sb">

									<span style="font-size: 12px;">{{ ent.key }}: {{ maxLen(ent.value, 15) }}</span>

									<a-button class="ml-2" shape="circle" size="small" @click="$refs['mdl-ce-value-store'].show(ent)">

										<GeneralIcon type="edit-sm" />

									</a-button>

								</e-row>
							
							</a-list-item>

						</template>
						
					</a-list>

				</e-col>

				<e-col class="val-vals-cont" v-show="bottomActiveKey == 'vaults'" e-scroll>

					<a-list size="small" bordered :data-source="valtesFlt">

						<template #header>

							<e-row jc="sb">

								<a-input
									style="padding: 2px 5px; height:23px; min-height: 10px;"
									:placeholder="tr('search-vaults')"
									v-model:value="filterVaults"
								/>

								<a-button class="ml-2" shape="circle" size="small" @click="$refs['mdl-ce-vault'].show()">

									<GeneralIcon type="plus" />

								</a-button>

							</e-row>

						</template>

						<template #renderItem="ent">

							<a-list-item class="li-xxs">
								
								<e-row jc="sb">

									{{ ent.name }}

									<a-button class="ml-2" shape="circle" size="small" @click="$refs['mdl-ce-vault'].show(ent)">

										<GeneralIcon type="edit-sm" />

									</a-button>

								</e-row>
							
							</a-list-item>

						</template>

					</a-list>

				</e-col>

			</e-col>

		</template>

		<template v-else>

			<e-row ai="fs">

				<div
					class="mt-1 pt-2 pl-2 hoverable aem-back-btn"
					@click="$router.push(`/${currentProject}/advanced-edit`)"
				>
					<GeneralIcon type="back-db" />

					<span class="pl-1 txt">{{ tr('advanced-edit') }}</span>

				</div>

			</e-row>

		</template>

	</e-col>

	<ValueStoreCreateEditModal ref="mdl-ce-value-store" />

	<VaultCreateEditModal ref="mdl-ce-vault" />

	<ServiceConfigurableCreateEditModal ref="mdl-service-configurables" />

	<RoleCreateEditModal ref="mdl-roles" />

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState('project', {
			values: (state) => state['value-store'].entities,
			vaults: (state) => state['vault'].entities,
			roles: (state) => state.roles.entities,
			scEmailTpls: (state) => state['service-configurables'].entities.filter((tpl) => tpl.type == 'email'),
			scRenderTpls: (state) => state['service-configurables'].entities.filter((tpl) => {
				return tpl.type == 'render-template';
			}),
		}),
		isEntityRoute() {
			return /\/entity/.test(this.$route.path);
		},
		scEmailsP() {
			return this.scEmailTpls.filter((val) => {
				return new RegExp(this.filterScEmailTpls).test(val.name.toLowerCase());
			});
		},
		scTemplatesP() {
			return this.scRenderTpls.filter((val) => {
				return new RegExp(this.scRenderTpls).test(val.name.toLowerCase());
			});
		},
		rolesFlt() {
			return this.roles.filter((val) => {
				return new RegExp(this.filterRoles).test(val.role.toLowerCase());
			});
		},
		valuesFlt() {
			return this.values.filter((val) => {
				return new RegExp(this.filterValues).test(`${val.key.toLowerCase()} ${val.value.toLowerCase()}`);
			});
		},
		valtesFlt() {
			return this.vaults.filter((val) => {
				return new RegExp(this.filterVaults).test(val.name.toLowerCase());
			});
		},
	},
	data() {
		return {
			topActiveKey: 'sc-email-templates',
			middleActiveKey: 'roles',
			bottomActiveKey: 'values',
			filterScEmailTpls: '',
			filterScRenderTpls: '',
			filterRoles: '',
			filterValues: '',
			filterVaults: '',
		}
	}
}
</script>
	