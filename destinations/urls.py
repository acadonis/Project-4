from django.urls import path
from .views import CategoryList, CategoryDetail, DestinationList, DestinationDetail, CarbonKitView


urlpatterns = [
    path('destinations/', DestinationList.as_view(), name='destinations-list'),
    path('destinations/<int:pk>/', DestinationDetail.as_view(), name='destinations-detail'),
    path('categories/', CategoryList.as_view(), name='categories-list'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='categories-detail'),
    path('carbonkit/', CarbonKitView.as_view(), name='carbonkit')
]
