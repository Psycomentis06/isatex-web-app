<script setup>
import AppConfig from '@/layout/AppConfig.vue';
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img src="/demo/images/notfound/logo-blue.svg" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                    <span class="text-blue-500 font-bold text-3xl">404</span>
                    <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">Not Found</h1>
                    <div class="text-600 mb-5">Requested resource is not available.</div>
                    <router-link to="/" class="w-full flex align-items-center py-5 border-300 border-bottom-1">
                        <span class="flex justify-content-center align-items-center bg-cyan-400 border-round" style="height: 3.5rem; width: 3.5rem">
                            <i class="text-50 pi pi-fw pi-table text-2xl"></i>
                        </span>
                        <span class="ml-4 flex flex-column">
                            <span class="text-900 lg:text-xl font-medium mb-0 block">Home</span>
                            <span class="text-600 lg:text-xl">Go back to dashboard/home page</span>
                        </span>
                    </router-link>
                    <router-link to="/auth/login" class="w-full flex align-items-center py-5 border-300 border-bottom-1">
                        <span class="flex justify-content-center align-items-center bg-orange-400 border-round" style="height: 3.5rem; width: 3.5rem">
                            <i class="pi pi-fw pi-question-circle text-50 text-2xl"></i>
                        </span>
                        <span class="ml-4 flex flex-column">
                            <span class="text-900 lg:text-xl font-medium mb-0">Login</span>
                            <span class="text-600 lg:text-xl">If you are not logged in you have to login first</span>
                        </span>
                    </router-link>
                    <router-link to="/" class="w-full flex align-items-center mb-5 py-5 border-300 border-bottom-1">
                        <span class="flex justify-content-center align-items-center bg-indigo-400 border-round" style="height: 3.5rem; width: 3.5rem">
                            <i class="pi pi-fw pi-unlock text-50 text-2xl"></i>
                        </span>
                        <span class="ml-4 flex flex-column">
                            <span class="text-900 lg:text-xl font-medium mb-0">Missing Permissions</span>
                            <span class="text-600 lg:text-xl">Maybe you don't have the permission to access this route</span>
                        </span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>
