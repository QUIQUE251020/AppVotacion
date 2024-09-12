from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-upvotes', 'downvotes')
    serializer_class = PostSerializer

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
class PostUpvote(APIView):
    def post(self, request, pk, format=None):
        try:
            post = Post.objects.get(pk=pk)
            post.upvotes += 1
            post.save()
            serializer = PostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class PostDownvote(APIView):
    def post(self, request, pk, format=None):
        try:
            post = Post.objects.get(pk=pk)
            post.downvotes += 1
            post.save()
            serializer = PostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
class PostUpdate(APIView):
    def put(self, request, pk, format=None):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)