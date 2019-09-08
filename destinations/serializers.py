from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from .models import Category, Destination


class NestedCategorySerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'category', 'destinations', 'user',)

class NestedDestinationSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Destination
        fields = ('id', 'name', 'airport', 'address', 'longitude', 'latitude', 'cost', 'image', 'description', 'categories', 'user',)

class CategorySerializer(serializers.ModelSerializer):

    destinations = NestedDestinationSerializer(many=True)

    class Meta:
        model = Category
        fields = ('id', 'category', 'destinations', 'user',)

class DestinationSerializer(serializers.ModelSerializer):

    categories = NestedCategorySerializer(many=True)

    class Meta:
        model = Destination
        fields = ('id', 'name', 'airport', 'address', 'longitude', 'latitude', 'cost', 'image', 'description', 'categories', 'user',)
