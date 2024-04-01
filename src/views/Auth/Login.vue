<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import router from '@/router';
import { useAuthStore } from '@/store/auth-store';
import { ref } from 'vue';


type PAYLOAD = {
    password: string;
    username: string;
};
const form = ref<PAYLOAD>({
    password: '',
    username: '',
});

const store = useAuthStore();

const onSubmit = async () => {
    try {
        const success = await store.login(form.value);
        if (success) {
            router.push('/')

        }
    } catch (error) {
        console.error("Error while registering user", error)
    }
}

</script>

<template>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <div class="mx-auto w-full max-w-md">
            <form @submit.prevent="onSubmit">
                <Card class="overflow-y-auto">
                    <CardHeader class="space-y-1">
                        <CardTitle class="text-2xl"> Welcom Back </CardTitle>
                        <CardDescription> Enter your details below to login </CardDescription>
                    </CardHeader>
                    <CardContent class="grid gap-4">
                        <div class="grid gap-2">
                            <Label for="username">Username</Label>
                            <Input id="username" type="text" placeholder="username" v-model="form.username" />
                        </div>
                        <div class="grid gap-2">
                            <Label for="password">Password</Label>
                            <Input id="password" placeholder="password" type="password" v-model="form.password" />
                        </div>
                    </CardContent>
                    <CardFooter class="flex-col space-y-2">
                        <Button class="w-full" type="submit"> Login </Button>
                        <p>
                            Don't have an account?
                            <RouterLink to="/auth/register"
                                class="border-b border-gray-500 text-muted-foreground hover:text-primary">
                                Register
                            </RouterLink>
                        </p>
                    </CardFooter>
                </Card>
            </form>
        </div>
    </div>
</template>
