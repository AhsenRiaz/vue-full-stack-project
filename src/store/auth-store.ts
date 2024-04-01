import { defineStore } from 'pinia'
import type { User } from '@/types'
import { getLocalStorageData } from '@/lib/utils'
import { registerService } from '@/service/auth/register-service'
import { loginService } from '@/service/auth/login-service'

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        user: getLocalStorageData<User | null>('currentUserContent', true)
    }),

    actions: {
        async register(form: Record<string, string>) {
            console.log("form", form)
            try {
                await registerService(form)
            } catch (error) {
                console.error(error)
            }
        },

        async login(form: Record<string, string>) {
            try {
                const data = await loginService(form)
                if (data) {
                    this.user = data.user
                    localStorage.setItem('currentUserContent', JSON.stringify(data.user));
                    localStorage.setItem('currentAuthTokens', JSON.stringify({
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken
                    }));
                    return true
                }
            } catch (error) {
                console.error(error)
                return false
            }
        }
    }
})