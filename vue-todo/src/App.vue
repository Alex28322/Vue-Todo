<script setup>
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Todo</router-link>
      |
      <router-link to="/hello">Hello</router-link>
    </nav>
  </header>

  <router-view />
</template>

<style>
body{
  margin:0;
  font-family: sans-serif;
}
</style>