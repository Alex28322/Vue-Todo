<script setup>
import TodoItem from "./TodoItem.vue"

const props = defineProps({
  todos: Array
})

const emit = defineEmits([
  "delete-todo",
  "update-todo"
])
</script>

<template>

<ul>

<TodoItem
v-for="todo in todos"
:key="todo.id"
:todo="todo"
@delete="emit('delete-todo', todo.id)"
@update="(text)=>emit('update-todo', todo.id, text)"
/>

</ul>

</template>

<style>
ul{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
}
</style>
