from rest_framework.permissions import IsAuthenticatedOrReadOnly

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .permissions import IsOwnerOrReadOnly

from .models import Category, Destination
from .serializers import CategorySerializer, DestinationSerializer

class CategoryList(ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class DestinationList(ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

class DestinationDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

# Create your views here.
