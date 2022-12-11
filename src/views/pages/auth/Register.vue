<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import AppConfig from '@/layout/AppConfig.vue';

const { layoutConfig, contextPath } = useLayout();
const firstName = ref('')
const lastName = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const enterpriseName = ref('')
const enterpriseAddress = ref('')
const enterprisePhone = ref('')
const city = ref('')
const address = ref('');
const country = ref('');

const logoUrl = computed(() => {
    return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});



const createCustomer = () => {
    const customer = {
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        email: email.value,
        password: password.value,
        country: country.value,
        address: address.value,
        city: city.value,
        enterprisePhone: enterprisePhone.value,
        enterpriseAddress: enterpriseAddress.value,
        enterpriseName: enterpriseName.value,
    }

    console.log(customer);
    
}

</script>
<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">

                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <span class="text-900 text-3xl font-medium mb-3">Create a new account</span>
                    </div>
                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="firstName" class="block text-900 text-xl font-medium mb-2">First Name</label>
                            <InputText id="firstName" type="text" placeholder="Your first name" class="w-full  mb-5"
                                style="padding: 1rem" v-model="firstName" />
                        </div>
                        <div class="field col">
                            <label for="lastName" class="block text-900 text-xl font-medium mb-2">Last Name</label>
                            <InputText id="lastName" type="text" placeholder="Your last name" class="w-full  mb-5"
                                style="padding: 1rem" v-model="lastName" />
                        </div>
                    </div>
                    <label for="username" class="block text-900 text-xl font-medium mb-2">Username <i style="color:red;">*</i></label>
                    <InputText required id="username" type="text" placeholder="Username" class="w-full  mb-5"
                        style="padding: 1rem" v-model="username" />

                    <label for="email" class="block text-900 text-xl font-medium mb-2">Email<i style="color:red;">*</i></label>
                    <InputText required id="email" type="text" placeholder="Email address" class="w-full  mb-5"
                        style="padding: 1rem" v-model="email" />

                    <label for="password" class="block text-900 font-medium text-xl mb-2">Password<i style="color:red;">*</i></label>
                    <Password id="password" v-model="password" placeholder="Password" :toggleMask="true"
                        class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>



                    <label for="city" class="block text-900 text-xl font-medium mb-2">City</label>
                    <InputText id="city" type="text" placeholder="City" class="w-full  mb-5" style="padding: 1rem"
                        v-model="city" />

                    <label for="address" class="block text-900 text-xl font-medium mb-2">Address</label>
                    <InputText id="address" type="text" placeholder="Address" class="w-full  mb-5" style="padding: 1rem"
                        v-model="address" />

                    <label for="country" class="block text-900 text-xl font-medium mb-2">Country</label>
                    <InputText id="country" type="text" placeholder="eg. Tunisia" class="w-full  mb-5"
                        style="padding: 1rem" v-model="country" />

                    <label for="companyName" class="block text-900 text-xl font-medium mb-2">Company Name</label>
                    <InputText id="companyName" type="text" placeholder="Your company's name" class="w-full  mb-5"
                        style="padding: 1rem" v-model="enterpriseName" />


                    <label for="companyAddress" class="block text-900 text-xl font-medium mb-2">Company Address</label>
                    <InputText id="companyAddress" type="text" placeholder="Your company's address" class="w-full  mb-5"
                        style="padding: 1rem" v-model="enterpriseAddress" />


                    <label for="companyPhone" class="block text-900 text-xl font-medium mb-2">Company Phone</label>
                    <InputText id="companyPhone" type="text" placeholder="Your company's phone number or fax"
                        class="w-full  mb-5" style="padding: 1rem" v-model="enterprisePhone" />


                    <Button @click="createCustomer()" label="Sign Up" class="w-full p-3 text-xl"></Button>

                    <p class="pt-4">
                        Already have an account login instead
                        <routerLink to="/auth/login" class="font-medium no-underline ml-1 text-right cursor-pointer"
                            style="color: var(--primary-color)">Login</routerLink>
                    </p>
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