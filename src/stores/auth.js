import { defineStore } from 'pinia'
import isEmpty from 'lodash-es/isEmpty';
export const authStore = defineStore('authUser', {
    state: () => ({
        profile: {},
        token: null,
    }),
    getters: {
        isAuth(state) {
            return !isEmpty(state.token);
        },
    },
    actions: {
    }
})
