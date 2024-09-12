from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    score = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'  # Incluye todos los campos del modelo
        extra_kwargs = {
            'score': {'read_only': True}  # Hacer que el campo sea solo de lectura
        }

    def get_score(self, obj):
        return obj.upvotes - obj.downvotes