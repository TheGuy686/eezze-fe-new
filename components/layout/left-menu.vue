<template>
<a-layout-sider
    class="fixed shadow left-0 top-0 h-screen"
    :width="value ? 100 : 250"
    :trigger="null" 
    collapsible
    theme="light"
    :value="value"
>
    <span>  

        <img
            :class="mainMenuCollpsed ? 'logo' :'logo-large'"
            src="../../assets/icons/logo.png"
            @click="$router.push({ path: '/' })"
        />

    </span>

    <template v-if="!hideSubmenu">

        <NavigationManagementMenu
            class="sidenav-border-top"
            :sider-collapsed="mainMenuCollpsed"
            v-if="src == 'management'"
        />

        <NavigationCollaborationMenu
            class="sidenav-border-top"
            :sider-collapsed="mainMenuCollpsed"
            v-else-if="src == 'collaboration'"
        />

        <NavigationAdminMenu
            class="sidenav-border-top"
            :sider-collapsed="mainMenuCollpsed"
            v-else-if="src == 'admin'"
        />

        <NavigationUserStoreMenu
            class="sidenav-border-top"
            :sider-collapsed="mainMenuCollpsed"
            v-else-if="src == 'user-store'"
        />

        <NavigationInternalMenu
            class="sidenav-border-top"
            :sider-collapsed="mainMenuCollpsed"
            v-else-if="src == 'internal'"
        />

        <NavigationAdvancedEditMenu
            class="sidenav-border-top"
            :sider-collapsed="mainMenuCollpsed"
            v-else-if="src == 'advanced-edit'"
        />

        <NavigationMainMenu
            class="sidenav-border-top"
            :sider-collapsed="mainMenuCollpsed"
            v-else
        />
        
    </template>

    <NavigationSectionMenu v-if="hasSectionMenu" />

</a-layout-sider>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        hideSubmenu: {
            type: Boolean,
            default: false,
        },
        hasSectionMenu: {
            type: Boolean,
            default: true,
        },
        value: Boolean,
        src: {
            type: String,
            default: 'project'
        },
    },
    computed: {
        ...mapState('app', [ 'mainMenuCollpsed' ]),
    },
    data() {
        return {
            clpsed: true,
        }
    }
}
</script>