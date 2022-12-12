<script setup lang="ts">
import {defineEmits, ref, defineProps, ReactiveEffect, Ref, PropType } from 'vue';
const props = defineProps({
    inputFeedback: {
        type: Object as PropType<Ref<string[]>>,
        required: true
    },
    inputLabel: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    required: {
        type: Boolean,
        required: false,
        default: false
    }
});
defineEmits(['changed'])
const inputVal = ref('')
</script>
<template>
    <div class="mb-5">

    <label :for="alias" class="block text-900 text-xl font-medium mb-2">{{ inputLabel }}
        <i v-if="required" style="color:red;">*</i>
    </label>
    <InputText :id="alias" type="text" :placeholder="placeholder"
        :class="'w-full  ' + (inputFeedback.length > 0 ? ' p-invalid ' : '')" style="padding: 1rem"
        v-model="inputVal" @keyup="$emit('changed', inputVal)" :aria-describedby="alias + '-help'" />
    <div v-for="fb of inputFeedback">
        <small :id="alias + '-help'" class="p-error"> {{ fb }} </small>
    </div>

    </div>
</template>