from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet
from . import views

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('posts/<int:pk>/upvote/', views.PostUpvote.as_view(), name='post-upvote'),
    path('posts/<int:pk>/downvote/', views.PostDownvote.as_view(), name='post-downvote'),
    path('posts/<int:pk>/edit/', views.PostUpdate.as_view(), name='update-post'),
]
