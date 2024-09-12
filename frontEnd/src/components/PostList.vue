<template>
  <div class="container mt-4">
		<button class="btn btn-primary ms-auto mb-3" @click="openCreateModal">Crear Nueva Publicación</button>
		
    <ul class="list-group">
      <li v-for="post in sortedPosts" :key="post.id" class="list-group-item mb-3 shadow-sm">
        <div>
          <!-- Información del Post -->
          <div class="me-3 flex-grow-1" @click="openEditModal(post)">
            <h2 class="h5 mb-2">{{ post.title }}</h2>
            <p class="card-text mb-1">{{ post.content }}</p>
            <p class="card-text mb-1"><strong>Autor:</strong> {{ post.author }}</p>
            <p class="card-text mb-1"><strong>Fecha:</strong> {{ new Date(post.date).toLocaleDateString() }}</p>

            <div class="d-flex justify-content-center">
              <p class="card-text me-3"><strong>Upvotes:</strong> {{ post.upvotes }}</p>
              <p class="card-text me-3"><strong>Downvotes:</strong> -{{ post.downvotes }}</p>
              <p class="card-text"><strong>Votos Totales:</strong> {{ post.score }}</p>
            </div>

          </div>
          <!-- Botones -->
          <div class="aling-items-center in-line mb-3">
            <button class="btn btn-sm btn-primary" @click="upvote(post)">Upvote</button>
          <button class="btn btn-sm btn-danger mx-2" @click="downvote(post)">Downvote</button>
          <button class="btn btn-sm btn-secondary" @click="openEditModal(post)">Editar</button>
          <button class="btn btn-sm btn-danger mx-2" @click="deletePost(post)">Eliminar</button>
          </div>
        </div>
      </li>
    </ul>
		<CreatePostModal v-if="showCreateModal" @close="showCreateModal = false"  @postCreated="fetchPosts"  /><!-- Escucha el evento -->
    <EditPostModal v-if="showEditModal" :post="selectedPost" @close="showEditModal = false" @postUpdated="fetchPosts" />
    
  </div>
</template>

<style scoped>
/* Añade estilos personalizados si es necesario */
.list-group-item {
  border-radius: 0.5rem; /* Bordes redondeados */
}

.btn {
  transition: background-color 0.3s ease; /* Efecto de transición */
}

.btn:hover {
  opacity: 0.8; /* Efecto de hover */
}
</style>



<script>
import { ref } from 'vue';
import usePost from './usePosts.js';
import CreatePostModal from './CreatePostModal.vue';
import EditPostModal from './EditPostModal.vue';

export default {
	components: {
    CreatePostModal,
    EditPostModal
  },
  setup() {
    const {  posts,
      sortedPosts,
      showCreateModal = ref(false),
      showEditModal = ref(false),
      selectedPost = ref(null),
      fetchPosts,
      upvote,
      downvote,
      deletePost,
      editPost,
      savePost} = usePost();

    const openCreateModal = () => {
      showCreateModal.value = true;
    };
    const openEditModal = (post) => {
      selectedPost.value = post;  // Asigna la publicación seleccionada
      showEditModal.value = true; // Muestra el modal de edición
    };
    
			return {
      posts,
      sortedPosts,
      showCreateModal,
      showEditModal,
      selectedPost,
      fetchPosts,
      upvote,
      downvote,
      deletePost,
      editPost,
      savePost,
      openCreateModal,
      openEditModal
    };
  }
};
</script>