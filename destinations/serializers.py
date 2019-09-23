from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from .models import Category, Destination

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        user = UserSerializer(read_only=True)
        fields = ('id', 'name', 'destinations', 'user',)

class DestinationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Destination
        fields = ('id', 'name', 'airport', 'country', 'longitude', 'latitude', 'cost', 'image', 'description', 'user', 'categories',)

class PopulatedCategorySerializer(CategorySerializer):

    destinations = DestinationSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta(CategorySerializer.Meta):
        fields = ('id', 'name', 'destinations', 'user',)

class PopulatedDestinationSerializer(serializers.ModelSerializer):

    categories = CategorySerializer(many=True, read_only=True)

    class Meta(DestinationSerializer.Meta):
        fields = ('id', 'name', 'airport', 'country', 'longitude', 'latitude', 'cost', 'image', 'description', 'categories', 'user',)

#
#
#
# class NestedCategorySerializer(serializers.ModelSerializer):
#
#     user = UserSerializer(read_only=True)
#
#     class Meta:
#         model = Category
#         fields = ('id', 'name', 'destinations', 'user',)
#
# class NestedDestinationSerializer(serializers.ModelSerializer):
#
#     user = UserSerializer(read_only=True)
#
#     class Meta:
#         model = Destination
#         fields = ('id', 'name', 'airport', 'address', 'longitude', 'latitude', 'cost', 'image', 'description', 'categories', 'user',)
#
# class CategorySerializer(serializers.ModelSerializer):
#
#     destinations = NestedDestinationSerializer(many=True)
#
#     class Meta:
#         model = Category
#         fields = ('id', 'name', 'destinations', 'user',)
#
# class DestinationSerializer(serializers.ModelSerializer):
#
#     categories = NestedCategorySerializer(many=True)
#
#     class Meta:
#         model = Destination
#         fields = ('id', 'name', 'airport', 'address', 'longitude', 'latitude', 'cost', 'image', 'description', 'categories', 'user',)
