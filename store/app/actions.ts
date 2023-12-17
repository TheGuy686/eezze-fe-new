import { serializeUrl } from '../../classes/libs/string';
import { project, general } from '../../consts/Endpoints';

export default {
    async deleteAllNotifications (stateArgs: any, params: any = {}) {
        stateArgs.commit('setIsDeleteingAllNotificationsRequest', true);

        let error, notifications: any[] = [];

        try {
            await (this as any).$axios.$delete(general.notifications);
        }
        catch (e: any) {
            error = e.message;
            stateArgs.commit('setIsDeleteingAllNotificationsRequest', false);
        }

        if (!error) {
            stateArgs.commit('setNotifications', []);

            if (typeof params['successCb'] == 'function') {
                await params['successCb'](notifications);
            }
        }
        else {
            await params['errorFallback'](notifications);
        }

        stateArgs.commit('setIsDeleteingAllNotificationsRequest', false);

        if (error) throw error;
    },
    async markAllNotificationsAsRead (stateArgs: any, params: any = {}) {
        stateArgs.commit('setIsMarkingAllNotificationsAsReadRequest', true);

        let error, notifications: any[] = [];

        try {
            await (this as any).$axios.$put(general.notifications);
            notifications = await (this as any).$axios.$get(general.notifications);
        }
        catch (e: any) {
            error = e.message;
            stateArgs.commit('setIsMarkingAllNotificationsAsReadRequest', false);
        }

        if (!error) {
            stateArgs.commit('setNotifications', Object.values(notifications).reverse());

            if (typeof params['successCb'] == 'function') {
                await params['successCb'](notifications);
            }
        }
        else {
            await params['errorFallback'](notifications);
        }

        stateArgs.commit('setIsMarkingAllNotificationsAsReadRequest', false);

        if (error) throw error;
    },
    async getNotifications (stateArgs: any, params: any = {}) {
        stateArgs.commit('setIsGettingNotifications', true);

        let error, notifications: any[] = [];

        try {
            notifications = await (this as any).$axios.$get(general.notifications);
        }
        catch (e: any) {
            error = e.message;
            stateArgs.commit('setIsGettingNotifications', false);
        }

        if (!error) {
            stateArgs.commit('setNotifications', Object.values(notifications).reverse());

            if (typeof params['successCb'] == 'function') {
                await params['successCb'](notifications);
            }
        }
        else {
            await params['errorFallback'](notifications);
        }

        stateArgs.commit('setIsGettingNotifications', false);

        if (error) throw error;
    },
    async getProjectStats (stateArgs: any, selectedProject: any) {
        stateArgs.commit('setIsGettingProjectStats', true);

        try {
            let stats = await (this as any).$axios.$get(serializeUrl(
                project.stats,
                '',
                {
                    projectId: selectedProject
                }
            ));

            if (Object.keys(stats).length == 0) {
                throw `There was no stats for this project`;
            }

            stateArgs.commit('setProjectStats', stats);

            setTimeout(() => stateArgs.commit('setIsGettingProjectStats', false), 700);

            return stats;
        }
        catch (e: any) {
            setTimeout(() => stateArgs.commit('setIsGettingProjectStats', false), 700);
            throw {
                response: {
                    data:{
                        error: e.message || e,
                    }
                }
            };
        }
    },
    async sendUserNotification(stateArgs: any, notification: any) {
        stateArgs.commit('setIsGettingNotifications', true);

        let error, res: any;

        const self: any = this;

        try {
            res = await self.$axios.$post(
                general.createNotification, 
                {
                    userId: notification.userId,
                    type: notification.type,
                    title: notification.title,
                    message: notification.message,
                }
            );
        }
        catch (e: any) {error = e.message}

        stateArgs.commit('setIsGettingNotifications', false);

        if (error) throw error;
    },
    async getStoreMenu (stateArgs: any, params: any = {}) {
        stateArgs.commit('setIsGettingStoreMenu', true);

        let error, storeMenu: any[] = [];

        try {
            storeMenu = await (this as any).$axios.$get(general.app.menu);
        }
        catch (e: any) {
            error = e.message;
            stateArgs.commit('setIsGettingStoreMenu', false);
        }

        if (!error) {
            stateArgs.commit('setStoreMenu', storeMenu);
        }

        stateArgs.commit('setIsGettingStoreMenu', false);

        if (error) throw error;
    },
    async getCategoryModules (stateArgs: any, params: any = {}) {
        if (typeof params['category'] == 'undefined') {
            console.log('Category needs to be set');
            return;
        }
        if (typeof params['subcategory'] == 'undefined') {
            console.log('Subcategory needs to be set');
            return;
        }

        stateArgs.commit('setShowSearchView', false);
        stateArgs.commit('setIsGettingModules', true);

        let error, filteredModules: any[] = [];

        try {
            const url = `${general.app.menuCategoryModules}?category=${params.category}&subcategory=${params.subcategory}`;
            filteredModules = await (this as any).$axios.$get(url);
        }
        catch (e: any) {
            error = e.message;
            stateArgs.commit('setIsGettingModules', false);
        }

        if (!error) {
            stateArgs.commit('setCategoryModules', filteredModules.reverse());
        }

        stateArgs.commit('setIsGettingModules', false);

        if (error) throw error;
    },
    async searchStore (stateArgs: any) {
        stateArgs.commit('setShowSearchView', true);
        stateArgs.commit('setIsGettingModules', true);

        let error, filteredModules: any[] = [];

        try {
            const url = `${general.app.searchStore}?term=${stateArgs.state.storeSearch}`;
            filteredModules = await (this as any).$axios.$get(url);
        }
        catch (e: any) {
            error = e.message;
            stateArgs.commit('setIsGettingModules', false);
        }

        if (!error) {
            stateArgs.commit('setCategoryModules', filteredModules.reverse());
        }

        stateArgs.commit('setIsGettingModules', false);

        if (error) throw error;
    },
    async sendFeedback(stateArgs: any, params: any) {
        stateArgs.commit('setIsSendingFeedback', true);

        let error, res: any;

        const self: any = this;

        try {
            res = await self.$axios.$post(
                general.app.sendFeedback, 
                {
                    subject: params.subject,
                    message: params.message,
                }
            );

            if (typeof params['successCb'] == 'function') params['successCb']();
        }
        catch (e: any) {error = e.message}

        stateArgs.commit('setIsSendingFeedback', false);
    },
    async getStoreDependancies(stateArgs: any, params: any) {
        stateArgs.commit('setIsSendingFeedback', true);

        let error;

        const self: any = this;

        try {
            const url = `${general.app.storeDependancies}?storeId=${params?.storeId}`;
            const res = await (this as any).$axios.$get(url);

            if (typeof params['successCb'] == 'function') params['successCb'](res);
        }
        catch (e: any) {error = e.message}

        stateArgs.commit('setIsSendingFeedback', false);
    }
};