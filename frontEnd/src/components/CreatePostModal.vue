<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Crear Nueva Publicación</h5>
          <button type="button" class="close" @click="$emit('close')">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="title">Título:</label>
            <input v-model="title" id="title" required type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="content">Contenido:</label>
            <textarea v-model="content" id="content" required  class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label for="author">Autor:</label>
            <input v-model="author" id="author" required type="text" class="form-control">
          </div>
        </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="createPost">Crear Publicación</button>
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
          </div>
        </div>
      </div>
    </div>  
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup(props, { emit }) {
    const title = ref('');
    const content = ref('');
    const author = ref('');

    const createPost = async () => {
      try {
        await axios.post('http://127.0.0.1:8000/api/posts/', {
          title: title.value,
          content: content.value,
          author: author.value
        });
        emit('postCreated'); // Emite el evento cuando se crea el post
        emit('close'); // Cierra el modal
      } catch (error) {
        console.error('Error creating post:', error);
      }
    };

    return {
      title,
      content,
      author,
      createPost
    };
  }
};
</script>

