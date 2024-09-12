import { ref, computed, onMounted } from 'vue'; // Asegúrate de importar estas funciones
import axios from 'axios';

export default function usePost() {
  const posts = ref([]);
  const showCreateModal = ref(false);
  const showEditModal = ref(false);
  const selectedPost = ref(null);
  
  const sortedPosts = computed(() => {
    return posts.value.slice().sort((a, b) => {
			return b.score - a.score;
    });
  });

  onMounted(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/posts/');
      console.log('Datos recuperados:', response.data);
      console.log('Holaaaaaaaaa');
      posts.value = response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  });

  const fetchPosts = async () => {
    console.log('Creating post...');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/posts/');
      posts.value = response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  onMounted(fetchPosts);
  
  const upvote = async (post) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/posts/${post.id}/upvote/`);
      await fetchPosts(); // Refresca la lista de publicaciones
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

  const downvote = async (post) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/posts/${post.id}/downvote/`);
      await fetchPosts(); // Refresca la lista de publicaciones
    } catch (error) {
      console.error('Error downvoting post:', error);
    }
  };

  const deletePost = async (post) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/posts/${post.id}/`);
        await fetchPosts(); // Refresca la lista de publicaciones
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const editPost = (post) => {
    selectedPost.value = post;
    showEditModal.value = true;
  };
  
  const savePost = async () => {
    if (!selectedPost.value) return;
    try {
      await axios.put(`http://127.0.0.1:8000/api/posts/${selectedPost.value.id}/`, selectedPost.value);
      showEditModal.value = false;
      await fetchPosts(); // Refresca la lista de publicaciones
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return {
    posts,
    showCreateModal,
    sortedPosts,
    selectedPost,
    fetchPosts,
    upvote,
    downvote,
    deletePost,
    editPost,
    savePost

  };
}
