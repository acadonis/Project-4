from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT

from .models import Category, Destination
from .serializers import CategorySerializer, DestinationSerializer, PopulatedDestinationSerializer, PopulatedCategorySerializer


class DestinationList(APIView):

    def get(self, _request):
        destinations = Destination.objects.all()
        serializer = PopulatedDestinationSerializer(destinations, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DestinationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            destination = serializer.instance
            serializer = PopulatedDestinationSerializer(destination)
            return Response(serializer.data, status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class DestinationDetail(APIView):

    def get(self, _request, pk):
        destination = Destination.objects.get(pk=pk)
        serializer = DestinationSerializer(destination)
        return Response(serializer.data)

    def put(self, request, pk):
        destination = Destination.objects.get(pk=pk)
        serializer = DestinationSerializer(destination, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        destination = Destination.objects.get(pk=pk)
        destination.delete()

        return Response(status=HTTP_204_NO_CONTENT)
class CategoryList(APIView):

    def get(self, _request):
        categorys = Category.objects.all()
        serializer = PopulatedCategorySerializer(categorys, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PopulatedCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class CategoryDetail(APIView):

    def get(self, _request, pk):
        category = Category.objects.get(pk=pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, pk):
        category = Category.objects.get(pk=pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        category = Category.objects.get(pk=pk)
        category.delete()

        return Response(status=HTTP_204_NO_CONTENT)




































# from rest_framework.permissions import IsAuthenticatedOrReadOnly
#
# from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
#
# from .permissions import IsOwnerOrReadOnly
#
# from .models import Category, Destination
# from .serializers import CategorySerializer, DestinationSerializer
#
# class CategoryList(ListCreateAPIView):
#     permission_classes = (IsAuthenticatedOrReadOnly,)
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#
# class CategoryDetail(RetrieveUpdateDestroyAPIView):
#     permission_classes = (IsOwnerOrReadOnly,)
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#
# class DestinationList(ListCreateAPIView):
#     permission_classes = (IsAuthenticatedOrReadOnly,)
#     queryset = Destination.objects.all()
#     serializer_class = DestinationSerializer
#
# class DestinationDetail(RetrieveUpdateDestroyAPIView):
#     permission_classes = (IsOwnerOrReadOnly,)
#     queryset = Destination.objects.all()
#     serializer_class = DestinationSerializer
#
# # Create your views here.
