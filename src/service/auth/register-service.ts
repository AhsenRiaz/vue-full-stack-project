import { APIResponse, User } from "@/types";
import axios from '@/plugins/axios'

export async function registerService(form: Record<string, string>) {
    try {
        const { data } = await axios.post<APIResponse<{ user: User }>>('/users/register', {
            ...form
        })
        console.log("data", data.data)
        return
    } catch (error) {
        console.error("Error while registering", error);
    }
}