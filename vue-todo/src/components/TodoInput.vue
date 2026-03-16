<script setup>
import { ref } from "vue"

const emit = defineEmits(["add-todo"])

const text = ref("")

function submitTodo(){

if(text.value.trim()){

emit("add-todo", text.value)

text.value=""

}

}

</script>

<template>

<form @submit.prevent="submitTodo">

<input
v-model="text"
placeholder="Add a task"
/>

<button>Add</button>

</form>

</template>