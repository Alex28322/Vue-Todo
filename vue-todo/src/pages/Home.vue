<script setup>
import { ref, onMounted, watch } from "vue"

import TodoInput from "../components/TodoInput.vue"
import TodoList from "../components/TodoList.vue"

const allTodos = ref([])

function addTodo(text){
  allTodos.value.push({
    id: Date.now(),
    text
  })
}

function deleteTodo(id){
  allTodos.value = allTodos.value.filter(t => t.id !== id)
}

function updateTodo(id, newText){
  const todo = allTodos.value.find(t => t.id === id)

  if(todo && newText.trim()){
    todo.text = newText
  }
}

onMounted(()=>{
  const saved = localStorage.getItem("todos")

  if(saved){
    allTodos.value = JSON.parse(saved)
  }
})

watch(allTodos,(val)=>{
  localStorage.setItem("todos",JSON.stringify(val))
},{deep:true})
</script>

<template>

<div class="wrapper">

<h1>Todo App</h1>

<TodoInput @add-todo="addTodo"/>

<TodoList
  :todos="allTodos"
  @delete-todo="deleteTodo"
  @update-todo="updateTodo"
/>

</div>

</template>