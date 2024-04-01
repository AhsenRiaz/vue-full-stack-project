import { APIResponse, User } from "@/types";
import axios from '@/plugins/axios'

export async function loginService(form: Record<string, string>) {
    try {
        const { data: { data } } = await axios.post<APIResponse<{ user: User, accessToken: string, refreshToken: string }>>('/users/login', {
            ...form
        })

        return data
    } catch (error) {
        console.error("Error while login", error);
    }
}