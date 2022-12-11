<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import AppConfig from '@/layout/AppConfig.vue';
import AuthService from '../../../service/AuthService';


const authService = new AuthService();
const { layoutConfig, contextPath } = useLayout();
const email = ref('');
const password = ref('');
const checked = ref(false);
const loggedUser = ref({});
const message = ref({});
const showMessageBox = ref(false);
const count = ref(0);

onMounted(() => {
    loggedUser.value = authService.getSavedUsername()
});
const logoUrl = computed(() => {
    return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
const addMessage = (type, content) => {
    showMessageBox.value = true;
    if (!content) content = 'Login failed'
    if (type === 'success') {
        message.value = { severity: 'success', detail: 'Success', content: 'Logged in successfully', id: count.value++ };
    } else if (type === 'error') {
        message.value = { severity: 'error', detail: 'Error', content , id: count.value++ };
    }
};
const login = () => {
    authService.login(email.value, password.value, res => {
        if (res.status === 200) {
            addMessage('success')
        } else {
            addMessage('error')
        }
    }, err => {
        let contentErr = err.response?.data?.message 
        if (contentErr?.length > 20) contentErr.substring(0, 20) + '...'
        addMessage('error', contentErr) 
    }) 
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5" v-if="loggedUser">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, {{loggedUser ?? 'No Name'}}!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email or Username</label>
                        <InputText id="email1" type="text" placeholder="eg, user or user@mail.com" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <routerLink to="/auth/password/forgot" class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</routerLink>
                        </div>

                        <transition-group name="p-message" tag="div" v-if="showMessageBox" >
                            <Message @close="showMessageBox = false" :severity="message.severity" :key="message.content">{{ message.content }}</Message>
                        </transition-group>
                        <Button @click="login()" label="Sign In" class="w-full p-3 text-xl"></Button>
                        <div class="py-5">
                            <p>
                                If you don't have an account you can create one instead 
                            <routerLink to="/auth/register" class="font-medium no-underline ml-1 text-right cursor-pointer" style="color: var(--primary-color)">Create Account</routerLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
