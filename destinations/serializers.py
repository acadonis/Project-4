from rest_framework import serializers
from .models import Category, Destination

class NestedCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'category', 'destinations')

class NestedDestinationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Destination
        fields = ('id', 'name', 'airport', 'address', 'longitude', 'latitude', 'cost', 'image', 'description', 'categories',)

class CategorySerializer(serializers.ModelSerializer):
    destinations = NestedDestinationSerializer(many=True)

    class Meta:
        model = Category
        fields = ('id', 'category', 'destinations')

class DestinationSerializer(serializers.ModelSerializer):
    categories = NestedCategorySerializer(many=True)

    class Meta:
        model = Destination
        fields = ('id', 'name', 'airport', 'address', 'longitude', 'latitude', 'cost', 'image', 'description', 'categories',)
