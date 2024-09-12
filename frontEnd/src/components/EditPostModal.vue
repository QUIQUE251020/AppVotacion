<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Publicación</h5>
          <button type="button" class="close" @click="$emit('close')">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="title">Título</label>
            <input v-model="updatedPost.title" class="form-control" />
          </div>
          <div class="form-group">
            <label for="content">Contenido</label>
            <textarea v-model="updatedPost.content" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label for="author">Autor</label>
            <input v-model="updatedPost.author" class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="updatePost">Guardar Cambios</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  props: ['post'],
  data() {
    return {
      updatedPost: { ...this.post }
    };
  },
  methods: {
    async updatePost() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/posts/${this.updatedPost.id}/edit/`, this.updatedPost);
        this.$emit('postUpdated');
        this.$emit('close');
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  }
};
</script>
