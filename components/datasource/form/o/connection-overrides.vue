<template>
<div>

    <e-col>

        <div>

            <h4 
                class="pr-3"
                non-sel 
                v-html="tr('connection-settings-override-notice')"
            ></h4>

        </div>

        <slot name="topBefore"></slot>

        <EFormSelect
            class="mt-5 mr-2"
            :name="tr('logger')"
            :placeholder="tr('select-a-logger')"
            keyProp="id"
            valueProp="name"
            :selectFirstByDefault="true"
            :toolTipText="tr('logger-choice-help')"
            :options="loggers"
            :value="entI?.metadata?.logger"
            @input="sep({ key: 'metadata', value: {
                    ...(entI?.metadata ?? {}),
                    logger: $event
                }
            })"
            v-if="!isLogger && !hideLogger"
        />

        <EFormSelect
            class="mt-2 mr-2"
            :name="tr('requires-authentication-qu')"
            :placeholder="tr('select-an-authenticator')"
            keyProp="id"
            valueProp="name"
            :options="authenticators"
            :disabled="authenticators.length == 0"
            :toolTipText="authenticators.length == 0 ? tr('no-authenticators-available-yet') : ''"
            :value="entI?.metadata?.authenticator"
            @input="sep({ key: 'metadata', value: {
                    ...(entI?.metadata ?? {}),
                    authenticator: $event
                }
            })"
            v-if="!hideAuth"
        />

        <e-col class="pr-2" v-if="isWebsocketType">

            <EText 
                :text="tr('connection')"
                :helpText="tr('ws-connection-help')"
            />

            <EFormVariableLogic
                clss="pl-2.5"
                src="connection-overrides"
                :hideInput="true"
                mdlKey="connectionId"
                :store="{
                    setter: sep,
                    key: 'metadata',
                }"
                :obj="entI?.metadata ?? {}"
            />

        </e-col>

        <e-row clss="mt-2" v-if="!hideProtocals">

            <e-col jc="sb" :span="2">

                <EText 
                    :text="tr('is-secure')"
                    :helpText="tr('is-secure-help')"
                />

                <e-row>

                    <EFormCheckBox
                        class="mr-5"
                        :inlineOver="true"
                        inlineLabelStyle="margin-left: 8px;"
                        name="run-asynchronous"
                        :placeholder="tr('production')"
                        :trueValue="true"
                        :defaultValue="false"
                        :reverseLayout="true"
                        :value="entI?.metadata?.secure"
                        @input="sep({ key: 'metadata', value: {
                                ...(entI?.metadata ?? {}),
                                secure: $event
                            }
                        })"
                    />

                    <!-- <EFormCheckBox
                        :inlineOver="true"
                        inlineLabelStyle="margin-left: 8px;"
                        name="run-asynchronous"
                        :placeholder="tr('production')"
                        :trueValue="true"
                        :defaultValue="false"
                        :reverseLayout="true"
                        :value="entI?.metadata?.secure"
                        @input="sep({ key: 'metadata', value: {
                                ...(entI?.metadata ?? {}),
                                secure: $event
                            }
                        })"
                    /> -->

                </e-row>

            </e-col>

            <e-col :span="2" jc="fe">

                <EFormCheckBox
                    :inlineOver="true"
                    inlineLabelStyle="margin-left: 8px;"
                    name="run-asynchronous"
                    :placeholder="tr('development')"
                    :trueValue="true"
                    :defaultValue="false"
                    :reverseLayout="true"
                    :value="entI?.metadata?.devIsSecure"
                    @input="sep({ key: 'metadata', value: {
                            ...(entI?.metadata ?? {}),
                            devIsSecure: $event
                        }
                    })"
                    v-if="isWebsocketType"
                />

            </e-col>

        </e-row>

        <e-row v-if="!hideProtocals">

            <e-row w-25 ai="c">

                <h3>{{ tr('protocol') }}:</h3>
                
                <span class="pl-2" v-if="!hideDefaults">
                    
                    {{ connection?.metadata?.protocol }}
                
                </span>

            </e-row>

            <e-col w-75>

                <EFormInput
                    class="mt-5 pr-2"
                    :name="tr('protocol')"
                    :placeholder="tr('input-a-protocol')"
                    :inlineOver="true"
                    :value="entI?.metadata?.protocol"
                    @input="sep({ key: 'metadata', value: {
                            ...(entI?.metadata ?? {}),
                            protocol: $event
                        }
                    })"
                />

            </e-col>

        </e-row>

        <e-row v-if="!hideProtocals">

            <e-row w-25 ai="c">

                <h3>{{ tr('secure-protocol') }}:</h3>
                
                <span class="pl-2"  v-if="!hideDefaults">
                    
                    {{ connection?.metadata?.secureProtocol }}
                
                </span>

            </e-row>

            <e-col w-75>

                <EFormInput
                    class="mt-5 pr-2"
                    :name="tr('secure-protocol')"
                    :placeholder="tr('input-a-secure-protocol')"
                    :inlineOver="true"
                    :value="entI?.metadata?.secureProtocol"
                    @input="sep({ key: 'metadata', value: {
                            ...(entI?.metadata ?? {}),
                            secureProtocol: $event
                        }
                    })"
                />

            </e-col>

        </e-row>

        <e-row>

            <e-row w-25 ai="c">

                <h3>{{ tr('host') }}:</h3>
                
                <span class="pl-2" v-if="!hideDefaults">
                    
                    {{ connection?.metadata?.host }}
                
                </span>

            </e-row>

            <e-col w-75>

                <EFormInput
                    class="mt-5 pr-2"
                    :name="tr('host')"
                    :placeholder="tr('input-a-host')"
                    :inlineOver="true"
                    :value="entI?.metadata?.host"
                    @input="sep({ key: 'metadata', value: {
                            ...(entI?.metadata ?? {}),
                            host: $event
                        }
                    })"
                />

            </e-col>

        </e-row>

        <!-- <e-row>

            <e-row w-25 ai="c">

                <h3>{{ tr('localhost') }}:</h3>
                
                <span class="pl-2"  v-if="!hideDefaults">
                    
                    {{ connection?.metadata?.localhost }}
                
                </span>

            </e-row>

            <e-col w-75>

                <EFormInput
                    class="mt-5 pr-2"
                    :name="tr('localhost')"
                    :placeholder="tr('input-a-localhost')"
                    :inlineOver="true"
                    :value="entI?.metadata?.localhost"
                    @input="sep({ key: 'metadata', value: {
                            ...(entI?.metadata ?? {}),
                            localhost: $event
                        }
                    })"
                />

            </e-col>

        </e-row>

        <e-row>

            <e-row w-25 ai="c">

                <h3>{{ tr('ip-address') }}:</h3>
                
                <span class="pl-2"  v-if="!hideDefaults">
                    
                    {{ connection?.metadata?.ip }}
                
                </span>

            </e-row>

            <e-col w-75>

                <EFormInput
                    class="mt-5 pr-2"
                    :name="tr('ip')"
                    :placeholder="tr('input-a-ip-address')"
                    :inlineOver="true"
                    :value="entI?.metadata?.ip"
                    @input="sep({ key: 'metadata', value: {
                            ...(entI?.metadata ?? {}),
                            ip: $event
                        }
                    })"
                />

            </e-col>

        </e-row> -->

        <e-row v-if="!hidePort">

            <e-row w-25 ai="c">

                <h3>{{ tr('port') }}:</h3>
                
                <span class="pl-2"  v-if="!hideDefaults">
                    
                    {{ connection?.metadata?.port }}

                </span>

            </e-row>

            <e-col w-75>

                <EFormInput
                    class="mt-5 mr-2"
                    :name="tr('port')"
                    :placeholder="tr('input-a-port')"
                    castTo="number"
                    :inlineOver="true"
                    :minRange="1024"
                    :value="entI?.metadata?.port"
                    @input="sep({ key: 'metadata', value: {
                            ...(entI?.metadata ?? {}),
                            port: $event
                        }
                    })"
                />

            </e-col>

        </e-row>

        <e-row v-if="!hideHealthCheck">

            <e-row w-25 ai="c">

                <h3>{{ tr('health-check-port') }}:</h3>
                
                <span class="pl-2"  v-if="!hideDefaults">
                    
                    {{ connection?.metadata?.healthCheckPort }}

                </span>

            </e-row>

            <e-col w-75>

                <EFormInput
                    class="mt-5 mr-2"
                    :name="tr('port')"
                    :placeholder="tr('input-a-port')"
                    castTo="number"
                    :inlineOver="true"
                    :minRange="1024"
                    :value="entI?.metadata?.healthCheckPort"
                    @input="sep({ key: 'metadata', value: {
                            ...(entI?.metadata ?? {}),
                            healthCheckPort: $event
                        }
                    })"
                />

            </e-col>

        </e-row>

        <e-row v-if="!hidePath">

            <e-row w-25 ai="c">

                <h3>{{ tr('path') }}:</h3>
                
                <span class="pl-2"  v-if="!hideDefaults">
                    
                    {{ connection?.metadata?.path }}

                </span>

            </e-row>

            <e-col w-75>

                <EFormInput
                    class="mt-5 mr-2"
                    :name="tr('path')"
                    :placeholder="tr('input-a-path')"
                    castTo="website-path"
                    addonBefore="/"
                    :inlineOver="true"
                    :value="(entI?.metadata?.path ?? '').replace(/^\//, '')"
                    @input="sep({ key: 'metadata', value: {
                            ...(entI?.metadata ?? {}),
                            path: $event != '' ? `/${$event.replace(/^\//, '')}` : ''
                        }
                    })"
                />

            </e-col>

        </e-row>

    </e-col>

</div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapState, mapMutations } from 'vuex';

export default {
    props: {
        isLogger: {
            type: Boolean,
            default: false,
        },
        hideLogger: Boolean,
        connection: {
            type: Object,
            required: false,
        },
        hidePort: Boolean,
        hideProtocals: Boolean,
        hidePath: Boolean,
        hideHealthCheck: Boolean,
        hideDefaults: Boolean,
        hideAuth: Boolean,
        setEntityProp: Function,
        entity: Object,
    },
    computed: {
        ...mapState('project/data-sources', {
            ent: (state) => state.entity,
        }),
        ...mapGetters('project', {
            loggers: 'connections/loggers',
            authenticators: 'service-groups/authenticators',
        }),
        type() {
            return this?.entI?.type ?? '';
        },
        isWebsocketType() {return this.type == 'ws-service'},
        entI() {return typeof this.entity == 'object' ? this.entity : this.ent},
        sep() {
            return typeof this.setEntityProp == 'function' ? this.setEntityProp : this.setEntityPropI;
        }
    },
    methods: {
        ...mapMutations({
            setEntityPropI: 'project/data-sources/setEntityProp',
        }),
    }
}
</script>