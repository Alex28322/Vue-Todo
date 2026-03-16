<script setup>
import { ref } from "vue"

const props = defineProps({
  todo: Object
})

const emit = defineEmits(["delete","update"])

const editing = ref(false)
const editingText = ref("")

function startEdit(){
  editing.value = true
  editingText.value = props.todo.text
}

function saveEdit(){
  emit("update", editingText.value)
  editing.value = false
}

function cancelEdit(){
  editing.value = false
}
</script>

<template>

<li class="list__item">

<div v-if="!editing">
  {{todo.text}}
</div>

<input
v-if="editing"
v-model="editingText"
@keyup.enter="saveEdit"
@keyup.esc="cancelEdit"
/>

<div>

<button v-if="!editing" @click="startEdit">
Edit
</button>

<button v-if="editing" @click="saveEdit">
Save
</button>

<button v-if="editing" @click="cancelEdit">
Cancel
</button>

<button @click="emit('delete')">
X
</button>

</div>

</li>

</template>
<style>
.list__item{
    display: flex;
    width: 70%;
    justify-content: space-between;
}
</style>