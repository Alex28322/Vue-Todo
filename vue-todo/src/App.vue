<script setup>
import {ref, onMounted, watch} from "vue";
import AppIcon from "./assets/App-icon.svg";
import EditIcon from "./assets/edit-svg.svg";

const allTodos = ref([])
const todo = ref("")
const editingId = ref(null)
const editingText = ref("")


function addTodo(){
  if (todo.value.trim() !== ""){
    allTodos.value.push({
      id: Date.now(),
      text: todo.value
    })
    todo.value = ""
  }
}
function deleteTodo(id){
  allTodos.value=allTodos.value.filter( item => item.id !== id)
}
onMounted(() => {
  const saved = localStorage.getItem("todos");
  if (saved) {
    allTodos.value = JSON.parse(saved)
  } 
})
function startEditing(todo) {
  editingId.value = todo.id
  editingText.value = todo.text

}

/* ---------------- SAVE EDIT ---------------- */

function saveEdit(id) {
  const todo = allTodos.value.find(t => t.id === id)

  if (todo && editingText.value.trim()) {
    todo.text = editingText.value
  }

  cancelEdit()
}

/* ---------------- CANCEL ---------------- */

function cancelEdit() {
  editingId.value = null
  editingText.value = ""
}


watch (allTodos, (newValue) => {
localStorage.setItem("todos", JSON.stringify(newValue))
}, {deep: true})
</script>

<template>
<div class="wrapper">
  <header class="header">
    <a class="header-logo" href="#">
      <img :src="AppIcon" alt="Todo logo" class="header-logo-img">
    </a>
    </header>
      <h1 class="title__todo">Todo App</h1>
    <form @submit.prevent="addTodo" class="input-box">
    <input class="title__todo-input" v-model="todo" type="text" name="input__todo" id="input__todo" autocomplete="off" placeholder="Whats your task?">
    <button class="add__button">Add</button>
    </form>
    <ul class="list__todo">
      <li v-for="(todo) in allTodos" :key="todo.id" class="list__todo-item">
        <div v-if="editingId !== todo.id" class="list__todo-text">
          {{todo.text}}
          </div>
          <input
          class="list__todo-changeInput"
  v-if="editingId === todo.id"
  v-model="editingText"
  @blur="saveEdit(todo.id)"
  @keyup.enter="saveEdit(todo.id)"
  @keyup.esc="cancelEdit"
/>
<div class="list__todo-buttonBox">        
<button v-if="editingId !== todo.id" @click="startEditing(todo)">
  <img :src="EditIcon" alt="Edit" class="list__todo-changebuttoImg"> 
</button>
  <template v-else>
    <button @click="saveEdit(todo.id)">Save</button>
    <button @click="cancelEdit">Cancel</button>
  </template>
        <button @click="deleteTodo(todo.id)" class="list__todo-button">X</button>
      </div>
      </li>
    </ul>
</div>
</template>

<style scoped>
.header{
  display: flex;
  justify-content: left;
}
.header-logo-img{
  width: 100px;
  height: auto;
}
.title__todo{
  font-size: 36px;
  margin: 48px;
}
.input-box{
  display: flex;
  align-items: center;
  justify-content: center;
}
.list__todo{
display: flex;
flex-wrap: wrap;
justify-content: center;
}
.list__todo-button{
  padding: 16px;
  margin-left: 16px;
}
.title__todo-input{
  width: 70%;
}
.list__todo-changebuttoImg{
  width: 24px;
  height: 24px;
}
.list__todo-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  width: 76%;
  padding-left: 16px;
}
.list__todo-changeInput{
  background-color: transparent;
}
.list__todo-buttonBox{
  display: flex;
}
</style>
