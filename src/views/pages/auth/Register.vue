<script setup>
import AuthService from '../../../service/AuthService'
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import AppConfig from '@/layout/AppConfig.vue';
import RegisterInputText  from './components/InputText.vue';
import { useToast } from 'primevue/usetoast';

const showMessageBox = ref(false);
const count = ref(0);
const message = ref({})
const toast = useToast();
const authService = new AuthService()
const { layoutConfig, contextPath } = useLayout();
const firstName = ref('')
const firstNameFeedBack = ref([])
const lastName = ref('')
const lastNameFeedBack = ref([])
const username = ref('')
const usernameFeedBack = ref([])
const email = ref('')
const emailFeedBack = ref([])
const password = ref('')
const passwordFeedBack = ref([])
const enterpriseName = ref('')
const enterpriseNameFeedBack = ref([])
const enterpriseAddress = ref('')
const enterpriseAddressFeedBack = ref([])
const enterprisePhone = ref('')
const enterprisePhoneFeedBack = ref([])
const city = ref('')
const cityFeedBack = ref([])
const address = ref('');
const addressFeedBack = ref([])
const country = ref('');
const countryFeedBack = ref([])

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

const openSuccessToast = (content) => {
    toast.add({ severity: 'success', summary: 'Account Created Successfully', detail: content, life: 10000 });
}

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
    authService.createCustomer(customer)
        .then(res => {
            if (res.status === 200) {
                openSuccessToast(res.data.message);
            } else {
                addMessage('error', res.response.data.message);
            }
        })
        .catch(err => {
            // constrains
            const constraints = err.response.data?.constraints;
            if (constraints?.email) {
                emailFeedBack.value.push(constraints.email)
            }
            if (constraints?.username) {
                usernameFeedBack.value.push(constraints.username)
            }
            if (constraints?.password) {
                passwordFeedBack.value.push(constraints.password)
            }
            // Other errors
            const errMsg = err.response.data?.message
            if (errMsg) {
                addMessage('error', errMsg);
            }
        })
}

const usernameHandler = (val) => {
    username.value = val
}
const emailHandler = val => {
    email.value = val
}

const firstNameHandler = val => {
    firstName.value = val
}
const lastNameHandler = val => {
    lastName.value = val
}
const cityHandler = val => {
    city.value = val
}
const countryHandler = val => {
    country.value = val
}
const addressHandler = val => {
    address.value = val
}
const enterpriseNameHandler = val => {
    enterpriseName.value = val
}
const enterpriseAddressHandler = val => {
    enterpriseAddress.value = val
}
const enterprisePhoneHandler = val => {
    enterprisePhone.value = val
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
                            <RegisterInputText @changed="firstNameHandler" alias="firstName" placeholder="Your first name" input-label="First Name" :input-feedback="firstNameFeedBack" />
                        </div>
                        <div class="field col">
                            <RegisterInputText @changed="lastNameHandler" alias="lastName" placeholder="Your last name" input-label="Last Name" :input-feedback="lastNameFeedBack" />
                        </div>
                    </div>
                    <RegisterInputText @changed="usernameHandler" required alias="username" placeholder="Enter Your username" input-label="Username" :input-feedback="usernameFeedBack" />
                    <RegisterInputText @changed="emailHandler" required alias="email" placeholder="Your Email address" input-label="Email" :input-feedback="emailFeedBack" />
                    
                    <label for="password" class="block text-900 font-medium text-xl mb-2">Password<i
                            style="color:red;">*</i></label>
                    <Password id="password" v-model="password" placeholder="Password" :toggleMask="true"
                        :class="'w-full  mb-5' + (passwordFeedBack.length > 0 ? ' p-invalid ' : '')" inputClass="w-full" inputStyle="padding:1rem"></Password>
                        <div v-for="fb of passwordFeedBack">
                            <small id="password-help" class="p-error">{{fb}}</small>
                        </div>

                    <RegisterInputText @changed="cityHandler" alias="city" placeholder="City" input-label="City" :input-feedback="cityFeedBack" />
                    <RegisterInputText @changed="countryHandler" alias="country" placeholder="Country" input-label="Country" :input-feedback="countryFeedBack" />
                    <RegisterInputText @changed="addressHandler" alias="address" placeholder="Address" input-label="Address" :input-feedback="addressFeedBack" />
                    <RegisterInputText @changed="enterpriseNameHandler" alias="company-name" placeholder="Your company's name" input-label="Company Name" :input-feedback="enterpriseNameFeedBack" />
                    <RegisterInputText @changed="enterpriseAddressHandler" alias="company-address" placeholder="Your company's address" input-label="Company Address" :input-feedback="enterpriseAddressFeedBack" />
                    <RegisterInputText @changed="enterprisePhoneHandler" alias="company-phone" placeholder="Your company's phone number" input-label="Company Phone" :input-feedback="enterprisePhoneFeedBack" />


                        <transition-group name="p-message" tag="div" v-if="showMessageBox" >
                            <Message @close="showMessageBox = false" :severity="message.severity" :key="message.content">{{ message.content }}</Message>
                        </transition-group>
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
    <Toast />
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