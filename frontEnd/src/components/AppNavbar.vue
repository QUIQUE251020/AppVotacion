<template>
  <nav class="navbar  navbar-dark bg-dark">
        <div class="text-center">
          <h1 class="navbar-brand m-3 display-4">VoteContent</h1>
        </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  methods: {
    openCreateModal() {
      this.$emit('show-create-modal');
    }
  }
}
</script>
<style scoped>
/* Puedes añadir estilos personalizados aquí si es necesario */
</style>
