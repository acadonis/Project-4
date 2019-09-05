from django.urls import path
from .views import CategoryList, CategoryDetail, DestinationList, DestinationDetail

urlpatterns = [
    path('destinations/', DestinationList.as_view()),
    path('destinations/<int:pk>/', DestinationDetail.as_view()),
    path('categories/', CategoryList.as_view()),
    path('categories/<int:pk>/', CategoryDetail.as_view()),
]
